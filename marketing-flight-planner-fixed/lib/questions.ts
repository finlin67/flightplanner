export interface Question {
  id: string
  category: string
  question: string
  description: string
  options: Array<{
    value: number
    label: string
  }>
}

export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 'strategy',
    category: 'Strategic Focus',
    question: 'How mature is your marketing strategy?',
    description: 'Evaluate your strategic planning, goal-setting, and market positioning.',
    options: [
      { value: 0, label: 'No formal strategy - reactive marketing' },
      { value: 25, label: 'Basic strategy - annual planning with limited data' },
      { value: 50, label: 'Defined strategy - quarterly planning with metrics' },
      { value: 75, label: 'Advanced strategy - integrated with business goals and competitive analysis' },
      { value: 100, label: 'World-class - data-driven, predictive, agile strategic planning' },
    ],
  },
  {
    id: 'content',
    category: 'Content & Brand',
    question: 'How sophisticated is your content operation?',
    description: 'Assess your content creation, distribution, and measurement capabilities.',
    options: [
      { value: 0, label: 'Ad-hoc content - no process or calendar' },
      { value: 25, label: 'Basic content - simple blog posts and social updates' },
      { value: 50, label: 'Structured content - editorial calendar and content types' },
      { value: 75, label: 'Advanced content - multi-channel, personalized, performance-tracked' },
      { value: 100, label: 'Content excellence - AI-assisted, omnichannel, audience-segmented' },
    ],
  },
  {
    id: 'demand_gen',
    category: 'Demand Generation',
    question: 'How effective is your demand generation?',
    description: 'Evaluate lead generation, nurturing, and conversion capabilities.',
    options: [
      { value: 0, label: 'No formal demand gen - sporadic campaigns' },
      { value: 25, label: 'Basic campaigns - email blasts and webinars' },
      { value: 50, label: 'Multi-channel campaigns - integrated email, ads, content' },
      { value: 75, label: 'Advanced demand gen - ABM, lead scoring, nurture tracks' },
      { value: 100, label: 'Predictive demand gen - AI-driven targeting and personalization' },
    ],
  },
  {
    id: 'customer_understanding',
    category: 'Customer Understanding',
    question: 'How well do you understand your customers?',
    description: 'Measure customer research, data, and insights capabilities.',
    options: [
      { value: 0, label: 'No formal customer research - assumptions only' },
      { value: 25, label: 'Basic surveys and feedback - limited insights' },
      { value: 50, label: 'Regular research - documented personas and journey maps' },
      { value: 75, label: 'Sophisticated insights - predictive analytics and segmentation' },
      { value: 100, label: 'Market-leading insights - AI-driven customer intelligence' },
    ],
  },
  {
    id: 'sales_alignment',
    category: 'Customer Understanding',
    question: 'How aligned are sales and marketing?',
    description: 'Measure collaboration, shared goals, and handoff processes.',
    options: [
      { value: 0, label: 'Misaligned - separate goals and limited communication' },
      { value: 25, label: 'Basic alignment - occasional meetings' },
      { value: 50, label: 'Defined SLAs - shared definitions and regular sync' },
      { value: 75, label: 'Strong alignment - integrated systems and joint planning' },
      { value: 100, label: 'Revenue team - unified goals, processes, and accountability' },
    ],
  },
  {
    id: 'tech_stack',
    category: 'Technology Stack',
    question: 'How sophisticated is your marketing technology?',
    description: 'Evaluate your martech integration and utilization.',
    options: [
      { value: 0, label: 'Minimal tools - email and basic CRM' },
      { value: 25, label: 'Basic stack - MAP, CRM, analytics' },
      { value: 50, label: 'Integrated stack - 5-10 tools with some integration' },
      { value: 75, label: 'Advanced stack - unified platform with data flows' },
      { value: 100, label: 'Best-in-class - fully integrated, AI-enabled martech ecosystem' },
    ],
  },
  {
    id: 'brand',
    category: 'Content & Brand',
    question: 'How consistent is your brand across channels?',
    description: 'Assess brand positioning, messaging, and visual consistency.',
    options: [
      { value: 0, label: 'Inconsistent - no brand guidelines' },
      { value: 25, label: 'Basic branding - some guidelines, inconsistent application' },
      { value: 50, label: 'Defined brand - guidelines exist, mostly followed' },
      { value: 75, label: 'Strong brand - cohesive messaging, consistent execution' },
      { value: 100, label: 'Market-leading brand - recognized, trusted, differentiated' },
    ],
  },
  {
    id: 'team_capability',
    category: 'Team Capability',
    question: 'How capable is your marketing team?',
    description: 'Assess skills, experience, training, and resource allocation.',
    options: [
      { value: 0, label: 'Under-resourced - lacks key skills and experience' },
      { value: 25, label: 'Basic team - some skills, limited depth' },
      { value: 50, label: 'Competent team - clear roles, some specialization' },
      { value: 75, label: 'Strong team - experienced, specialized, continuous learning' },
      { value: 100, label: 'Market-leading team - top talent, innovation, leadership' },
    ],
  },
  {
    id: 'operations',
    category: 'Demand Generation',
    question: 'How mature are your marketing operations?',
    description: 'Assess process management, automation, and operational efficiency.',
    options: [
      { value: 0, label: 'No formal operations - manual processes' },
      { value: 25, label: 'Basic automation - email sequences' },
      { value: 50, label: 'Defined operations - process documentation and workflows' },
      { value: 75, label: 'Advanced ops - integrated automation and data governance' },
      { value: 100, label: 'World-class ops - AI-driven optimization and predictive workflows' },
    ],
  },
  {
    id: 'measurement',
    category: 'Strategic Focus',
    question: 'How sophisticated is your marketing measurement?',
    description: 'Evaluate analytics, attribution, and ROI measurement capabilities.',
    options: [
      { value: 0, label: 'No analytics - flying blind' },
      { value: 25, label: 'Basic metrics - pageviews, clicks, email opens' },
      { value: 50, label: 'Standard analytics - conversions, revenue attribution' },
      { value: 75, label: 'Advanced analytics - multi-touch attribution, predictive modeling' },
      { value: 100, label: 'Market-leading - AI-powered insights, real-time optimization' },
    ],
  },
]

export const CATEGORY_COLORS: { [key: string]: string } = {
  'Strategic Focus': '#3b82f6',
  'Demand Generation': '#06b6d4',
  'Technology Stack': '#8b5cf6',
  'Customer Understanding': '#ec4899',
  'Content & Brand': '#f59e0b',
  'Team Capability': '#10b981',
}
