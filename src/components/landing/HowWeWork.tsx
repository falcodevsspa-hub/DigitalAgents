import { Card } from "@/components/ui/card";
import { Search, Lightbulb, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Diagnóstico suave",
    description: "Entendemos cómo funciona tu negocio y qué puedes liberar de tus manos.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Diseño del flujo inteligente",
    description: "Creamos un sistema que se encarga de esas tareas por ti.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Implementación sin fricción",
    description: "Lo dejamos funcionando y tú disfrutas el orden, la claridad y el alivio.",
  },
];

const HowWeWork = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Cómo <span className="text-primary">trabajamos</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-8 bg-card border-border hover:border-primary/50 transition-all hover:shadow-blue-glow relative overflow-hidden group animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                {step.number}
              </div>
              <div className="mb-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground relative z-10">{step.title}</h3>
              <p className="text-muted-foreground relative z-10">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
