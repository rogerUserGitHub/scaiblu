import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import MusicBlock from '../components/MusicBlock';
import Footer from '../components/Footer';
import { siteConfig } from '../config/siteConfig';

export default function MusicPage() {
  useEffect(() => {
    document.title = `Music — ${siteConfig.name}`;
  }, []);

  return (
    <>
      <Navbar />
      <MusicBlock standalone />
      <Footer />
    </>
  );
}
