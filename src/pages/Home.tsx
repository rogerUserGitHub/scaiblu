import Hero from '../components/Hero';
import SocialBlock from '../components/SocialBlock';
import MusicBlock from '../components/MusicBlock';
import ContactBlock from '../components/ContactBlock';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Hero />

      <div className="h-px bg-black/8" />

      <main>
        {/* Side-by-side on desktop, stacked on mobile */}
        <div className="flex flex-col md:flex-row md:h-screen">
          <div className="flex-1 md:h-full">
            <SocialBlock />
          </div>
          <div className="flex-1 md:h-full">
            <MusicBlock />
          </div>
          <div className="flex-1 md:h-full">
            <ContactBlock />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
