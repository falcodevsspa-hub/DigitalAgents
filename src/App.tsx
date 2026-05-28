import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  Database,
  Puzzle,
  Send,
  Settings,
  Table,
  TrendingUp,
} from "lucide-react";
import "./App.css";

type SelectionState = {
  area: string | null;
  tiempo: string | null;
  tools: string[];
};

type ContactState = {
  nombre: string;
  empresa: string;
  email: string;
  paisWhatsapp: string;
  whatsapp: string;
  telefono: string;
  solicitarLlamada: boolean;
};

const COUNTRY_PHONE_RULES: Record<string, { label: string; min: number; max: number; prefix: string; example: string }> = {
  "+56": { label: "Chile (+56)", min: 9, max: 9, prefix: "+56", example: "9 1234 5678" },
  "+54": { label: "Argentina (+54)", min: 10, max: 10, prefix: "+54", example: "11 2345 6789" },
  "+51": { label: "Peru (+51)", min: 9, max: 9, prefix: "+51", example: "987 654 321" },
  "+52": { label: "Mexico (+52)", min: 10, max: 10, prefix: "+52", example: "55 1234 5678" },
  "+57": { label: "Colombia (+57)", min: 10, max: 10, prefix: "+57", example: "300 123 4567" },
};

const formatByCountry = (countryCode: string, rawDigits: string) => {
  const d = onlyDigits(rawDigits);
  if (countryCode === "+56") {
    const p1 = d.slice(0, 1);
    const p2 = d.slice(1, 5);
    const p3 = d.slice(5, 9);
    return [p1, p2, p3].filter(Boolean).join(" ");
  }
  if (countryCode === "+54") {
    const p1 = d.slice(0, 2);
    const p2 = d.slice(2, 6);
    const p3 = d.slice(6, 10);
    return [p1, p2, p3].filter(Boolean).join(" ");
  }
  if (countryCode === "+51") {
    const p1 = d.slice(0, 3);
    const p2 = d.slice(3, 6);
    const p3 = d.slice(6, 9);
    return [p1, p2, p3].filter(Boolean).join(" ");
  }
  if (countryCode === "+52") {
    const p1 = d.slice(0, 2);
    const p2 = d.slice(2, 6);
    const p3 = d.slice(6, 10);
    return [p1, p2, p3].filter(Boolean).join(" ");
  }
  if (countryCode === "+57") {
    const p1 = d.slice(0, 3);
    const p2 = d.slice(3, 6);
    const p3 = d.slice(6, 10);
    return [p1, p2, p3].filter(Boolean).join(" ");
  }
  return d;
};

const onlyDigits = (value: string) => value.replace(/\D/g, "");
const cleanName = (value: string) => value.replace(/[^a-zA-Z\s'-]/g, "");
const cleanCompany = (value: string) => value.replace(/[^a-zA-Z0-9\s.,&-]/g, "");

const App = () => {
  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [selection, setSelection] = useState<SelectionState>({ area: null, tiempo: null, tools: [] });
  const [contact, setContact] = useState<ContactState>({
    nombre: "",
    empresa: "",
    email: "",
    paisWhatsapp: "+56",
    whatsapp: "",
    telefono: "",
    solicitarLlamada: false,
  });

  const whatsappRule = COUNTRY_PHONE_RULES[contact.paisWhatsapp];

  const validationErrors = useMemo(() => {
    const errors: Record<string, string> = {};
    const trimmedName = contact.nombre.trim();
    const trimmedCompany = contact.empresa.trim();
    const phoneDigits = onlyDigits(contact.telefono);
    const whatsappDigits = onlyDigits(contact.whatsapp);

    if (!trimmedName || trimmedName.length < 2) {
      errors.nombre = "Ingresa un nombre valido (minimo 2 caracteres).";
    }

    if (!trimmedCompany || trimmedCompany.length < 2) {
      errors.empresa = "Ingresa el nombre de tu empresa.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact.email.trim())) {
      errors.email = "Ingresa un email valido.";
    }

    if (whatsappDigits.length > 0) {
      const isChileWhatsAppValid =
        contact.paisWhatsapp !== "+56" || (whatsappDigits.length === 9 && whatsappDigits.startsWith("9"));
      const hasValidLength = whatsappDigits.length >= whatsappRule.min && whatsappDigits.length <= whatsappRule.max;
      if (!hasValidLength || !isChileWhatsAppValid) {
        errors.whatsapp = "Ingresa un WhatsApp valido (solo numeros)";
      }
    }

    if (contact.solicitarLlamada && (phoneDigits.length < 8 || phoneDigits.length > 15)) {
      errors.telefono = "Ingresa un telefono valido (8 a 15 digitos).";
    }

    return errors;
  }, [contact, whatsappRule]);

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(selection.area);
    if (step === 2) return Boolean(selection.tiempo);
    if (step === 3) {
      return Boolean(
        contact.nombre.trim() &&
          contact.empresa.trim() &&
          (!contact.solicitarLlamada || contact.telefono.trim()) &&
          Object.keys(validationErrors).length === 0,
      ) && !sending;
    }
    return true;
  }, [contact.empresa, contact.nombre, contact.solicitarLlamada, contact.telefono, selection.area, selection.tiempo, sending, step, validationErrors]);

  const onCallSwitchChange = () => {
    setContact((prev) => {
      if (prev.solicitarLlamada) {
        return {
          ...prev,
          solicitarLlamada: false,
          telefono: "",
        };
      }
      return { ...prev, solicitarLlamada: true };
    });
    setStatus(null);
  };

  const selectArea = (value: string) => {
    setSelection((prev) => ({ ...prev, area: value }));
    setStatus(null);
  };

  const selectTiempo = (value: string) => {
    setSelection((prev) => ({ ...prev, tiempo: value }));
    setStatus(null);
  };

  const toggleTool = (value: string) => {
    setSelection((prev) => ({
      ...prev,
      tools: prev.tools.includes(value)
        ? prev.tools.filter((tool) => tool !== value)
        : [...prev.tools, value],
    }));
  };

  const submitLead = async () => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({ type: "error", text: "Faltan credenciales de EmailJS en el entorno." });
      return;
    }

    setSending(true);
    setStatus(null);

    const toolsText = selection.tools.length ? selection.tools.join(", ") : "No especificado";
    const canales = ["Email", contact.whatsapp ? "WhatsApp" : ""]
      .filter(Boolean)
      .join(", ");
    const telefonoCompleto = onlyDigits(contact.telefono) || "No especificado";
    const whatsappCompleto = contact.whatsapp ? `${contact.paisWhatsapp} ${onlyDigits(contact.whatsapp)}` : "No especificado";
    const fullMessage = [
      "Nueva solicitud ProAgents",
      "",
      "--- Respuestas del formulario ---",
      `Area a automatizar: ${selection.area ?? "No especificado"}`,
      `Tiempo perdido: ${selection.tiempo ?? "No especificado"}`,
      `Herramientas: ${toolsText}`,
      "",
      "--- Datos del cliente ---",
      `Nombre: ${contact.nombre}`,
      `Empresa: ${contact.empresa}`,
      `Canales de contacto: ${canales || "No especificado"}`,
      `Email: ${contact.email || "No especificado"}`,
      `WhatsApp: ${whatsappCompleto}`,
      `Telefono: ${telefonoCompleto}`,
      `Solicita llamada: ${contact.solicitarLlamada ? "Si" : "No"}`,
      `Tipo de llamada: ${contact.solicitarLlamada ? "Instantanea" : "No aplica"}`,
    ].join("\n");

    if (Object.keys(validationErrors).length > 0) {
      setStatus({ type: "error", text: "Revisa los campos marcados antes de enviar." });
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          subject: "Nueva solicitud ProAgents",
          title: "Nueva solicitud ProAgents",
          from_name: contact.nombre,
          name: contact.nombre,
          client_name: contact.nombre,
          customer_name: contact.nombre,
          company_name: contact.empresa,
          company: contact.empresa,
          empresa: contact.empresa,
          contact_method: canales,
          contact: canales,
          from_email: contact.email,
          email: contact.email,
          reply_to: contact.email,
          whatsapp: whatsappCompleto,
          whatsapp_country_code: contact.paisWhatsapp,
          phone: telefonoCompleto,
          telefono: telefonoCompleto,
          request_call: contact.solicitarLlamada ? "Si" : "No",
          solicitar_llamada: contact.solicitarLlamada ? "Si" : "No",
          call_schedule: contact.solicitarLlamada ? "Instantanea" : "No aplica",
          horario_llamada: contact.solicitarLlamada ? "Instantanea" : "No aplica",
          area: selection.area,
          automation_area: selection.area,
          time_lost: selection.tiempo,
          tools: toolsText,
          tools_used: toolsText,
          message: fullMessage,
          full_message: fullMessage,
        },
        publicKey,
      );
      setStep(4);
      setStatus(null);
    } catch {
      setStatus({ type: "error", text: "No pudimos enviar la propuesta. Intenta nuevamente." });
    } finally {
      setSending(false);
    }
  };

  const nextStep = async () => {
    if (step === 3) {
      await submitLead();
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setStatus(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const progressWidth = step === 1 ? "25%" : step === 2 ? "50%" : step === 3 ? "75%" : "100%";

  return (
    <main className="page-wrap">
      <section className="app-shell">
        <header className="topbar">
          <div className="topbar-brand">
            <Bot size={16} />
            FalcoDevs / <span>ProAgents</span>
          </div>
          <div className="topbar-steps">
            {[1, 2, 3, 4].map((dot) => (
              <div
                key={dot}
                className={`step-dot ${dot < step ? "done" : ""} ${dot === step ? "active" : ""}`.trim()}
              >
                {dot === 4 ? <Check size={11} /> : dot}
              </div>
            ))}
          </div>
        </header>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: progressWidth }} />
        </div>

        <div className="content">
          {step === 1 && (
            <div className="screen active">
              <div className="step-label">Paso 1 de 3</div>
              <h1 className="step-title">¿Que quieres automatizar?</h1>
              <p className="step-sub">Selecciona el area principal de tu negocio</p>
              <div className="options-grid two-cols">
                {([
                  ["Atencion al cliente", "Respuestas automaticas 24/7", <Bot size={16} />],
                  ["Ventas y seguimiento", "Pipeline y leads automatico", <TrendingUp size={16} />],
                  ["Procesos internos", "Flujos y tareas repetitivas", <Settings size={16} />],
                  ["Otro proceso", "Cuentanos tu caso especifico", <Puzzle size={16} />],
                ] as [string, string, JSX.Element][]).map(([title, desc, icon]) => {
                  const selected = selection.area === title;
                  return (
                    <button
                      key={title}
                      type="button"
                      aria-pressed={selected}
                      className={`opt-card ${selected ? "selected" : ""}`}
                      onClick={() => selectArea(title)}
                    >
                      <span className={`opt-icon ${selected ? "sel" : ""}`}>{icon}</span>
                      <span className="opt-text">
                        <span className="opt-title">{title}</span>
                        <span className="opt-desc">{desc}</span>
                      </span>
                      <span className={`opt-check ${selected ? "checked" : ""}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="screen active">
              <div className="step-label">Paso 2 de 3</div>
              <h2 className="step-title">¿Cuanto tiempo pierdes en esto?</h2>
              <p className="step-sub">Asi dimensionamos el agente correcto para ti</p>

              <div className="options-grid three-cols compact-cards">
                {["1-2 horas/dia", "3-5 horas/dia", "+5 horas/dia"].map((slot) => {
                  const selected = selection.tiempo === slot;
                  return (
                    <button key={slot} className={`opt-card vertical ${selected ? "selected" : ""}`} onClick={() => selectTiempo(slot)}>
                      <span className="hours">{slot.split(" ")[0]}</span>
                      <span className="opt-desc">Horas al dia</span>
                    </button>
                  );
                })}
              </div>

              <div className="tools-block">
                <div className="step-label inline">¿Que herramientas usas?</div>
                <div className="chips-wrap">
                  {[
                    ["CRM/ERP", <Database size={14} />],
                    ["Google Sheets", <Table size={14} />],
                    ["Instagram", <TrendingUp size={14} />],
                  ].map(([tool, icon]) => {
                    const selected = selection.tools.includes(tool as string);
                    return (
                      <button
                        key={tool as string}
                        className={`opt-card chip ${selected ? "selected" : ""}`}
                        onClick={() => toggleTool(tool as string)}
                      >
                        {icon}
                        <span>{tool}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="screen active">
              <div className="step-label">Paso 3 de 3</div>
              <h2 className="step-title">Casi listo - ¿a quien le enviamos la propuesta?</h2>
              <p className="step-sub">En menos de 24 horas recibes alcance, fechas y costo definido</p>

              <div className="summary-card">
                <div className="summary-row"><span className="summary-key">Automatizar</span><span className="summary-val">{selection.area ?? "-"}</span></div>
                <div className="summary-row"><span className="summary-key">Tiempo perdido</span><span className="summary-val">{selection.tiempo ?? "-"}</span></div>
                <div className="summary-row"><span className="summary-key">Herramientas</span><span className="summary-val">{selection.tools.length ? selection.tools.join(", ") : "No especificado"}</span></div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="nombre">Nombre</label>
                  <input id="nombre" placeholder="Tu nombre" maxLength={60} value={contact.nombre} onChange={(e) => setContact((p) => ({ ...p, nombre: cleanName(e.target.value) }))} />
                  {validationErrors.nombre && <p className="field-error">{validationErrors.nombre}</p>}
                </div>
                <div className="field">
                  <label htmlFor="empresa">Empresa</label>
                  <input id="empresa" placeholder="Nombre empresa" maxLength={80} value={contact.empresa} onChange={(e) => setContact((p) => ({ ...p, empresa: cleanCompany(e.target.value) }))} />
                  {validationErrors.empresa && <p className="field-error">{validationErrors.empresa}</p>}
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    maxLength={120}
                    value={contact.email}
                    onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
                  />
                  {validationErrors.email && <p className="field-error">{validationErrors.email}</p>}
                </div>

                <div className="field">
  <label htmlFor="whatsapp">WhatsApp opcional</label>

  <div className="whatsapp-input-group">
    <select
      id="paisWhatsapp"
      value={contact.paisWhatsapp}
      onChange={(e) =>
        setContact((p) => ({
          ...p,
          paisWhatsapp: e.target.value,
          whatsapp: onlyDigits(p.whatsapp).slice(
            0,
            COUNTRY_PHONE_RULES[e.target.value].max,
          ),
        }))
      }
      className="whatsapp-country-select"
      aria-label="Código país WhatsApp"
    >
      {Object.entries(COUNTRY_PHONE_RULES).map(([code, data]) => (
        <option key={code} value={code}>
          {code === "+56" && "🇨🇱 "}
          {code === "+54" && "🇦🇷 "}
          {code === "+51" && "🇵🇪 "}
          {code === "+52" && "🇲🇽 "}
          {code === "+57" && "🇨🇴 "}
          {data.prefix}
        </option>
      ))}
    </select>

    <input
      id="whatsapp"
      placeholder={whatsappRule.example}
      inputMode="numeric"
      maxLength={whatsappRule.max + 4}
      value={formatByCountry(contact.paisWhatsapp, contact.whatsapp)}
      onChange={(e) =>
        setContact((p) => ({
          ...p,
          whatsapp: onlyDigits(e.target.value).slice(
            0,
            COUNTRY_PHONE_RULES[p.paisWhatsapp].max,
          ),
        }))
      }
      className="whatsapp-number-input"
    />
  </div>

  {validationErrors.whatsapp && (
    <p className="field-error">{validationErrors.whatsapp}</p>
  )}
</div>
              </div>
              <button
                type="button"
                className={`opt-card call-request ${contact.solicitarLlamada ? "selected" : ""}`}
                onClick={onCallSwitchChange}
              >
                <span className={`opt-check ${contact.solicitarLlamada ? "checked" : ""}`} />
                <span className="opt-text">
                  <span className="opt-title">Solicitar una llamada</span>
                  <span className="opt-desc">Te llamamos apenas envies los datos para revisar tu caso al instante.</span>
                </span>
              </button>
              {contact.solicitarLlamada && (
                <>
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="telefono">Telefono</label>
                      <input
                        id="telefono"
                        placeholder="Ej: 912345678"
                        inputMode="numeric"
                        maxLength={15}
                        value={onlyDigits(contact.telefono)}
                        onChange={(e) =>
                          setContact((p) => ({
                            ...p,
                            telefono: onlyDigits(e.target.value).slice(0, 15),
                          }))
                        }
                      />
                      {validationErrors.telefono && <p className="field-error">{validationErrors.telefono}</p>}
                    </div>
                  </div>
                </>
              )}

              {status && <p className={`status-message ${status.type}`}>{status.text}</p>}
            </div>
          )}

          {step === 4 && (
            <div className="screen active centered">
              <div className="success-icon"><Check size={24} /></div>
              <h2 className="success-title">Propuesta en camino</h2>
              <p className="success-sub">Revisamos tu caso y te respondemos con un plan concreto. Si pediste llamada, te contactamos de inmediato.</p>
            </div>
          )}
        </div>

        {step < 4 && (
          <footer className="footer-bar">
            <button className="btn-back" onClick={prevStep} style={{ visibility: step > 1 ? "visible" : "hidden" }}>
              <ArrowLeft size={14} /> Atras
            </button>
            <button className="btn-next" disabled={!canContinue} onClick={nextStep}>
              {step === 3 ? (
                <>
                  {sending ? "Enviando..." : "Enviar"} <Send size={14} />
                </>
              ) : (
                <>
                  Continuar <ArrowRight size={14} />
                </>
              )}
            </button>
          </footer>
        )}
      </section>
    </main>
  );
};

export default App;
