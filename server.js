/* FILE: server.js (Node.js + Express) */

const express = require('express');
const fetch = require('node-fetch'); // make sure node-fetch is installed
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Helper: System prompt builder
function getSystemPrompt(target) {
  return `You are a Bengali+English translator specialized in design/stock keywords for sites like Freepik/Canva. 
  Convert Bangla into short keyword phrases (6-12 words) including style, format, and color hints. 
  Output two styles: one concise keyword-only list, one natural sentence description.`;
}

// Translation route
app.post('/api/translate', async (req, res) => {
  try {
    const { bangla, target } = req.body || {};
    if (!bangla) return res.json({ error: 'No Bangla text sent.' });

    const system = getSystemPrompt(target);

    // Build LLM payload
    const messages = [
      { role: 'system', content: system },
      { role: 'user', content: bangla }
    ];

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.json({ error: 'Server missing OPENAI_API_KEY environment variable.' });

    // Call OpenAI API
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.6,
        max_tokens: 400
      })
    });

    const data = await r.json();
    const output = data?.choices?.[0]?.message?.content || 'Error: No response from model.';

    res.json({ result: output });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
