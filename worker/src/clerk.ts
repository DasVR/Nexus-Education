import * as jose from 'jose'

export type ClerkEnv = {
  CLERK_JWKS_URL?: string
  CLERK_ISSUER_URL?: string
}

/**
 * Verify a Clerk session JWT and return the user id (sub claim).
 * Uses JWKS from CLERK_JWKS_URL or CLERK_ISSUER_URL + /.well-known/jwks.json
 */
export async function verifyClerkToken(
  env: ClerkEnv,
  token: string
): Promise<{ sub: string } | null> {
  const jwksUrl =
    env.CLERK_JWKS_URL ||
    (env.CLERK_ISSUER_URL
      ? `${env.CLERK_ISSUER_URL.replace(/\/$/, '')}/.well-known/jwks.json`
      : null)
  if (!jwksUrl) return null

  try {
    const JWKS = jose.createRemoteJWKSet(new URL(jwksUrl))
    const { payload } = await jose.jwtVerify(token, JWKS, {
      algorithms: ['RS256'],
    })
    const sub = payload.sub
    if (typeof sub !== 'string' || !sub) return null
    return { sub }
  } catch {
    return null
  }
}
