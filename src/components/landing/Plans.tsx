import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "$630.000 + IVA CLP",
    description:
      "Célula de IA inicial para automatizar procesos críticos con impacto inmediato.",
    features: [
      "1 Agente de IA Especializado",
      "Automatización de 1 Proceso Crítico",
      "Conexión con 2 herramientas (Zapier/Make)",
      "Métricas de rendimiento semanal",
      "Despliegue en 5 días",
      "Garantía de implementación",
    ],
    highlighted: false,
    cta: "Iniciar con IA",
  },
  {
    name: "Professional",
    price: "$1.190.000 + IVA CLP",
    description:
      "Ecosistema de agentes colaborando en flujos operativos complejos.",
    features: [
      "Ecosistema de Agentes Colaborativos",
      "Automatización de Múltiples Procesos",
      "Integración vía APIs personalizadas",
      "Dashboard de Control en Tiempo Real",
      "Optimización de costos operativos",
      "Soporte prioritario 30 días",
      "Entrega en 7-10 días",
    ],
    highlighted: true,
    cta: "Escalar mi Operación",
  },
  {
    name: "Enterprise",
    price: "Cotización posterior a Auditoría",
    description:
      "Infraestructura autónoma end-to-end diseñada a medida tras evaluación técnica.",
    features: [
      "Auditoría de Procesos y Sistemas",
      "Arquitectura IA personalizada",
      "Pipelines de datos complejos",
      "n8n + Python + APIs avanzadas",
      "Supervisión y Re-entrenamiento",
      "SLA de disponibilidad garantizado",
    ],
    highlighted: false,
    cta: "Solicitar Auditoría",
  },
];

const Plans = () => {
  const handleAction = (planName: string) => {
    const telefono = "56927444800";
    const mensaje = encodeURIComponent(
      `Hola Falco Devs, me interesa el plan ${planName}. Quiero llevar mi operación al 100%.`
    );
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
  };

  return (
    <section id="planes" className="py-24 relative bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Inversión en <span className="text-primary">Eficiencia</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto italic">
            Soluciones diseñadas para empresas que necesitan eficiencia real, no
            automatizaciones básicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 relative overflow-hidden group animate-fade-in ${
                plan.highlighted
                  ? "ring-2 ring-primary shadow-blue-glow-strong scale-105 z-20"
                  : "hover:scale-105 z-10"
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  {plan.name}
                </h3>

                <p className="text-3xl font-bold text-primary mb-3">
                  {plan.price}
                </p>

                <p className="text-sm text-muted-foreground min-h-[40px]">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground text-sm leading-tight">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full h-12 text-md font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-primary shadow-blue-glow-strong hover:shadow-blue-glow"
                    : "hover:bg-primary/10"
                }`}
                variant={plan.highlighted ? "default" : "outline"}
                onClick={() => handleAction(plan.name)}
              >
                {plan.cta}
              </Button>

              {plan.highlighted && (
                <Link
                  to="/proagents"
                  className="mt-4 block text-center text-sm text-primary underline-offset-4 transition hover:underline"
                >
                  Probar wizard ProAgents
                </Link>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
