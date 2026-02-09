"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askBackend() {
    if (!question) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch(
        "https://mygenaiagent-production.up.railway.app/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );

      const data = await res.json();
      setAnswer(data.answer || JSON.stringify(data));
    } catch (err) {
      setAnswer("❌ Error talking to backend");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 40, maxWidth: 600, margin: "auto" }}>
      <h1>🤖 My GenAI Agent</h1>

      <input
        type="text"
        placeholder="Ask something..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 20 }}
      />

      <button
        onClick={askBackend}
        style={{ marginTop: 10, padding: 10, width: "100%" }}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {answer && (
        <div style={{ marginTop: 20 }}>
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </main>
  );
}
