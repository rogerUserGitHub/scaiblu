import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CookieBanner from './components/CookieBanner';
import Home from './pages/Home';
import SocialPage from './pages/SocialPage';
import MusicPage from './pages/MusicPage';
import PrivacyPage from './pages/PrivacyPage';
import ConfidentialityPage from './pages/ConfidentialityPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/confidentiality" element={<ConfidentialityPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <CookieBanner />
    </BrowserRouter>
  );
}
