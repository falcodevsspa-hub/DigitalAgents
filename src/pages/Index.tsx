import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Problems from "@/components/landing/Problems";
import WhatWeDo from "@/components/landing/WhatWeDo";
import HowWeWork from "@/components/landing/HowWeWork";
import Plans from "@/components/landing/Plans";
import Stats from "@/components/landing/Stats";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Problems />
      <WhatWeDo />
      <HowWeWork />
      <Plans />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
