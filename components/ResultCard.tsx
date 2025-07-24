'use client'

import { useState, useEffect } from 'react'

interface ComplianceResult {
  status: 'compliant' | 'partially-compliant' | 'non-compliant'
  score: number
  total: number
  title: string
  description: string
  color: string
  bgColor: string
  icon: string
}

interface ActionStep {
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
}

interface AIFeedback {
  questionId: string
  feedback: string
}

interface ResultCardProps {
  result: ComplianceResult
  actionSteps: ActionStep[]
  answers: Record<string, boolean>
}

export default function ResultCard({ result, actionSteps, answers }: ResultCardProps) {
  const [aiFeedback, setAiFeedback] = useState<AIFeedback[]>([])
  const [loadingFeedback, setLoadingFeedback] = useState(false)

  const questionTexts: Record<string, string> = {
    data_protection_officer: 'Do you have a designated Data Protection Officer or similar individual accountable for data privacy compliance?',
    privacy_impact_assessment: 'Have you conducted a Privacy Impact Assessment (PIA) for your data processing activities?',
    privacy_management_program: 'Does your organization have a formal Privacy Management Program, including documented policies and security procedures?',
    explicit_consent: 'Do you obtain explicit, purpose-specific consent from data subjects before collecting their personal data?',
    data_minimization: 'Do you limit your collection and processing of personal data to what is strictly necessary for a declared legitimate purpose?',
    privacy_notice: 'Is there an accessible Privacy Notice or Policy that clearly informs data subjects of how their data is processed?',
    data_subject_rights: 'Can data subjects access, correct, or request deletion of their personal data held by your organization?',
    security_measures: 'Do you implement appropriate organizational, physical, or technical security measures to protect personal data?',
    breach_notification: 'Do you have a defined incident response or breach notification process to alert both the National Privacy Commission and affected individuals?',
    compliance_audits: 'Does your organization conduct regular compliance audits and privacy/security training for employees?'
  }

  useEffect(() => {
    const generateFeedback = async () => {
      const noAnswers = Object.entries(answers).filter(([_, value]) => value === false)
      
      if (noAnswers.length === 0) return

      setLoadingFeedback(true)
      const feedbackPromises = noAnswers.map(async ([questionId]) => {
        try {
          const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              questionId,
              questionText: questionTexts[questionId]
            })
          })

          if (response.ok) {
            const data = await response.json()
            return { questionId, feedback: data.feedback }
          }
        } catch (error) {
          console.error('Error generating feedback:', error)
        }
        return null
      })

      const results = await Promise.all(feedbackPromises)
      const validFeedback = results.filter(Boolean) as AIFeedback[]
      setAiFeedback(validFeedback)
      setLoadingFeedback(false)
    }

    generateFeedback()
  }, [answers])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getFeedbackForQuestion = (questionId: string) => {
    return aiFeedback.find(f => f.questionId === questionId)?.feedback
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Main Result Card */}
      <div className={`card ${result.bgColor} border-2 text-center`}>
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white shadow-lg flex items-center justify-center">
            <span className="text-4xl">{result.icon}</span>
          </div>
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 ${result.color}`}>
            {result.title}
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            {result.description}
          </p>
        </div>
        
        <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {result.score}/{result.total}
            </div>
            <div className="text-gray-600 text-sm">Questions Answered "Yes"</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {Math.round((result.score / result.total) * 100)}%
            </div>
            <div className="text-gray-600 text-sm">Compliance Score</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className={`text-3xl font-bold mb-1 ${result.color}`}>
              {result.status === 'compliant' ? 'A' : result.status === 'partially-compliant' ? 'B' : 'C'}
            </div>
            <div className="text-gray-600 text-sm">Compliance Grade</div>
          </div>
        </div>
      </div>

      {/* Score Visualization */}
      <div className="card">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Score Breakdown</h3>
        <div className="space-y-6">
          <div className="relative">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-medium text-gray-700">Overall Compliance</span>
              <span className="text-lg font-bold text-gray-900">{Math.round((result.score / result.total) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                  result.status === 'compliant' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  result.status === 'partially-compliant' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                  'bg-gradient-to-r from-red-400 to-red-600'
                }`}
                style={{ width: `${(result.score / result.total) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-700 mb-1">{result.score}</div>
              <div className="text-green-600 text-sm">Compliant Areas</div>
            </div>
            <div className="p-4 bg-red-50 rounded-xl">
              <div className="text-2xl font-bold text-red-700 mb-1">{result.total - result.score}</div>
              <div className="text-red-600 text-sm">Areas for Improvement</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-700 mb-1">{actionSteps.length}</div>
              <div className="text-blue-600 text-sm">Action Items</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Steps */}
      <div className="card">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Recommended Action Steps</h3>
            <p className="text-gray-600">Prioritized recommendations to improve your compliance</p>
          </div>
        </div>
        
        <div className="space-y-6">
          {actionSteps.map((step, index) => (
            <div key={index} className="card-compact hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <span className="text-primary-700 font-bold text-lg">{index + 1}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">{step.title}</h4>
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border mt-2 sm:mt-0 ${getPriorityColor(step.priority)}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        step.priority === 'high' ? 'bg-red-500' : 
                        step.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      {step.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI-Generated Feedback for "No" Responses */}
      {Object.entries(answers).some(([_, value]) => value === false) && (
        <div className="card">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">AI-Powered Compliance Guidance</h3>
              <p className="text-gray-600">Specific recommendations for areas needing improvement</p>
            </div>
          </div>

          {loadingFeedback ? (
            <div className="space-y-4">
              {Object.entries(answers).filter(([_, value]) => value === false).map(([questionId], index) => (
                <div key={questionId} className="card-compact animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(answers)
                .filter(([_, value]) => value === false)
                .map(([questionId]) => {
                  const feedback = getFeedbackForQuestion(questionId)
                  const questionText = questionTexts[questionId]
                  
                  // Get the actual question number based on the question ID
                  const questionIds = Object.keys(questionTexts)
                  const actualQuestionNumber = questionIds.indexOf(questionId) + 1
                  
                  return (
                    <div key={questionId} className="card-compact bg-orange-50 border-orange-200">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-orange-900 mb-2">
                            Question {actualQuestionNumber}: {questionText?.split('?')[0]}?
                          </h4>
                          {feedback ? (
                            <div className="bg-white rounded-lg p-4 border border-orange-200">
                              <div className="flex items-start gap-2">
                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-blue-900 mb-1">AI Legal Assistant Recommendation:</p>
                                  <p className="text-gray-700 text-sm leading-relaxed">{feedback}</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <p className="text-gray-600 text-sm">
                                Unable to generate specific feedback for this question. Please consult the action steps above or contact our AI assistant for guidance.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          )}

          {/* AI Chatbot Prompt */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-primary-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-900">Need More Guidance?</h4>
                  <p className="text-blue-700 text-sm">
                    Have questions about these recommendations? Our AI legal assistant can provide detailed explanations and next steps.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-white rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-gray-700 italic mb-2">
                💬 "Can you explain how to implement a Privacy Management Program for my small business?"
              </p>
              <p className="text-xs text-gray-500">Example question you can ask our AI assistant</p>
            </div>
          </div>
        </div>
      )}

      {/* Additional Resources */}
      <div className="card bg-primary-50 border-primary-200">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary-900">Additional Resources</h3>
            <p className="text-primary-700">Official resources for Philippine data privacy compliance</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <a 
            href="https://privacy.gov.ph" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-xl hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-primary-600 text-lg">🏛️</span>
              </div>
              <h4 className="font-semibold text-primary-900 group-hover:text-primary-700">National Privacy Commission</h4>
            </div>
            <p className="text-primary-700 text-sm">Official guidelines and resources</p>
          </a>
          
          <a 
            href="https://privacy.gov.ph/data-privacy-act" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-xl hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-primary-600 text-lg">📖</span>
              </div>
              <h4 className="font-semibold text-primary-900 group-hover:text-primary-700">RA 10173 Full Text</h4>
            </div>
            <p className="text-primary-700 text-sm">Complete Data Privacy Act of 2012</p>
          </a>
          
          <div className="block p-4 bg-white rounded-xl">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-primary-600 text-lg">⚖️</span>
              </div>
              <h4 className="font-semibold text-primary-900">Legal Consultation</h4>
            </div>
            <p className="text-primary-700 text-sm">Consult with data privacy lawyers</p>
          </div>
        </div>
      </div>
    </div>
  )
}