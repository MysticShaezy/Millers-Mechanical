// ============================================================================
// Miller Engines & Mechanical — Navigation Data
// ============================================================================

import type { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];

export const serviceNavigation: NavItem[] = [
  { label: "Vehicle Diagnosis", href: "/services/diagnosis" },
  { label: "Brake Repairs", href: "/services/brake-repairs" },
  { label: "Logbook Servicing", href: "/services/logbook-services" },
  { label: "Air Con Regas", href: "/services/air-con" },
  { label: "Clutch Replacements", href: "/services/clutch" },
  { label: "Suspension & Steering", href: "/services/suspension" },
  { label: "Engine Diagnostics", href: "/services/engine-diagnostics" },
  { label: "Custom Vinyl", href: "/services/custom-vinyl" },
];
