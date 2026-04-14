// ─── Google Analytics 4 — GDPR / Consent Mode v2 ────────────────────────────
// gtag.js is loaded in index.html so Google can detect it, but fires nothing
// until the user grants consent. initAnalytics() is called by the cookie banner.

export const GA_ID: string = 'G-L348KF72TD';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

/** Call once when the user grants analytics consent. */
export function initAnalytics() {
  if (initialized || !window.gtag) return;
  initialized = true;

  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
  });
}

/** Track a custom event — silently no-ops if GA isn't initialised. */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
) {
  if (!initialized || !window.gtag) return;
  window.gtag('event', name, params);
}
