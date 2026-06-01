import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // In production: save to database and send to email service (Klaviyo, Mailchimp, etc.)
    // const newsletter = await prisma.newsletter.upsert({
    //   where: { email },
    //   create: { email, name, source: 'homepage' },
    //   update: {},
    // })

    console.log('Newsletter signup:', { email, name })

    return NextResponse.json({ success: true, message: 'Subscribed successfully' })
  } catch (err) {
    console.error('Newsletter signup error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
