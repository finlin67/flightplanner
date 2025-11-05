# Marketing Flight Planner - Complete Application

🚀 **A fully-functional marketing maturity assessment and flight planning application built with Next.js, React, TypeScript, and Tailwind CSS.**

## ✨ Features

### Core Functionality
- ✅ **10-Question Assessment** - Evaluates marketing maturity across 6 dimensions
- ✅ **Intelligent Scoring Engine** - Calculates normalized scores (0-100)
- ✅ **Trajectory Projections** - 6/12/24 month growth forecasts
- ✅ **Gap Analysis** - Compare against industry benchmarks and market leaders
- ✅ **Quick Wins Generator** - High-impact, low-effort initiatives
- ✅ **24-Month Roadmap** - Takeoff, Climb, Cruise phases with initiatives
- ✅ **Data Persistence** - localStorage for offline capability
- ✅ **Export Functions** - JSON and CSV export
- ✅ **Responsive Design** - Mobile, tablet, desktop optimized
- ✅ **Dark Theme** - Professional Flight Deck styling

### Categories Evaluated
1. **Strategic Focus** - Planning, goal-setting, measurement
2. **Demand Generation** - Lead gen, nurturing, campaigns
3. **Technology Stack** - Martech integration, tools utilization
4. **Customer Understanding** - Research, insights, personalization
5. **Content & Brand** - Strategy, consistency, quality
6. **Team Capability** - Skills, resources, capability

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- A modern browser (Chrome, Safari, Edge, Firefox)

### Installation

```bash
# Clone or extract the project
cd marketing-flight-planner-fixed

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Building for Production

```bash
# Build the app
npm run build

# Start production server
npm start
```

## 🌐 Deployment Options

### Option 1: Deploy to Vercel (Recommended)

**Easiest option - takes 2 minutes:**

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Select your repository
4. Click "Deploy"
5. Your app is live! 🎉

### Option 2: Deploy to Netlify

1. Push code to Git
2. Go to [netlify.com](https://netlify.com) → "New site from Git"
3. Select repository and click "Deploy site"
4. Your app is live!

### Option 3: Deploy to Heroku

```bash
# Install Heroku CLI, then:
heroku login
heroku create your-app-name
npm run build
git push heroku main
```

### Option 4: Self-Hosted (AWS, DigitalOcean, etc.)

```bash
# Build the app
npm run build

# Start on your server
npm start
```

## 📁 Project Structure

```
marketing-flight-planner-fixed/
├── app/
│   ├── page.tsx              # Home page with two paths
│   ├── assess/
│   │   ├── page.tsx          # 10-question assessment
│   │   ├── quick/            # Quick path redirect
│   │   └── detailed/         # Detailed path redirect
│   ├── planner/
│   │   └── page.tsx          # Flight plan results & dashboard
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles with Flight Deck theme
├── hooks/
│   └── useFlightPlan.ts      # Main state management hook
├── lib/
│   ├── scoring.ts            # Scoring engine & calculations
│   ├── questions.ts          # Assessment questions & categories
│   └── utils.ts              # Utility functions
├── components/               # UI components (if expanded)
├── public/                   # Static assets
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── next.config.mjs           # Next.js config
└── postcss.config.mjs        # PostCSS config
```

## 🧮 How Scoring Works

### Assessment Structure
- **10 questions**, each with 5 answer options
- **Scale:** 0-100 for each question
- **Categories:** 6 dimensions of marketing maturity

### Scoring Algorithm
```
Overall Score = Average of all 10 question scores
Category Score = Average of questions in that category
Maturity Level = Based on overall score thresholds
```

### Maturity Levels
- 0-19: **Foundational** 🔴
- 20-39: **Developing** 🟠
- 40-59: **Established** 🟡
- 60-79: **Advanced** 🟢
- 80-100: **Market-Leading** 🟢🟢

### Trajectory Calculation
```
6-Month Projection = Current Score + (Annual Velocity × 0.5)
12-Month Projection = Current Score + Annual Velocity
24-Month Projection = Current Score + (Annual Velocity × 2)

Default Annual Velocity = 8.5 points/year
```

## 📊 Data Structure

### Assessment Response
```typescript
{
  strategy: 75,
  content: 50,
  demand_gen: 60,
  customer_understanding: 55,
  sales_alignment: 70,
  tech_stack: 45,
  brand: 65,
  team_capability: 60,
  operations: 55,
  measurement: 50
}
```

### Flight Plan Output
```json
{
  "assessment": {
    "overallScore": 59,
    "normalizedScore": 59,
    "maturityLevel": "Established",
    "categories": [...],
    "timestamp": "2024-11-05T..."
  },
  "trajectory": {
    "months_6": 63,
    "months_12": 67,
    "months_24": 76,
    "annualVelocity": 8.5
  },
  "gapAnalysis": {
    "vsIndustryBenchmark": 11,
    "vsMarketLeaders": 23,
    "monthsToCloseBenchmark": 16,
    "monthsToCloseMarketLeaders": 33
  },
  "quickWins": [...],
  "roadmap": {...}
}
```

## 🔧 Customization

### Change Questions
Edit `lib/questions.ts`:
```typescript
export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 'your-question-id',
    category: 'Category Name',
    question: 'Your question?',
    description: 'Description...',
    options: [
      { value: 0, label: 'Option 1' },
      // ...
    ],
  },
]
```

### Adjust Scoring Parameters
Edit `lib/scoring.ts`:
```typescript
// Change annual velocity
const annualVelocity = 10 // instead of 8.5

// Change benchmarks
const industryBenchmark = 75 // instead of 70
const marketLeaders = 85 // instead of 82
```

### Change Theme Colors
Edit `app/globals.css` or `lib/questions.ts`:
```typescript
export const CATEGORY_COLORS: { [key: string]: string } = {
  'Strategic Focus': '#your-color',
  // ...
}
```

## 📱 Browser Support

- Chrome/Chromium (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Privacy & Data

- All data is stored **locally in the browser** using localStorage
- No data is sent to any server
- Users can export their data as JSON/CSV
- Data persists between sessions
- Users can clear data with the "New Assessment" button

## 🚀 Future Enhancements

### Planned Features
- [ ] 10 specialized modules (M1-M10) for detailed audits
- [ ] Historical tracking & trend analysis
- [ ] Benchmark comparison across industries
- [ ] Team collaboration features
- [ ] PDF report generation
- [ ] API integration with CRM/marketing platforms
- [ ] AI-powered personalized recommendations
- [ ] Interactive roadmap timeline
- [ ] Predictive analytics

### Optional Integrations
```typescript
// Example: Send to external API
const saveAssessment = async (flightPlan: FlightPlan) => {
  await fetch('/api/assessments', {
    method: 'POST',
    body: JSON.stringify(flightPlan),
  })
}
```

## 🐛 Troubleshooting

### Issue: "Cannot find module '@/lib/scoring'"
**Solution:** Make sure all files are created in the correct directories

### Issue: Styles not applying
**Solution:** Clear browser cache (Ctrl+Shift+Delete) and restart dev server

### Issue: Data not persisting
**Solution:** Check browser localStorage is enabled (Settings → Privacy)

### Issue: Deployment fails
**Solution:** Run `npm run build` locally first to verify no errors

## 📚 API Reference

### useFlightPlan Hook

```typescript
const {
  responses,              // Current assessment responses
  flightPlan,            // Complete flight plan object
  isComplete,            // Boolean: assessment complete?
  updateResponse,        // (questionId, value) => void
  submitAssessment,      // () => void - triggers calculation
  exportToJSON,          // () => void - downloads JSON
  exportToCSV,           // () => void - downloads CSV
  reset,                 // () => void - clear all data
  getProgress,           // () => number - 0-100%
  calculateFlightPlan,   // (responses) => FlightPlan
} = useFlightPlan()
```

### ScoringEngine Class

```typescript
// Calculate complete assessment
const result = ScoringEngine.generateAssessment(responses)

// Get trajectory projections
const trajectory = ScoringEngine.calculateTrajectory(score)

// Get gap analysis
const gaps = ScoringEngine.calculateGapAnalysis(score)

// Generate quick wins
const wins = ScoringEngine.generateQuickWins(categories)

// Get roadmap phases
const roadmap = ScoringEngine.calculateRoadmap(score)
```

## 📄 License

This project is provided as-is for your use.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the code comments
3. Check Next.js documentation: https://nextjs.org/docs

## 📈 Analytics

To add Google Analytics:

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Built with ❤️ by Claude**

**Version:** 1.0.0
**Last Updated:** November 5, 2024
**Status:** Production Ready ✅
