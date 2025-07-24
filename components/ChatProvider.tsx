'use client'

import { useState, createContext, useContext, ReactNode } from 'react'
import ChatBot from './ChatBot'
import ChatButton from './ChatButton'

interface ChatContextType {
  isOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function useChatContext() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider')
  }
  return context
}

interface ChatProviderProps {
  children: ReactNode
}

export default function ChatProvider({ children }: ChatProviderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openChat = () => setIsOpen(true)
  const closeChat = () => setIsOpen(false)
  const toggleChat = () => setIsOpen(prev => !prev)

  const contextValue: ChatContextType = {
    isOpen,
    openChat,
    closeChat,
    toggleChat,
  }

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
      
      {/* Chat Button - Always visible */}
      <ChatButton onClick={toggleChat} />
      
      {/* Chat Modal */}
      <ChatBot isOpen={isOpen} onClose={closeChat} />
    </ChatContext.Provider>
  )
}