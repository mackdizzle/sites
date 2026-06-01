import { redirect } from 'next/navigation'

export default function AccountPage() {
  // In production: check session and redirect accordingly
  // const session = await auth()
  // if (!session) redirect('/account/login')
  // redirect('/account/dashboard')

  redirect('/account/login')
}
