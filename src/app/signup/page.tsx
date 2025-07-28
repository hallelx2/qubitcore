import { AuthLayout } from "@/components/auth/auth-layout"
import { SignupForm } from "@/components/auth/signup-form"

const testimonial = {
  quote: "QubitCore's quantum-ready security infrastructure has transformed how we approach data protection. Their forward-thinking solutions give us confidence that our systems will remain secure even as quantum computing advances.",
  author: "Dr. Sarah Chen",
  role: "Chief Technology Officer",
  company: "SecureVault Technologies"
}

export default function SignupPage() {
  return (
    <AuthLayout testimonial={testimonial}>
      <SignupForm />
    </AuthLayout>
  )
}