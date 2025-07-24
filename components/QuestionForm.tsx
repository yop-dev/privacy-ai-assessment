'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Question {
  id: string
  text: string
  description: string
}

const questions: Question[] = [
  {
    id: 'data_protection_officer',
    text: 'Do you have a designated Data Protection Officer or similar individual accountable for data privacy compliance?',
    description: 'A DPO ensures your organization complies with RA 10173 and serves as the point of contact for data privacy matters.'
  },
  {
    id: 'privacy_impact_assessment',
    text: 'Have you conducted a Privacy Impact Assessment (PIA) for your data processing activities?',
    description: 'A PIA helps identify and mitigate privacy risks in your data processing operations before they occur.'
  },
  {
    id: 'privacy_management_program',
    text: 'Does your organization have a formal Privacy Management Program, including documented policies and security procedures?',
    description: 'A comprehensive program with written policies, procedures, and security measures for handling personal data.'
  },
  {
    id: 'explicit_consent',
    text: 'Do you obtain explicit, purpose-specific consent from data subjects before collecting their personal data?',
    description: 'Consent must be freely given, specific, informed, and unambiguous for each purpose of data processing.'
  },
  {
    id: 'data_minimization',
    text: 'Do you limit your collection and processing of personal data to what is strictly necessary for a declared legitimate purpose?',
    description: 'Only collect and process personal data that is directly relevant and necessary for your stated business purposes.'
  },
  {
    id: 'privacy_notice',
    text: 'Is there an accessible Privacy Notice or Policy that clearly informs data subjects of how their data is processed?',
    description: 'A clear, easily accessible document explaining what data you collect, how you use it, and data subject rights.'
  },
  {
    id: 'data_subject_rights',
    text: 'Can data subjects access, correct, or request deletion of their personal data held by your organization?',
    description: 'Data subjects have rights to access, rectify, erase, and port their personal data under RA 10173.'
  },
  {
    id: 'security_measures',
    text: 'Do you implement appropriate organizational, physical, or technical security measures to protect personal data (e.g. encryption, access restrictions)?',
    description: 'Implement reasonable and appropriate security measures to protect personal data against unauthorized access, disclosure, or destruction.'
  },
  {
    id: 'breach_notification',
    text: 'Do you have a defined incident response or breach notification process to alert both the National Privacy Commission and affected individuals?',
    description: 'A documented process to detect, respond to, and report data breaches within required timeframes under RA 10173.'
  },
  {
    id: 'compliance_audits',
    text: 'Does your organization conduct regular compliance audits and privacy/security training for employees?',
    description: 'Regular assessments and training ensure ongoing compliance and awareness of data privacy responsibilities.'
  }
]

export default function QuestionForm() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleAnswerChange = (questionId: string, answer: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Check if all questions are answered
    const allAnswered = questions.every(q => answers[q.id] !== undefined)
    if (!allAnswered) {
      alert('Please answer all questions before submitting.')
      setIsSubmitting(false)
      return
    }

    // Calculate score
    const yesCount = Object.values(answers).filter(Boolean).length
    
    // Create URL params for results page
    const params = new URLSearchParams({
      score: yesCount.toString(),
      total: questions.length.toString(),
      answers: JSON.stringify(answers)
    })

    // Navigate to results page
    router.push(`/result?${params.toString()}`)
  }

  const answeredCount = Object.keys(answers).length
  const progress = (answeredCount / questions.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="card mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Assessment Progress</h2>
            <p className="text-gray-600">Complete all questions to receive your compliance score</p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <div className="text-2xl font-bold text-primary-600">
              {answeredCount}/{questions.length}
            </div>
            <div className="text-sm text-gray-500">Questions Completed</div>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="absolute -top-1 transition-all duration-500 ease-out" style={{ left: `${progress}%` }}>
            <div className="w-5 h-5 bg-primary-600 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2"></div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="card hover:shadow-card-hover transition-all duration-200">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-primary-700 font-bold text-lg">{index + 1}</span>
              </div>
              
              <div className="flex-1">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                    {question.text}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{question.description}</p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    answers[question.id] === true 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}>
                    <input
                      type="radio"
                      name={question.id}
                      value="yes"
                      checked={answers[question.id] === true}
                      onChange={() => handleAnswerChange(question.id, true)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      answers[question.id] === true 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-gray-300'
                    }`}>
                      {answers[question.id] === true && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-700 font-semibold">Yes</span>
                    </div>
                  </label>
                  
                  <label className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    answers[question.id] === false 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                  }`}>
                    <input
                      type="radio"
                      name={question.id}
                      value="no"
                      checked={answers[question.id] === false}
                      onChange={() => handleAnswerChange(question.id, false)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      answers[question.id] === false 
                        ? 'border-red-500 bg-red-500' 
                        : 'border-gray-300'
                    }`}>
                      {answers[question.id] === false && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-red-700 font-semibold">No</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="card bg-gray-50 border-gray-200">
          <div className="text-center flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to Get Your Results?</h3>
            <p className="text-gray-600 mb-6">
              {answeredCount < questions.length 
                ? `Please answer ${questions.length - answeredCount} more question${questions.length - answeredCount === 1 ? '' : 's'} to continue.`
                : 'All questions completed! Click below to see your compliance assessment.'
              }
            </p>
            <button
              type="submit"
              disabled={isSubmitting || answeredCount < questions.length}
              className="btn-primary-large disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Assessment...
                </div>
              ) : (
                'Get My Compliance Results'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}