// ─── Google Analytics 4 — GDPR / Consent Mode v2 ────────────────────────────
// GA is loaded ONLY after the user grants analytics consent.
// Replace GA_MEASUREMENT_ID with your real G-XXXXXXXXXX ID.

export const GA_ID = 'G-XXXXXXXXXX';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

function ensureGtag() {
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }
}

/** Call once when the user grants analytics consent. */
export function initAnalytics() {
  if (initialized || !GA_ID || GA_ID === 'G-XXXXXXXXXX') return;
  initialized = true;

  ensureGtag();

  // Signal consent granted (Consent Mode v2)
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
  });

  // Inject the GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
}

/** Track a custom event — silently no-ops if GA isn't loaded. */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
) {
  if (!initialized || !window.gtag) return;
  window.gtag('event', name, params);
}
