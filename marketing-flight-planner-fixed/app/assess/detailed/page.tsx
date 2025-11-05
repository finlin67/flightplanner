import { redirect } from 'next/navigation'

export default function DetailedAssessmentPage() {
  // For MVP, both quick and detailed use the same 10-question flow
  // In future, you can extend this to handle the 10 modules (M1-M10)
  redirect('/assess')
}
