import type { Metadata } from 'next'
import Link from 'next/link'
import ChatProvider from '@/components/ChatProvider'
import ScrollProgress from '@/components/animations/ScrollProgress'
import AnimatedGlobalBackground from '@/components/backgrounds/AnimatedGlobalBackground'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Philippine Data Privacy Compliance Checker',
  description: 'Quickly assess your business\'s compliance with RA 10173 - Philippine Data Privacy Act of 2012',
  keywords: 'data privacy, compliance, Philippines, RA 10173, PDPA',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen antialiased">
        <AnimatedGlobalBackground />
        <ScrollProgress />
        
        <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/20 shadow-lg">
          {/* Animated gradient border */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-blue-500 to-purple-500 opacity-80"></div>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50/10 via-transparent to-blue-50/10 pointer-events-none"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Enhanced Logo Section */}
              <Link href="/" className="group flex items-center space-x-4 hover:scale-105 transition-all duration-300">
                {/* Logo with enhanced styling */}
                <div className="relative">
                  <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3 overflow-hidden border-2 border-primary-200">
                    <img 
                      src="/images/favicon.ico" 
                      alt="Philippine Data Privacy Compliance Checker Logo"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  {/* Animated ring around logo */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/50 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
                </div>
                
                {/* Enhanced Brand Text */}
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-white leading-tight drop-shadow-lg">
                    Philippine Data Privacy
                  </h1>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                      RA 10173
                    </span>
                    <p className="text-sm text-white/90 leading-tight">Compliance Checker</p>
                  </div>
                </div>
                
                {/* Mobile brand text */}
                <div className="sm:hidden">
                  <h1 className="text-lg font-bold text-white drop-shadow-lg">
                    Privacy Checker
                  </h1>
                </div>
              </Link>
              
              {/* Enhanced Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                <Link href="/" className="nav-link group relative px-4 py-2 rounded-xl font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200">
                  <span className="relative z-10">Home</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </Link>
                
                <Link href="/resources" className="nav-link group relative px-4 py-2 rounded-xl font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200">
                  <span className="relative z-10 flex items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Resources
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </Link>
                
                <a 
                  href="https://privacy.gov.ph/data-privacy-act" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="nav-link group relative px-4 py-2 rounded-xl font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    RA 10173
                    <svg className="ml-1 w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </a>
                
                {/* CTA Button */}
                <div className="ml-4 pl-4 border-l border-white/20">
                  <Link href="/check" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-blue-600 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Start Check
                  </Link>
                </div>
              </nav>
              
              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        
        <main className="min-h-screen">
          <ChatProvider>
            {children}
          </ChatProvider>
        </main>
        
        <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-20">
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
                  <li><Link href="/resources" className="text-gray-600 hover:text-primary-600 transition-colors">Resource Library</Link></li>
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