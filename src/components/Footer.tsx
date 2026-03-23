import { siteConfig } from '../config/siteConfig';

export default function Footer() {
  const { footer } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#fafafa] border-t border-black/8 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
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

        <nav aria-label="Footer navigation" className="flex gap-4">
          <a
            href={footer.privacyUrl}
            className="text-[10px] font-bold text-[#cede2c] tracking-wider uppercase hover:opacity-70 transition-opacity duration-200"
          >
            Privacy
          </a>
          <span className="text-[#cede2c] font-bold text-[10px]">·</span>
          <a
            href={footer.confidentialityUrl}
            className="text-[10px] font-bold text-[#cede2c] tracking-wider uppercase hover:opacity-70 transition-opacity duration-200"
          >
            Confidentiality
          </a>
        </nav>
      </div>
    </footer>
  );
}
