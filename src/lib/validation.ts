// ============================================================================
// Miller Engines & Mechanical — Form Validation Schemas
// ============================================================================

import { z } from "zod";

/** Contact form validation */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(
      /^[\d\s+\-()]+$/,
      "Phone number can only contain digits, spaces, +, -, and parentheses"
    ),
  email: z
    .string()
    .email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** Quote wizard validation — step 1: Vehicle */
export const quoteVehicleSchema = z.object({
  vehicleMake: z
    .string()
    .min(1, "Please enter your vehicle make"),
  vehicleModel: z
    .string()
    .min(1, "Please enter your vehicle model"),
  vehicleYear: z
    .string()
    .min(4, "Please enter a valid year")
    .max(4, "Please enter a valid year")
    .regex(/^\d{4}$/, "Year must be 4 digits"),
});

/** Quote wizard validation — step 2: Service */
export const quoteServiceSchema = z.object({
  serviceType: z
    .string()
    .min(1, "Please select a service type"),
  description: z
    .string()
    .min(10, "Please describe the issue or service needed")
    .max(2000, "Description must be less than 2000 characters"),
});

/** Quote wizard validation — step 3: Contact */
export const quoteContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number")
    .regex(/^[\d\s+\-()]+$/, "Please enter a valid phone number"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  preferredDate: z
    .string()
    .optional(),
});

/** Complete quote form schema (combined) */
export const quoteFormSchema = quoteVehicleSchema
  .merge(quoteServiceSchema)
  .merge(quoteContactSchema);

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
