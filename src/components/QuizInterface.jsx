import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizEngine } from '../hooks/useQuizEngine';
import { useProgress } from '../hooks/useProgress';
import { ArrowLeft, Printer, Check, X } from 'lucide-react';
import VisualGrid from './VisualGrid';

export default function QuizInterface({ table, onBack, onPrint }) {
  const { progress } = useProgress();
  const mistakes = table ? progress[table - 1].lastMistakes : progress.flatMap(p => p.lastMistakes).slice(0, 8);
  
  const { current, next, generate } = useQuizEngine(table, mistakes);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => { generate(); }, [table, mistakes]);
  useEffect(() => { inputRef.current?.focus(); }, [current]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input || !current) return;
    const ans = parseInt(input);
    const correct = ans === current.n1 * current.n2;
    setFeedback(correct ? 'correct' : 'wrong');
    useProgress().recordResult(table, correct, `${current.n1}×${current.n2}`);
    
    setTimeout(() => {
      setFeedback(null);
      setInput('');
      next();
    }, correct ? 600 : 2000);
  };

  if (!current) return <div className="text-center py-20 text-[#00f3ff] animate-pulse">جاري تحضير الأسئلة الذكية...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2"><ArrowLeft size={20} /> رجوع</button>
        <button onClick={onPrint} className="flex items-center gap-2 text-[#00f3ff] hover:underline"><Printer size={18} /> ورقة عمل</button>
      </div>

      <motion.div key={current.n1 + current.n2} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#0a0a12]/90 backdrop-blur border border-[#1a1a2e] p-8 text-center rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#b026ff] via-[#00f3ff] to-[#39ff14]" />
        <p className="text-slate-500 mb-4 text-xs tracking-widest uppercase">
          {current.type === 'review' ? '⚡ مراجعة متباعدة' : '🧠 تحدٍ جديد'}
        </p>
        
        <h2 className="text-6xl font-black mb-8 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          {current.n1} × {current.n2} = ؟
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 max-w-xs mx-auto">
          <input ref={inputRef} type="number" value={input} onChange={e => setInput(e.target.value)} className="w-full bg-[#12121c] border-2 border-[#1a1a2e] rounded-xl p-4 text-3xl text-center focus:border-[#00f3ff] focus:shadow-[0_0_10px_#00f3ff] outline-none transition" placeholder="الإجابة" />
          <button type="submit" className="w-full bg-[#b026ff]/20 hover:bg-[#b026ff]/40 text-[#b026ff] border border-[#b026ff]/50 font-bold py-3 rounded-xl transition">تأكيد</button>
        </form>

        <AnimatePresence>
          {feedback === 'wrong' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8 pt-6 border-t border-[#1a1a2e]">
              <p className="text-red-400 mb-4 flex items-center justify-center gap-2"><X size={18} /> الإجابة خاطئة، راجع التمثيل البصري:</p>
              <VisualGrid rows={current.n1} cols={current.n2} />
            </motion.div>
          )}
          {feedback === 'correct' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-6 text-[#39ff14] text-2xl font-bold flex items-center justify-center gap-2 drop-shadow-[0_0_8px_#39ff14]">
              <Check size={28} /> إجابة صحيحة!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}