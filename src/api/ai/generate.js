export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, max_tokens = 350 } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Server configuration missing" });
  }

  // تنظيف المدخلات لمنع الحقن
  const sanitizedPrompt = String(prompt || "")
    .trim()
    .slice(0, 500);

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content:
                "أنت خبير تعليم رياضيات للطلاب من 10 إلى 15 سنة. قدم شروحات واضحة، تمارين متدرجة، وحيل حفظ عملية. استخدم لغة مشجعة، ونسق الإجابات بعناصر Markdown بسيطة. تجنب الحشو.",
            },
            { role: "user", content: sanitizedPrompt },
          ],
          max_tokens,
          temperature: 0.65,
          top_p: 0.9,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "AI Provider Error");
    }

    res.status(200).json({ content: data.choices[0].message.content });
  } catch (error) {
    console.error("[AI API Error]", error);
    res.status(502).json({ error: "فشل مؤقت في خدمة الذكاء الاصطناعي" });
  }
}
