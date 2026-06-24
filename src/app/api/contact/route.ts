/**
 * POST /api/contact
 *
 * Security layers (in order):
 *  1. Cookie-based rate limiting  — 5 submissions per visitor per 24h
 *  2. JSON body validation        — reject malformed requests early
 *  3. Zod schema validation       — enforce field types, lengths, and formats
 *  4. Honeypot check              — silently drop bot submissions
 *  5. HTML escaping               — prevent XSS in the email body
 *  6. Resend email delivery       — send the sanitized email
 *  7. Cookie counter update       — increment and persist the rate limit state
 */

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import {
  CONTACT_RATE_LIMIT,
  checkRateLimit,
  encodeRateLimitCookie,
} from '@/lib/rateLimiter'

const resend = new Resend(process.env.RESEND_API_KEY)

// ── Validation Schema ─────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name is too long.')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address.')
    .max(254, 'Email is too long.')
    .trim()
    .toLowerCase(),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters.')
    .max(200, 'Subject is too long.')
    .trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message must not exceed 2000 characters.')
    .trim(),
  // Honeypot — rendered hidden in the DOM.
  // Legitimate users will never fill this field; most bots will.
  website: z.string().optional(),
})

// ── HTML Escape Helper ────────────────────────────────────────────────────────

/**
 * Escape user-supplied strings before placing them inside HTML.
 * Prevents XSS if the email client renders HTML.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

// ── POST Handler ──────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {

  // ── Step 1: Rate limit check ────────────────────────────────────────────────
  const cookieValue = request.cookies.get(CONTACT_RATE_LIMIT.cookieName)?.value
  const { allowed, state, remaining, resetAt } = checkRateLimit(cookieValue)

  if (!allowed) {
    const retryAfterSeconds = Math.ceil((resetAt.getTime() - Date.now()) / 1000)

    return NextResponse.json(
      {
        error: `You've reached the 5-message limit. Your limit resets on ${resetAt.toLocaleDateString(
          'en-PH',
          {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Manila',
          }
        )}.`,
        resetAt: resetAt.toISOString(),
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfterSeconds),
          'X-RateLimit-Limit': String(CONTACT_RATE_LIMIT.maxRequests),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.floor(resetAt.getTime() / 1000)),
        },
      }
    )
  }

  // ── Step 2: Parse request body ──────────────────────────────────────────────
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    )
  }

  // ── Step 3: Zod validation ──────────────────────────────────────────────────
  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Please check your input and try again.',
        details: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    )
  }

  const { name, email, subject, message, website } = result.data

  // ── Step 4: Honeypot check ──────────────────────────────────────────────────
  // If the hidden `website` field has any value, this is almost certainly a bot.
  // We return a fake success response to avoid revealing the trap.
  if (website && website.length > 0) {
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
      remaining: remaining - 1,
    })
  }

  // ── Step 5: Send email via Resend ───────────────────────────────────────────
  const submissionsAfterThis = CONTACT_RATE_LIMIT.maxRequests - (state.count + 1)

  const { error: resendError } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: ['ashiqenriquez@gmail.com'],
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:620px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:32px;border-radius:12px;">

        <div style="border-bottom:2px solid #00C896;padding-bottom:16px;margin-bottom:24px;">
          <h2 style="color:#00C896;margin:0;font-size:18px;letter-spacing:0.02em;">
            New Contact Form Submission
          </h2>
          <p style="color:#64748b;margin:6px 0 0;font-size:12px;">
            Received via ashiq-portfolio-ten.vercel.app
          </p>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr>
            <td style="padding:10px 0;color:#64748b;font-size:11px;font-weight:600;letter-spacing:0.08em;width:80px;vertical-align:top;">
              NAME
            </td>
            <td style="padding:10px 0;font-weight:600;">
              ${escapeHtml(name)}
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#64748b;font-size:11px;font-weight:600;letter-spacing:0.08em;vertical-align:top;">
              EMAIL
            </td>
            <td style="padding:10px 0;">
              <a href="mailto:${escapeHtml(email)}" style="color:#00C896;text-decoration:none;">
                ${escapeHtml(email)}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#64748b;font-size:11px;font-weight:600;letter-spacing:0.08em;vertical-align:top;">
              SUBJECT
            </td>
            <td style="padding:10px 0;">
              ${escapeHtml(subject)}
            </td>
          </tr>
        </table>

        <div style="background:#1e293b;border-left:3px solid #00C896;border-radius:4px;padding:16px 20px;margin-bottom:24px;">
          <p style="color:#64748b;font-size:11px;font-weight:600;letter-spacing:0.08em;margin:0 0 10px;">
            MESSAGE
          </p>
          <p style="white-space:pre-wrap;margin:0;line-height:1.8;color:#e2e8f0;">
            ${escapeHtml(message)}
          </p>
        </div>

        <p style="color:#334155;font-size:11px;margin:0;border-top:1px solid #1e293b;padding-top:16px;line-height:1.6;">
          Sent ${new Date().toUTCString()} (UTC+8 Manila)<br/>
          Visitor has <strong style="color:#64748b;">${submissionsAfterThis}</strong> of ${CONTACT_RATE_LIMIT.maxRequests} submissions remaining for the next 24 hours.
        </p>

      </div>
    `,
  })

  if (resendError) {
    console.error('[Contact API] Resend error:', resendError)
    return NextResponse.json(
      { error: 'Failed to send your message. Please try again in a moment.' },
      { status: 500 }
    )
  }

  // ── Step 6: Increment counter and set cookie ────────────────────────────────
  const updatedState = {
    count: state.count + 1,
    // Only set firstRequest on the very first submission in this window
    firstRequest: state.count === 0 ? Date.now() : state.firstRequest,
  }

  const finalRemaining = CONTACT_RATE_LIMIT.maxRequests - updatedState.count

  const response = NextResponse.json({
    success: true,
    message:
      finalRemaining > 0
        ? `Message sent! You have ${finalRemaining} submission${finalRemaining !== 1 ? 's' : ''} remaining today.`
        : "Message sent! You've used all 5 submissions for today.",
    remaining: finalRemaining,
  })

  response.cookies.set(
    CONTACT_RATE_LIMIT.cookieName,
    encodeRateLimitCookie(updatedState),
    {
      httpOnly: true,                                    // JS cannot read this cookie
      secure: process.env.NODE_ENV === 'production',    // HTTPS only in production
      sameSite: 'strict',                               // No cross-site requests
      maxAge: 60 * 60 * 24,                             // 24 hours in seconds
      path: '/',
    }
  )

  return response
}
