import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import ContactBlock from '../components/ContactBlock';
import Footer from '../components/Footer';
import { siteConfig } from '../config/siteConfig';

export default function ContactPage() {
  useEffect(() => {
    document.title = `Contact — ${siteConfig.name}`;
  }, []);

  return (
    <>
      <Navbar />
      <ContactBlock standalone />
      <Footer />
    </>
  );
}
