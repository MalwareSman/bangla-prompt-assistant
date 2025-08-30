/* FILE: server.js (Node.js + Express) */
// default: design/stock
return `You are a Bengali→English translator specialized in design/stock keywords for sites like Freepik/Canva. Convert Bangla into short keyword phrases (6-12 words) including style, format, and color hints. Output two sections separated by a blank line: \n1) Prompt: <the prompt> \n2) Explain (Bangla): <short Bangla note>`;
}


app.post('/api/translate', async (req, res) => {
try {
const { bangla, target } = req.body || {};
if (!bangla) return res.json({ error: 'No Bangla text sent.' });


const system = getSystemPrompt(target);


// Build payload for the LLM
const messages = [
{ role: 'system', content: system },
{ role: 'user', content: bangla }
];


// Call OpenAI Chat Completions (replace with your provider / model)
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) return res.json({ error: 'Server missing OPENAI_API_KEY environment variable.' });


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


const j = await r.json();
if (j.error) return res.json({ error: j.error.message || JSON.stringify(j.error) });


const text = (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';


// Try to split into Prompt and Explain sections
const parts = text.split(/\n\n+/);
const promptSection = parts[0] || text;
const explainSection = parts.slice(1).join('\n\n') || '';


// If the LLM returned 'Prompt: ....', remove label
const promptClean = promptSection.replace(/^Prompt:\s*/i, '').trim();
const explainBangla = explainSection.replace(/^Explain \(Bangla\):\s*/i, '').trim();


return res.json({ prompt: promptClean, explainBangla });
} catch (err) {
console.error(err);
return res.json({ error: 'Server error. See logs.' });
}
});


// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server listening on', port));




/* ------------------------------------------------------------------ */
/* FILE: package.json (example) */
{
"name": "bangla-prompt-assistant-mvp",
"version": "1.0.0",
"main": "server.js",
"scripts": {
"start": "node server.js"
},
"dependencies": {
"express": "^4.18.2",
"node-fetch": "^2.6.7"
}
}