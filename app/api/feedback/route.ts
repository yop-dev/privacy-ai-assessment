import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

interface FeedbackRequest {
  questionId: string
  questionText: string
}

const FEEDBACK_SYSTEM_PROMPT = `You are a Philippine data privacy law expert specializing in RA 10173 (Data Privacy Act of 2012). 

Your task is to provide specific, actionable feedback for organizations that answered "No" to compliance questions. Your responses should be:

1. Legally accurate based on RA 10173 requirements
2. Beginner-friendly and easy to understand
3. Actionable with specific next steps
4. 2-3 sentences maximum
5. Professional but approachable tone

Focus on:
- What the law requires
- Why it's important for compliance
- Immediate practical steps they can take
- Potential risks of non-compliance

Do not include legal disclaimers in your response - keep it focused on practical guidance.`

const questionMappings: Record<string, string> = {
  data_protection_officer: "appointing a Data Protection Officer or privacy compliance lead",
  privacy_impact_assessment: "conducting Privacy Impact Assessments for data processing activities", 
  privacy_management_program: "establishing a formal Privacy Management Program with documented policies",
  explicit_consent: "obtaining explicit, purpose-specific consent before collecting personal data",
  data_minimization: "limiting data collection to what's necessary for legitimate purposes",
  privacy_notice: "providing accessible Privacy Notice explaining data processing practices",
  data_subject_rights: "enabling data subjects to access, correct, or delete their personal data",
  security_measures: "implementing appropriate security measures to protect personal data",
  breach_notification: "having incident response procedures for data breaches",
  compliance_audits: "conducting regular compliance audits and employee training"
}

export async function POST(request: NextRequest) {
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      )
    }

    const body: FeedbackRequest = await request.json()
    const { questionId, questionText } = body

    if (!questionId || !questionText) {
      return NextResponse.json(
        { error: 'Question ID and text are required' },
        { status: 400 }
      )
    }

    const context = questionMappings[questionId] || "this compliance requirement"
    
    const prompt = `A Philippine organization answered "No" to this RA 10173 compliance question: "${questionText}"

Provide specific, actionable feedback about ${context} under Philippine Data Privacy Act. Explain what they need to do to comply and why it's important. Keep it concise (2-3 sentences) and beginner-friendly.`

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: FEEDBACK_SYSTEM_PROMPT },
          { role: 'user', content: prompt }
        ],
        max_tokens: 200,
        temperature: 0.3,
        top_p: 0.9,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Groq API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to generate feedback' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const feedback = data.choices?.[0]?.message?.content

    if (!feedback) {
      return NextResponse.json(
        { error: 'No feedback generated' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      feedback: feedback.trim(),
      questionId,
    })

  } catch (error) {
    console.error('Feedback API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}