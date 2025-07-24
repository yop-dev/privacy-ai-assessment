'use client'

import { useState, useRef, useEffect } from 'react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface ChatBotProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your Philippine Data Privacy Act legal assistant. I can help you understand RA 10173 requirements, data subject rights, compliance obligations, and more. How can I assist you today?',
      timestamp: new Date().toISOString(),
    }
  ])
  const [showExamples, setShowExamples] = useState(true)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatSize, setChatSize] = useState({ width: 448, height: 600 }) // Default: max-w-md (448px) and h-[600px]
  const [isResizing, setIsResizing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  const exampleQuestions = [
    "What are the key requirements for obtaining valid consent under RA 10173?",
    "How do I implement a Privacy Impact Assessment for my business?",
    "What should be included in a Privacy Management Program?",
    "What are the penalties for data privacy violations in the Philippines?",
    "How should I handle data breach notifications to the NPC?",
    "What security measures are required for personal data protection?"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle resize functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true)
    e.preventDefault()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !chatRef.current) return

      const rect = chatRef.current.getBoundingClientRect()
      // For top-left resize handle: calculate new dimensions
      const newWidth = Math.max(320, Math.min(800, rect.right - e.clientX))
      const newHeight = Math.max(400, Math.min(window.innerHeight - 100, rect.bottom - e.clientY))

      setChatSize({ width: newWidth, height: newHeight })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  const sendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || inputMessage.trim()
    if (!messageToSend || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend,
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setShowExamples(false) // Hide examples after first message

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          history: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: data.timestamp,
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment. For urgent legal questions, consider consulting with a qualified data privacy lawyer.',
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Chat Modal */}
      <div 
        ref={chatRef}
        className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col resize-handle"
        style={{ 
          width: `${chatSize.width}px`, 
          height: `${chatSize.height}px`,
          minWidth: '320px',
          maxWidth: '800px',
          minHeight: '400px',
          maxHeight: '80vh'
        }}
      >
        {/* Resize Handle - Top Left */}
        <div 
          className="absolute -top-1 -left-1 w-5 h-5 cursor-nw-resize opacity-30 hover:opacity-80 transition-opacity z-20"
          onMouseDown={handleMouseDown}
          title="Drag to resize"
        >
          <div className="w-full h-full bg-primary-600 rounded-br-md shadow-sm flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13,21V19H21V17H13V15H21V13H13V11H21V9H13V7H21V5H13V3H11V13H1V15H11V17H1V19H11V21H13Z"/>
            </svg>
          </div>
        </div>

        {/* Header */}
        <div 
          className="flex items-center justify-between border-b border-gray-200 bg-primary-50 rounded-t-2xl relative"
          style={{ 
            padding: chatSize.width < 400 ? '1rem' : '1.5rem',
            minHeight: 'auto'
          }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-primary-900">RA 10173 Assistant</h3>
              <p className="text-sm text-primary-700">Legal guidance chatbot</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setChatSize({ width: 448, height: 600 })}
              className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
              title="Reset Size"
            >
              <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: 0 }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
                style={{ 
                  maxWidth: chatSize.width < 400 ? '90%' : '85%',
                  fontSize: chatSize.width < 400 ? '0.875rem' : '0.875rem'
                }}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                <p className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-primary-200' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {/* Example Questions */}
          {showExamples && (
            <div className="flex justify-start">
              <div 
                className="bg-blue-50 rounded-2xl px-4 py-3 border border-blue-200"
                style={{ 
                  maxWidth: chatSize.width < 400 ? '95%' : '90%',
                  fontSize: chatSize.width < 400 ? '0.8rem' : '0.875rem'
                }}
              >
                <p className="text-sm font-medium text-blue-900 mb-3">
                  💡 Try asking one of these questions:
                </p>
                <div className="space-y-2">
                  {exampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(question)}
                      disabled={isLoading}
                      className="block w-full text-left text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-lg px-3 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      "{question}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200" style={{ minHeight: 'auto' }}>
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={chatSize.width < 400 ? "Ask about RA 10173..." : "Ask about RA 10173, data privacy rights, compliance requirements..."}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                rows={chatSize.height < 500 ? 1 : 2}
                disabled={isLoading}
                style={{ 
                  fontSize: chatSize.width < 400 ? '0.8rem' : '0.875rem',
                  minHeight: '40px'
                }}
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="p-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            This is general guidance only. Consult legal professionals for specific advice.
          </p>
        </div>
      </div>
    </div>
  )
}