import { NextRequest, NextResponse } from 'next/server'

// Demo coupon codes — in production these are stored in the database
const DEMO_COUPONS: Record<string, {
  type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING'
  value: number
  minOrderAmount?: number
  isActive: boolean
}> = {
  WELCOME15: { type: 'PERCENTAGE', value: 15, isActive: true },
  RARECIRCLE: { type: 'PERCENTAGE', value: 10, minOrderAmount: 100, isActive: true },
  SAVE20: { type: 'FIXED_AMOUNT', value: 20, minOrderAmount: 80, isActive: true },
  FREESHIP: { type: 'FREE_SHIPPING', value: 0, isActive: true },
  BLESSED30: { type: 'PERCENTAGE', value: 30, minOrderAmount: 150, isActive: true },
  FOUNDERS20: { type: 'PERCENTAGE', value: 20, isActive: true },
}

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal } = await req.json()

    if (!code) {
      return NextResponse.json({ valid: false, message: 'No coupon code provided' })
    }

    const coupon = DEMO_COUPONS[code.toUpperCase().trim()]

    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ valid: false, message: 'Invalid or expired coupon code' })
    }

    if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
      return NextResponse.json({
        valid: false,
        message: `This code requires a minimum order of $${coupon.minOrderAmount}`,
      })
    }

    let discount = 0
    if (coupon.type === 'PERCENTAGE') {
      discount = subtotal * (coupon.value / 100)
    } else if (coupon.type === 'FIXED_AMOUNT') {
      discount = Math.min(coupon.value, subtotal)
    }

    return NextResponse.json({
      valid: true,
      code: code.toUpperCase(),
      type: coupon.type,
      value: coupon.value,
      discount: parseFloat(discount.toFixed(2)),
    })
  } catch (err) {
    return NextResponse.json({ valid: false, message: 'Error validating coupon' }, { status: 500 })
  }
}
