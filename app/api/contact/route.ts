import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactRequestBody {
  name: string
  email: string
  subject: string
  message: string
}

function isValidContactBody(body: unknown): body is ContactRequestBody {
  if (typeof body !== 'object' || body === null) return false
  const obj = body as Record<string, unknown>
  return (
    typeof obj.name === 'string' &&
    obj.name.trim().length > 0 &&
    typeof obj.email === 'string' &&
    obj.email.trim().length > 0 &&
    typeof obj.subject === 'string' &&
    obj.subject.trim().length > 0 &&
    typeof obj.message === 'string' &&
    obj.message.trim().length > 0
  )
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()

    if (!isValidContactBody(body)) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = body

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: 'tony@cosmicjs.com',
      to: 'tony@cosmicjs.com',
      replyTo: email,
      subject: `[Flavour Kitchen Contact] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111827; border-bottom: 2px solid #fbbf24; padding-bottom: 12px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #374151; vertical-align: top; width: 100px;">Name</td>
              <td style="padding: 8px 12px; color: #111827;">${escapeHtml(name)}</td>
            </tr>
            <tr style="background-color: #fefdfb;">
              <td style="padding: 8px 12px; font-weight: 600; color: #374151; vertical-align: top;">Email</td>
              <td style="padding: 8px 12px; color: #111827;">
                <a href="mailto:${escapeHtml(email)}" style="color: #d97706;">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #374151; vertical-align: top;">Subject</td>
              <td style="padding: 8px 12px; color: #111827;">${escapeHtml(subject)}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background-color: #fefdfb; border-radius: 8px; border: 1px solid #fde68a;">
            <p style="font-weight: 600; color: #374151; margin: 0 0 8px 0;">Message</p>
            <p style="color: #111827; margin: 0; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
            Sent from the Flavour Kitchen contact form
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char] ?? char)
}