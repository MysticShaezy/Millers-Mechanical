// ============================================================================
// Miller Engines & Mechanical — Analytics Event Tracking
// ============================================================================

type EventCategory = "cta" | "form" | "navigation" | "engagement";

interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
}

/**
 * Track an analytics event.
 * In development, logs to console.
 * In production, pipe to GA4, GTM, or your preferred analytics platform.
 */
export function trackEvent({ category, action, label, value }: AnalyticsEvent): void {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${category}/${action}`, { label, value });
  }

  // GA4 integration point:
  // if (typeof window !== "undefined" && window.gtag) {
  //   window.gtag("event", action, {
  //     event_category: category,
  //     event_label: label,
  //     value: value,
  //   });
  // }
}

/** Pre-built event trackers */
export const analytics = {
  ctaClick: (label: string) =>
    trackEvent({ category: "cta", action: "click", label }),

  phoneClick: () =>
    trackEvent({ category: "cta", action: "phone_click", label: "header" }),

  formSubmit: (formName: string) =>
    trackEvent({ category: "form", action: "submit", label: formName }),

  formError: (formName: string, field: string) =>
    trackEvent({ category: "form", action: "validation_error", label: `${formName}:${field}` }),

  serviceView: (slug: string) =>
    trackEvent({ category: "engagement", action: "service_view", label: slug }),

  scrollDepth: (percentage: number) =>
    trackEvent({ category: "engagement", action: "scroll_depth", value: percentage }),
};
