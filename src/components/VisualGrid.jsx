import { motion } from 'framer-motion';

export default function VisualGrid({ rows, cols }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      {Array.from({ length: rows }).map((_, r) => (
        <motion.div key={r} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: r * 0.08 }} className="flex gap-2">
          {Array.from({ length: cols }).map((_, c) => (
            <motion.div key={c} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: r * 0.08 + c * 0.03, type: "spring" }} className="w-5 h-5 rounded-full bg-[#00f3ff] shadow-[0_0_8px_#00f3ff]" />
          ))}
        </motion.div>
      ))}
      <p className="text-slate-500 text-xs mt-3">{rows} صفوف × {cols} أعمدة = {rows * cols} عنصر</p>
    </div>
  );
}