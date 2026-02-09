"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askBackend() {
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
      setAnswer(JSON.stringify(data, null, 2));
    } catch (error) {
      setAnswer("Error calling backend");
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>🧠 GenAI Agent</h1>

      <input
        type="text"
        placeholder="Ask something..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <br /><br />

      <button onClick={askBackend} disabled={loading}>
        {loading ? "Thinking..." : "Ask"}
      </button>

      <pre style={{ marginTop: "20px", background: "#111", color: "#0f0", padding: "15px" }}>
        {answer}
      </pre>
    </main>
  );
}
