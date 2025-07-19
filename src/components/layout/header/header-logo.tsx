import logo from "@/assets/images/logo.png";

/**
 * Logo and title section for the header.
 */
export const HeaderLogo = () => (
    <div className="flex items-center gap-4">
        <img src={logo} alt="Wortionary Logo" className="w-4 h-4" />
        <div className="text-foreground font-semibold text-lg">Wortionary</div>
    </div>
);

export default HeaderLogo;