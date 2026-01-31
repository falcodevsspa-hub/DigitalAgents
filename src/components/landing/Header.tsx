import { Button } from "@/components/ui/button";
import falcoLogo from "@/assets/falcodevs-logo.png";

const Header = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img src={falcoLogo} alt="FalcoDevs SpA" className="h-16 w-auto" />
        </button>
        
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
            className="text-foreground/90 hover:text-primary transition-colors font-medium"
          >
            Inicio
          </button>
          <button 
            onClick={() => scrollToSection("planes")} 
            className="text-foreground/90 hover:text-primary transition-colors font-medium"
          >
            Planes
          </button>
          <button 
            onClick={() => scrollToSection("contacto")} 
            className="text-foreground/90 hover:text-primary transition-colors font-medium"
          >
            Contacto
          </button>
          <Button 
            onClick={() => scrollToSection("contacto")} 
            className="shadow-blue-glow hover:shadow-blue-glow-strong transition-all"
          >
            Contáctanos
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
