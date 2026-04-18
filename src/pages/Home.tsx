// import { Suspense, lazy } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SocialBlock from '../components/SocialBlock';
import MusicBlock from '../components/MusicBlock';
import AboutBlock from '../components/AboutBlock';
import Footer from '../components/Footer';

// const AudioPlayer = lazy(() => import('../components/AudioPlayer'));

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <div className="h-px bg-black/8" />

      <main>
        <div className="flex flex-col md:flex-row md:h-screen">
          <div className="flex-1 md:h-full"><SocialBlock /></div>
          <div className="flex-1 md:h-full"><MusicBlock /></div>
          <div className="flex-1 md:h-full"><AboutBlock /></div>
        </div>
      </main>

      {/* <Suspense fallback={<div className="w-full h-[50vh] bg-[#0a0a0a]" />}>
        <AudioPlayer />
      </Suspense> */}

      <Footer />
    </>
  );
}
