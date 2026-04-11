import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { Trophy, BarChart3 } from 'lucide-react';

export default function Dashboard({ onSelectTable }) {
  const { getPercentage } = useProgress();
  const tables = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-black text-[#00f3ff] mb-2 drop-shadow-[0_0_15px_rgba(0,243,255,0.6)]">أكاديمية الضرب النيون</h1>
        <p className="text-slate-400">نظام تعلم تكيفي يركز على الفهم وليس الحفظ</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tables.map(num => {
          const pct = getPercentage(num);
          return (
            <motion.button
              key={num}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectTable(num)}
              className="bg-[#0a0a12]/90 backdrop-blur border border-[#1a1a2e] rounded-2xl p-5 text-left hover:border-[#00f3ff]/50 transition-all shadow-lg"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold text-white">جدول {num}</span>
                <Trophy className={pct > 80 ? 'text-[#39ff14]' : 'text-slate-600'} size={20} />
              </div>
              <div className="w-full bg-[#12121c] h-2 rounded-full overflow-hidden mb-2">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${pct}%` }} 
                  className={`h-full rounded-full ${pct > 80 ? 'bg-[#39ff14] shadow-[0_0_8px_#39ff14]' : pct > 40 ? 'bg-[#00f3ff]' : 'bg-[#b026ff]'}`} 
                />
              </div>
              <p className="text-xs text-slate-500">الإتقان: {pct}%</p>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={() => onSelectTable(null)}
        className="w-full bg-[#0a0a12]/90 border border-[#1a1a2e] py-4 font-bold text-[#b026ff] drop-shadow-[0_0_10px_rgba(176,38,255,0.4)] hover:bg-[#b026ff]/10 transition flex items-center justify-center gap-2"
      >
        <BarChart3 size={18} /> تحدي ذكي (مزيج متباعد)
      </motion.button>
    </motion.div>
  );
}