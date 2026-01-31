import { Card } from "@/components/ui/card";
import { Bot, Workflow, Settings } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Asistentes Digitales",
    points: [
      "Atienden consultas",
      "Responden solicitudes",
      "Mantienen activo el flujo con tus clientes",
    ],
  },
  {
    icon: Workflow,
    title: "Procesos que avanzan solos",
    points: [
      "Acciones coordinadas sin esfuerzo",
      "Flujos que se ejecutan cuando se necesitan",
      "Resultados consistentes día y noche",
    ],
  },
  {
    icon: Settings,
    title: "Soluciones que ordenan tu operación",
    points: [
      "Menos sobrecarga para tu equipo",
      "Más claridad en cada paso",
      "Experiencia fluida para clientes y colaboradores",
    ],
  },
];

const WhatWeDo = () => {
  return (
    <section className="py-24 relative bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Automatiza tus procesos y libera tiempo real para tu{" "}
            <span className="text-primary">negocio</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 bg-card border-border hover:border-primary/50 transition-all hover:shadow-blue-glow group animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
              <ul className="space-y-3">
                {feature.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
