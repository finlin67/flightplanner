/**
 * Marketing Flight Planner - Scoring Engine
 * Handles all calculation logic for maturity scores, trajectories, and recommendations
 */

export interface AssessmentResponse {
  [questionId: string]: number
}

export interface CategoryScore {
  name: string
  score: number
  level: MaturityLevel
  percentage: number
}

export interface AssessmentResult {
  overallScore: number
  normalizedScore: number
  maturityLevel: MaturityLevel
  categories: CategoryScore[]
  timestamp: string
  responses: AssessmentResponse
}

export interface TrajectoryProjection {
  months_6: number
  months_12: number
  months_24: number
  annualVelocity: number
  maturityLevels: {
    current: MaturityLevel
    months_6: MaturityLevel
    months_12: MaturityLevel
    months_24: MaturityLevel
  }
}

export interface GapAnalysis {
  vsIndustryBenchmark: number
  vsMarketLeaders: number
  benchmarkTarget: number
  marketLeaderTarget: number
  monthsToCloseBenchmark: number
  monthsToCloseMarketLeaders: number
}

export interface QuickWin {
  id: string
  title: string
  description: string
  category: string
  effort: 'Low' | 'Medium' | 'High'
  impact: 'Quick' | 'Medium' | 'Significant'
  timeframe: string
  scoreImprovement: number
  priority: number
}

export type MaturityLevel = 'Foundational' | 'Developing' | 'Established' | 'Advanced' | 'Market-Leading'

// Question to Category Mapping
const QUESTION_CATEGORIES = {
  Q1: 'Demand Generation',
  Q2: 'Technology Stack',
  Q3: 'Customer Understanding',
  Q4: 'Customer Understanding',
  Q5: 'Technology Stack',
  Q6: 'Content & Brand',
  Q7: 'Content & Brand',
  Q8: 'Team Capability',
  Q9: 'Demand Generation',
  Q10: 'Strategic Focus',
}

const CATEGORY_QUESTIONS = {
  'Demand Generation': ['Q1', 'Q9'],
  'Technology Stack': ['Q2', 'Q5'],
  'Customer Understanding': ['Q3', 'Q4'],
  'Content & Brand': ['Q6', 'Q7'],
  'Team Capability': ['Q8'],
  'Strategic Focus': ['Q10'],
}

export class ScoringEngine {
  /**
   * Calculate individual question scores (0-100 scale)
   */
  static calculateQuestionScore(responses: AssessmentResponse, questionId: string): number {
    const value = responses[questionId] || 0
    // Normalize from 0-100 to 0-100 (already normalized in our questions)
    return Math.min(100, Math.max(0, value))
  }

  /**
   * Calculate category scores (average of questions in that category)
   */
  static calculateCategoryScores(responses: AssessmentResponse): CategoryScore[] {
    const categories: CategoryScore[] = []

    Object.entries(CATEGORY_QUESTIONS).forEach(([categoryName, questionIds]) => {
      const scores = questionIds.map((qId) => {
        const key = qId.toLowerCase()
        return responses[key] || 0
      })

      const average = scores.reduce((a, b) => a + b, 0) / scores.length
      const level = this.getMaturityLevel(average)

      categories.push({
        name: categoryName,
        score: Math.round(average),
        level,
        percentage: Math.round(average),
      })
    })

    return categories
  }

  /**
   * Calculate overall score (average of all question scores)
   */
  static calculateOverallScore(responses: AssessmentResponse): number {
    const allScores = Object.values(responses)
    if (allScores.length === 0) return 0

    const average = allScores.reduce((a, b) => a + b, 0) / allScores.length
    return Math.round(average)
  }

  /**
   * Determine maturity level based on score
   */
  static getMaturityLevel(score: number): MaturityLevel {
    if (score < 20) return 'Foundational'
    if (score < 40) return 'Developing'
    if (score < 60) return 'Established'
    if (score < 80) return 'Advanced'
    return 'Market-Leading'
  }

  /**
   * Project maturity over time (6, 12, 24 months)
   * Default annual velocity: 8.5 points per year
   */
  static calculateTrajectory(
    currentScore: number,
    annualVelocity: number = 8.5,
  ): TrajectoryProjection {
    const sixMonthScore = Math.min(100, currentScore + annualVelocity * 0.5)
    const twelveMonthScore = Math.min(100, currentScore + annualVelocity)
    const twentyFourMonthScore = Math.min(100, currentScore + annualVelocity * 2)

    return {
      months_6: Math.round(sixMonthScore),
      months_12: Math.round(twelveMonthScore),
      months_24: Math.round(twentyFourMonthScore),
      annualVelocity,
      maturityLevels: {
        current: this.getMaturityLevel(currentScore),
        months_6: this.getMaturityLevel(sixMonthScore),
        months_12: this.getMaturityLevel(twelveMonthScore),
        months_24: this.getMaturityLevel(twentyFourMonthScore),
      },
    }
  }

  /**
   * Calculate gap analysis vs benchmarks
   * SaaS benchmark: 70
   * Market leaders: 80-85
   */
  static calculateGapAnalysis(currentScore: number, industryBenchmark: number = 70, marketLeaders: number = 82): GapAnalysis {
    const benchmarkGap = industryBenchmark - currentScore
    const leaderGap = marketLeaders - currentScore
    const annualVelocity = 8.5

    return {
      vsIndustryBenchmark: benchmarkGap > 0 ? benchmarkGap : 0,
      vsMarketLeaders: leaderGap > 0 ? leaderGap : 0,
      benchmarkTarget: industryBenchmark,
      marketLeaderTarget: marketLeaders,
      monthsToCloseBenchmark: benchmarkGap > 0 ? Math.ceil((benchmarkGap / annualVelocity) * 12) : 0,
      monthsToCloseMarketLeaders: leaderGap > 0 ? Math.ceil((leaderGap / annualVelocity) * 12) : 0,
    }
  }

  /**
   * Generate quick wins (high-impact, low-effort initiatives)
   */
  static generateQuickWins(categories: CategoryScore[]): QuickWin[] {
    const lowestCategories = categories.sort((a, b) => a.score - b.score).slice(0, 3)

    const quickWinsMap: { [key: string]: QuickWin } = {
      'Demand Generation': {
        id: 'dg-1',
        title: 'Implement Lead Scoring Model',
        description: 'Set up basic lead scoring to prioritize high-value prospects',
        category: 'Demand Generation',
        effort: 'Low',
        impact: 'Quick',
        timeframe: '3 weeks',
        scoreImprovement: 8,
        priority: 1,
      },
      'Technology Stack': {
        id: 'ts-1',
        title: 'Integrate CRM with Email Platform',
        description: 'Connect your CRM and email marketing to eliminate manual data entry',
        category: 'Technology Stack',
        effort: 'Low',
        impact: 'Quick',
        timeframe: '2 weeks',
        scoreImprovement: 7,
        priority: 1,
      },
      'Customer Understanding': {
        id: 'cu-1',
        title: 'Establish Customer Feedback Loop',
        description: 'Create monthly feedback sessions with top customers',
        category: 'Customer Understanding',
        effort: 'Low',
        impact: 'Quick',
        timeframe: '1 week',
        scoreImprovement: 6,
        priority: 1,
      },
      'Content & Brand': {
        id: 'cb-1',
        title: 'Create Content Calendar Template',
        description: 'Document quarterly content themes aligned with buyer journey',
        category: 'Content & Brand',
        effort: 'Low',
        impact: 'Quick',
        timeframe: '2 weeks',
        scoreImprovement: 5,
        priority: 1,
      },
      'Team Capability': {
        id: 'tc-1',
        title: 'Define Role Competencies',
        description: 'Create skills matrix for marketing team roles',
        category: 'Team Capability',
        effort: 'Medium',
        impact: 'Quick',
        timeframe: '3 weeks',
        scoreImprovement: 4,
        priority: 1,
      },
      'Strategic Focus': {
        id: 'sf-1',
        title: 'Document Marketing Strategy',
        description: 'Create 1-page strategic brief with goals, targets, metrics',
        category: 'Strategic Focus',
        effort: 'Medium',
        impact: 'Quick',
        timeframe: '1 week',
        scoreImprovement: 6,
        priority: 1,
      },
    }

    const wins: QuickWin[] = []
    lowestCategories.forEach((category) => {
      if (quickWinsMap[category.name]) {
        wins.push(quickWinsMap[category.name])
      }
    })

    return wins
  }

  /**
   * Calculate roadmap phases (Takeoff, Climb, Cruise)
   */
  static calculateRoadmap(currentScore: number) {
    return {
      takeoff: {
        phase: 'Takeoff Phase',
        duration: 'Months 1-3',
        focus: 'Foundation building',
        initiatives: [
          'Establish clear marketing strategy and goals',
          'Map current technology stack and gaps',
          'Create marketing playbooks and processes',
          'Define success metrics and reporting',
        ],
      },
      climb: {
        phase: 'Climb Phase',
        duration: 'Months 4-12',
        focus: 'Acceleration',
        initiatives: [
          'Implement technology integrations',
          'Launch demand generation campaigns',
          'Build content engine',
          'Align sales and marketing teams',
        ],
      },
      cruise: {
        phase: 'Cruise Phase',
        duration: 'Months 13-24',
        focus: 'Optimization & Excellence',
        initiatives: [
          'Optimize marketing operations',
          'Implement predictive analytics',
          'Scale proven campaigns',
          'Build market-leading capabilities',
        ],
      },
    }
  }

  /**
   * Generate complete assessment result
   */
  static generateAssessment(responses: AssessmentResponse): AssessmentResult {
    const overallScore = this.calculateOverallScore(responses)
    const categories = this.calculateCategoryScores(responses)

    return {
      overallScore,
      normalizedScore: overallScore, // Already 0-100
      maturityLevel: this.getMaturityLevel(overallScore),
      categories,
      timestamp: new Date().toISOString(),
      responses,
    }
  }
}

// Export helper functions
export const calculateScore = (responses: AssessmentResponse) =>
  ScoringEngine.generateAssessment(responses)

export const getTrajectory = (score: number, velocity?: number) =>
  ScoringEngine.calculateTrajectory(score, velocity)

export const getGapAnalysis = (score: number) =>
  ScoringEngine.calculateGapAnalysis(score)

export const getQuickWins = (result: AssessmentResult) =>
  ScoringEngine.generateQuickWins(result.categories)

export const getRoadmap = (score: number) =>
  ScoringEngine.calculateRoadmap(score)
