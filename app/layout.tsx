import type { Metadata } from 'next'
import Link from 'next/link'
import ChatProvider from '@/components/ChatProvider'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Philippine Data Privacy Compliance Checker',
  description: 'Quickly assess your business\'s compliance with RA 10173 - Philippine Data Privacy Act of 2012',
  keywords: 'data privacy, compliance, Philippines, RA 10173, PDPA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50 min-h-screen antialiased">
        <header className="bg-white shadow-soft border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 leading-tight">
                    Philippine Data Privacy
                  </h1>
                  <p className="text-sm text-gray-600 leading-tight">Compliance Checker</p>
                </div>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                  Home
                </Link>
                <Link href="/check" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                  Assessment
                </Link>
                <a 
                  href="https://privacy.gov.ph/data-privacy-act" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 font-medium transition-colors flex items-center"
                >
                  RA 10173
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </header>
        
        <main className="min-h-screen">
          <ChatProvider>
            {children}
          </ChatProvider>
        </main>
        
        <footer className="bg-white border-t border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-900">Privacy Checker</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Professional compliance assessment platform for the Philippine Data Privacy Act of 2012 (RA 10173).
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">Home</Link></li>
                  <li><Link href="/check" className="text-gray-600 hover:text-primary-600 transition-colors">Start Assessment</Link></li>
                  <li>
                    <a href="https://privacy.gov.ph/data-privacy-act" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600 transition-colors">
                      Official RA 10173 Text
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Important Notice</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  This tool provides general guidance only and should not be considered as legal advice. 
                  Consult qualified legal professionals for comprehensive compliance evaluation.
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-8 pt-8 text-center">
              <p className="text-gray-500 text-sm">
                © 2025 Philippine Data Privacy Compliance Checker. Developed by Yop.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}