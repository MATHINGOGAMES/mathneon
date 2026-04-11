import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Table2,
  Play,
  Trophy,
  BarChart3,
  ArrowLeft,
  Printer,
  Check,
  X,
  RotateCcw,
  Zap,
  Brain,
  Target,
  ChevronRight,
  Volume2,
  VolumeX,
  AlertCircle,
  Calculator,
  ShoppingCart,
  Ruler,
  Lightbulb,
  Globe,
} from "lucide-react";
import confetti from "canvas-confetti";
import { LanguageProvider, useLanguage } from "./LanguageContext";

// 🔊 محرك صوتي
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const playSound = (type) => {
  if (audioCtx.state === "suspended") audioCtx.resume();
  const now = audioCtx.currentTime;
  const createTone = (freq, typeWave, dur, delay = 0, vol = 0.15) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = typeWave;
    osc.frequency.setValueAtTime(freq, now + delay);
    gain.gain.setValueAtTime(0.0001, now + delay);
    gain.gain.linearRampToValueAtTime(vol, now + delay + 0.005);
    gain.gain.setValueAtTime(vol, now + delay + dur * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now + delay);
    osc.stop(now + delay + dur + 0.01);
  };
  switch (type) {
    case "click":
      createTone(800, "sine", 0.08, 0, 0.1);
      break;
    case "correct":
      createTone(523.25, "sine", 0.12, 0, 0.15);
      createTone(659.25, "sine", 0.12, 0.06, 0.15);
      break;
    case "wrong":
      createTone(280, "sine", 0.15, 0, 0.12);
      createTone(200, "sine", 0.15, 0.08, 0.12);
      break;
    case "complete":
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
        createTone(f, "sine", 0.2, i * 0.09, 0.12)
      );
      break;
    default:
      break;
  }
};

// 🎨 مكونات مساعدة
const VisualDemo = ({ type, rows, cols }) => {
  if (type === "array" || type === "area")
    return (
      <div className="flex flex-col gap-2 items-center my-4">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-2">
            {Array.from({ length: cols }).map((_, c) => (
              <motion.div
                key={c}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: r * 0.05 + c * 0.03 }}
                className={`w-6 h-6 rounded ${
                  type === "area"
                    ? "bg-[#b026ff] shadow-[0_0_8px_#b026ff]"
                    : "bg-[#00f3ff] shadow-[0_0_8px_#00f3ff]"
                }`}
              />
            ))}
          </div>
        ))}
        <p className="text-sm text-slate-400 mt-2">
          {rows} × {cols} = {rows * cols}
        </p>
      </div>
    );
  if (type === "pattern9")
    return (
      <div className="grid grid-cols-5 gap-2 my-4 text-center font-mono text-lg">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <div
            key={n}
            className="bg-[#12121c] p-2 rounded border border-[#1a1a2e]"
          >
            <span className="text-slate-500">9×{n}</span>
            <div className="text-[#39ff14] font-bold">{9 * n}</div>
          </div>
        ))}
      </div>
    );
  if (type === "split")
    return (
      <div className="flex items-center justify-center gap-4 my-4 text-xl font-mono flex-wrap">
        <div className="bg-[#b026ff]/20 px-3 py-2 rounded border border-[#b026ff]/50">
          10 × 6 = 60
        </div>
        <span>+</span>
        <div className="bg-[#00f3ff]/20 px-3 py-2 rounded border border-[#00f3ff]/50">
          2 × 6 = 12
        </div>
        <span>=</span>
        <div className="text-[#39ff14] font-bold">72</div>
      </div>
    );
  return null;
};

const LessonViewer = ({ lesson, onComplete, onBack }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [verified, setVerified] = useState(false);
  const current = lesson.steps[step];
  const isLast = step === lesson.steps.length - 1;
  const handleCheck = () => {
    if (parseInt(input) === current.answer) {
      setVerified(true);
      playSound("correct");
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } else playSound("wrong");
  };
  const handleNext = () => {
    playSound("click");
    if (isLast) {
      onComplete(lesson.id);
      onBack();
    } else {
      setStep((s) => s + 1);
      setInput("");
      setVerified(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#0a0a12] border border-[#1a1a2e] rounded-2xl p-6 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-[#12121c] rounded-lg">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-white">{lesson.title}</h2>
      </div>
      <div className="mb-6">
        <p className="text-[#00f3ff] font-medium mb-2">💡 {t.lessonConcept}:</p>
        <p className="text-slate-300 bg-[#12121c] p-3 rounded-lg border border-[#1a1a2e]">
          {lesson.concept}
        </p>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6"
        >
          <p className="text-white text-lg mb-4">{current.text}</p>
          {current.visual && (
            <VisualDemo
              type={current.visual}
              rows={current.rows}
              cols={current.cols}
            />
          )}
          {current.interactive && !verified && (
            <div className="flex gap-3 mt-4">
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="..."
                className="flex-1 bg-[#12121c] border border-[#1a1a2e] rounded-lg px-4 py-2 text-white focus:border-[#00f3ff] outline-none"
              />
              <button
                onClick={handleCheck}
                className="bg-[#b026ff] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#9010e0] transition"
              >
                {t.lessonCheck}
              </button>
            </div>
          )}
          {verified && (
            <div className="flex items-center gap-2 text-[#39ff14] mt-4">
              <Check size={20} /> {t.correctMsg}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#1a1a2e]">
        <span className="text-sm text-slate-500">
          {step + 1}/{lesson.steps.length}
        </span>
        <button
          onClick={handleNext}
          disabled={!verified && current.interactive}
          className="flex items-center gap-2 bg-[#00f3ff] text-black font-bold px-5 py-2 rounded-lg hover:bg-[#00d4e0] transition disabled:opacity-50"
        >
          {isLast ? t.lessonFinish : t.lessonNext} <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

const InteractiveTable = () => {
  const [size, setSize] = useState(10);
  const [hovered, setHovered] = useState(null);
  const numbers = Array.from({ length: size }, (_, i) => i + 1);
  return (
    <div className="bg-[#0a0a12] border border-[#1a1a2e] rounded-2xl p-4 md:p-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Table2 size={20} className="text-[#00f3ff]" />
        </h3>
        <div className="flex bg-[#12121c] rounded-lg p-1 border border-[#1a1a2e]">
          {[10, 12].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition ${
                size === s
                  ? "bg-[#00f3ff] text-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {s}×{s}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto pb-2">
        <div
          className="grid gap-1.5 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${size + 1}, 1fr)`,
            maxWidth: "min(95vw, 650px)",
            aspectRatio: "1 / 1",
          }}
        >
          <div className="flex items-center justify-center text-slate-500 font-bold">
            ×
          </div>
          {numbers.map((n) => (
            <div
              key={`h-${n}`}
              className="flex items-center justify-center text-[#00f3ff] font-bold bg-[#12121c] rounded"
            >
              {n}
            </div>
          ))}
          {numbers.map((row) => (
            <React.Fragment key={`row-${row}`}>
              <div className="flex items-center justify-center text-[#b026ff] font-bold bg-[#12121c] rounded">
                {row}
              </div>
              {numbers.map((col) => {
                const val = row * col;
                const isHovered =
                  hovered && (hovered.row === row || hovered.col === col);
                const isTarget =
                  hovered && hovered.row === row && hovered.col === col;
                return (
                  <motion.div
                    key={`${row}-${col}`}
                    onMouseEnter={() => setHovered({ row, col, val })}
                    onMouseLeave={() => setHovered(null)}
                    whileHover={{ scale: 1.08 }}
                    className={`flex items-center justify-center rounded cursor-pointer transition-all text-xs md:text-sm font-medium ${
                      isTarget
                        ? "bg-[#39ff14] text-black font-bold shadow-[0_0_12px_#39ff14] z-10"
                        : isHovered
                        ? "bg-[#00f3ff]/15 text-white"
                        : "bg-[#0a0a12] text-slate-300 hover:bg-[#12121c]"
                    }`}
                  >
                    {val}
                  </motion.div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      {hovered && (
        <div className="mt-4 p-3 bg-[#12121c] border border-[#1a1a2e] rounded-xl text-center">
          <span className="text-slate-400">
            {hovered.row} × {hovered.col} ={" "}
          </span>
          <span className="text-2xl font-black text-[#39ff14]">
            {hovered.val}
          </span>
        </div>
      )}
    </div>
  );
};

const MistakeReview = ({ onBack, onStartChallenge }) => {
  const { t } = useLanguage();
  const { progress } = useProgress();
  const allMistakes = progress.tables.flatMap((p) => p.mistakes).slice(0, 20);
  return (
    <motion.div
      key="mistakes"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <button
        onClick={onBack}
        className="text-slate-400 hover:text-white flex items-center gap-2"
      >
        <ArrowLeft size={20} /> {t.back}
      </button>
      <div className="bg-[#0a0a12] border border-[#1a1a2e] rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <AlertCircle size={24} className="text-[#ff00ff]" /> {t.mistakesBtn}
        </h2>
        {allMistakes.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Check size={48} className="mx-auto mb-4 text-[#39ff14]" />
            <p className="text-lg">{t.noMistakes}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 max-h-60 overflow-y-auto pr-2">
              {allMistakes.map((eq, i) => {
                const [a, b] = eq.split("×").map(Number);
                return (
                  <div
                    key={i}
                    className="bg-[#12121c] border border-[#1a1a2e] p-3 rounded-lg flex justify-between items-center"
                  >
                    <span className="text-slate-300 font-mono">{eq}</span>
                    <span className="text-[#39ff14] font-bold">= {a * b}</span>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => onStartChallenge(allMistakes)}
              className="w-full bg-[#ff00ff]/10 text-[#ff00ff] border border-[#ff00ff]/40 py-3 rounded-xl font-bold hover:bg-[#ff00ff]/20 transition flex items-center justify-center gap-2"
            >
              <Zap size={18} /> {t.challengeMistakes}
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

// 🧠 نظام التقدم
const useProgress = () => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("math-neon-pro-v4");
    return saved
      ? JSON.parse(saved)
      : {
          xp: 0,
          level: 1,
          tables: Array(13)
            .fill(0)
            .map(() => ({ correct: 0, total: 0, mistakes: [] })),
          lessonsCompleted: [],
          wordProblemsSolved: 0,
        };
  });
  useEffect(
    () => localStorage.setItem("math-neon-pro-v4", JSON.stringify(progress)),
    [progress]
  );
  const addXP = (amount) =>
    setProgress((p) => ({
      ...p,
      xp: p.xp + amount,
      level: Math.floor((p.xp + amount) / 150) + 1,
    }));
  const recordResult = (table, isCorrect, equation) => {
    setProgress((prev) => {
      const idx = table || Math.floor(Math.random() * 12) + 1;
      const state = { ...prev.tables[idx - 1] };
      state.total += 1;
      if (isCorrect) state.correct += 1;
      else state.mistakes = [equation, ...state.mistakes].slice(0, 12);
      const next = [...prev.tables];
      next[idx - 1] = state;
      return { ...prev, tables: next };
    });
  };
  const completeLesson = (id) =>
    setProgress((p) => ({
      ...p,
      lessonsCompleted: p.lessonsCompleted.includes(id)
        ? p.lessonsCompleted
        : [...p.lessonsCompleted, id],
      xp: p.xp + 50,
    }));
  const solveWordProblem = () =>
    setProgress((p) => ({
      ...p,
      wordProblemsSolved: p.wordProblemsSolved + 1,
      xp: p.xp + 30,
    }));
  const getMastery = (table) => {
    const t = progress.tables[table - 1];
    return t.total === 0 ? 0 : Math.round((t.correct / t.total) * 100);
  };
  return {
    progress,
    addXP,
    recordResult,
    completeLesson,
    solveWordProblem,
    getMastery,
  };
};

// 🧩 مسائل كلامية
const generateWordProblem = (t) => {
  const scenarios = t.wordScenarios;
  const n1 = Math.floor(Math.random() * 8) + 3;
  const n2 = Math.floor(Math.random() * 9) + 2;
  const s = scenarios[Math.floor(Math.random() * scenarios.length)];
  return {
    ...s,
    text: s.text.replace("{n1}", n1).replace("{n2}", n2),
    numbers: [n1, n2],
    answer: n1 * n2,
    estimate: Math.round(n1 / 5) * 5 * Math.round(n2 / 5) * 5,
  };
};

const WordProblemChallenge = ({ onComplete, onBack }) => {
  const { t } = useLanguage();
  const [problem, setProblem] = useState(generateWordProblem(t));
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [hintUsed, setHintUsed] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleCheck = () => {
    const val = parseInt(input);
    if (val === problem.answer) {
      setVerified(true);
      playSound("correct");
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } else playSound("wrong");
  };

  const nextProblem = () => {
    setProblem(generateWordProblem(t));
    setStep(0);
    setInput("");
    setHintUsed(false);
    setVerified(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0a0a12] border border-[#1a1a2e] rounded-2xl p-6 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-[#12121c] rounded-lg">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShoppingCart size={20} className="text-[#00f3ff]" /> {t.wpTitle}
        </h2>
      </div>
      <div className="mb-6 p-4 bg-[#12121c] rounded-xl border border-[#1a1a2e]">
        <p className="text-lg text-white leading-relaxed">{problem.text}</p>
        {hintUsed && (
          <p className="mt-3 text-sm text-[#b026ff] flex items-center gap-2">
            <Lightbulb size={16} /> {t.wpHint}: {problem.hint}
          </p>
        )}
      </div>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[t.wpRead, t.wpExtract, t.wpModel, t.wpSolve, t.wpCheck].map(
          (s, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                step >= i
                  ? "bg-[#00f3ff]/20 text-[#00f3ff] border border-[#00f3ff]/40"
                  : "bg-[#12121c] text-slate-500"
              }`}
            >
              {s}
            </span>
          )
        )}
      </div>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="s0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <p className="text-slate-400 mb-4">
              اقرأ المسألة بتركيز. ما المعطيات؟
            </p>
            <button
              onClick={() => setStep(1)}
              className="bg-[#00f3ff] text-black font-bold px-6 py-2 rounded-lg hover:bg-[#00d4e0] transition"
            >
              بدأت الفهم ✅
            </button>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <p className="text-white">ما العددان الأساسيان؟</p>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="الأول"
                className="flex-1 bg-[#12121c] border border-[#1a1a2e] rounded-lg px-3 py-2 text-white focus:border-[#00f3ff] outline-none"
              />
              <input
                type="number"
                placeholder="الثاني"
                className="flex-1 bg-[#12121c] border border-[#1a1a2e] rounded-lg px-3 py-2 text-white focus:border-[#00f3ff] outline-none"
              />
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#b026ff] text-white font-bold py-2 rounded-lg hover:bg-[#9010e0] transition"
            >
              التالي
            </button>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-6"
          >
            <p className="text-slate-400 mb-4">أي نموذج يمثل المسألة؟</p>
            <div className="flex justify-center gap-4 mb-6">
              <div className="p-4 bg-[#12121c] rounded-xl border border-[#1a1a2e] cursor-pointer hover:border-[#00f3ff]">
                <Calculator size={32} className="text-[#00f3ff]" />
                <p className="text-xs mt-2">ضرب مباشر</p>
              </div>
              <div className="p-4 bg-[#12121c] rounded-xl border border-[#1a1a2e] cursor-pointer hover:border-[#00f3ff]">
                <Ruler size={32} className="text-[#00f3ff]" />
                <p className="text-xs mt-2">نموذج مساحة</p>
              </div>
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full bg-[#b026ff] text-white font-bold py-2 rounded-lg hover:bg-[#9010e0] transition"
            >
              التالي
            </button>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <p className="text-white">احسب الناتج:</p>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="الناتج..."
              className="w-full bg-[#12121c] border border-[#1a1a2e] rounded-lg px-4 py-3 text-2xl text-center text-white focus:border-[#00f3ff] outline-none"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setHintUsed(true)}
                className="flex-1 bg-[#12121c] border border-[#1a1a2e] text-slate-300 py-2 rounded-lg hover:bg-[#1a1a2e] transition"
              >
                💡 {t.wpHint}
              </button>
              <button
                onClick={handleCheck}
                className="flex-1 bg-[#00f3ff] text-black font-bold py-2 rounded-lg hover:bg-[#00d4e0] transition"
              >
                {t.lessonCheck}
              </button>
            </div>
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            key="s4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <Check size={48} className="text-[#39ff14] mx-auto mb-4" />
            <p className="text-xl font-bold text-white mb-2">إجابة صحيحة! 🎉</p>
            <p className="text-slate-400 mb-6">
              الدقيق: {problem.answer} | التقديري: ~{problem.estimate}
            </p>
            <button
              onClick={nextProblem}
              className="bg-[#00f3ff] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00d4e0] transition"
            >
              {t.wpNew}
            </button>
            <button
              onClick={onComplete}
              className="block mx-auto mt-4 text-[#b026ff] hover:underline text-sm"
            >
              {t.wpFinish}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {verified && step === 3 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setStep(4)}
          className="w-full mt-4 bg-[#39ff14] text-black font-bold py-3 rounded-xl hover:bg-[#2de00a] transition"
        >
          انتقل للتحقق النهائي ✅
        </motion.button>
      )}
    </motion.div>
  );
};

// 🚀 المكون الرئيسي
const AppContent = () => {
  const { t, lang, toggleLanguage } = useLanguage();
  const [view, setView] = useState("dashboard");
  const [activeLesson, setActiveLesson] = useState(null);
  const [session, setSession] = useState(null);
  const [currentQ, setCurrentQ] = useState(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [timer, setTimer] = useState(0);
  const [muted, setMuted] = useState(false);
  const [printName, setPrintName] = useState("");
  const [selectedTable, setSelectedTable] = useState(0);
  const {
    progress,
    addXP,
    recordResult,
    completeLesson,
    solveWordProblem,
    getMastery,
  } = useProgress();
  const inputRef = useRef(null);

  // 📚 الدروس المترجمة العميقة
  const getLocalizedLessons = () => {
    const base = t.lessons;
    return [
      {
        id: "concept",
        title: base.concept.title,
        icon: <Brain size={24} />,
        concept: base.concept.concept,
        steps: base.concept.steps.map((s, i) => ({
          ...s,
          visual: i === 0 ? "array" : "swap",
          rows: 3,
          cols: 4,
          interactive: s.answer !== null,
        })),
      },
      {
        id: "pattern9",
        title: base.pattern9.title,
        icon: <Zap size={24} />,
        concept: base.pattern9.concept,
        steps: base.pattern9.steps.map((s, i) => ({
          ...s,
          visual: i === 1 ? "highlight" : i === 2 ? "split" : "pattern9",
          rows: 3,
          cols: 4,
          interactive: s.answer !== null,
        })),
      },
      {
        id: "placevalue",
        title: base.placevalue.title,
        icon: <Target size={24} />,
        concept: base.placevalue.concept,
        steps: base.placevalue.steps.map((s, i) => ({
          ...s,
          visual: i === 0 ? "split" : "merge",
          rows: 3,
          cols: 4,
          interactive: s.answer !== null,
        })),
      },
      {
        id: "commutative",
        title: base.commutative.title,
        icon: <Calculator size={24} />,
        concept: base.commutative.concept,
        steps: base.commutative.steps.map((s, i) => ({
          ...s,
          visual: "swap",
          rows: 3,
          cols: 4,
          interactive: s.answer !== null,
        })),
      },
      {
        id: "areamodel",
        title: base.areamodel.title,
        icon: <Ruler size={24} />,
        concept: base.areamodel.concept,
        steps: base.areamodel.steps.map((s, i) => ({
          ...s,
          visual: "area",
          rows: 5,
          cols: 4,
          interactive: s.answer !== null,
        })),
      },
      {
        id: "estimation",
        title: base.estimation.title,
        icon: <Lightbulb size={24} />,
        concept: base.estimation.concept,
        steps: base.estimation.steps.map((s, i) => ({
          ...s,
          visual: "highlight",
          rows: 3,
          cols: 4,
          interactive: s.answer !== null,
        })),
      },
    ];
  };

  const localizedLessons = getLocalizedLessons();

  const startSession = (
    table,
    practiceMode = "accuracy",
    customQuestions = null
  ) => {
    playSound("click");
    let questions = [];
    if (customQuestions && customQuestions.length > 0) {
      questions = customQuestions
        .map((eq) => {
          const [n1, n2] = eq.split("×").map(Number);
          return { n1, n2, type: "review" };
        })
        .sort(() => Math.random() - 0.5)
        .slice(0, 15);
    } else {
      const mistakes = table
        ? progress.tables[table - 1].mistakes
        : progress.tables.flatMap((p) => p.mistakes).slice(0, 10);
      for (let i = 0; i < (practiceMode === "speed" ? 15 : 10); i++) {
        const n1 = table || Math.floor(Math.random() * 12) + 1;
        const n2 = Math.floor(Math.random() * 12) + 1;
        questions.push({
          n1,
          n2,
          type: mistakes.length > 0 && Math.random() > 0.6 ? "review" : "new",
        });
      }
    }
    setSession({
      questions,
      table,
      mode: practiceMode,
      index: 0,
      score: 0,
      startTime: Date.now(),
    });
    setCurrentQ(questions[0]);
    setView("quiz");
    if (practiceMode === "speed") setTimer(60);
  };

  useEffect(() => {
    if (view === "quiz" && session?.mode === "speed" && timer > 0) {
      const id = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(id);
    }
    if (timer === 0 && session?.mode === "speed") {
      setView("results");
      if (!muted) playSound("complete");
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    }
  }, [view, session, timer, muted]);

  const submitAnswer = (e) => {
    e.preventDefault();
    if (!input || !currentQ) return;
    const ans = parseInt(input);
    const correct = ans === currentQ.n1 * currentQ.n2;
    setFeedback(correct ? "correct" : "wrong");
    if (!muted) playSound(correct ? "correct" : "wrong");
    recordResult(session.table, correct, `${currentQ.n1}×${currentQ.n2}`);
    addXP(correct ? 15 : 5);
    setTimeout(
      () => {
        setFeedback(null);
        setInput("");
        const nextIdx = session.index + 1;
        if (nextIdx >= session.questions.length) {
          setView("results");
          if (!muted) playSound("complete");
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        } else {
          setSession((s) => ({
            ...s,
            index: nextIdx,
            score: s.score + (correct ? 1 : 0),
          }));
          setCurrentQ(session.questions[nextIdx]);
        }
      },
      correct ? 500 : 1500
    );
  };

  const handlePrint = () => {
    const name = prompt(`${t.printName} (Optional):`) || "";
    setPrintName(name);
    setTimeout(() => window.print(), 150);
  };

  return (
    <>
      <div
        className="no-print min-h-screen bg-[#050508] text-white font-sans selection:bg-[#b026ff]"
        dir={t.dir}
      >
        <header className="sticky top-0 z-50 bg-[#050508]/90 backdrop-blur border-b border-[#1a1a2e] px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00f3ff] to-[#b026ff] rounded-lg flex items-center justify-center font-black text-black">
              M
            </div>
            <span className="font-bold text-lg hidden sm:block">
              {t.appName}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-[#12121c] border border-[#1a1a2e] hover:bg-[#1a1a2e] transition flex items-center gap-2"
            >
              <Globe size={16} className="text-[#00f3ff]" />
              <span className="text-xs font-bold uppercase">{lang}</span>
            </button>
            <button
              onClick={() => setMuted(!muted)}
              className="p-2 rounded-lg bg-[#12121c] border border-[#1a1a2e] hover:bg-[#1a1a2e] transition"
            >
              {muted ? (
                <VolumeX size={18} className="text-slate-400" />
              ) : (
                <Volume2 size={18} className="text-[#00f3ff]" />
              )}
            </button>
            <div className="flex items-center gap-2 bg-[#12121c] px-3 py-1 rounded-full border border-[#1a1a2e]">
              <Zap size={14} className="text-[#39ff14]" />{" "}
              <span className="font-mono">{progress.xp} XP</span>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            {view === "dashboard" && (
              <motion.div
                key="dash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#00f3ff] to-[#b026ff] bg-clip-text text-transparent mb-2">
                    {t.appName}
                  </h1>
                  <p className="text-slate-400">{t.tagline}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <BookOpen size={20} className="text-[#00f3ff]" />{" "}
                      {t.conceptLessons}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {localizedLessons.map((l) => {
                        const done = progress.lessonsCompleted.includes(l.id);
                        return (
                          <button
                            key={l.id}
                            onClick={() => {
                              setActiveLesson(l);
                              setView("lesson");
                              playSound("click");
                            }}
                            className={`p-4 rounded-xl border text-left transition ${
                              done
                                ? "bg-[#12121c] border-[#39ff14]/30"
                                : "bg-[#0a0a12] border-[#1a1a2e] hover:border-[#00f3ff]/50"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="p-2 bg-[#12121c] rounded-lg text-[#00f3ff]">
                                {l.icon}
                              </div>
                              {done && (
                                <Check size={16} className="text-[#39ff14]" />
                              )}
                            </div>
                            <h3 className="font-bold text-white mb-1">
                              {l.title}
                            </h3>
                            <p className="text-xs text-slate-400 line-clamp-2">
                              {l.concept}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Play size={20} className="text-[#b026ff]" />{" "}
                      {t.trainingMode}
                    </h2>
                    <div className="bg-[#0a0a12] border border-[#1a1a2e] rounded-xl p-4 space-y-3">
                      <label className="text-sm text-slate-400">
                        {t.selectTable}
                      </label>
                      <select
                        value={selectedTable}
                        onChange={(e) =>
                          setSelectedTable(parseInt(e.target.value))
                        }
                        className="w-full bg-[#12121c] border border-[#1a1a2e] rounded-lg p-2 text-white outline-none focus:border-[#00f3ff]"
                      >
                        <option value={0}>{t.mixed}</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          )
                        )}
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            startSession(selectedTable || null, "accuracy")
                          }
                          className="flex-1 bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30 py-2 rounded-lg font-bold hover:bg-[#00f3ff]/20 transition"
                        >
                          {t.accuracy}
                        </button>
                        <button
                          onClick={() =>
                            startSession(selectedTable || null, "speed")
                          }
                          className="flex-1 bg-[#b026ff]/10 text-[#b026ff] border border-[#b026ff]/30 py-2 rounded-lg font-bold hover:bg-[#b026ff]/20 transition"
                        >
                          {t.speed}
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          setView("reference");
                          playSound("click");
                        }}
                        className="w-full bg-[#12121c] border border-[#1a1a2e] py-2 rounded-lg text-sm text-slate-300 hover:text-white transition flex items-center justify-center gap-2"
                      >
                        <Table2 size={16} /> {t.tableBtn}
                      </button>
                      <button
                        onClick={() => {
                          setView("mistakes");
                          playSound("click");
                        }}
                        className="w-full bg-[#ff00ff]/10 border border-[#ff00ff]/30 py-2 rounded-lg text-sm text-[#ff00ff] hover:bg-[#ff00ff]/20 transition flex items-center justify-center gap-2"
                      >
                        <AlertCircle size={16} /> {t.mistakesBtn}
                      </button>
                      <button
                        onClick={() => {
                          handlePrint();
                          playSound("click");
                        }}
                        className="w-full bg-[#00f3ff]/10 border border-[#00f3ff]/30 py-2 rounded-lg text-sm text-[#00f3ff] hover:bg-[#00f3ff]/20 transition flex items-center justify-center gap-2"
                      >
                        <Printer size={16} /> {t.printBtn}
                      </button>
                      <button
                        onClick={() => {
                          setView("wordproblems");
                          playSound("click");
                        }}
                        className="w-full bg-[#39ff14]/10 border border-[#39ff14]/30 py-2 rounded-lg text-sm text-[#39ff14] hover:bg-[#39ff14]/20 transition flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={16} /> {t.wordProblemsBtn}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0a0a12] border border-[#1a1a2e] rounded-xl p-4">
                  <h3 className="text-sm font-bold text-slate-400 mb-3">
                    {t.masteryTitle}
                  </h3>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => {
                      const m = getMastery(n);
                      return (
                        <div key={n} className="flex-shrink-0 w-12 text-center">
                          <div className="text-xs text-slate-500 mb-1">{n}</div>
                          <div className="h-16 bg-[#12121c] rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${m}%` }}
                              className={`absolute bottom-0 w-full rounded-full ${
                                m > 80
                                  ? "bg-[#39ff14]"
                                  : m > 50
                                  ? "bg-[#00f3ff]"
                                  : "bg-[#b026ff]"
                              }`}
                            />
                          </div>
                          <div className="text-xs font-mono mt-1 text-slate-400">
                            {m}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
            {view === "lesson" && activeLesson && (
              <LessonViewer
                lesson={activeLesson}
                onComplete={completeLesson}
                onBack={() => setView("dashboard")}
              />
            )}
            {view === "wordproblems" && (
              <WordProblemChallenge
                onComplete={() => {
                  solveWordProblem();
                  setView("dashboard");
                }}
                onBack={() => setView("dashboard")}
              />
            )}
            {view === "quiz" && currentQ && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
              >
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => {
                      setView("dashboard");
                      playSound("click");
                    }}
                    className="text-slate-400 hover:text-white flex items-center gap-2"
                  >
                    <ArrowLeft size={20} /> {t.exit}
                  </button>
                  <div className="flex items-center gap-3">
                    {session.mode === "speed" && (
                      <span className="font-mono text-[#b026ff] font-bold">
                        {timer}s
                      </span>
                    )}
                    <span className="text-sm text-slate-400">
                      {t.question} {session.index + 1}/
                      {session.questions.length}
                    </span>
                  </div>
                </div>
                <div className="bg-[#0a0a12] border border-[#1a1a2e] rounded-2xl p-6 text-center">
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-4">
                    {currentQ.type === "review" ? t.reviewSmart : t.training}
                  </div>
                  <h2 className="text-5xl font-black text-white mb-8">
                    {currentQ.n1} × {currentQ.n2} = ؟
                  </h2>
                  <form
                    onSubmit={submitAnswer}
                    className="max-w-xs mx-auto space-y-4"
                  >
                    <input
                      ref={inputRef}
                      type="number"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      autoFocus
                      className="w-full bg-[#12121c] border-2 border-[#1a1a2e] rounded-xl p-4 text-3xl text-center focus:border-[#00f3ff] outline-none"
                      placeholder="..."
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#b026ff] text-white font-bold py-3 rounded-xl hover:bg-[#9010e0] transition"
                    >
                      {t.submit}
                    </button>
                  </form>
                  <AnimatePresence>
                    {feedback === "wrong" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 text-red-400 flex items-center justify-center gap-2"
                      >
                        <X size={20} /> {currentQ.n1} × {currentQ.n2} ={" "}
                        {currentQ.n1 * currentQ.n2}
                      </motion.div>
                    )}
                    {feedback === "correct" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-6 text-[#39ff14] font-bold text-xl flex items-center justify-center gap-2"
                      >
                        <Check size={24} /> {t.correctMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
            {view === "results" && session && (
              <motion.div
                key="results"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12 max-w-md mx-auto"
              >
                <Trophy
                  size={70}
                  className="text-[#39ff14] mx-auto mb-4 drop-shadow-[0_0_20px_#39ff14]"
                />
                <h2 className="text-3xl font-black text-white mb-2">
                  {t.resultsTitle}
                </h2>
                <p className="text-slate-400 mb-6">
                  {t.accuracyLabel}: {session.score}/{session.questions.length}{" "}
                  | {t.timeLabel}:{" "}
                  {Math.floor((Date.now() - session.startTime) / 1000)}s
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      setView("dashboard");
                      playSound("click");
                    }}
                    className="bg-[#00f3ff] text-black font-bold py-3 px-6 rounded-xl hover:bg-[#00d4e0] transition"
                  >
                    {t.home}
                  </button>
                  <button
                    onClick={() => startSession(session.table, session.mode)}
                    className="bg-[#12121c] border border-[#1a1a2e] text-white py-3 px-6 rounded-xl hover:bg-[#1a1a2e] transition flex items-center gap-2"
                  >
                    <RotateCcw size={18} /> {t.retry}
                  </button>
                </div>
              </motion.div>
            )}
            {view === "reference" && (
              <motion.div
                key="ref"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <button
                  onClick={() => {
                    setView("dashboard");
                    playSound("click");
                  }}
                  className="mb-4 text-slate-400 hover:text-white flex items-center gap-2"
                >
                  <ArrowLeft size={20} /> {t.back}
                </button>
                <InteractiveTable />
              </motion.div>
            )}
            {view === "mistakes" && (
              <MistakeReview
                onBack={() => {
                  setView("dashboard");
                  playSound("click");
                }}
                onStartChallenge={(mistakes) =>
                  startSession(null, "accuracy", mistakes)
                }
              />
            )}
          </AnimatePresence>
        </main>
      </div>

      <div className="print-only hidden p-8 bg-white text-black font-sans w-full max-w-4xl mx-auto">
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <h1 className="text-2xl font-bold uppercase tracking-widest">
            {t.printHeader}
          </h1>
          <div className="flex justify-between mt-4 text-sm font-medium">
            <span>
              {t.printName}: {printName || "............................."}
            </span>
            <span>
              {t.printDate}: {new Date().toLocaleDateString()}
            </span>
            <span>
              {t.printTable}: {session?.table || selectedTable || "Mixed"}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          {Array.from({ length: 20 }, (_, i) => {
            const a =
              session?.table ||
              selectedTable ||
              Math.floor(Math.random() * 12) + 1;
            const b = Math.floor(Math.random() * 12) + 1;
            return (
              <div
                key={i}
                className="flex items-center gap-3 text-lg border-b border-dashed border-gray-400 pb-2"
              >
                <span className="font-mono font-bold w-8 text-gray-600">
                  {i + 1}.
                </span>
                <span className="font-bold">
                  {a} × {b} ={" "}
                </span>
                <span className="flex-1"></span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
