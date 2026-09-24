# Learn Python — beginner tutor app

A React app that teaches 8 Python basics. Each topic has a definition, examples
with their exact output, and a practice problem that runs your code for real
(via Pyodide) and checks the printed output.

## Running it

You need Node.js installed. Check with `node -v` — if that errors, get it from
https://nodejs.org (the LTS version).

Then, in the VS Code terminal (Terminal → New Terminal), from this folder:

```bash
npm install
npm run dev
```

The terminal prints a link like `http://localhost:5173/`. Open it. That's the app.

Stop the server with `Ctrl+C`.

## Why you can't just double-click index.html

Pyodide (the thing that runs Python in the browser) needs the page served over
`http://`, not opened as a `file://` path. `npm run dev` handles that. Opening
the HTML file directly will load the lessons but the Run & check button will fail.

## First run is slow

The first time you press **Run & check**, the browser downloads the Python
engine — around 10MB. It's cached after that, so later runs are instant.

## Files

```
index.html            page shell
vite.config.js        dev server config
src/main.jsx          mounts the app
src/index.css         page background and focus styles
src/PythonTutor.jsx   everything else: lessons, problems, Pyodide runner
```

## Adding your own topic

Open `src/PythonTutor.jsx` and copy any object in the `LESSONS` array. Each one
needs: `id`, `label`, `hint`, `title`, `definition`, `explanation` (array),
`examples` (array), `keyPoints` (array), and `problem`.

For `problem.expected`, put exactly what the correct code prints. If the task
uses `input()`, add an `inputs` array — the checker types those values in for
the learner.

**Important:** write tasks that pin down exact values. "Print your city name"
can't be checked; "Print the text Bengaluru" can.

## How the checking works

Your code is executed, its printed output is captured, and that output is
compared to `expected`. The code itself is never compared — any approach that
prints the right thing passes. Differences in capitalisation, extra spaces, and
blank lines are tolerated.

## Deploying it

```bash
npm run build
```

Produces a `dist/` folder you can drop on Netlify, Vercel, or GitHub Pages.
