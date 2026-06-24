/**
 * Cookie-based rate limiter for the contact form.
 *
 * Strategy:
 *  - Track submission count + first-request timestamp in an httpOnly cookie.
 *  - Cookie value is base64url-encoded JSON to make casual tampering harder.
 *  - Window resets automatically after 24 hours.
 *  - Max 5 submissions per visitor per window.
 *
 * Note: Cookie-based limiting is bypassable by clearing cookies, which is
 * acceptable for a portfolio. For stronger protection, pair with
 * Upstash Redis (@upstash/ratelimit) using the visitor's IP address.
 */

export interface RateLimitState {
  count: number
  firstRequest: number
}

export const CONTACT_RATE_LIMIT = {
  maxRequests: 10,
  windowMs: 24 * 60 * 60 * 1000, // 24 hours in ms
  cookieName: 'ashiq_contact_rl',
} as const

/**
 * Safely parse the rate limit cookie.
 * Returns a fresh state if the cookie is missing, malformed, or tampered with.
 */
export function parseRateLimitCookie(cookieValue: string | undefined): RateLimitState {
  if (!cookieValue) {
    return { count: 0, firstRequest: Date.now() }
  }

  try {
    const decoded = Buffer.from(cookieValue, 'base64url').toString('utf-8')
    const parsed = JSON.parse(decoded) as RateLimitState

    // Guard against tampered or malformed values
    if (
      typeof parsed.count !== 'number' ||
      typeof parsed.firstRequest !== 'number' ||
      !Number.isFinite(parsed.count) ||
      !Number.isFinite(parsed.firstRequest) ||
      parsed.count < 0 ||
      parsed.firstRequest > Date.now() + 5_000 // reject future timestamps (clock skew tolerance: 5s)
    ) {
      return { count: 0, firstRequest: Date.now() }
    }

    return parsed
  } catch {
    // Invalid JSON or encoding — reset cleanly
    return { count: 0, firstRequest: Date.now() }
  }
}

/**
 * Encode rate limit state to a base64url string for cookie storage.
 */
export function encodeRateLimitCookie(state: RateLimitState): string {
  return Buffer.from(JSON.stringify(state)).toString('base64url')
}

/**
 * Check whether an incoming request is within the rate limit.
 * Returns:
 *  - allowed:  true if the request can proceed
 *  - state:    the current (possibly reset) rate limit state
 *  - remaining: how many submissions the visitor has left after this one
 *  - resetAt:  the Date when the window expires
 */
export function checkRateLimit(cookieValue: string | undefined) {
  let state = parseRateLimitCookie(cookieValue)
  const now = Date.now()

  // Reset the counter when the 24-hour window has expired
  if (now - state.firstRequest > CONTACT_RATE_LIMIT.windowMs) {
    state = { count: 0, firstRequest: now }
  }

  const remaining = Math.max(0, CONTACT_RATE_LIMIT.maxRequests - state.count)
  const allowed = state.count < CONTACT_RATE_LIMIT.maxRequests
  const resetAt = new Date(state.firstRequest + CONTACT_RATE_LIMIT.windowMs)

  return { allowed, state, remaining, resetAt }
}
