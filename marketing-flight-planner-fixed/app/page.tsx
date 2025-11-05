'use client'

import Link from 'next/link'
import { ArrowRight, Plane, Clock, BookOpen, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-panel to-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/30 backdrop-blur-sm bg-panel/80">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">Marketing Flight Planner</h1>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-20 space-y-8">
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
            <span className="text-blue-300 text-sm font-medium">Chart Your Flight Path</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Where is your marketing <span className="gradient-text">taking flight?</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Understand your current marketing maturity, project your trajectory, and get a personalized flight plan
            to reach your destination.
          </p>
        </div>

        {/* Two Paths */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-3xl mx-auto">
          {/* Quick Assessment */}
          <Link href="/assess/quick">
            <div className="panel cursor-pointer hover:border-blue-500/50 hover:shadow-glow transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl text-white">Quick Assessment</h2>
              </div>

              <p className="text-slate-400 mb-6">
                Get your marketing maturity baseline in just 10 minutes. Perfect for executives and quick evaluations.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckIcon />
                  <span>10 essential questions</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckIcon />
                  <span>Instant maturity score</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckIcon />
                  <span>6/12/24 month projections</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckIcon />
                  <span>Quick wins & roadmap</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-blue-400 group-hover:gap-3 transition-all">
                <span className="font-medium">Start Flight</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Detailed Assessment */}
          <Link href="/assess/detailed">
            <div className="panel cursor-pointer hover:border-cyan-500/50 hover:shadow-glow transition-all group border-cyan-500/20">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl text-white">Detailed Audit</h2>
              </div>

              <p className="text-slate-400 mb-6">
                Deep-dive into 10 specialized modules with 80+ questions. For comprehensive audits and detailed
                remediation.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckIcon />
                  <span>10 specialized modules</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckIcon />
                  <span>80+ granular questions</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckIcon />
                  <span>Module-specific insights</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckIcon />
                  <span>Enhanced accuracy</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition-all">
                <span className="font-medium">Begin Deep Dive</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="card">
            <Zap className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="text-white font-semibold mb-2">Instant Insights</h3>
            <p className="text-sm text-slate-400">Get immediate visibility into your marketing capabilities across 6 key dimensions.</p>
          </div>

          <div className="card">
            <ArrowRight className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-white font-semibold mb-2">Clear Trajectory</h3>
            <p className="text-sm text-slate-400">See exactly where you're headed with 6, 12, and 24 month growth projections.</p>
          </div>

          <div className="card">
            <Plane className="w-8 h-8 text-cyan-400 mb-3" />
            <h3 className="text-white font-semibold mb-2">Actionable Plan</h3>
            <p className="text-sm text-slate-400">Get a prioritized roadmap with quick wins and realistic implementation timelines.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-panel/50 mt-20 py-8">
        <div className="container text-center text-slate-500 text-sm">
          <p>Marketing Flight Planner • Chart Your Strategic Marketing Destination</p>
        </div>
      </footer>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}
