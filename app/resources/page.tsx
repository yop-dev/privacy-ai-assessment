'use client'

import { useState, useContext } from 'react'
import Link from 'next/link'
import { useChatContext } from '@/components/ChatProvider'

interface Resource {
  id: string
  title: string
  description: string
  category: 'template' | 'guide' | 'checklist' | 'policy' | 'form'
  downloadUrl?: string
  externalUrl?: string
  fileType?: 'PDF' | 'DOCX' | 'XLSX' | 'Link'
  isNew?: boolean
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

const resources: Resource[] = [
  // Templates
  {
    id: 'privacy-policy-template',
    title: 'Privacy Policy Template',
    description: 'Comprehensive privacy policy template compliant with RA 10173 requirements, including data collection, processing, and subject rights.',
    category: 'template',
    downloadUrl: '/resources/templates/sample-privacy-policy-template.docx',
    fileType: 'DOCX',
    difficulty: 'Intermediate',
    isNew: true
  },
  {
    id: 'consent-form-template',
    title: 'Data Subject Consent Form (NPC Official)',
    description: 'Official NPC Annex B consent form template ensuring valid, specific, and informed consent under RA 10173.',
    category: 'template',
    downloadUrl: '/resources/templates/Annex-B-Data-Privacy-Consent-Form-Updated.docx',
    fileType: 'DOCX',
    difficulty: 'Beginner'
  },
  {
    id: 'universal-consent-form',
    title: 'Universal Data Privacy Consent Form',
    description: 'Downloadable universal consent form template for general data processing activities.',
    category: 'template',
    downloadUrl: '/resources/templates/Downloadable-Universal-Data-Privacy-Consent-Form-rev0.pdf',
    fileType: 'PDF',
    difficulty: 'Beginner',
    isNew: true
  },
  {
    id: 'dpo-appointment-letter',
    title: 'DPO Appointment Letter Template',
    description: 'Official template for appointing a Data Protection Officer with clear roles and responsibilities.',
    category: 'template',
    downloadUrl: '/resources/templates/dpo-appointment-letter.pdf',
    fileType: 'PDF',
    difficulty: 'Beginner'
  },
  {
    id: 'breach-notification-template',
    title: 'Data Breach Notification Template',
    description: 'Official template for reporting data breaches to the National Privacy Commission within required timeframes.',
    category: 'form',
    downloadUrl: '/resources/forms/Data Breach Notification Template.pdf',
    fileType: 'PDF',
    difficulty: 'Advanced'
  },

  // Checklists
  {
    id: 'compliance-checklist',
    title: 'RA 10173 Compliance Checklist',
    description: 'Complete checklist covering all major compliance requirements with actionable items and deadlines.',
    category: 'checklist',
    downloadUrl: '/resources/checklists/ra10173-compliance-checklist.pdf',
    fileType: 'PDF',
    difficulty: 'Intermediate'
  },
  {
    id: 'pia-checklist',
    title: 'Privacy Impact Assessment Checklist',
    description: 'Step-by-step checklist for conducting thorough Privacy Impact Assessments.',
    category: 'checklist',
    downloadUrl: '/resources/checklists/pia-checklist.pdf',
    fileType: 'PDF',
    difficulty: 'Advanced'
  },
  {
    id: 'security-measures-checklist',
    title: 'Data Security Measures Checklist',
    description: 'Technical and organizational security measures required under RA 10173.',
    category: 'checklist',
    downloadUrl: '/resources/checklists/security-measures-checklist.pdf',
    fileType: 'PDF',
    difficulty: 'Intermediate'
  },

  // Guides
  {
    id: 'data-privacy-manual',
    title: 'Complete Data Privacy Manual',
    description: 'Comprehensive data privacy manual covering all aspects of RA 10173 compliance, implementation, and best practices.',
    category: 'guide',
    downloadUrl: '/resources/guides/DATA-PRIVACY-MANUAL_FINAL5.pdf',
    fileType: 'PDF',
    difficulty: 'Intermediate',
    isNew: true
  },
  {
    id: 'getting-started-guide',
    title: 'Getting Started with RA 10173 Compliance',
    description: 'Comprehensive beginner\'s guide to understanding and implementing Philippine data privacy requirements.',
    category: 'guide',
    downloadUrl: '/resources/guides/getting-started-ra10173.pdf',
    fileType: 'PDF',
    difficulty: 'Beginner'
  },
  {
    id: 'consent-management-guide',
    title: 'Consent Management Best Practices',
    description: 'Detailed guide on obtaining, managing, and documenting valid consent under RA 10173.',
    category: 'guide',
    downloadUrl: '/resources/guides/consent-management-guide.pdf',
    fileType: 'PDF',
    difficulty: 'Intermediate'
  },
  {
    id: 'data-subject-rights-guide',
    title: 'Handling Data Subject Rights Requests',
    description: 'Step-by-step guide for processing access, rectification, erasure, and portability requests.',
    category: 'guide',
    downloadUrl: '/resources/guides/data-subject-rights-guide.pdf',
    fileType: 'PDF',
    difficulty: 'Intermediate'
  },

  // Policies
  {
    id: 'employee-privacy-policy',
    title: 'Employee Privacy Policy Template',
    description: 'Specialized privacy policy template for employee personal data processing.',
    category: 'policy',
    downloadUrl: '/resources/policies/employee-privacy-policy.pdf',
    fileType: 'PDF',
    difficulty: 'Intermediate'
  },
  {
    id: 'data-retention-policy',
    title: 'Data Retention Policy Template',
    description: 'Template for establishing clear data retention schedules and deletion procedures.',
    category: 'policy',
    downloadUrl: '/resources/policies/data-retention-policy.pdf',
    fileType: 'PDF',
    difficulty: 'Advanced'
  },

  // External Resources
  {
    id: 'npc-official-guidelines',
    title: 'NPC Official Guidelines',
    description: 'Direct link to the National Privacy Commission\'s official RA 10173 implementation guidelines.',
    category: 'guide',
    externalUrl: 'https://privacy.gov.ph/data-privacy-act',
    fileType: 'Link',
    difficulty: 'Beginner'
  },
  {
    id: 'npc-advisory-opinions',
    title: 'NPC Advisory Opinions',
    description: 'Collection of official advisory opinions and interpretations from the National Privacy Commission.',
    category: 'guide',
    externalUrl: 'https://privacy.gov.ph/advisories',
    fileType: 'Link',
    difficulty: 'Advanced'
  }
]

const categories = [
  { id: 'all', name: 'All Resources', icon: '📚' },
  { id: 'template', name: 'Templates', icon: '📄' },
  { id: 'guide', name: 'Guides', icon: '📖' },
  { id: 'checklist', name: 'Checklists', icon: '✅' },
  { id: 'policy', name: 'Policies', icon: '📋' },
  { id: 'form', name: 'Forms', icon: '📝' }
]

const difficulties = [
  { id: 'all', name: 'All Levels' },
  { id: 'Beginner', name: 'Beginner' },
  { id: 'Intermediate', name: 'Intermediate' },
  { id: 'Advanced', name: 'Advanced' }
]

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { openChat } = useChatContext()

  // Filter resources based on selected category, difficulty, and search query
  const filteredResources = resources.filter((resource) => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory
    const difficultyMatch = selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty
    
    // Search in title, description, and category
    const searchMatch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    return categoryMatch && difficultyMatch && searchMatch
  })

  const featuredResources = filteredResources.filter((r) => r.isNew)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              RA 10173 Resource Library
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Comprehensive collection of templates, guides, and tools to help you achieve and maintain 
              compliance with the Philippine Data Privacy Act of 2012.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search Bar */}
          <div className="mb-12">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-12 py-4 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                  placeholder="Search templates, guides, checklists..."
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className="mt-2 text-sm text-gray-600 text-center">
                  {filteredResources.length} result{filteredResources.length !== 1 ? 's' : ''} for "{searchQuery}"
                </div>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 text-center group ${
                    selectedCategory === category.id
                      ? 'bg-primary-50 border-primary-300 shadow-md'
                      : 'bg-white border-gray-200 hover:border-primary-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className={`text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'text-primary-700'
                      : 'text-gray-900 group-hover:text-primary-600'
                  }`}>
                    {category.name}
                  </div>
                  {selectedCategory === category.id && (
                    <div className="mt-2">
                      <div className="w-6 h-0.5 bg-primary-600 mx-auto rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">Filter by Difficulty</h2>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty.id}
                    onClick={() => setSelectedDifficulty(difficulty.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedDifficulty === difficulty.id
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {difficulty.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Resources */}
          {featuredResources.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Featured Resources</h2>
                <span className="text-sm text-gray-500">Recently added and most popular</span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredResources.map((resource) => (
                  <div key={resource.id} className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {resource.category === 'template' && '📄'}
                          {resource.category === 'guide' && '📖'}
                          {resource.category === 'checklist' && '✅'}
                          {resource.category === 'policy' && '📋'}
                          {resource.category === 'form' && '📝'}
                        </span>
                        {resource.isNew && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {resource.fileType}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {resource.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {resource.difficulty}
                      </span>
                      
                      {resource.downloadUrl ? (
                        <a
                          href={resource.downloadUrl}
                          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                          download
                        >
                          Download
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-4-4V4" />
                          </svg>
                        </a>
                      ) : (
                        <a
                          href={resource.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                          View
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Resources */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Resources' : `${categories.find(c => c.id === selectedCategory)?.name} Resources`}
              </h2>
              <div className="text-sm text-gray-500">
                {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} available
                {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      setSelectedDifficulty('all')
                      setSearchQuery('')
                    }}
                    className="ml-2 text-primary-600 hover:text-primary-700 underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
            
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery 
                    ? `No resources match "${searchQuery}". Try a different search term or clear your filters.`
                    : 'No resources match your current filters. Try adjusting your selection or clearing filters.'
                  }
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedDifficulty('all')
                    setSearchQuery('')
                  }}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredResources.map((resource) => (
                  <div key={resource.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-lg">
                            {resource.category === 'template' && '📄'}
                            {resource.category === 'guide' && '📖'}
                            {resource.category === 'checklist' && '✅'}
                            {resource.category === 'policy' && '📋'}
                            {resource.category === 'form' && '📝'}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {resource.title}
                          </h3>
                          {resource.isNew && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                          {resource.description}
                        </p>
                        
                        <div className="flex items-center space-x-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {resource.difficulty}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {resource.fileType}
                          </span>
                          <span className="text-xs text-gray-500 capitalize">
                            {resource.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="ml-6">
                        {resource.downloadUrl ? (
                          <a
                            href={resource.downloadUrl}
                            className="btn-primary"
                            download
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-4-4V4" />
                            </svg>
                            Download
                          </a>
                        ) : (
                          <a
                            href={resource.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="mt-16 bg-blue-50 rounded-2xl p-8 border border-blue-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help Getting Started?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Not sure which resources you need? Our AI assistant can help you identify the right templates 
                and guides based on your specific compliance requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/check" className="btn-primary">
                  Take Assessment First
                </Link>
                <button 
                  onClick={openChat}
                  className="btn-secondary"
                >
                  Ask AI Assistant
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}