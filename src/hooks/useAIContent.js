import { useState, useCallback } from "react";

export const useAIContent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const generate = useCallback(
    async (prompt) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/ai/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "فشل في جلب البيانات");
        return data.content;
      } catch (err) {
        setError(err.message);
        if (retryCount < 2) {
          setRetryCount((c) => c + 1);
          setTimeout(() => generate(prompt), 1500 * (retryCount + 1));
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [retryCount]
  );

  const reset = () => {
    setError(null);
    setRetryCount(0);
    setLoading(false);
  };

  return { generate, loading, error, reset };
};
