import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  Cpu,
  Database,
  Mail,
  MessageCircle,
  Puzzle,
  Send,
  Settings,
  Sheet,
  TrendingUp,
} from "lucide-react";

type AreaOption = {
  title: string;
  description: string;
  icon: typeof MessageCircle;
};

type ToolOption = {
  label: string;
  icon: typeof MessageCircle;
};

const areaOptions: AreaOption[] = [
  {
    title: "Atencion al cliente",
    description: "Respuestas automaticas 24/7",
    icon: MessageCircle,
  },
  {
    title: "Ventas y seguimiento",
    description: "Pipeline y leads automatico",
    icon: TrendingUp,
  },
  {
    title: "Procesos internos",
    description: "Flujos y tareas repetitivas",
    icon: Settings,
  },
  {
    title: "Otro proceso",
    description: "Cuentanos tu caso especifico",
    icon: Puzzle,
  },
];

const timeOptions = ["1-2 hrs/dia", "3-5 hrs/dia", "+5 hrs/dia"];

const toolOptions: ToolOption[] = [
  { label: "WhatsApp", icon: MessageCircle },
  { label: "CRM/ERP", icon: Database },
  { label: "Email", icon: Mail },
  { label: "Google Sheets", icon: Sheet },
  { label: "Instagram", icon: Bot },
];

const dotClass =
  "h-6 w-6 rounded-full text-xs font-semibold flex items-center justify-center transition-all duration-300";

const ProAgentsPage = () => {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [tools, setTools] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");

  const progress = useMemo(() => {
    if (step === 1) return "25%";
    if (step === 2) return "50%";
    if (step === 3) return "75%";
    return "100%";
  }, [step]);

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(area);
    if (step === 2) return Boolean(time);
    if (step === 3) return Boolean(name.trim() && company.trim() && contact.trim());
    return true;
  }, [area, company, contact, name, step, time]);

  const handleNext = () => {
    if (!canContinue) return;
    if (step < 3) {
      setStep((prev) => prev + 1);
      return;
    }
    setStep(4);
  };

  const handleBack = () => {
    if (step > 1 && step <= 3) {
      setStep((prev) => prev - 1);
    }
  };

  const toggleTool = (tool: string) => {
    setTools((prev) =>
      prev.includes(tool) ? prev.filter((item) => item !== tool) : [...prev, tool]
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleNext();
  };

  return (
    <main className="min-h-screen bg-[#0d1117] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-5 flex items-center justify-between text-xs text-white/55">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Volver al inicio
          </Link>
          <span>falcodevs.cl</span>
        </div>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/30">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2 text-sm text-white/65">
              <Cpu className="h-4 w-4 text-[#2dd4bf]" />
              FalcoDevs / <span className="font-medium text-white">ProAgents</span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              {[1, 2, 3, 4].map((dot) => (
                <div key={dot} className="flex items-center gap-2">
                  <div
                    className={`${dotClass} ${
                      dot < step
                        ? "bg-[#2dd4bf]/20 text-[#2dd4bf]"
                        : dot === step
                          ? "bg-[#2dd4bf] text-[#0d1117]"
                          : "bg-white/10 text-white/40"
                    }`}
                  >
                    {dot === 4 ? <Check className="h-3.5 w-3.5" /> : dot}
                  </div>
                  {dot !== 4 && <span className="h-px w-3 bg-white/20" />}
                </div>
              ))}
            </div>
          </div>

          <div className="h-1 bg-white/10">
            <div className="h-full bg-[#2dd4bf] transition-all duration-500" style={{ width: progress }} />
          </div>

          <form onSubmit={handleSubmit} className="min-h-[560px] p-5 sm:p-7">
            {step === 1 && (
              <div className="animate-fade-in">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#2dd4bf]">Paso 1 de 3</p>
                <h1 className="mb-2 text-2xl font-semibold text-white sm:text-3xl">Que quieres automatizar?</h1>
                <p className="mb-6 text-sm text-white/45">Selecciona el area principal de tu negocio</p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {areaOptions.map((option) => (
                    <button
                      key={option.title}
                      type="button"
                      onClick={() => setArea(option.title)}
                      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
                        area === option.title
                          ? "border-[#2dd4bf]/60 bg-[#2dd4bf]/10"
                          : "border-white/10 bg-white/[0.04] hover:border-[#2dd4bf]/30 hover:bg-white/[0.08]"
                      }`}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2dd4bf]/15 text-[#2dd4bf]">
                        <option.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white/90">{option.title}</p>
                        <p className="text-xs text-white/45">{option.description}</p>
                      </div>
                      <span
                        className={`mt-1 h-4 w-4 rounded-full border ${
                          area === option.title ? "border-[#2dd4bf] bg-[#2dd4bf]" : "border-white/25"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#2dd4bf]">Paso 2 de 3</p>
                <h2 className="mb-2 text-2xl font-semibold text-white sm:text-3xl">Cuanto tiempo pierdes en esto?</h2>
                <p className="mb-6 text-sm text-white/45">Asi dimensionamos el agente correcto para ti</p>

                <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {timeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setTime(option)}
                      className={`rounded-xl border px-4 py-5 text-center transition-all ${
                        time === option
                          ? "border-[#2dd4bf]/60 bg-[#2dd4bf]/10"
                          : "border-white/10 bg-white/[0.04] hover:border-[#2dd4bf]/30"
                      }`}
                    >
                      <p className="text-xl font-semibold text-[#2dd4bf]">{option.split(" ")[0]}</p>
                      <p className="text-xs text-white/50">al dia</p>
                    </button>
                  ))}
                </div>

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#2dd4bf]">Que herramientas usas?</p>
                <div className="flex flex-wrap gap-2">
                  {toolOptions.map((tool) => {
                    const active = tools.includes(tool.label);

                    return (
                      <button
                        key={tool.label}
                        type="button"
                        onClick={() => toggleTool(tool.label)}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition-all ${
                          active
                            ? "border-[#2dd4bf]/60 bg-[#2dd4bf]/15 text-[#2dd4bf]"
                            : "border-white/15 bg-white/[0.04] text-white/70 hover:border-[#2dd4bf]/35"
                        }`}
                      >
                        <tool.icon className="h-3.5 w-3.5" />
                        {tool.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#2dd4bf]">Paso 3 de 3</p>
                <h2 className="mb-2 text-2xl font-semibold text-white sm:text-3xl">Casi listo - a quien le enviamos la propuesta?</h2>
                <p className="mb-6 text-sm text-white/45">En menos de 24 horas recibes alcance, fechas y costo definido</p>

                <div className="mb-5 rounded-xl border border-[#2dd4bf]/30 bg-[#2dd4bf]/10 p-4 text-sm">
                  <div className="flex items-center justify-between border-b border-white/10 py-2 text-white/60">
                    <span>Automatizar</span>
                    <span className="font-medium text-white/90">{area ?? "-"}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 py-2 text-white/60">
                    <span>Tiempo perdido</span>
                    <span className="font-medium text-white/90">{time ?? "-"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-white/60">
                    <span>Herramientas</span>
                    <span className="font-medium text-white/90">{tools.length ? tools.join(", ") : "No especificado"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="text-xs uppercase tracking-[0.08em] text-white/45">
                    Nombre
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Tu nombre"
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#2dd4bf]/60"
                    />
                  </label>

                  <label className="text-xs uppercase tracking-[0.08em] text-white/45">
                    Empresa
                    <input
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      placeholder="Nombre empresa"
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#2dd4bf]/60"
                    />
                  </label>

                  <label className="text-xs uppercase tracking-[0.08em] text-white/45 sm:col-span-2">
                    Email o WhatsApp
                    <input
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                      placeholder="Como prefieras que te contactemos"
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#2dd4bf]/60"
                    />
                  </label>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex min-h-[460px] animate-fade-in items-center justify-center px-2 text-center">
                <div>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#2dd4bf]/15 text-[#2dd4bf]">
                    <Check className="h-7 w-7" />
                  </div>
                  <h2 className="mb-2 text-2xl font-semibold text-white">Propuesta en camino</h2>
                  <p className="mx-auto max-w-md text-sm text-white/45">
                    Revisamos tu caso y te respondemos en menos de 24 horas con un plan concreto desde falcodevs.cl.
                  </p>
                </div>
              </div>
            )}
          </form>

          {step < 4 && (
            <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={handleBack}
                className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm transition ${
                  step === 1 ? "invisible" : "text-white/55 hover:bg-white/[0.05] hover:text-white/80"
                }`}
              >
                <ArrowLeft className="h-4 w-4" /> Atras
              </button>

              <button
                type={step === 3 ? "submit" : "button"}
                onClick={step === 3 ? undefined : handleNext}
                disabled={!canContinue}
                className="inline-flex items-center gap-2 rounded-md bg-[#2dd4bf] px-4 py-2 text-sm font-medium text-[#0d1117] transition hover:bg-[#5eead4] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
              >
                {step === 3 ? "Enviar" : "Continuar"}
                {step === 3 ? <Send className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProAgentsPage;
