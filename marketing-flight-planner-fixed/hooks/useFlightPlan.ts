import { useState, useEffect } from 'react'
import { AssessmentResponse, AssessmentResult, TrajectoryProjection, GapAnalysis, QuickWin } from '@/lib/scoring'
import { ScoringEngine } from '@/lib/scoring'

interface FlightPlan {
  assessment: AssessmentResult
  trajectory: TrajectoryProjection
  gapAnalysis: GapAnalysis
  quickWins: QuickWin[]
  roadmap: any
}

export function useFlightPlan() {
  const [responses, setResponses] = useState<AssessmentResponse>({})
  const [flightPlan, setFlightPlan] = useState<FlightPlan | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('assessmentResponses')
      const savedPlan = localStorage.getItem('flightPlan')

      if (saved) {
        const parsedResponses = JSON.parse(saved)
        setResponses(parsedResponses)

        // Auto-calculate flight plan if we have responses
        if (Object.keys(parsedResponses).length === 10) {
          calculateFlightPlan(parsedResponses)
        }
      }

      if (savedPlan) {
        setFlightPlan(JSON.parse(savedPlan))
        setIsComplete(true)
      }
    }
  }, [])

  // Update a single response
  const updateResponse = (questionId: string, value: number) => {
    const updated = { ...responses, [questionId]: value }
    setResponses(updated)

    // Auto-save to localStorage
    localStorage.setItem('assessmentResponses', JSON.stringify(updated))
  }

  // Calculate the complete flight plan
  const calculateFlightPlan = (respondses: AssessmentResponse) => {
    try {
      const assessment = ScoringEngine.generateAssessment(respondses)
      const trajectory = ScoringEngine.calculateTrajectory(assessment.overallScore)
      const gapAnalysis = ScoringEngine.calculateGapAnalysis(assessment.overallScore)
      const quickWins = ScoringEngine.generateQuickWins(assessment.categories)
      const roadmap = ScoringEngine.calculateRoadmap(assessment.overallScore)

      const plan: FlightPlan = {
        assessment,
        trajectory,
        gapAnalysis,
        quickWins,
        roadmap,
      }

      setFlightPlan(plan)
      setIsComplete(true)

      // Save to localStorage
      localStorage.setItem('flightPlan', JSON.stringify(plan))
      localStorage.setItem('assessmentResponses', JSON.stringify(respondses))

      return plan
    } catch (error) {
      console.error('Error calculating flight plan:', error)
      return null
    }
  }

  // Submit assessment (triggered when user completes all 10 questions)
  const submitAssessment = () => {
    if (Object.keys(responses).length === 10) {
      calculateFlightPlan(responses)
    }
  }

  // Export to JSON
  const exportToJSON = () => {
    if (!flightPlan) return

    const data = {
      assessment: flightPlan.assessment,
      trajectory: flightPlan.trajectory,
      gapAnalysis: flightPlan.gapAnalysis,
      quickWins: flightPlan.quickWins,
      roadmap: flightPlan.roadmap,
      exportedAt: new Date().toISOString(),
    }

    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `flight-plan-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Export to CSV
  const exportToCSV = () => {
    if (!flightPlan) return

    const assessment = flightPlan.assessment
    const rows = [
      ['Marketing Flight Plan Assessment'],
      ['Exported:', new Date().toLocaleDateString()],
      [],
      ['Overall Score', assessment.overallScore],
      ['Maturity Level', assessment.maturityLevel],
      [],
      ['Category Scores'],
      ['Category', 'Score', 'Level', 'Percentage'],
      ...assessment.categories.map((c) => [c.name, c.score, c.level, c.percentage + '%']),
      [],
      ['Trajectory Projections'],
      ['6 Months', flightPlan.trajectory.months_6],
      ['12 Months', flightPlan.trajectory.months_12],
      ['24 Months', flightPlan.trajectory.months_24],
      [],
      ['Gap Analysis'],
      ['vs Industry Benchmark', flightPlan.gapAnalysis.vsIndustryBenchmark],
      ['vs Market Leaders', flightPlan.gapAnalysis.vsMarketLeaders],
      [],
      ['Quick Wins'],
      ['Title', 'Category', 'Effort', 'Timeframe', 'Score Improvement'],
      ...flightPlan.quickWins.map((w) => [w.title, w.category, w.effort, w.timeframe, w.scoreImprovement]),
    ]

    const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `flight-plan-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Reset assessment
  const reset = () => {
    setResponses({})
    setFlightPlan(null)
    setIsComplete(false)
    localStorage.removeItem('assessmentResponses')
    localStorage.removeItem('flightPlan')
  }

  // Get progress percentage
  const getProgress = () => {
    return Math.round((Object.keys(responses).length / 10) * 100)
  }

  return {
    responses,
    flightPlan,
    isComplete,
    updateResponse,
    submitAssessment,
    exportToJSON,
    exportToCSV,
    reset,
    getProgress,
    calculateFlightPlan,
  }
}
