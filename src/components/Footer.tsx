import { siteConfig } from '../config/siteConfig';

export default function Footer() {
  const { footer } = siteConfig;
  const year = new Date().getFullYear();

  const reopenCookieBanner = () => {
    localStorage.removeItem('scaiblu_cookie_consent_v2');
    window.location.reload();
  };

  return (
    <footer className="bg-[#fafafa] border-t border-black/8 py-4 px-6">
      {/* Mobile: stacked layout */}
      <div className="md:hidden flex flex-col items-center gap-3">
        <a
          href="/"
          className="text-black font-bold text-sm tracking-widest uppercase select-none hover:text-[#cede2c] transition-colors duration-200"
          aria-label="scaiblu home"
        >
          {siteConfig.name}
        </a>
        <nav aria-label="Footer navigation" className="flex gap-3 items-center flex-wrap justify-center">
          <a href={footer.privacyUrl} className="text-[10px] font-bold text-[#cede2c] tracking-wider uppercase hover:opacity-70 transition-opacity duration-200">Privacy</a>
          <span className="text-[#cede2c] font-bold text-[10px]">·</span>
          <a href={footer.confidentialityUrl} className="text-[10px] font-bold text-[#cede2c] tracking-wider uppercase hover:opacity-70 transition-opacity duration-200">Confidentiality</a>
          <span className="text-[#cede2c] font-bold text-[10px]">·</span>
          <button onClick={reopenCookieBanner} className="text-[10px] font-bold text-[#cede2c] tracking-wider uppercase hover:opacity-70 transition-opacity duration-200">Cookies</button>
        </nav>
        <p className="text-[10px] font-bold text-[#cede2c] tracking-wider">© {year} {siteConfig.name}</p>
        <p className="text-[10px] text-black/40 tracking-wider">
          Designed by <a href="https://uxbloom.ch/" target="_blank" rel="noopener noreferrer" className="hover:text-black/70 transition-colors duration-200">rogerdirkx at uxbloom</a>
        </p>
      </div>

      {/* Desktop: single row */}
      <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between gap-4">
        <p className="text-[10px] font-bold text-[#cede2c] tracking-wider">
          © {year} {siteConfig.name}
        </p>
        <a
          href="/"
          className="text-black font-bold text-sm tracking-widest uppercase select-none hover:text-[#cede2c] transition-colors duration-200"
          aria-label="scaiblu home"
        >
          {siteConfig.name}
        </a>
        <nav aria-label="Footer navigation" className="flex gap-4 items-center">
          <a href={footer.privacyUrl} className="text-[10px] font-bold text-[#cede2c] tracking-wider uppercase hover:opacity-70 transition-opacity duration-200">Privacy</a>
          <span className="text-[#cede2c] font-bold text-[10px]">·</span>
          <a href={footer.confidentialityUrl} className="text-[10px] font-bold text-[#cede2c] tracking-wider uppercase hover:opacity-70 transition-opacity duration-200">Confidentiality</a>
          <span className="text-[#cede2c] font-bold text-[10px]">·</span>
          <button onClick={reopenCookieBanner} className="text-[10px] font-bold text-[#cede2c] tracking-wider uppercase hover:opacity-70 transition-opacity duration-200">Cookies</button>
        </nav>
        <p className="text-[10px] text-black/40 tracking-wider">
          Designed by <a href="https://uxbloom.ch/" target="_blank" rel="noopener noreferrer" className="hover:text-black/70 transition-colors duration-200">rogerdirkx at uxbloom</a>
        </p>
      </div>
    </footer>
  );
}
