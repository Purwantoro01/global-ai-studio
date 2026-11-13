'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setReply('');

    try {
      const res = await fetch('/api/meta-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setReply(data.reply || data.error || 'Failed to get response');
    } catch {
      setReply('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '640px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Global AI Studio</h1>
      <p>Powered by Meta Model API &amp; Discord Community</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <textarea
          rows={4}
          placeholder="Ask anything to Meta AI..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ padding: '12px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '12px', fontSize: '16px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          {loading ? 'Generating...' : 'Generate with Meta AI'}
        </button>
      </form>
      {reply && (
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f4f4f5', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
          <strong>AI Response:</strong>
          <p>{reply}</p>
        </div>
      )}
    </main>
  );
}
