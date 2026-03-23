import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import SocialBlock from '../components/SocialBlock';
import Footer from '../components/Footer';
import { siteConfig } from '../config/siteConfig';

export default function SocialPage() {
  useEffect(() => {
    document.title = `Social — ${siteConfig.name}`;
  }, []);

  return (
    <>
      <Navbar />
      <SocialBlock standalone />
      <Footer />
    </>
  );
}
