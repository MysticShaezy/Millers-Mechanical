// ============================================================================
// Miller Engines & Mechanical — Feature Flag Configuration
// ============================================================================

import type { FeatureFlag } from "@/types";

export const features: FeatureFlag[] = [
  // ─── Production Features (enabled) ────────────────────────────────────────
  {
    id: "cinematic-hero",
    name: "Cinematic GPU Hero",
    description: "Scroll-expanding cinematic hero with image reveal animation",
    enabled: true,
    category: "hero",
  },
  {
    id: "microinteractions",
    name: "Premium Microinteraction Library",
    description: "Magnetic CTAs, hover glows, and subtle feedback animations",
    enabled: true,
    category: "interaction",
  },
  {
    id: "bento-grid",
    name: "Adaptive Bento Grid",
    description: "Services displayed in an adaptive bento-style grid layout",
    enabled: true,
    category: "layout",
  },
  {
    id: "quote-wizard",
    name: "Multi-Step Quote Wizard",
    description: "Guided multi-step enquiry form for lead conversion",
    enabled: true,
    category: "conversion",
  },
  {
    id: "before-after",
    name: "Before-and-After Comparison",
    description: "Draggable slider showing repair work transformations",
    enabled: true,
    category: "content",
  },
  {
    id: "social-proof",
    name: "Trust & Social-Proof Engine",
    description: "Customer reviews, ratings, and trust indicators",
    enabled: true,
    category: "conversion",
  },
  {
    id: "conversion-dock",
    name: "Contextual Sticky Conversion Dock",
    description: "Floating Call/Book CTA that appears after scrolling past hero",
    enabled: true,
    category: "conversion",
  },

  // ─── Design Lab Features (disabled in production) ─────────────────────────
  {
    id: "3d-explorer",
    name: "Interactive 3D Product/Service Explorer",
    description: "Three.js powered 3D model viewer for engine/part exploration",
    enabled: false,
    category: "hero",
  },
  {
    id: "scroll-storytelling",
    name: "Scroll-Driven Storytelling System",
    description: "GSAP ScrollTrigger powered narrative scroll experience",
    enabled: false,
    category: "content",
  },
  {
    id: "page-transitions",
    name: "Shared-Element Page Transitions",
    description: "View Transitions API with shared element morphing",
    enabled: false,
    category: "interaction",
  },
  {
    id: "kinetic-typography",
    name: "Kinetic Typography System",
    description: "Animated text reveals and scroll-driven typography effects",
    enabled: false,
    category: "hero",
  },
  {
    id: "rive-animation",
    name: "Interactive Rive Brand Animation",
    description: "Rive-powered interactive brand animations",
    enabled: false,
    category: "hero",
  },
  {
    id: "ambient-background",
    name: "Dynamic Ambient Background System",
    description: "Contextual background animations that respond to user interaction",
    enabled: false,
    category: "hero",
  },
  {
    id: "command-palette",
    name: "Command Palette and Predictive Search",
    description: "Cmd+K style command palette with search functionality",
    enabled: false,
    category: "system",
  },
  {
    id: "ai-concierge",
    name: "AI Concierge / Guided Advisor",
    description: "AI-powered chat assistant for service recommendations",
    enabled: false,
    category: "conversion",
  },
  {
    id: "service-configurator",
    name: "Interactive Service Configurator",
    description: "Visual service package builder with pricing",
    enabled: false,
    category: "conversion",
  },
  {
    id: "case-studies",
    name: "Filterable Case Study Experience",
    description: "Portfolio of completed work with filtering and detail views",
    enabled: false,
    category: "content",
  },
  {
    id: "map-explorer",
    name: "Interactive Map & Service-Area Explorer",
    description: "Interactive map showing service coverage area",
    enabled: false,
    category: "content",
  },
  {
    id: "personalisation",
    name: "Adaptive Personalisation Engine",
    description: "Content personalisation based on user behaviour and preferences",
    enabled: false,
    category: "system",
  },
  {
    id: "cms-modular",
    name: "CMS-Driven Modular Design System",
    description: "Headless CMS integration for content management",
    enabled: false,
    category: "system",
  },
];

/** Check if a feature is enabled */
export function isFeatureEnabled(id: string): boolean {
  const feature = features.find((f) => f.id === id);
  return feature?.enabled ?? false;
}

/** Get all enabled features */
export function getEnabledFeatures(): FeatureFlag[] {
  return features.filter((f) => f.enabled);
}

/** Get features by category */
export function getFeaturesByCategory(category: FeatureFlag["category"]): FeatureFlag[] {
  return features.filter((f) => f.category === category);
}
