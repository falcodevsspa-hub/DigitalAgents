import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          email: formData.email,
          business_type: formData.businessType,
          message: formData.message,
          to_email: "falcowebsspa@gmail.com"
        },
        publicKey
      );

      toast({
        title: "Mensaje enviado correctamente",
        description: "Te responderemos pronto.",
      });
      setFormData({ name: "", email: "", businessType: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "No pudimos enviar el mensaje",
        description: "Inténtalo nuevamente.",
        variant: "destructive",
      });
    }
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/XXXXXXXX", "_blank");
  };

  return (
    <section id="contacto" className="py-24 relative bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Conversemos sobre tu{" "}
            <span className="text-primary">proyecto</span>
          </h2>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12 bg-card border-border animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground">Nombre</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-2 bg-background border-border focus:border-primary"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-2 bg-background border-border focus:border-primary"
                />
              </div>
              
              <div>
                <Label htmlFor="businessType" className="text-foreground">Tipo de negocio</Label>
                <Input
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  required
                  className="mt-2 bg-background border-border focus:border-primary"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-foreground">Mensaje</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="mt-2 bg-background border-border focus:border-primary resize-none"
                />
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Te respondemos en menos de 24 horas.
              </p>
              
              <Button type="submit" className="w-full shadow-blue-glow">
                Enviar mensaje
              </Button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-border text-center">
              <Button 
                onClick={handleWhatsApp}
                variant="outline"
                className="border-primary/50 hover:bg-primary/10"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Escríbenos por WhatsApp
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
