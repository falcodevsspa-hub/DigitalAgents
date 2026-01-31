import falcoLogo from "@/assets/falco-logo.png";

const Footer = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={falcoLogo} alt="Falco Digital Agents" className="h-10 w-auto" />
          </button>
          
          <p className="text-muted-foreground text-center max-w-2xl">
            FalcoDevs SpA — Desarrollo web, automatización y soluciones digitales.
          </p>
          
          <nav className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={scrollToTop}
              className="text-foreground hover:text-primary transition-colors"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollToSection("planes")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Planes
            </button>
            <button 
              onClick={() => scrollToSection("contacto")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contacto
            </button>
          </nav>
          
          <p className="text-primary font-semibold text-center">
            Potenciamos y damos presencia a tu negocio en la web.
          </p>
          
          <p className="text-sm text-muted-foreground">
            © 2025 FalcoDevs SpA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
