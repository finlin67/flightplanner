'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ChevronLeft, Plane } from 'lucide-react'
import { useFlightPlan } from '@/hooks/useFlightPlan'
import { ASSESSMENT_QUESTIONS } from '@/lib/questions'

export default function AssessmentPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [localResponses, setLocalResponses] = useState<{ [key: string]: number }>({})
  
  const { responses, updateResponse, submitAssessment, getProgress } = useFlightPlan()

  // Initialize from localStorage
  useEffect(() => {
    if (Object.keys(responses).length > 0) {
      setLocalResponses(responses)
      if (currentQuestion === 0) {
        setCurrentQuestion(0)
      }
    }
  }, [])

  const question = ASSESSMENT_QUESTIONS[currentQuestion]
  const isAnswered = localResponses[question.id] !== undefined
  const progress = Math.round(((currentQuestion + (isAnswered ? 1 : 0)) / ASSESSMENT_QUESTIONS.length) * 100)

  const handleAnswer = (value: number) => {
    const updated = { ...localResponses, [question.id]: value }
    setLocalResponses(updated)
    updateResponse(question.id, value)

    // Auto-advance to next question
    if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    }
  }

  const handleNext = () => {
    if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // All questions answered, submit
      submitAssessment()
      router.push('/planner')
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const isLastQuestion = currentQuestion === ASSESSMENT_QUESTIONS.length - 1
  const allAnswered = Object.keys(localResponses).length === ASSESSMENT_QUESTIONS.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-panel to-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/30 backdrop-blur-sm bg-panel/80">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Plane className="w-5 h-5 text-blue-400" />
            <span className="text-white font-semibold hidden sm:inline">Marketing Flight Planner</span>
          </Link>
          <div className="text-slate-400 text-sm">
            Question {currentQuestion + 1} of {ASSESSMENT_QUESTIONS.length}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Progress</span>
            <span className="text-sm font-medium text-white">{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-3xl mx-auto">
          <div className="panel mb-8">
            {/* Category Badge */}
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
              <span className="text-blue-300 text-xs font-medium uppercase">{question.category}</span>
            </div>

            {/* Question */}
            <h2 className="text-3xl font-bold text-white mb-3">{question.question}</h2>
            <p className="text-slate-400 mb-8">{question.description}</p>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    localResponses[question.id] === option.value
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-border/30 bg-card hover:border-border/60 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                        localResponses[question.id] === option.value
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-slate-500'
                      }`}
                    >
                      {localResponses[question.id] === option.value && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-white">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="text-slate-400 text-sm">
              {Object.keys(localResponses).length}/{ASSESSMENT_QUESTIONS.length} answered
            </div>

            <button
              onClick={handleNext}
              disabled={!isAnswered && !isLastQuestion}
              className="flex items-center gap-2 px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors"
            >
              {isLastQuestion && allAnswered ? (
                <>
                  View Results
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
