import { Card } from "@/components/ui/card";
import { AlertCircle, Clock, Users, TrendingDown, Zap } from "lucide-react";

const problems = [
  {
    icon: AlertCircle,
    text: "Responder las mismas preguntas una y otra vez",
  },
  {
    icon: Clock,
    text: "Coordinar tareas que deberían ejecutarse solas",
  },
  {
    icon: TrendingDown,
    text: "Perder clientes por demoras innecesarias",
  },
  {
    icon: Zap,
    text: "Procesos lentos o confusos",
  },
  {
    icon: Users,
    text: "Tareas manuales que desgastan a tu equipo",
  },
];

const Problems = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Tu negocio pierde tiempo en{" "}
            <span className="text-primary">tareas repetitivas</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all hover:shadow-blue-glow group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <problem.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-lg text-foreground">{problem.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;
