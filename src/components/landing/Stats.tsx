import { Card } from "@/components/ui/card";

const stats = [
  {
    stat: "80%",
    description: "menos tiempo respondiendo mensajes",
  },
  {
    stat: "24/7",
    description: "Procesos activos",
  },
  {
    stat: "2x",
    description: "productividad interna",
  },
];

const Stats = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Resultados que se sienten en tu{" "}
            <span className="text-primary">operación</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {stats.map((item, index) => (
            <Card
              key={index}
              className="p-8 bg-gradient-to-br from-card to-card/50 border-primary/30 text-center group hover:shadow-blue-glow transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl md:text-6xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform">
                {item.stat}
              </div>
              <p className="text-muted-foreground text-lg">{item.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Ya estamos ayudando a negocios locales a trabajar de forma más rápida, clara y organizada, sin aumentar personal ni sobrecargar equipos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
