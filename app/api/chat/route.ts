import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatRequest {
  message: string
  history?: ChatMessage[]
}

const SYSTEM_PROMPT = `You are a legal assistant specializing in the Philippine Data Privacy Act of 2012 (Republic Act No. 10173). Your role is to help users understand their obligations and rights under this law.

Key areas you should focus on:
- Data collection and consent requirements
- Data subject rights (access, rectification, erasure, etc.)
- Data controller and processor obligations
- Security measures and breach notification
- National Privacy Commission (NPC) guidelines
- Penalties and enforcement
- Exemptions and special cases

Guidelines for responses:
- Provide accurate, helpful information about RA 10173
- Use clear, professional language
- Reference specific sections of the law when relevant
- Suggest consulting legal professionals for complex situations
- Keep responses concise but comprehensive
- If unsure about something, acknowledge limitations

Always remind users that this is general guidance and not legal advice.`

export async function POST(request: NextRequest) {
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      )
    }

    const body: ChatRequest = await request.json()
    const { message, history = [] } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    // Build conversation history
    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ]

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Using Llama 3.3 70B for high-quality legal responses
        messages,
        max_tokens: 1000,
        temperature: 0.3, // Lower temperature for more consistent legal advice
        top_p: 0.9,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Groq API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to get response from AI service' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const aiMessage = data.choices?.[0]?.message?.content

    if (!aiMessage) {
      return NextResponse.json(
        { error: 'No response from AI service' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: aiMessage,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}