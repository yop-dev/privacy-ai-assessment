'use client'

import Link from 'next/link'
import { useChatContext } from '@/components/ChatProvider'
import FadeInSection from '@/components/animations/FadeInSection'
import AnimatedCard from '@/components/animations/AnimatedCard'
import StaggeredList from '@/components/animations/StaggeredList'
import PageTransition from '@/components/animations/PageTransition'
import ScrollReveal from '@/components/animations/ScrollReveal'
import FloatingElements from '@/components/backgrounds/FloatingElements'

export default function HomePage() {
  const { openChat } = useChatContext()
  const videoTimestamp = Date.now()
  
  return (
    <PageTransition>
      <div>
        {/* Hero Section with video background extending to header */}
        <div className="relative overflow-hidden -mt-20 pt-20">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full -top-20">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={`/videos/hero-poster.png?v=${videoTimestamp}`}
              className="absolute inset-0 w-full h-full object-cover"
              key={`hero-video-${videoTimestamp}`} // Force reload on component update
            >
              <source src={`/videos/hero-background.mp4?v=${videoTimestamp}`} type="video/mp4" />
              <source src={`/videos/hero-background.webm?v=${videoTimestamp}`} type="video/webm" />
              {/* Fallback for browsers that don't support video */}
              <img 
                src={`/videos/hero-poster.png?v=${videoTimestamp}`}
                alt="Hero background" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </video>
          </div>
          
          {/* Video overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30 -top-20"></div>
          {/* Smooth bottom transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
          
          {/* Header sectioning line - positioned at the bottom of header area */}
          <div className="absolute top-20 left-0 right-0 h-px bg-white/10 z-20"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <section className="py-20 lg:py-32">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto">
                  <FadeInSection delay={0.1}>
                    <div className="mb-8">
                      <div className="inline-flex items-center bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Trusted Compliance Platform
                      </div>
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                        <span className="text-primary-600">
                          Philippine Data Privacy
                        </span>
                        <br />
                        <span className="text-gray-800">Compliance Checker</span>
                      </h1>
                      <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                        Quickly assess your business's compliance with <strong>RA 10173</strong> - the Philippine Data Privacy Act of 2012. 
                        Get instant insights and actionable recommendations.
                      </p>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={0.2}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                      <Link href="/check" className="btn-primary-large">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Start Compliance Assessment
                      </Link>
                      <button 
                        onClick={openChat}
                        className="btn-secondary"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Ask AI Assistant
                      </button>
                      <Link href="/resources" className="btn-outline">
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          Resource Library
                        </span>
                      </Link>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={0.3}>
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                      <AnimatedCard delay={0.1}>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-3 drop-shadow-lg">Quick Assessment</h3>
                          <p className="text-white/90 leading-relaxed drop-shadow-md">
                            Complete a comprehensive compliance check in under 10 minutes with our guided questionnaire.
                          </p>
                        </div>
                      </AnimatedCard>

                      <AnimatedCard delay={0.2}>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-3 drop-shadow-lg">Detailed Reports</h3>
                          <p className="text-white/90 leading-relaxed drop-shadow-md">
                            Receive actionable insights with specific recommendations tailored to your business needs.
                          </p>
                        </div>
                      </AnimatedCard>

                      <AnimatedCard delay={0.3}>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-3 drop-shadow-lg">Expert Resources</h3>
                          <p className="text-white/90 leading-relaxed drop-shadow-md">
                            Access comprehensive guides, templates, and official documentation for RA 10173 compliance.
                          </p>
                        </div>
                      </AnimatedCard>
                    </div>
                  </FadeInSection>
                </div>
              </div>
            </section>
          </div>
        </div>

{/* AI Assistant Chatbot Section - Seamless transition */}
        <ScrollReveal>
          <section className="relative overflow-hidden -mt-20 pt-20">
            
            {/* AI Assistant Video Background */}
            <div className="absolute inset-0 w-full h-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={`/videos/ai-assistant-poster.png?v=${videoTimestamp}`}
                className="absolute inset-0 w-full h-full object-cover"
                key={`ai-video-${videoTimestamp}`} // Force reload on component update
              >
                <source src={`/videos/ai-assistant-background.mp4?v=${videoTimestamp}`} type="video/mp4" />
                <source src={`/videos/ai-assistant-background.webm?v=${videoTimestamp}`} type="video/webm" />
                {/* Fallback for browsers that don't support video */}
                <img 
                  src={`/videos/ai-assistant-poster.png?v=${videoTimestamp}`}
                  alt="AI Assistant background" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </video>
            </div>
            
            {/* Smooth gradient overlay for seamless transition */}
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent"></div>
            
            {/* Subtle floating elements over video */}
            <div className="relative z-10">
              <FloatingElements count={3} size="md" opacity={0.03} />
            </div>
            
            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <FadeInSection delay={0.1}>
                  <div className="text-center mb-16">
                    <FadeInSection delay={0.2} direction="down">
                      <div className="inline-flex items-center bg-white/20 text-white backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        AI-Powered Assistance
                      </div>
                    </FadeInSection>
                    <FadeInSection delay={0.3}>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
                        Get Instant Help with Our AI Assistant
                      </h2>
                    </FadeInSection>
                    <FadeInSection delay={0.4}>
                      <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                        Have questions about RA 10173 compliance? Our AI assistant is trained on Philippine data privacy law 
                        and can provide instant, accurate answers to help guide your compliance journey.
                      </p>
                    </FadeInSection>
                  </div>
                </FadeInSection>

                <StaggeredList className="grid md:grid-cols-2 gap-8 mb-8" staggerDelay={0.1}>
                  {[
                    <AnimatedCard key="instant-responses" delay={0.25} hoverScale={1.02}>
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md text-left h-full">
                        <FadeInSection delay={0.27} direction="left">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                        </FadeInSection>
                        <FadeInSection delay={0.29} direction="left">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Instant Responses</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Get immediate answers to your data privacy questions, available 24/7 to support your compliance efforts 
                            whenever you need guidance.
                          </p>
                        </FadeInSection>
                      </div>
                    </AnimatedCard>,
                    
                    <AnimatedCard key="expert-knowledge" delay={0.27} hoverScale={1.02}>
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md text-left h-full">
                        <FadeInSection delay={0.29} direction="right">
                          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                        </FadeInSection>
                        <FadeInSection delay={0.31} direction="right">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Expert Knowledge</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Our AI is trained on the complete RA 10173 text, official guidelines, and best practices to provide 
                            accurate, reliable information.
                          </p>
                        </FadeInSection>
                      </div>
                    </AnimatedCard>
                  ]}
                </StaggeredList>
                
                <FadeInSection delay={0.3}>
                  <AnimatedCard delay={0.35} hoverScale={1.02}>
                    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30">
                      <FadeInSection delay={0.4}>
                        <div className="text-center mb-8">
                          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-2xl mb-4 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          <h3 className="text-3xl font-bold text-gray-900 mb-3">Ready to Get Started?</h3>
                          <p className="text-lg text-gray-700 mb-6">Our AI assistant is here to help with your Philippine data privacy compliance questions</p>
                          
                          {/* CTA Button - Moved to top for better visibility */}
                          <button 
                            onClick={openChat}
                            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mb-8"
                          >
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Start Chatting Now
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </button>
                        </div>
                      </FadeInSection>
                      
                      {/* Enhanced Examples Section */}
                      <FadeInSection delay={0.45}>
                        <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Try asking questions like:</h4>
                          </div>
                          
                          <StaggeredList className="grid md:grid-cols-2 gap-3" staggerDelay={0.05}>
                            {[
                              <div key="question-1" className="flex items-start space-x-3 p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-colors duration-200">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-700 text-sm">"What are the key requirements for data breach notification under RA 10173?"</p>
                              </div>,
                              <div key="question-2" className="flex items-start space-x-3 p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-colors duration-200">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-700 text-sm">"Do I need to register as a data controller with the NPC?"</p>
                              </div>,
                              <div key="question-3" className="flex items-start space-x-3 p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-colors duration-200">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-700 text-sm">"What consent requirements apply to my business operations?"</p>
                              </div>,
                              <div key="question-4" className="flex items-start space-x-3 p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-colors duration-200">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-700 text-sm">"How do I implement a Privacy Management Program?"</p>
                              </div>
                            ]}
                          </StaggeredList>
                          
                          <div className="mt-4 p-3 bg-blue-50/80 rounded-xl border border-blue-200/50">
                            <div className="flex items-center text-blue-800">
                              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-sm font-medium">Available 24/7 • Instant responses • Based on official RA 10173 guidelines</p>
                            </div>
                          </div>
                        </div>
                      </FadeInSection>
                    </div>
                  </AnimatedCard>
                </FadeInSection>
              </div>
          </section>
        </ScrollReveal>

        {/* Key Principles Section */}
        <section className="py-20 bg-gray-50 relative border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Key Principles of RA 10173
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Understanding the fundamental principles that guide Philippine data privacy law 
                is essential for achieving and maintaining compliance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <ScrollReveal direction="left" delay={0.2} distance={60}>
                <div className="space-y-8">
                  <StaggeredList>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparency</h3>
                        <p className="text-gray-600">Data subjects must be informed about data collection, processing, and use in clear, understandable terms.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Legitimate Purpose</h3>
                        <p className="text-gray-600">Personal data must be collected and processed for specified, legitimate purposes only.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Proportionality</h3>
                        <p className="text-gray-600">Data collection and processing should be proportionate to the declared purpose.</p>
                      </div>
                    </div>
                  </StaggeredList>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={0.4} distance={80}>
                <div className="space-y-6">
                  <div className="card bg-primary-50 border-primary-200 hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-primary-900 mb-4">RA 10173 Structure Overview</h3>
                    <div className="mb-6">
                      <img 
                        src="/images/data-privacy-act-structure.png" 
                        alt="Philippine Data Privacy Act Structure Diagram"
                        className="w-full h-auto rounded-lg shadow-sm"
                      />
                    </div>
                    <a 
                      href="https://privacy.gov.ph/data-privacy-act" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-md hover:shadow-lg w-full justify-center"
                    >
                      <span>Read the Full Data Privacy Act</span>
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <p className="text-xs text-primary-600 mt-3 text-center">
                      Source: National Privacy Commission of the Philippines
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}