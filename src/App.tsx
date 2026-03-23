import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CookieBanner from './components/CookieBanner';
import Home from './pages/Home';
import SocialPage from './pages/SocialPage';
import MusicPage from './pages/MusicPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <CookieBanner />
    </BrowserRouter>
  );
}
