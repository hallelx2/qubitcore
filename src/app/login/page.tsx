import { AuthLayout } from "@/components/auth/auth-layout"
import { LoginForm } from "@/components/auth/login-form"

const testimonial = {
  quote: "QubitCore's advanced security protocols and quantum-resistant encryption have given us unparalleled protection against emerging threats. Their authentication system is both robust and user-friendly, making it easy for our team to maintain the highest security standards.",
  author: "Marcus Rodriguez",
  role: "Chief Information Security Officer",
  company: "CyberShield Dynamics"
}

export default function LoginPage() {
  return (
    <AuthLayout testimonial={testimonial}>
      <LoginForm />
    </AuthLayout>
  )
}