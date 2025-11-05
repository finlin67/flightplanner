'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useFlightPlan } from '@/hooks/useFlightPlan'
import { Plane, TrendingUp, Target, Zap, Download, RefreshCw, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function PlannerPage() {
  const router = useRouter()
  const { flightPlan, exportToJSON, exportToCSV, reset } = useFlightPlan()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!flightPlan && mounted) {
      router.push('/assess')
    }
  }, [flightPlan, mounted, router])

  if (!flightPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-panel to-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Loading your flight plan...</p>
        </div>
      </div>
    )
  }

  const { assessment, trajectory, gapAnalysis, quickWins, roadmap } = flightPlan

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-panel to-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/30 backdrop-blur-sm bg-panel/80">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Plane className="w-5 h-5 text-blue-400" />
            <span className="text-white font-semibold hidden sm:inline">Flight Planner</span>
          </Link>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">New Assessment</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">Your Marketing Flight Plan</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Here's your complete assessment, trajectory, and personalized roadmap to reach your marketing destination.
          </p>
        </div>

        {/* Overall Score Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Current Score */}
          <div className="panel text-center">
            <p className="text-slate-400 mb-2">Current Marketing Maturity</p>
            <div className="text-5xl font-bold text-blue-400 mb-2">{assessment.overallScore}</div>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
              <span className="text-blue-300 text-sm font-medium">{assessment.maturityLevel}</span>
            </div>
          </div>

          {/* 12-Month Projection */}
          <div className="panel text-center">
            <p className="text-slate-400 mb-2">12-Month Projection</p>
            <div className="text-5xl font-bold text-cyan-400 mb-2">{trajectory.months_12}</div>
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30">
              <span className="text-cyan-300 text-sm font-medium">{trajectory.maturityLevels.months_12}</span>
            </div>
          </div>

          {/* 24-Month Projection */}
          <div className="panel text-center">
            <p className="text-slate-400 mb-2">24-Month Projection</p>
            <div className="text-5xl font-bold text-green-400 mb-2">{trajectory.months_24}</div>
            <div className="inline-block px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
              <span className="text-green-300 text-sm font-medium">{trajectory.maturityLevels.months_24}</span>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="panel">
          <h2 className="text-2xl font-bold text-white mb-6">Category Maturity Scores</h2>
          <div className="space-y-4">
            {assessment.categories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{category.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-400">{category.score}</span>
                    <span className="text-slate-400 text-sm">{category.level}</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gap Analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="panel">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Gap vs Industry Benchmark</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Current Score</span>
                <span className="text-white font-bold">{assessment.overallScore}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Industry Target</span>
                <span className="text-white font-bold">{gapAnalysis.benchmarkTarget}</span>
              </div>
              <div className="divider"></div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Gap</span>
                <span className="text-yellow-400 font-bold text-lg">{gapAnalysis.vsIndustryBenchmark} points</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Months to Close</span>
                <span className="text-white font-bold">{gapAnalysis.monthsToCloseBenchmark} months</span>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold text-white">Gap vs Market Leaders</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Current Score</span>
                <span className="text-white font-bold">{assessment.overallScore}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Leader Target</span>
                <span className="text-white font-bold">{gapAnalysis.marketLeaderTarget}</span>
              </div>
              <div className="divider"></div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Gap</span>
                <span className="text-green-400 font-bold text-lg">{gapAnalysis.vsMarketLeaders} points</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Months to Close</span>
                <span className="text-white font-bold">{gapAnalysis.monthsToCloseMarketLeaders} months</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Wins */}
        <div className="panel">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">High-Impact Quick Wins</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {quickWins.map((win) => (
              <div key={win.id} className="card border-l-4 border-l-yellow-500">
                <h4 className="text-white font-semibold mb-2">{win.title}</h4>
                <p className="text-sm text-slate-400 mb-4">{win.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-300">{win.effort}</span>
                    <span className="px-2 py-1 rounded bg-green-500/20 text-green-300">{win.timeframe}</span>
                  </div>
                  <span className="text-blue-300 font-medium">+{win.scoreImprovement}pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div className="panel">
          <h2 className="text-2xl font-bold text-white mb-6">24-Month Flight Plan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Takeoff */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center">
                  <span className="text-blue-300 text-sm font-bold">1</span>
                </div>
                <h3 className="text-white font-bold">Takeoff Phase</h3>
              </div>
              <p className="text-slate-400 text-sm">{roadmap.takeoff.duration}</p>
              <p className="text-slate-400 text-sm font-semibold mb-3">{roadmap.takeoff.focus}</p>
              <ul className="space-y-2">
                {roadmap.takeoff.initiatives.map((init: string, idx: number) => (
                  <li key={idx} className="text-sm text-slate-300 flex gap-2">
                    <span className="text-blue-400">•</span>
                    <span>{init}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Climb */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center">
                  <span className="text-cyan-300 text-sm font-bold">2</span>
                </div>
                <h3 className="text-white font-bold">Climb Phase</h3>
              </div>
              <p className="text-slate-400 text-sm">{roadmap.climb.duration}</p>
              <p className="text-slate-400 text-sm font-semibold mb-3">{roadmap.climb.focus}</p>
              <ul className="space-y-2">
                {roadmap.climb.initiatives.map((init: string, idx: number) => (
                  <li key={idx} className="text-sm text-slate-300 flex gap-2">
                    <span className="text-cyan-400">•</span>
                    <span>{init}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cruise */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                  <span className="text-green-300 text-sm font-bold">3</span>
                </div>
                <h3 className="text-white font-bold">Cruise Phase</h3>
              </div>
              <p className="text-slate-400 text-sm">{roadmap.cruise.duration}</p>
              <p className="text-slate-400 text-sm font-semibold mb-3">{roadmap.cruise.focus}</p>
              <ul className="space-y-2">
                {roadmap.cruise.initiatives.map((init: string, idx: number) => (
                  <li key={idx} className="text-sm text-slate-300 flex gap-2">
                    <span className="text-green-400">•</span>
                    <span>{init}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={exportToJSON}
            className="flex items-center gap-2 px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export as JSON
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-6 py-3 rounded-md bg-slate-700 text-white hover:bg-slate-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export as CSV
          </button>
        </div>
      </div>
    </div>
  )
}
