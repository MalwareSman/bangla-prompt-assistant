/* FILE: README.md — step-by-step for absolute beginners */


# Bangla Prompt Assistant — MVP (simple guide for beginners)


This small project has two parts:
1. `index.html` — the webpage you open in your browser.
2. `server.js` — a tiny server that talks to OpenAI and returns translations.


## What you'll need (short list)
- An OpenAI API key (we will explain how and why below).
- A place to run the project: **Replit** (easy) or **Vercel** (free tier, slightly more steps).
- Basic comfort copying and pasting files.


## Quick beginner-friendly steps (the shortest path)


### A) Create an OpenAI API key
1. Go to openai.com and sign up or log in.
2. Go to the API or Keys area and create a new API key.
3. Keep the key secret — do NOT paste it into the website's frontend box.


> Why? The key is like a password for your app to talk to the AI. If others get it, they'll use your credit.


### B) Run on Replit (VERY beginner-friendly)
1. Create a free Replit account (replit.com).
2. Click "Create" → choose "Node.js".
3. In the new repl, replace the default files with `index.html`, `server.js`, and `package.json` from this project.
4. In Replit, find _Secrets_ (or Environment variables) and add a variable named `OPENAI_API_KEY` with your key as the value.
5. Click Run. Replit will install packages and start the server. It gives you a web link — open it.
6. Test by typing Bengali into the box and clicking Translate.


### C) Or deploy on Vercel (slightly more advanced)
1. Push the project to GitHub (create a new repository and upload files).
2. Sign up on vercel.com and import the GitHub repo.
3. In Vercel's project settings, add `OPENAI_API_KEY` as an environment variable.
4. Deploy. Vercel will host both the static page and the API endpoint.


## Glossary (explained like you're 10)
- **HTML**: The skeleton of a webpage (like the bones).
- **CSS**: Makes the webpage look pretty (clothes and paint).
- **JavaScript (JS)**: Makes the webpage move and do tricks (muscles and action).
- **Server**: A small program that does work for your webpage when you ask it, like a helpful robot in the cloud.
- **API key**: A secret token — like a house key for your server to talk to the AI company.
- **Environment variable**: A hidden place where we store secrets so they aren't visible to everyone.
- **Serverless / Vercel / Replit**: Easy ways to run the helper robot without having your own computer always on.
- **Fetch**: A way JS asks the server for something (like sending a letter and waiting for a reply).


## Safety & costs
- The AI provider (OpenAI) charges per use. Start small and test.
- Put limits: don't allow thousands of requests for free. Beta-test with friends.


## Next steps (after you have a working MVP)
1. Add voice input (Web Speech API).
2. Add a prompt library (pre-made Bangla templates).
3. Add login / save history (Supabase).
4. Build a browser extension for inline conversion.