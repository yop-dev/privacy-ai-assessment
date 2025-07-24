'use client'

import { useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

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

interface PDFReportProps {
  result: ComplianceResult
  actionSteps: ActionStep[]
  answers: Record<string, boolean>
}

export default function PDFReport({ result, actionSteps, answers }: PDFReportProps) {
  const reportRef = useRef<HTMLDivElement>(null)

  const generatePDF = async () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 20
      const contentWidth = pageWidth - (margin * 2)
      let yPosition = margin

      // Helper function to add new page if needed
      const checkNewPage = (requiredHeight: number) => {
        if (yPosition + requiredHeight > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        }
      }

      // Helper function to wrap text
      const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
        pdf.setFontSize(fontSize)
        const lines = pdf.splitTextToSize(text, maxWidth)
        pdf.text(lines, x, y)
        return lines.length * (fontSize * 0.35) // Return height used
      }

      // Header
      pdf.setFontSize(20)
      pdf.setFont('helvetica', 'bold')
      pdf.text('RA 10173 Compliance Report', pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 10

      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Philippine Data Privacy Act Assessment', pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 15

      pdf.setFontSize(10)
      const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      pdf.text(`Generated on: ${currentDate}`, pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 5
      pdf.text(`Assessment completed: ${getAnsweredQuestions()} of ${Object.keys(answers).length} questions`, pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 15

      // Draw line
      pdf.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 10

      // Executive Summary
      checkNewPage(40)
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Executive Summary', margin, yPosition)
      yPosition += 10

      pdf.setFontSize(12)
      pdf.text(`Status: ${result.title}`, margin, yPosition)
      yPosition += 7
      pdf.text(`Compliance Score: ${result.score}/${result.total} (${Math.round((result.score / result.total) * 100)}%)`, margin, yPosition)
      yPosition += 10

      pdf.setFontSize(10)
      const descHeight = addWrappedText(result.description, margin, yPosition, contentWidth, 10)
      yPosition += descHeight + 15

      // Assessment Results
      checkNewPage(30)
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Assessment Results', margin, yPosition)
      yPosition += 10

      Object.entries(answers).forEach(([questionId, answered], index) => {
        checkNewPage(15)
        
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')
        
        // Question number and title
        const questionTitle = `${index + 1}. ${questionId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`
        pdf.text(questionTitle, margin, yPosition)
        
        // Status
        pdf.setFont('helvetica', 'bold')
        if (answered) {
          pdf.setTextColor(0, 100, 0) // Green
          pdf.text('✓ Compliant', pageWidth - margin - 30, yPosition)
        } else {
          pdf.setTextColor(200, 0, 0) // Red
          pdf.text('✗ Non-Compliant', pageWidth - margin - 40, yPosition)
        }
        pdf.setTextColor(0, 0, 0) // Reset to black
        pdf.setFont('helvetica', 'normal')
        
        yPosition += 8
      })

      yPosition += 10

      // Action Plan
      if (actionSteps.length > 0) {
        checkNewPage(30)
        pdf.setFontSize(16)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Recommended Action Plan', margin, yPosition)
        yPosition += 10

        actionSteps.forEach((step, index) => {
          checkNewPage(25)
          
          pdf.setFontSize(12)
          pdf.setFont('helvetica', 'bold')
          pdf.text(`${index + 1}. ${step.title}`, margin, yPosition)
          yPosition += 7
          
          // Priority badge
          pdf.setFontSize(8)
          const priorityColor = step.priority === 'high' ? [200, 0, 0] : step.priority === 'medium' ? [200, 150, 0] : [0, 150, 0]
          pdf.setTextColor(...priorityColor)
          pdf.text(`[${step.priority.toUpperCase()} PRIORITY]`, margin, yPosition)
          pdf.setTextColor(0, 0, 0)
          yPosition += 7
          
          pdf.setFontSize(10)
          pdf.setFont('helvetica', 'normal')
          const stepHeight = addWrappedText(step.description, margin, yPosition, contentWidth, 10)
          yPosition += stepHeight + 10
        })
      }

      // Footer
      checkNewPage(20)
      yPosition = Math.max(yPosition, pageHeight - 40)
      pdf.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 10

      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'italic')
      const disclaimerText = 'Disclaimer: This assessment provides general guidance based on RA 10173 requirements. For comprehensive compliance evaluation, consult with qualified legal professionals.'
      const disclaimerHeight = addWrappedText(disclaimerText, margin, yPosition, contentWidth, 8)
      yPosition += disclaimerHeight + 5

      pdf.text('Generated by Philippine Data Privacy Compliance Checker', pageWidth / 2, yPosition, { align: 'center' })

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split('T')[0]
      const filename = `RA10173-Compliance-Report-${timestamp}.pdf`
      
      // Download the PDF
      pdf.save(filename)
    } catch (error) {
      console.error('Error generating PDF:', error)
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      alert(`Error generating PDF report: ${errorMsg}. Please try refreshing the page and trying again.`)
    }
  }

  const getAnsweredQuestions = () => {
    return Object.entries(answers).filter(([_, answered]) => answered).length
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div>
      {/* PDF Generation Button */}
      <div className="mb-8 flex flex-col items-center">
        <button
          onClick={generatePDF}
          className="btn-secondary"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-4-4V4m6 6h2a2 2 0 002-2V4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2h2" />
          </svg>
          Download PDF Report
        </button>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Generate a professional compliance report for your records
        </p>
      </div>

      {/* Hidden PDF Content */}
      <div ref={reportRef} style={{ display: 'none' }}>
        <div className="bg-white" style={{ 
          fontFamily: 'Arial, sans-serif',
          width: '650px', // Optimized width for PDF generation
          padding: '20px',
          margin: '0 auto',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px', borderBottom: '2px solid #e5e7eb', paddingBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                backgroundColor: '#2563eb', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginRight: '16px' 
              }}>
                <span style={{ color: 'white', fontSize: '24px' }}>🛡️</span>
              </div>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: '0' }}>RA 10173 Compliance Report</h1>
                <p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>Philippine Data Privacy Act Assessment</p>
              </div>
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              <p style={{ margin: '4px 0' }}>Generated on: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p style={{ margin: '4px 0' }}>Assessment completed: {getAnsweredQuestions()} of {Object.keys(answers).length} questions</p>
            </div>
          </div>

          {/* Executive Summary */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Executive Summary</h2>
            <div style={{ 
              padding: '24px', 
              borderRadius: '8px', 
              border: '2px solid #e5e7eb',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '32px', marginRight: '16px' }}>{result.icon}</div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0' }}>{result.title}</h3>
                  <p style={{ fontSize: '14px', opacity: '0.9', margin: '4px 0 0 0' }}>{result.description}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', margin: '0' }}>Compliance Score</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '4px 0 0 0' }}>{result.score}/{result.total}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', margin: '0' }}>Completion Rate</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '4px 0 0 0' }}>{Math.round((result.score / result.total) * 100)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assessment Results */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Assessment Results</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
              {Object.entries(answers).map(([questionId, answered], index) => (
                <div key={questionId} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '12px', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                      width: '24px', 
                      height: '24px', 
                      backgroundColor: '#f3f4f6', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '12px', 
                      fontWeight: '500', 
                      marginRight: '12px',
                      textAlign: 'center',
                      lineHeight: '24px'
                    }}>
                      {index + 1}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}>
                      {questionId.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div style={{ 
                    padding: '4px 12px', 
                    borderRadius: '12px', 
                    fontSize: '12px', 
                    fontWeight: '500',
                    backgroundColor: answered ? '#dcfce7' : '#fee2e2',
                    color: answered ? '#166534' : '#991b1b'
                  }}>
                    {answered ? 'Compliant' : 'Non-Compliant'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Plan */}
          {actionSteps.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Recommended Action Plan</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {actionSteps.map((step, index) => (
                  <div key={index} style={{ 
                    padding: '16px', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    backgroundColor: step.priority === 'high' ? '#fef2f2' : step.priority === 'medium' ? '#fffbeb' : '#f0fdf4'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h3 style={{ fontWeight: '600', fontSize: '14px', margin: '0' }}>{step.title}</h3>
                      <span style={{ 
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px', 
                        fontWeight: '500', 
                        textTransform: 'capitalize',
                        backgroundColor: step.priority === 'high' ? '#fee2e2' : step.priority === 'medium' ? '#fef3c7' : '#dcfce7',
                        color: step.priority === 'high' ? '#991b1b' : step.priority === 'medium' ? '#92400e' : '#166534'
                      }}>
                        {step.priority} Priority
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', lineHeight: '1.5', margin: '0' }}>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '24px', marginTop: '32px' }}>
            <div style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
              <p style={{ marginBottom: '8px' }}>
                <strong>Disclaimer:</strong> This assessment provides general guidance based on RA 10173 requirements. 
                For comprehensive compliance evaluation, consult with qualified legal professionals.
              </p>
              <p style={{ margin: '0' }}>
                Generated by Philippine Data Privacy Compliance Checker | 
                Visit: <span style={{ color: '#2563eb' }}>yoursite.vercel.app</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}