import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  useEffect(() => {
    document.title = `Privacy Policy — ${siteConfig.name}`;
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <header className="px-6 py-5 border-b border-black/8 flex items-center justify-between">
        <a
          href="/"
          className="text-black font-bold text-sm tracking-widest uppercase hover:text-[#cede2c] transition-colors duration-200"
          aria-label="scaiblu home"
        >
          {siteConfig.name}
        </a>
        <a
          href="/"
          className="text-[10px] font-semibold tracking-wider uppercase text-black/40 hover:text-black transition-colors duration-200"
        >
          ← Back
        </a>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#cede2c] mb-3">Legal</p>
          <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-8">Privacy Policy</h1>

          <div className="prose prose-sm text-black/70 space-y-6 leading-relaxed">
            <p className="text-sm text-black/40">Last updated: April 2026</p>

            <section>
              <h2 className="text-base font-bold text-black mb-2">1. Who we are</h2>
              <p>
                scaiblu is a DJ and music project based in Geneva, Switzerland. This website (<strong>scaiblu.com</strong>) is operated by scaiblu. For any privacy-related questions, contact us at <a href="mailto:hello@scaiblu.com" className="text-[#cede2c] hover:opacity-70 transition-opacity">hello@scaiblu.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black mb-2">2. Data we collect</h2>
              <p>We collect minimal data to operate this website:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                <li><strong>Analytics data</strong> — page views, session duration, and referral source via Google Analytics 4. This is only collected after you explicitly consent via the cookie banner.</li>
                <li><strong>Contact form data</strong> — if you use the contact form, we collect your name, email address, and message content solely to respond to your enquiry.</li>
                <li><strong>Cookies</strong> — see our cookie notice (accessible via the footer) for details.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-black mb-2">3. How we use your data</h2>
              <p>We use your data only to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                <li>Respond to booking enquiries and messages</li>
                <li>Understand how visitors use the website (analytics, with consent only)</li>
                <li>Improve the website experience</li>
              </ul>
              <p className="mt-3">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black mb-2">4. Legal basis</h2>
              <p>
                We process your data based on <strong>consent</strong> (for analytics cookies) and <strong>legitimate interest</strong> (for responding to enquiries). Where required by Swiss law (nFADP) or EU GDPR, we rely on an appropriate legal basis for each processing activity.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black mb-2">5. Data retention</h2>
              <p>
                Contact form enquiries are retained for up to 12 months or until the matter is resolved, whichever comes first. Analytics data is retained per Google's standard retention settings (up to 14 months).
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black mb-2">6. Your rights</h2>
              <p>Under applicable data protection law, you have the right to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Withdraw consent at any time (for cookies, via the cookie settings in the footer)</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, email <a href="mailto:hello@scaiblu.com" className="text-[#cede2c] hover:opacity-70 transition-opacity">hello@scaiblu.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black mb-2">7. Third-party services</h2>
              <p>This site uses the following third-party services:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                <li><strong>Google Analytics 4</strong> — analytics (consent required)</li>
                <li><strong>SoundCloud / YouTube</strong> — embedded music players (may set cookies)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-black mb-2">8. Changes to this policy</h2>
              <p>
                We may update this policy from time to time. The date at the top of this page reflects the most recent revision. Continued use of the site constitutes acceptance of the updated policy.
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
