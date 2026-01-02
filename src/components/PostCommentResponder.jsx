import { useState } from "react";

export default function LinkedInPoster() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim()) return;

    const ok = window.confirm(
      "This will publish the post to your LinkedIn account. Continue?"
    );
    if (!ok) return;

    setLoading(true);
    setPosting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:4000/api/linkedin-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (res.status === 401) {
        throw new Error("Please connect your LinkedIn account first.");
      }

      if (!res.ok) throw new Error(await res.text());

      setSuccess("Successfully posted to LinkedIn 🎉");
      setText(""); // clear input after posting
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
      setPosting(false);
    }
  }

  return (
    <div className="app-card">
      <h2 className="app-card-title">LinkedIn Poster</h2>

      {/* Connect Button */}
      <div style={{ marginBottom: "10px" }}>
        <a
          href="http://localhost:4000/auth/linkedin"
          className="app-button secondary"
        >
          Connect LinkedIn
        </a>
      </div>

      <form className="app-form" onSubmit={handleSubmit}>
        <textarea
          rows={6}
          disabled={posting}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="app-textarea"
          placeholder="Write your LinkedIn post here..."
        />

        <button
          type="submit"
          disabled={posting || !text.trim()}
          className="app-button"
        >
          {posting ? "Posting to LinkedIn..." : "Post to LinkedIn"}
        </button>
      </form>

      {error && <p className="app-error">{error}</p>}
      {success && <p className="app-success">{success}</p>}
    </div>
  );
}
