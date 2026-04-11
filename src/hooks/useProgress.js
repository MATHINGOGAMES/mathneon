import { useState, useEffect } from "react";

export const useProgress = () => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("math-neon-progress");
    return saved
      ? JSON.parse(saved)
      : Array(10)
          .fill(0)
          .map(() => ({ correct: 0, total: 0, lastMistakes: [] }));
  });

  useEffect(
    () => localStorage.setItem("math-neon-progress", JSON.stringify(progress)),
    [progress]
  );

  const recordResult = (table, isCorrect, equation) => {
    setProgress((prev) => {
      const idx = table || Math.floor(Math.random() * 9) + 1;
      const state = { ...prev[idx - 1] };
      state.total += 1;
      if (isCorrect) state.correct += 1;
      else {
        state.lastMistakes = [equation, ...state.lastMistakes].slice(0, 5);
      }
      const next = [...prev];
      next[idx - 1] = state;
      return next;
    });
  };

  const getPercentage = (table) => {
    const p = progress[table - 1];
    return p.total === 0 ? 0 : Math.round((p.correct / p.total) * 100);
  };

  return { progress, recordResult, getPercentage };
};
