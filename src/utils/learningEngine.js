export const generateAdaptiveQuestions = (mistakes, tableNum) => {
  const questions = [];
  const count = 10;
  const reviewCount = Math.min(Math.floor(count * 0.3), mistakes.length);
  const newCount = count - reviewCount;

  // أسئلة مراجعة من الأخطاء السابقة
  for (let i = 0; i < reviewCount; i++) {
    const m = mistakes[i % mistakes.length];
    questions.push({
      type: 'review',
      text: `تذكر هذه! أوجد الناتج:`,
      equation: `${m.num1} × ${m.num2}`,
      answer: m.answer,
      isReview: true
    });
  }

  // أسئلة جديدة
  for (let i = 0; i < newCount; i++) {
    const n1 = tableNum || Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 12) + 1;
    questions.push({
      type: 'new',
      text: `أوجد ناتج عملية الضرب التالية:`,
      equation: `${n1} × ${n2}`,
      answer: n1 * n2,
      isReview: false
    });
  }

  return questions.sort(() => Math.random() - 0.5);
};