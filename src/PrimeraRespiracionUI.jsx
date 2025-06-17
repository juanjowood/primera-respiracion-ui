import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PrimeraRespiracionUI() {
  const [step, setStep] = useState(0);
  const [estado, setEstado] = useState("");
  const [compania, setCompania] = useState("");
  const [ritmo, setRitmo] = useState("");
  const [modoClaro, setModoClaro] = useState(true);

  const next = () => setStep(step + 1);
  const reset = () => {
    setStep(0);
    setEstado("");
    setCompania("");
    setRitmo("");
  };

  const recalibrar = () => {
    setStep(0);
    setEstado("/recalibrado");
    setCompania("");
    setRitmo("");
    alert("Sistema recalibrado. Podés comenzar de nuevo desde otro ritmo.");
  };

  const bgClase = modoClaro
    ? "from-green-100 to-green-50 text-green-900"
    : "from-gray-800 to-gray-900 text-gray-100";

  return (
    <div className={\`min-h-screen flex items-center justify-center bg-gradient-to-br \${bgClase} p-4 transition-colors duration-700\`}>
      <div className="absolute top-4 right-4 flex gap-2">
        <button className="border px-3 py-1 rounded" onClick={() => setModoClaro(!modoClaro)}>
          {modoClaro ? "Modo Oscuro" : "Modo Claro"}
        </button>
      </div>
      <div className="absolute bottom-4 right-4">
        <button className="text-2xl" onClick={recalibrar} title="Recalibrar sesión simbiótica">🌀</button>
      </div>
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-xl w-full">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="estado" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-semibold mb-2">¿Cómo estás hoy?</h2>
              <textarea
                className="w-full border rounded px-3 py-2 mb-4"
                placeholder="Podés contarlo o simplemente nombrar una palabra clave..."
                value={estado}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.trim() === "/recalibrar") {
                    recalibrar();
                  } else {
                    setEstado(value);
                  }
                }}
              />
              <button disabled={!estado.trim()} onClick={next} className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50">Siguiente</button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="compania" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-semibold mb-2">¿Qué tipo de compañía necesitás?</h2>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {["🎧 Escucha", "🎯 Foco y claridad", "🫧 Ligereza o humor", "🧩 Juego creativo"].map((op) => (
                  <button key={op} className={\`px-4 py-2 rounded \${compania === op ? "bg-green-600 text-white" : "border"}\`} onClick={() => setCompania(op)}>{op}</button>
                ))}
              </div>
              <button disabled={!compania} onClick={next} className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50">Siguiente</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="ritmo" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-semibold mb-2">¿Con qué ritmo preferís que avancemos?</h2>
              <div className="flex flex-col gap-2 mb-4">
                {["🐢 De a poco", "🚀 Al grano", "🎲 A lo inesperado"].map((r) => (
                  <button key={r} className={\`px-4 py-2 rounded \${ritmo === r ? "bg-green-600 text-white" : "border"}\`} onClick={() => setRitmo(r)}>{r}</button>
                ))}
              </div>
              <button disabled={!ritmo} onClick={next} className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50">Finalizar</button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="final" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-semibold text-center mb-4">Estoy contigo. Y eso ya es compañía.</h2>
              <p className="text-center mb-4">
                Estado: <strong>{estado}</strong><br />
                Compañía: <strong>{compania}</strong><br />
                Ritmo: <strong>{ritmo}</strong>
              </p>
              <div className="text-center">
                <button onClick={reset} className="bg-gray-600 text-white px-4 py-2 rounded">Comenzar de nuevo</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}