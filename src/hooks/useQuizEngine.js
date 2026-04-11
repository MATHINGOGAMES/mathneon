import { useState, useCallback } from 'react';

export const useQuizEngine = (table, mistakes) => {
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);

  const generate = useCallback(() => {
    const items = [];
    // 70% أسئلة جديدة، 30% تكرار متباعد للأخطاء
    const reviewCount = Math.min(3, mistakes.length);
    for (let i = 0; i < 7; i++) {
      const n1 = table || Math.floor(Math.random() * 9) + 1;
      const n2 = Math.floor(Math.random() * 12) + 1;
      items.push({ n1, n2, type: 'new' });
    }
    for (let i = 0; i < reviewCount; i++) {
      const eq = mistakes[i];
      const [a, b] = eq.split('×').map(Number);
      items.push({ n1: a, n2: b, type: 'review' });
    }
    setQueue(items.sort(() => Math.random() - 0.5));
    setCurrent(items[0]);
  }, [table, mistakes]);

  const next = () => {
    const remaining = queue.slice(1);
    setQueue(remaining);
    setCurrent(remaining[0] || null);
  };

  return { current, next, generate, total: queue.length };
};