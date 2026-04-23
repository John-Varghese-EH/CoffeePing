import { z } from "zod";

// Server validation schemas
export const serverCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Server name is required")
    .max(100, "Server name must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s-_]+$/, "Server name can only contain letters, numbers, spaces, hyphens, and underscores")
    .transform((val) => val.trim()),
  url: z
    .string()
    .min(1, "URL is required")
    .max(500, "URL must be less than 500 characters")
    .url("Invalid URL format")
    .refine(
      (url) => url.startsWith("http://") || url.startsWith("https://"),
      "URL must use HTTP or HTTPS protocol"
    )
    .transform((val) => val.trim()),
  intervalMinutes: z
    .number()
    .int("Interval must be an integer")
    .min(1, "Interval must be at least 1 minute")
    .max(60, "Interval must be at most 60 minutes"),
  expectedStatus: z
    .number()
    .int("Expected status must be an integer")
    .min(100, "Expected status must be at least 100")
    .max(599, "Expected status must be at most 599")
    .default(200),
  timeoutMs: z
    .number()
    .int("Timeout must be an integer")
    .min(1000, "Timeout must be at least 1000ms")
    .max(30000, "Timeout must be at most 30000ms")
    .default(5000),
  successKeywords: z
    .array(z.string().max(100, "Keyword must be less than 100 characters"))
    .max(10, "Maximum 10 keywords allowed")
    .optional()
    .default([]),
  headers: z
    .record(z.string())
    .refine((headers) => !headers || Object.keys(headers).length <= 10, "Maximum 10 headers allowed")
    .optional(),
  followRedirects: z.boolean().default(true),
});

export const serverUpdateSchema = serverCreateSchema.partial();

// Webhook validation schemas
export const webhookCreateSchema = z.object({
  serverId: z.string().min(1, "Server ID is required"),
  type: z.enum(["WEBHOOK", "DISCORD", "SLACK", "TELEGRAM"]),
  name: z
    .string()
    .min(1, "Webhook name is required")
    .max(100, "Webhook name must be less than 100 characters")
    .transform((val) => val.trim()),
  url: z
    .string()
    .min(1, "URL is required")
    .max(500, "URL must be less than 500 characters")
    .url("Invalid URL format")
    .refine(
      (url) => url.startsWith("http://") || url.startsWith("https://"),
      "URL must use HTTP or HTTPS protocol"
    )
    .transform((val) => val.trim()),
  config: z.record(z.any()).optional(),
});

export const webhookUpdateSchema = webhookCreateSchema.partial();

// Auth validation schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .transform((val) => val.toLowerCase().trim()),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must be less than 128 characters"),
});

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .transform((val) => val.toLowerCase().trim()),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must be less than 128 characters")
    .refine(
      (password) => /[A-Z]/.test(password),
      "Password must contain at least one uppercase letter"
    )
    .refine(
      (password) => /[a-z]/.test(password),
      "Password must contain at least one lowercase letter"
    )
    .refine(
      (password) => /[0-9]/.test(password),
      "Password must contain at least one number"
    ),
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Full name can only contain letters, spaces, hyphens, and apostrophes")
    .transform((val) => val.trim()),
});

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes")
    .transform((val) => val.trim()),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .transform((val) => val.toLowerCase().trim()),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject must be less than 200 characters")
    .transform((val) => val.trim()),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters")
    .transform((val) => val.trim()),
});

// Status page validation schema
export const statusPageCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Status page name is required")
    .max(100, "Status page name must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s-_]+$/, "Status page name can only contain letters, numbers, spaces, hyphens, and underscores")
    .transform((val) => val.trim()),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(50, "Slug must be less than 50 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens")
    .transform((val) => val.toLowerCase().trim()),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .transform((val) => val?.trim()),
  customDomain: z
    .string()
    .url("Invalid custom domain URL")
    .optional(),
  branding: z.object({
    logoUrl: z.string().url("Invalid logo URL").optional(),
    primaryColor: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format. Use hex format like #FF0000")
      .optional(),
    showPoweredBy: z.boolean().default(true),
  }).optional(),
});

export const statusPageUpdateSchema = statusPageCreateSchema.partial();

// Incident validation schema
export const incidentCreateSchema = z.object({
  title: z
    .string()
    .min(1, "Incident title is required")
    .max(200, "Incident title must be less than 200 characters")
    .transform((val) => val.trim()),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be less than 2000 characters")
    .transform((val) => val.trim()),
  severity: z.enum(["low", "medium", "high", "critical"]),
  status: z.enum(["investigating", "identified", "monitoring", "resolved"]),
  affectedServers: z.array(z.string()).min(1, "At least one affected server is required"),
});

// Query parameter validation schemas
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export const dateRangeSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
}).refine(
  (data) => {
    if (!data.startDate || !data.endDate) return true;
    return data.startDate <= data.endDate;
  },
  "Start date must be before end date"
);

// Type exports
export type ServerCreateInput = z.infer<typeof serverCreateSchema>;
export type ServerUpdateInput = z.infer<typeof serverUpdateSchema>;
export type WebhookCreateInput = z.infer<typeof webhookCreateSchema>;
export type WebhookUpdateInput = z.infer<typeof webhookUpdateSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type StatusPageCreateInput = z.infer<typeof statusPageCreateSchema>;
export type StatusPageUpdateInput = z.infer<typeof statusPageUpdateSchema>;
export type IncidentCreateInput = z.infer<typeof incidentCreateSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type DateRangeInput = z.infer<typeof dateRangeSchema>;
