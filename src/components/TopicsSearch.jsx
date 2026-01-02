import { useState } from "react";
import PostGeneratorCopy from "./PostGenerator";

export default function TopicsSearch() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setReply("");

    try {
      const res = await fetch("http://localhost:4000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Request failed");
      }

      const data = await res.json();

      console.log(data);
      setReply(data.reply || "(No reply returned)");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-card">
      <h2 className="app-card-title">Topics Search</h2>

      <form className="app-form" onSubmit={handleSubmit}>
        <textarea
          rows={6}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="app-textarea"
          placeholder="Ask me anything..."
        />

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="app-button"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </form>

      {error && <p className="app-error">{error}</p>}

      {reply && (
        <div className="app-reply">
          <strong>Response:</strong>
          {reply.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </div>
      )}

      <PostGeneratorCopy response={reply} />
    </div>
  );
}
