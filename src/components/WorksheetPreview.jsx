import { forwardRef } from 'react';

const WorksheetPreview = forwardRef(({ table, studentName, date }, ref) => {
  const problems = Array.from({ length: 20 }, () => {
    const a = table || Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    return { a, b };
  });

  return (
    <div ref={ref} className="p-8 max-w-3xl mx-auto bg-white text-black font-serif print:block hidden">
      <div className="text-center mb-8 border-b-2 border-black pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-widest">ورقة تدريب جدول الضرب</h1>
        <div className="flex justify-between mt-4 text-sm">
          <span>الاسم: {studentName || '.......................'}</span>
          <span>التاريخ: {date || '....../....../........'}</span>
          <span>الجدول: {table || 'مختلط'}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        {problems.map((p, i) => (
          <div key={i} className="flex items-center gap-3 text-lg border-b border-dashed border-gray-400 pb-2">
            <span className="font-mono font-bold w-8">{i + 1}.</span>
            <span>{p.a} × {p.b} = </span>
            <span className="flex-1"></span>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-4 border-t border-black text-xs text-center text-gray-500">تم التوليد بواسطة أكاديمية الضرب النيون</div>
    </div>
  );
});

export default WorksheetPreview;