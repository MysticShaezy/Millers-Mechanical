"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import { analytics } from "@/lib/analytics";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

export default function ContactFormSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Contact form data:", data);
    analytics.formSubmit("contact");
    setIsSubmitted(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-section bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeIn>
          <SectionHeading
            title="Feel Free To Ask Us Anything"
            subtitle="Got a question about your vehicle? Need a quote? Send us a message and we'll get back to you as soon as possible."
          />
        </FadeIn>

        {isSubmitted ? (
          <FadeIn>
            <div className="text-center py-12 bg-green-50 rounded-2xl border border-green-200">
              <CheckCircle className="text-success mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-brand-black mb-2">
                Message Sent!
              </h3>
              <p className="text-text-secondary">
                Thanks for reaching out. We&apos;ll get back to you as soon as
                possible.
              </p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={0.1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold text-brand-black mb-2"
                  >
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    {...register("name")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border bg-white outline-none transition-all duration-fast",
                      "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                      errors.name
                        ? "border-error ring-2 ring-error/20"
                        : "border-border"
                    )}
                    placeholder="Your Name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-error text-sm mt-1.5" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-semibold text-brand-black mb-2"
                  >
                    Phone <span className="text-primary">*</span>
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    {...register("phone")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border bg-white outline-none transition-all duration-fast",
                      "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                      errors.phone
                        ? "border-error ring-2 ring-error/20"
                        : "border-border"
                    )}
                    placeholder="Your Phone Number"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-error text-sm mt-1.5" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-semibold text-brand-black mb-2"
                >
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  {...register("email")}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-white outline-none transition-all duration-fast",
                    "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                    errors.email
                      ? "border-error ring-2 ring-error/20"
                      : "border-border"
                  )}
                  placeholder="Your Email Address"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-error text-sm mt-1.5" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-semibold text-brand-black mb-2"
                >
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  {...register("message")}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-white outline-none transition-all duration-fast resize-none",
                    "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                    errors.message
                      ? "border-error ring-2 ring-error/20"
                      : "border-border"
                  )}
                  placeholder="How can we help you?"
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p id="message-error" className="text-error text-sm mt-1.5" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={<Send size={20} />}
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
