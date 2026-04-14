import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initAnalytics } from '../analytics';

const STORAGE_KEY = 'scaiblu_cookie_consent_v2';

type ConsentState = {
  necessary: true;       // always on
  analytics: boolean;
};

type StoredConsent = ConsentState & { decided: true };

function loadStored(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredConsent;
  } catch {
    return null;
  }
}

function saveConsent(consent: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...consent, decided: true }));
  if (consent.analytics) initAnalytics();
}

// ─── Toggle component ────────────────────────────────────────────────────────
function Toggle({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border transition-colors duration-200 focus-visible:outline-none ${
        disabled
          ? 'cursor-not-allowed border-black/10 bg-black/10'
          : checked
          ? 'border-[#cede2c] bg-[#cede2c] cursor-pointer'
          : 'border-black/20 bg-black/10 cursor-pointer'
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform duration-200 self-center ${
          checked ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

// ─── Main banner ─────────────────────────────────────────────────────────────
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = loadStored();
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
    // Re-initialise GA if consent was already given in a previous visit
    if (stored.analytics) initAnalytics();
  }, []);

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true });
    setVisible(false);
  };

  const rejectAll = () => {
    saveConsent({ necessary: true, analytics: false });
    setVisible(false);
  };

  const savePrefs = () => {
    saveConsent({ necessary: true, analytics });
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-[380px] z-[100] bg-white rounded-2xl shadow-2xl border border-black/8 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!showPrefs ? (
              /* ── Default view ── */
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-5"
              >
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black/40 mb-1">
                  Cookie notice
                </p>
                <p className="text-xs text-black/60 leading-relaxed mb-4">
                  We use cookies to keep the site working and, with your
                  consent, to understand how you interact with it via Google
                  Analytics. No personal data is shared with third parties
                  without your consent.
                </p>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={acceptAll}
                    className="w-full bg-[#cede2c] text-black text-xs font-semibold tracking-wider uppercase py-2.5 rounded-full hover:bg-[#d9e830] transition-colors duration-200"
                  >
                    Accept all
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={rejectAll}
                      className="flex-1 bg-black/5 text-black/60 text-xs font-semibold tracking-wider uppercase py-2.5 rounded-full hover:bg-black/10 transition-colors duration-200"
                    >
                      Reject all
                    </button>
                    <button
                      onClick={() => setShowPrefs(true)}
                      className="flex-1 bg-black/5 text-black/60 text-xs font-semibold tracking-wider uppercase py-2.5 rounded-full hover:bg-black/10 transition-colors duration-200"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ── Preferences view ── */
              <motion.div
                key="prefs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-5"
              >
                <button
                  onClick={() => setShowPrefs(false)}
                  className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-black/40 hover:text-black/60 transition-colors mb-3"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  Back
                </button>

                <p className="text-xs font-semibold text-black mb-3">Cookie preferences</p>

                {/* Necessary */}
                <div className="flex items-start justify-between gap-4 py-3 border-t border-black/6">
                  <div>
                    <p className="text-xs font-semibold text-black leading-snug">Necessary</p>
                    <p className="text-[11px] text-black/50 leading-relaxed mt-0.5">
                      Required for the site to function. Cannot be disabled.
                    </p>
                  </div>
                  <Toggle checked={true} disabled />
                </div>

                {/* Analytics */}
                <div className="flex items-start justify-between gap-4 py-3 border-t border-black/6">
                  <div>
                    <p className="text-xs font-semibold text-black leading-snug">Analytics</p>
                    <p className="text-[11px] text-black/50 leading-relaxed mt-0.5">
                      Google Analytics — helps us understand which content
                      resonates. IP addresses are anonymised. No ad tracking.
                    </p>
                  </div>
                  <Toggle checked={analytics} onChange={setAnalytics} />
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={savePrefs}
                    className="flex-1 bg-[#cede2c] text-black text-xs font-semibold tracking-wider uppercase py-2.5 rounded-full hover:bg-[#d9e830] transition-colors duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={acceptAll}
                    className="flex-1 bg-black/5 text-black/60 text-xs font-semibold tracking-wider uppercase py-2.5 rounded-full hover:bg-black/10 transition-colors duration-200"
                  >
                    Accept all
                  </button>
                </div>

                <p className="text-[10px] text-black/30 text-center mt-3 leading-relaxed">
                  You can change your preferences at any time via the footer.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
