import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

const POLICIES: Record<string, { title: string; content: string }> = {
  shipping: {
    title: 'Shipping Policy',
    content: `
## Shipping Overview

Rare Script ships worldwide with the following options:

**Domestic (United States)**
- Standard Shipping (5-7 business days): $8.99
- Express Shipping (2-3 business days): $18.99
- Overnight Shipping: $39.99
- **Free standard shipping on orders over $150**

**International**
- Canada & UK: $24.99 (7-14 business days)
- Rest of World: Contact us for rates

## Processing Time

All orders are processed within 1-2 business days after payment confirmation. Orders placed on weekends or holidays are processed the next business day. Limited drop items may take up to 3 business days to process.

## Tracking

Once your order ships, you'll receive a tracking email with your carrier and tracking number. You can also track your order from your Account Dashboard.

## Customs & Import Duties

International orders may be subject to customs fees, duties, and taxes charged by the destination country. These fees are the responsibility of the customer and are not included in the order total.

## Questions

Contact us at hello@rarescript.com or through our Contact page.
    `.trim(),
  },
  returns: {
    title: 'Returns & Exchanges',
    content: `
## Return Policy

We want you to love every Rare Script piece. If you're not fully satisfied, we make returns simple.

**Return Window:** 30 days from delivery date

**Eligibility:**
- Items must be unworn, unwashed, and in original condition
- Tags must be attached
- Original packaging preferred but not required

**Final Sale — Not Eligible for Return:**
- Limited drop items
- Sale and clearance items
- Underwear and intimate items
- Personalized/customized pieces

## How to Return

1. Log in to your account and visit Order History
2. Select the order and click "Start Return"
3. Choose your return reason
4. Print the prepaid return label (US only)
5. Drop off at any carrier location

International customers are responsible for return shipping costs.

## Refunds

Once we receive and inspect your return (3-5 business days), your refund is processed within 5-7 business days to your original payment method. You'll receive an email confirmation when your refund is initiated.

## Exchanges

We offer size exchanges on eligible items. Follow the return process and note "exchange" with your preferred size. We'll ship your exchange at no additional shipping cost.

## Questions

Contact hello@rarescript.com within the return window.
    `.trim(),
  },
  privacy: {
    title: 'Privacy Policy',
    content: `
## Privacy Policy

*Last updated: January 1, 2024*

Rare Script ("we," "us," or "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your data.

## Information We Collect

**Account Information:** Name, email, password (hashed), shipping address, order history

**Payment Information:** Processed securely by Stripe. We never store your full card details.

**Usage Data:** Pages visited, products viewed, cart items, device type, IP address

**Communications:** Emails, customer service interactions, newsletter preferences

## How We Use Your Information

- Process and fulfill orders
- Send order confirmations and shipping updates
- Provide customer support
- Send marketing emails (with your consent — unsubscribe anytime)
- Improve our website and products
- Prevent fraud and maintain security
- Comply with legal obligations

## Data Sharing

We do not sell your personal data. We share data only with:
- **Stripe** (payment processing)
- **Shipping carriers** (order fulfillment)
- **Email service providers** (communications)
- **Analytics tools** (aggregated, anonymized data only)

## Your Rights

- Access, correct, or delete your personal data
- Opt out of marketing emails at any time
- Request data portability
- California residents: additional rights under CCPA

## Security

We use industry-standard encryption and security measures. However, no online transmission is 100% secure.

## Contact

For privacy questions: privacy@rarescript.com
    `.trim(),
  },
  terms: {
    title: 'Terms of Service',
    content: `
## Terms of Service

*Last updated: January 1, 2024*

By using the Rare Script website and services, you agree to these Terms of Service.

## Use of Site

You must be 13 or older to use this site. You agree not to use the site for any unlawful purpose or in violation of these terms.

## Products & Pricing

All prices are in USD. We reserve the right to modify prices at any time without notice. We are not responsible for typographical errors in pricing.

## Orders

Order confirmation does not guarantee availability. We reserve the right to cancel orders if inventory is unavailable or pricing errors occur. You will be notified and fully refunded in such cases.

## Intellectual Property

All content on this site — text, images, logos, designs, and graphics — is owned by Rare Script and protected by copyright law. Unauthorized use is prohibited.

## Membership

Membership fees are charged monthly or annually as selected. Memberships auto-renew until cancelled. Cancellation takes effect at the end of the current billing period.

## Limitation of Liability

Rare Script shall not be liable for indirect, incidental, or consequential damages arising from your use of our site or products.

## Governing Law

These terms are governed by the laws of the State of Tennessee.

## Contact

For questions: legal@rarescript.com
    `.trim(),
  },
}

export async function generateMetadata({ params }: { params: Promise<{ policy: string }> }): Promise<Metadata> {
  const { policy } = await params
  const data = POLICIES[policy]
  if (!data) return { title: 'Not Found' }
  return { title: data.title }
}

function renderMarkdown(content: string) {
  const lines = content.split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} className="font-serif text-2xl font-bold text-neutral-900 mt-10 mb-4">{line.slice(3)}</h2>
    if (line.startsWith('**') && line.endsWith('**')) return <strong key={i} className="block font-semibold text-neutral-900 mt-4 mb-1">{line.slice(2, -2)}</strong>
    if (line.startsWith('- ')) return <li key={i} className="text-neutral-600 text-sm leading-relaxed ml-4 list-disc">{line.slice(2)}</li>
    if (line.startsWith('*') && line.endsWith('*')) return <p key={i} className="text-neutral-400 text-sm italic mb-4">{line.slice(1, -1)}</p>
    if (line.trim() === '') return <div key={i} className="h-2" />
    return <p key={i} className="text-neutral-600 text-sm leading-relaxed mb-2">{line}</p>
  })
}

export default async function PolicyPage({ params }: { params: Promise<{ policy: string }> }) {
  const { policy } = await params
  const data = POLICIES[policy]
  if (!data) notFound()

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="mb-10 pb-8 border-b border-neutral-100">
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700 font-semibold mb-3">
            Legal & Policies
          </p>
          <h1 className="font-serif text-4xl font-bold text-neutral-900">{data.title}</h1>
        </div>
        <div className="prose-rare">
          {renderMarkdown(data.content)}
        </div>
      </div>
    </div>
  )
}
