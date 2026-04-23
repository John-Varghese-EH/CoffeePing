import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client for rate limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// Rate limiters for different endpoints
export const rateLimiters = {
  // General API rate limiter (100 requests per 10 minutes)
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "10m"),
    analytics: true,
    prefix: "ratelimit:api",
  }),

  // Auth rate limiter (5 attempts per 15 minutes)
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "15m"),
    analytics: true,
    prefix: "ratelimit:auth",
  }),

  // Server creation rate limiter (10 per hour)
  serverCreate: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1h"),
    analytics: true,
    prefix: "ratelimit:server-create",
  }),

  // Server update rate limiter (30 per hour)
  serverUpdate: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1h"),
    analytics: true,
    prefix: "ratelimit:server-update",
  }),

  // Webhook rate limiter (50 per hour)
  webhook: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, "1h"),
    analytics: true,
    prefix: "ratelimit:webhook",
  }),

  // Contact form rate limiter (3 per hour)
  contact: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1h"),
    analytics: true,
    prefix: "ratelimit:contact",
  }),
};

/**
 * Check rate limit for a specific endpoint
 */
export async function checkRateLimit(
  identifier: string,
  limiter: keyof typeof rateLimiters
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const rateLimiter = rateLimiters[limiter];
  const result = await rateLimiter.limit(identifier);
  return {
    success: !result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}

/**
 * Sanitize HTML to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  if (!input) return "";
  
  // Remove potentially dangerous HTML tags and attributes
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Validate and sanitize URL
 */
export function sanitizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    
    // Only allow http and https protocols
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      throw new Error("Invalid protocol");
    }
    
    // Remove authentication and port for security
    urlObj.username = "";
    urlObj.password = "";
    urlObj.port = "";
    
    return urlObj.toString();
  } catch (error) {
    throw new Error("Invalid URL format");
  }
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  
  return result;
}

/**
 * Hash a string using SHA-256
 */
export async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return ["http:", "https:"].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * Get client IP address from request
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  return "unknown";
}

/**
 * Log security events
 */
export async function logSecurityEvent(
  event: string,
  details: Record<string, any>
): Promise<void> {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details,
    severity: details.severity || "info",
  };
  
  // In production, send to logging service
  console.error("[SECURITY]", JSON.stringify(logEntry));
  
  // You could also store in database or send to external monitoring
}

/**
 * Detect suspicious activity patterns
 */
export function detectSuspiciousActivity(
  userId: string,
  action: string,
  timestamp: number
): boolean {
  // This is a simplified version
  // In production, you'd want to track patterns over time

  const suspiciousPatterns = [
    // Multiple failed auth attempts
    action === "auth_failed" && timestamp > Date.now() - 60000,

    // Multiple server creations in short time
    action === "server_create" && timestamp > Date.now() - 30000,

    // Multiple webhook creations in short time
    action === "webhook_create" && timestamp > Date.now() - 30000,
  ];

  return suspiciousPatterns.some((pattern) => pattern === true);
}

/**
 * Generate CSRF token
 */
export function generateCsrfToken(): string {
  return generateSecureToken(64);
}

/**
 * Validate CSRF token
 */
export function validateCsrfToken(token: string, sessionToken: string): boolean {
  // In production, you'd want to verify the token against the session
  // This is a simplified version
  return token && token.length === 64;
}

/**
 * Mask sensitive data for logging
 */
export function maskSensitiveData(data: string, maskChar: string = "*"): string {
  if (!data || data.length < 4) return maskChar.repeat(4);
  
  const visibleChars = 4;
  const maskedLength = data.length - visibleChars;
  
  return data.slice(0, 2) + maskChar.repeat(maskedLength) + data.slice(-2);
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Security headers configuration
 */
export const securityHeaders = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co https://*.upstash.io",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; "),
  
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": [
    "camera=()",
    "microphone=()",
    "geolocation=()",
    "interest-cohort=()",
  ].join(", "),
  
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};
