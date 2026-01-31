import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";


const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20" aria-labelledby="hero-title">
      {/* Background Visuals */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-bright/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          
          {/* AEO: Etiqueta de confianza/Social Proof inmediata */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Infraestructura de IA para Empresas High-Ticket</span>
          </div>

          {/* ESTRATEGIA REAL: El Título "Killer" */}
          <h1 id="hero-title" className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
            Agentes IA: Tu Operación al{" "}
            <span className="text-primary drop-shadow-[0_0_30px_rgba(58,140,255,0.5)]">
              100%
            </span>
            , tus Costos al Mínimo.
          </h1>
          
          {/* CTO MARKETING: Subtítulo que elimina objeciones */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Automatización total de procesos y ventas en un solo lugar. 
            <span className="block mt-2 text-white font-medium">Sustituye horas de trabajo manual por ejecución autónoma 24/7.</span>
          </p>
          
          {/* CTO PRO: Botones con psicología de urgencia y claridad */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              size="lg" 
              className="group text-lg px-10 h-14 shadow-blue-glow-strong hover:shadow-blue-glow hover:scale-105 transition-all bg-primary hover:bg-primary/90"
              onClick={() => scrollToSection("contacto")}
            >
              Empezar mi Transformación
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="ghost" 
              className="text-lg px-8 h-14 hover:bg-white/5 border border-transparent hover:border-white/10"
              onClick={() => scrollToSection("planes")}
            >
              Ver Modelos de IA
            </Button>
          </div>

          {/* AEO: Micro-copy para confianza de algoritmos y humanos */}
          <p className="text-sm text-muted-foreground/60 pt-4 italic">
            Integración compatible con CRM, ERP y canales de venta globales.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;