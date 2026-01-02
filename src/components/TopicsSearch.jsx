import { useState } from "react";

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
      setReply(data.reply || "(No reply returned)");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="component">
      <h2>Topics Search</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="component-textarea"
          placeholder="Ask me anything..."
        />

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="component-button"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {reply && (
        <div
          style={{
            marginTop: 20,
            background: "#f7f7f7",
            padding: 15,
            borderRadius: 8,
          }}
        >
          <strong>Response:</strong>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}
