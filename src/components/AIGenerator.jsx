import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { useAIContent } from "../hooks/useAIContent";

export default function AIGenerator({ defaultPrompt = "" }) {
  const [input, setInput] = useState(defaultPrompt);
  const [output, setOutput] = useState("");
  const { generate, loading, error, reset } = useAIContent();

  const handleGenerate = async () => {
    if (!input.trim() || loading) return;
    try {
      const result = await generate(input);
      setOutput(result);
    } catch {}
  };

  return (
    <div className="bg-[#0a0a12] border border-[#1a1a2e] rounded-2xl p-5 shadow-xl max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-[#b026ff]" size={20} />
        <h3 className="text-lg font-bold text-white">مولد المحتوى الذكي</h3>
      </div>

      <div className="flex gap-3 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          placeholder="مثال: أنشئ 5 مسائل ضرب متدرجة الصعوبة مع شرح خطوة بخطوة..."
          className="flex-1 bg-[#12121c] border border-[#1a1a2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-[#b026ff] focus:ring-1 focus:ring-[#b026ff]/50 outline-none transition"
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !input.trim()}
          className="bg-[#b026ff] hover:bg-[#9010e0] disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl font-bold transition flex items-center gap-2"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Sparkles size={20} />
          )}
          {loading ? "جاري التوليد..." : "توليد"}
        </button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <AlertCircle size={18} /> {error}
            </div>
            <button
              onClick={reset}
              className="text-sm underline hover:text-red-200"
            >
              إعادة المحاولة
            </button>
          </motion.div>
        )}

        {output && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="bg-[#12121c] border border-[#1a1a2e] rounded-xl p-4 text-slate-200 whitespace-pre-wrap leading-relaxed min-h-[120px]">
              {output}
            </div>
            <div className="absolute top-3 right-3 text-[#39ff14] flex items-center gap-1 text-xs font-medium">
              <CheckCircle2 size={14} /> تم التوليد بنجاح
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
        <Sparkles size={12} /> يعمل بذكاء اصطناعي سريع (Groq Llama3). لا تخزن
        المفاتيح في المتصفح.
      </p>
    </div>
  );
}
