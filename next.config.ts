import type { NextConfig } from "next"

/**
 * Security headers applied to every route.
 *
 * These are checked and graded by securityheaders.com and Mozilla Observatory.
 * Goal: A or A+ rating on both.
 *
 * Headers explained:
 *  X-Content-Type-Options     — Stops browsers guessing the MIME type (MIME sniffing attacks)
 *  X-Frame-Options            — Prevents the site being embedded in iframes (clickjacking)
 *  X-XSS-Protection           — Enables legacy XSS filter in older browsers (belt-and-suspenders)
 *  Referrer-Policy            — Controls how much referrer info is sent to other origins
 *  X-DNS-Prefetch-Control     — Allows DNS prefetching for performance
 *  Permissions-Policy         — Disables browser features this site doesn't use
 *  Strict-Transport-Security  — Forces HTTPS for 2 years (HSTS preload eligible)
 *  Content-Security-Policy    — Restricts where scripts, styles, images, and requests can come from
 */
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Permissions-Policy',
    // Only allow what the portfolio actually uses. Nothing here uses
    // camera, microphone, geolocation, or payment APIs.
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'browsing-topics=()',
    ].join(', '),
  },
  {
    key: 'Strict-Transport-Security',
    // max-age=63072000 = 2 years. includeSubDomains + preload = eligible for
    // browser HSTS preload list. Vercel enforces HTTPS anyway, but this
    // signals trust to browsers and CDNs.
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      // Fallback: only load resources from our own origin
      "default-src 'self'",

      // Scripts: self + Vercel Analytics (va.vercel-scripts.com).
      // unsafe-eval is required by Next.js in development.
      // unsafe-inline is required by Next.js for inline scripts.
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com",

      // Styles: Tailwind injects inline styles via Next.js — unsafe-inline is required.
      "style-src 'self' 'unsafe-inline'",

      // Images: allow data URIs and blobs (Next.js image optimisation uses these)
      // and HTTPS images for any external profile/project thumbnails.
      "img-src 'self' blob: data: https:",

      // Fonts: allow data URIs (common for embedded icon fonts)
      "font-src 'self' data:",

      // Fetch/XHR: allow Vercel Analytics and Vercel Speed Insights endpoints.
      // Your Resend API call happens server-side (API route), not from the browser,
      // so api.resend.com does NOT need to be listed here.
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",

      // Block ALL iframe embedding of this site (mirrors X-Frame-Options: DENY)
      "frame-ancestors 'none'",

      // Prevent base tag hijacking
      "base-uri 'self'",

      // Only allow forms to submit to our own origin
      "form-action 'self'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  // ── Security ───────────────────────────────────────────────────────────────
  // Remove the X-Powered-By: Next.js response header.
  // Exposing the framework version helps attackers fingerprint the stack.
  poweredByHeader: false,

  // Apply security headers to every page and API route
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
