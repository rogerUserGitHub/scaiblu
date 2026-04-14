import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import Footer from '../components/Footer';

export default function ConfidentialityPage() {
  useEffect(() => {
    document.title = `Confidentiality — ${siteConfig.name}`;
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
          <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-8">Confidentiality</h1>

          <div className="prose prose-sm text-black/70 space-y-6 leading-relaxed">
            <p className="text-sm text-black/40">Last updated: April 2026</p>

            <section>
              <h2 className="text-base font-bold text-black mb-2">1. Overview</h2>
              <p>
                scaiblu is committed to handling all communications, booking enquiries, and shared materials with strict confidentiality. Any information you share with us — whether through the contact form, email, or any other channel — is treated as private and will not be disclosed to third parties without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black mb-2">2. Booking enquiries</h2>
              <p>
                All booking enquiries, event details, fee discussions, and related correspondence are treated as confidential. We do not share the details of any proposed or confirmed bookings with other artists, promoters, or the public unless both parties agree to do so.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black mb-2">3. Collaborations &amp; creative materials</h2>
              <p>
                Any unreleased tracks, creative briefs, event concepts, or other materials shared in the context of a collaboration are held in strict confidence. We will not reproduce, distribute, or disclose such materials without written agreement from all parties involved.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black mb-2">4. Personal information</h2>
              <p>
                Personal information shared with us (including name, contact details, and event information) is used solely for the purpose for which it was provided. For details on how we collect, store, and protect personal data, please refer to our <a href="/privacy" className="text-[#cede2c] hover:opacity-70 transition-opacity">Privacy Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black mb-2">5. Non-disclosure</h2>
              <p>
                Where a formal non-disclosure agreement (NDA) is required for a project or collaboration, we are open to signing one. Please mention this in your initial enquiry and we will arrange accordingly.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black mb-2">6. Internal handling</h2>
              <p>
                Access to confidential communications is limited to those directly involved in the relevant project or enquiry. We do not maintain mailing lists, share contact information with marketing partners, or use your details for any purpose beyond the scope of your original enquiry.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-black mb-2">7. Contact</h2>
              <p>
                If you have concerns about how your information or communications have been handled, please contact us directly at <a href="mailto:hello@scaiblu.com" className="text-[#cede2c] hover:opacity-70 transition-opacity">hello@scaiblu.com</a>.
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
