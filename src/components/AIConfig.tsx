import React, { useEffect, useState } from 'react';

export const AIConfig: React.FC = () => {
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    fetch('/api/system-config')
      .then(res => res.json())
      .then(data => setPrompt(data.systemPrompt || ''));
  }, []);

  const savePrompt = () => {
    fetch('/api/system-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemPrompt: prompt })
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-zinc-200">
      <h3 className="text-lg font-medium mb-4">AI Integration</h3>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full h-32 p-3 border border-zinc-300 rounded-lg mb-4"
        placeholder="Enter system prompt..."
      />
      <button onClick={savePrompt} className="bg-zinc-900 text-white px-4 py-2 rounded-lg">Save Prompt</button>
    </div>
  );
};
