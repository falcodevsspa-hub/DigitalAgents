import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Blue glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-bright/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Agentes Inteligentes que{" "}
            <span className="text-primary drop-shadow-[0_0_30px_rgba(58,140,255,0.5)]">
              Automatizan
            </span>{" "}
            tu Negocio
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Organizamos y potenciamos el funcionamiento interno de tu empresa, para que tus procesos avancen solos, sin fricciones y sin esfuerzo.
          </p>
          
          <p className="text-lg md:text-xl text-primary font-semibold">
            Potenciamos y damos presencia a tu negocio en la web.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8 shadow-blue-glow-strong hover:shadow-blue-glow hover:scale-105 transition-all"
              onClick={() => scrollToSection("contacto")}
            >
              Contáctanos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 border-primary/50 hover:bg-primary/10"
              onClick={() => scrollToSection("planes")}
            >
              Ver planes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
