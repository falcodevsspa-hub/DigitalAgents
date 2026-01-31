import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$240.000 CLP",
    description: "Perfecto para negocios que quieren iniciar con automatización básica.",
    features: [
      "1 agente digital",
      "Automatización de 1 proceso clave",
      "Integración con hasta 2 herramientas",
      "Métricas básicas",
      "Entrega en 5 días",
      "1 revisión incluida",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$390.000 CLP",
    description: "Ideal para PYMES que necesitan más eficiencia.",
    features: [
      "2 agentes colaborando",
      "Automación de procesos múltiples",
      "Integración con APIs y flujos más avanzados",
      "Panel de control básico",
      "Entrega en 7 días",
      "3 revisiones",
      "Soporte 30 días",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$720.000 CLP",
    description: "Para empresas que requieren automatización profunda.",
    features: [
      "Automatización end-to-end",
      "Integración con pipelines complejos",
      "Flujos avanzados con n8n",
      "Supervisión y optimización",
      "Soporte 60 días",
      "Tiempo de entrega según complejidad",
    ],
    highlighted: false,
  },
];

const Plans = () => {
  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="planes" className="py-24 relative bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Planes y <span className="text-primary">paquetes</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-8 bg-card border-border hover:border-primary/50 transition-all relative overflow-hidden group animate-fade-in ${
                plan.highlighted ? "ring-2 ring-primary shadow-blue-glow-strong" : ""
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                  Recomendado
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-2 text-foreground">{plan.name}</h3>
                <p className="text-4xl font-bold text-primary mb-3">{plan.price}</p>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${plan.highlighted ? "shadow-blue-glow-strong" : ""}`}
                variant={plan.highlighted ? "default" : "outline"}
                onClick={scrollToContact}
              >
                Solicitar cotización
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
