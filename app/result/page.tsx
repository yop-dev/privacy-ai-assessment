import Link from 'next/link'
import { Suspense } from 'react'
import ResultCard from '@/components/ResultCard'
import PDFReport from '@/components/PDFReport'

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

function getComplianceResult(score: number, total: number): ComplianceResult {
  const percentage = (score / total) * 100

  if (score >= 8) {
    return {
      status: 'compliant',
      score,
      total,
      title: 'Likely Compliant',
      description: 'Excellent! Your organization demonstrates strong compliance with RA 10173 requirements. Continue maintaining these high standards.',
      color: 'text-green-800',
      bgColor: 'bg-green-50',
      icon: '✅'
    }
  } else if (score >= 5) {
    return {
      status: 'partially-compliant',
      score,
      total,
      title: 'Partially Compliant',
      description: 'Your organization has established some important compliance measures, but there are critical areas that require immediate attention to meet RA 10173 standards.',
      color: 'text-yellow-800',
      bgColor: 'bg-yellow-50',
      icon: '⚠️'
    }
  } else {
    return {
      status: 'non-compliant',
      score,
      total,
      title: 'Non-Compliant',
      description: 'Your organization has significant compliance gaps that pose serious legal and regulatory risks. Immediate action is required to meet RA 10173 requirements.',
      color: 'text-red-800',
      bgColor: 'bg-red-50',
      icon: '❌'
    }
  }
}

function getActionSteps(score: number, answers: Record<string, boolean>): ActionStep[] {
  const steps: ActionStep[] = []

  // Check specific answers and provide targeted recommendations
  if (!answers.data_protection_officer) {
    steps.push({
      title: 'Designate a Data Protection Officer',
      description: 'Appoint a qualified individual to oversee data privacy compliance, serve as the contact point for the NPC, and ensure ongoing adherence to RA 10173.',
      priority: 'high'
    })
  }

  if (!answers.privacy_impact_assessment) {
    steps.push({
      title: 'Conduct Privacy Impact Assessments',
      description: 'Perform systematic assessments of data processing activities to identify privacy risks and implement appropriate safeguards before processing begins.',
      priority: 'high'
    })
  }

  if (!answers.privacy_management_program) {
    steps.push({
      title: 'Establish Privacy Management Program',
      description: 'Develop comprehensive written policies, procedures, and security measures for handling personal data throughout its lifecycle.',
      priority: 'high'
    })
  }

  if (!answers.explicit_consent) {
    steps.push({
      title: 'Implement Explicit Consent Mechanisms',
      description: 'Establish clear, purpose-specific consent processes that are freely given, informed, and unambiguous for each data processing purpose.',
      priority: 'high'
    })
  }

  if (!answers.data_minimization) {
    steps.push({
      title: 'Apply Data Minimization Principles',
      description: 'Review and limit data collection to only what is strictly necessary and directly relevant for your declared legitimate business purposes.',
      priority: 'medium'
    })
  }

  if (!answers.privacy_notice) {
    steps.push({
      title: 'Create Comprehensive Privacy Notice',
      description: 'Publish a clear, accessible privacy policy explaining data collection, use, sharing, retention, and data subject rights under RA 10173.',
      priority: 'high'
    })
  }

  if (!answers.data_subject_rights) {
    steps.push({
      title: 'Implement Data Subject Rights Procedures',
      description: 'Establish processes for data subjects to access, correct, delete, and port their personal data, with clear timelines and response mechanisms.',
      priority: 'high'
    })
  }

  if (!answers.security_measures) {
    steps.push({
      title: 'Strengthen Data Security Measures',
      description: 'Implement appropriate technical, organizational, and physical safeguards including encryption, access controls, and secure data storage.',
      priority: 'high'
    })
  }

  if (!answers.breach_notification) {
    steps.push({
      title: 'Develop Breach Response Procedures',
      description: 'Create documented incident response plans for detecting, containing, and reporting data breaches to the NPC and affected individuals within required timeframes.',
      priority: 'high'
    })
  }

  if (!answers.compliance_audits) {
    steps.push({
      title: 'Establish Regular Compliance Monitoring',
      description: 'Implement periodic compliance audits and mandatory privacy training programs to ensure ongoing adherence to RA 10173 requirements.',
      priority: 'medium'
    })
  }

  // Add general recommendations based on score
  if (score >= 8) {
    steps.push({
      title: 'Maintain Compliance Excellence',
      description: 'Continue regular compliance reviews and stay updated on NPC guidelines and regulatory changes to maintain your high compliance standards.',
      priority: 'low'
    })
  }

  if (score < 5) {
    steps.push({
      title: 'Seek Professional Legal Consultation',
      description: 'Given significant compliance gaps, engage qualified data privacy lawyers or consultants to develop a comprehensive remediation strategy.',
      priority: 'high'
    })
  }

  // Ensure we have appropriate number of steps based on compliance level
  const maxSteps = score >= 8 ? 3 : score >= 5 ? 5 : 7
  return steps.slice(0, maxSteps)
}

function ResultContent({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const score = parseInt(searchParams.score as string) || 0
  const total = parseInt(searchParams.total as string) || 5
  const answersParam = searchParams.answers as string
  
  let answers: Record<string, boolean> = {}
  try {
    answers = answersParam ? JSON.parse(answersParam) : {}
  } catch (e) {
    console.error('Failed to parse answers:', e)
  }

  const result = getComplianceResult(score, total)
  const actionSteps = getActionSteps(score, answers)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/check" 
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-8 transition-colors group"
            >
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Take Assessment Again
            </Link>
            
            <div className="text-center">
              <div className="inline-flex items-center bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                RA 10173 Assessment Complete
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
                Your Compliance Results
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance leading-relaxed">
                Based on your responses, here's your compliance status and recommended next steps for Philippine Data Privacy Act compliance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ResultCard result={result} actionSteps={actionSteps} answers={answers} />
        </div>
      </section>

      {/* Action Buttons Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* PDF Report Generation */}
          <div className="mb-16">
            <PDFReport 
              result={result}
              actionSteps={actionSteps}
              answers={answers}
            />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card text-center bg-gray-50 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Continue improving your data privacy compliance or share these results with your team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/check" className="btn-secondary">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retake Assessment
                </Link>
                <Link href="/" className="btn-primary">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ResultPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <Suspense fallback={
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your results...</p>
      </div>
    }>
      <ResultContent searchParams={searchParams} />
    </Suspense>
  )
}