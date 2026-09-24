import { useEffect, useRef, useState } from "react";

const LESSONS = [
  {
    id: "variables",
    label: "Variables",
    hint: "Giving a name to a value",
    title: "Variables",
    definition:
      "A variable is a name that points to a value, so you can use that value later without typing it again.",
    explanation: [
      "Think of a variable as a labelled box. You put something inside it and write a name on the outside. When you need what's inside, you call the box by its name.",
      "In Python you create one with a single equals sign. The name goes on the left, the value on the right. Python figures out the rest.",
      "You can change what's in the box at any time. The name stays the same, the value swaps out.",
    ],
    examples: [
      {
        code: 'name = "Ava"\nage = 21\n\nprint(name)\nprint(age)',
        output: "Ava\n21",
        note: "Text goes in quotes. Numbers don't.",
      },
      {
        code: 'score = 10\nscore = score + 5\n\nprint("Your score is", score)',
        output: "Your score is 15",
        note: "Python works out the right side first, then stores the result back in score.",
      },
    ],
    keyPoints: [
      "One equals sign stores a value, it doesn't mean 'is equal to'",
      "Names should describe what's inside: total, not t",
      "A variable can be reassigned as many times as you like",
    ],
    problem: {
      task: "Create two variables: city holding the text \"Bengaluru\", and pin holding the number 560001. Print each on its own line.",
      hint: "Text needs quotes around it. Numbers don't.",
      solution: "city = \"Bengaluru\"\npin = 560001\n\nprint(city)\nprint(pin)",
      expected: "Bengaluru\n560001",
    },
  },
  {
    id: "types",
    label: "Data types",
    hint: "Numbers, text, True/False",
    title: "Data types",
    definition:
      "A data type is the kind of value you're working with. Python treats numbers, text and true/false values differently.",
    explanation: [
      "The four you'll meet first: int for whole numbers, float for decimals, str for text, and bool for True or False.",
      "The type matters because it decides what operations make sense. Adding two numbers gives you a sum. Adding two pieces of text sticks them together instead.",
      "When a value is the wrong type, you convert it: int() for whole numbers, str() for text, float() for decimals.",
    ],
    examples: [
      {
        code: 'price = 49.5\ncount = 3\ntitle = "Notebook"\nin_stock = True\n\nprint(type(price))\nprint(type(title))',
        output: "<class 'float'>\n<class 'str'>",
        note: "type() tells you what Python thinks a value is.",
      },
      {
        code: 'age = "21"\nprint(age + "1")\n\nage = int(age)\nprint(age + 1)',
        output: "211\n22",
        note: "Same-looking value, completely different result. Text joins, numbers add.",
      },
    ],
    keyPoints: [
      "Quotes make it text, even if it looks like a number",
      "True and False are capitalised in Python",
      "int(), str() and float() convert between types",
    ],
    problem: {
      task: "The value quantity = \"5\" is text, not a number. Convert it to a whole number, then print quantity multiplied by 2.",
      hint: "Leave it as text and \"5\" * 2 gives you \"55\" instead of 10.",
      solution: "quantity = \"5\"\nquantity = int(quantity)\n\nprint(quantity * 2)",
      expected: "10",
    },
  },
  {
    id: "io",
    label: "Input & output",
    hint: "print() and input()",
    title: "Input and output",
    definition:
      "print() shows something on the screen. input() pauses and waits for the person to type something.",
    explanation: [
      "These two are how your program talks to a human. print() sends information out, input() takes information in.",
      "input() always hands you back text, even when the person types a number. If you want to do maths with it, wrap it in int() or float() first.",
      "Whatever you write inside input() gets shown as the question, so use it to tell the person what you want.",
    ],
    examples: [
      {
        code: 'print("Hello!")\n\nname = input("What\'s your name? ")\nprint("Nice to meet you,", name)',
        output: "Hello!\nWhat's your name? Ava\nNice to meet you, Ava",
        note: "The program stops at input() until Enter is pressed.",
      },
      {
        code: 'age = int(input("Your age: "))\nprint("Next year you\'ll be", age + 1)',
        output: "Your age: 21\nNext year you'll be 22",
        note: "Without int(), age + 1 would crash. Text and numbers don't mix.",
      },
    ],
    keyPoints: [
      "input() always returns text",
      "Commas inside print() add a space between items",
      "Convert before doing maths on typed input",
    ],
    problem: {
      task: "Ask the person for their favourite food using the prompt \"Favourite food? \", then print: I like <their answer> too!",
      hint: "Store what input() gives you in a variable first, then use it inside print().",
      solution: "food = input(\"Favourite food? \")\nprint(\"I like\", food, \"too!\")",
      expected: "Favourite food? dosa\nI like dosa too!",
      inputs: ["dosa"],
    },
  },
  {
    id: "conditions",
    label: "If statements",
    hint: "Making decisions",
    title: "If statements",
    definition:
      "An if statement runs a block of code only when a condition is true.",
    explanation: [
      "This is how a program makes choices. You ask a yes/no question, and Python runs one block or another depending on the answer.",
      "The condition uses comparison operators: == for equal, != for not equal, and > < >= <= for size. Note the double equals, one equals means 'store this'.",
      "The indented lines underneath belong to the if. That indentation isn't decoration, it's how Python knows what's inside the block.",
    ],
    examples: [
      {
        code: 'age = 20\n\nif age >= 18:\n    print("You can vote.")\nelse:\n    print("Not yet.")',
        output: "You can vote.",
        note: "else covers everything the if didn't catch.",
      },
      {
        code: 'marks = 72\n\nif marks >= 90:\n    print("Grade A")\nelif marks >= 60:\n    print("Grade B")\nelse:\n    print("Keep going")',
        output: "Grade B",
        note: "Python checks top to bottom and stops at the first match.",
      },
    ],
    keyPoints: [
      "== compares, = stores",
      "The colon and the indentation are both required",
      "elif lets you check more conditions in order",
    ],
    problem: {
      task: "A shop gives free delivery on orders above 500. Starting from total = 450, print either \"Free delivery\" or \"Add more items\".",
      hint: "One condition for the yes case, else for everything remaining.",
      solution: "total = 450\n\nif total > 500:\n    print(\"Free delivery\")\nelse:\n    print(\"Add more items\")",
      expected: "Add more items",
    },
  },
  {
    id: "loops",
    label: "Loops",
    hint: "Doing something repeatedly",
    title: "Loops",
    definition:
      "A loop repeats a block of code, so you write the instruction once instead of copying it.",
    explanation: [
      "A for loop runs a set number of times, or once for each item in a collection. Use it when you know how many rounds you need.",
      "A while loop keeps going as long as its condition stays true. Use it when you don't know the count in advance.",
      "range(3) gives you 0, 1, 2. It starts at zero and stops just before the number you gave it, which surprises everyone at first.",
    ],
    examples: [
      {
        code: 'for i in range(3):\n    print("Hello", i)',
        output: "Hello 0\nHello 1\nHello 2",
        note: "i holds the current round number, starting from 0.",
      },
      {
        code: 'count = 3\n\nwhile count > 0:\n    print(count)\n    count = count - 1\n\nprint("Go!")',
        output: "3\n2\n1\nGo!",
        note: "Something inside a while loop must change, or it never ends.",
      },
    ],
    keyPoints: [
      "range(n) counts from 0 up to n minus 1",
      "for when you know the count, while when you don't",
      "Always make sure a while loop can finish",
    ],
    problem: {
      task: "Print the numbers 1 to 5, each on its own line.",
      hint: "range() can take a start and a stop. range(1, 6) gives you 1 up to 5.",
      solution: "for number in range(1, 6):\n    print(number)",
      expected: "1\n2\n3\n4\n5",
    },
  },
  {
    id: "lists",
    label: "Lists",
    hint: "Holding many values at once",
    title: "Lists",
    definition:
      "A list holds several values in one variable, in order, under a single name.",
    explanation: [
      "Instead of fruit1, fruit2, fruit3, you keep them all in one list and reach for whichever you need.",
      "You get an item by its position, written in square brackets. Counting starts at 0, so the first item is at index 0.",
      "Lists can grow and shrink. append() adds to the end, and a for loop walks through every item without needing indexes at all.",
    ],
    examples: [
      {
        code: 'fruits = ["apple", "banana", "mango"]\n\nprint(fruits[0])\nprint(len(fruits))',
        output: "apple\n3",
        note: "len() gives the number of items. The last index is always len minus 1.",
      },
      {
        code: 'fruits = ["apple", "banana"]\nfruits.append("mango")\n\nfor fruit in fruits:\n    print(fruit)',
        output: "apple\nbanana\nmango",
        note: "This loop is the everyday way to go through a list.",
      },
    ],
    keyPoints: [
      "Indexes start at 0",
      "append() adds one item to the end",
      "for item in list is cleaner than counting positions",
    ],
    problem: {
      task: "Start with colours = [\"red\", \"green\"]. Add \"blue\" to it, print how many colours there are, then print each one.",
      hint: "append() first, then len(), then a for loop.",
      solution: "colours = [\"red\", \"green\"]\ncolours.append(\"blue\")\n\nprint(len(colours))\n\nfor colour in colours:\n    print(colour)",
      expected: "3\nred\ngreen\nblue",
    },
  },
  {
    id: "functions",
    label: "Functions",
    hint: "Reusable blocks of code",
    title: "Functions",
    definition:
      "A function is a named block of code you can run whenever you need it, as many times as you like.",
    explanation: [
      "You define it once with def, then call it by name. If you later need to fix something, you fix it in one place.",
      "Values you pass in are called arguments, and they land in the names listed in the brackets. That's what makes the same function useful for different inputs.",
      "return hands a value back to whoever called the function. Without return, the function does its work but gives nothing back.",
    ],
    examples: [
      {
        code: 'def greet(name):\n    print("Hello,", name)\n\ngreet("Ava")\ngreet("Sam")',
        output: "Hello, Ava\nHello, Sam",
        note: "Defining it runs nothing. Calling it does.",
      },
      {
        code: "def add(a, b):\n    return a + b\n\ntotal = add(4, 6)\nprint(total)",
        output: "10",
        note: "return sends the answer back so you can store or reuse it.",
      },
    ],
    keyPoints: [
      "def defines, the brackets call",
      "print shows a value, return hands it back",
      "One function should do one job",
    ],
    problem: {
      task: "Write a function called square that takes a number and gives back that number multiplied by itself. Call it with 7 and print the result.",
      hint: "Use return inside the function, and print outside it.",
      solution: "def square(number):\n    return number * number\n\nprint(square(7))",
      expected: "49",
    },
  },
  {
    id: "dicts",
    label: "Dictionaries",
    hint: "Labelled data",
    title: "Dictionaries",
    definition:
      "A dictionary stores values under labels instead of positions, so you look things up by name.",
    explanation: [
      "A list would tell you the second item is 21. A dictionary tells you the age is 21. The label carries the meaning.",
      "Each entry is a key and a value, written key: value inside curly braces. You fetch a value by putting its key in square brackets.",
      "Adding a new entry is just assigning to a key that doesn't exist yet. Python creates it for you.",
    ],
    examples: [
      {
        code: 'student = {"name": "Ava", "age": 21}\n\nprint(student["name"])',
        output: "Ava",
        note: "The key goes in the brackets, not a number.",
      },
      {
        code: 'student = {"name": "Ava"}\nstudent["city"] = "Bengaluru"\n\nfor key in student:\n    print(key, "->", student[key])',
        output: "name -> Ava\ncity -> Bengaluru",
        note: "Looping over a dictionary gives you the keys.",
      },
    ],
    keyPoints: [
      "Curly braces, and each entry is key: value",
      "Look up by key, not by position",
      "Assigning to a new key adds it",
    ],
    problem: {
      task: "Make a dictionary called book with title \"Wings of Fire\" and pages 180. Afterwards add an author key set to \"A. P. J. Abdul Kalam\", then print the title and the author.",
      hint: "Create it with curly braces, then assign to a brand-new key to add the entry.",
      solution: "book = {\"title\": \"Wings of Fire\", \"pages\": 180}\nbook[\"author\"] = \"A. P. J. Abdul Kalam\"\n\nprint(book[\"title\"])\nprint(book[\"author\"])",
      expected: "Wings of Fire\nA. P. J. Abdul Kalam",
    },
  },
];

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v314.0.5/full/pyodide.js";

let pyodidePromise = null;

function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = new Promise((resolve, reject) => {
      if (window.loadPyodide) {
        window.loadPyodide().then(resolve, reject);
        return;
      }
      const tag = document.createElement("script");
      tag.src = PYODIDE_URL;
      tag.onload = () => window.loadPyodide().then(resolve, reject);
      tag.onerror = () =>
        reject(new Error("Couldn't reach the Python engine. Check your connection."));
      document.head.appendChild(tag);
    });
  }
  return pyodidePromise;
}

const HARNESS = `
import sys, io, json, builtins, traceback

__buf = io.StringIO()
__vals = iter(json.loads(__user_inputs))
__real_input = builtins.input

def __fake_input(prompt=""):
    try:
        value = str(next(__vals))
    except StopIteration:
        value = ""
    __buf.write(str(prompt) + value + "\\n")
    return value

builtins.input = __fake_input
__saved_stdout = sys.stdout
sys.stdout = __buf
__error = ""

try:
    exec(__user_code, {"__name__": "__main__"})
except BaseException:
    __lines = traceback.format_exc().strip().split("\\n")
    __error = __lines[-1]
finally:
    sys.stdout = __saved_stdout
    builtins.input = __real_input

json.dumps({"out": __buf.getvalue(), "err": __error})
`;

function normalise(text) {
  return String(text)
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

function loosen(text) {
  return normalise(text)
    .toLowerCase()
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0)
    .join("\n");
}

// Compares what the code PRINTED, never how it was written.
// "correct" = identical output. "close" = same output ignoring
// capitalisation, extra spaces and blank lines. "wrong" = genuinely different.
function compare(actual, expected) {
  if (normalise(actual) === normalise(expected)) return "correct";
  if (loosen(actual) === loosen(expected)) return "close";
  return "wrong";
}

async function runPython(code, inputs) {
  const pyodide = await getPyodide();
  pyodide.globals.set("__user_code", code);
  pyodide.globals.set("__user_inputs", JSON.stringify(inputs || []));
  return JSON.parse(pyodide.runPython(HARNESS));
}

/* ---------------------------------------------------------------
   Tiny Python highlighter. Purely presentational: it tokenises the
   lesson snippets so the code panels read like an editor. Anything
   it doesn't recognise falls through as plain text.
   --------------------------------------------------------------- */
const TOKENS =
  /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|\b(\d+\.?\d*)\b|\b(def|class|return|if|elif|else|for|while|in|not|and|or|import|from|as|with|try|except|finally|raise|pass|break|continue|lambda|None|True|False|is|global|nonlocal|yield|assert|del)\b|\b(print|input|int|str|float|bool|len|range|type|list|dict|set|tuple|append|sum|min|max|abs|sorted|enumerate|zip|round|open)\b/g;

const CLASS_FOR = ["tok-com", "tok-str", "tok-num", "tok-kw", "tok-fn"];

function highlight(code) {
  const parts = [];
  let last = 0;
  let m;
  TOKENS.lastIndex = 0;

  while ((m = TOKENS.exec(code)) !== null) {
    if (m.index > last) parts.push(code.slice(last, m.index));
    const group = m.slice(1).findIndex((g) => g !== undefined);
    parts.push(
      <span key={m.index} className={CLASS_FOR[group]}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push(code.slice(last));
  return parts;
}

function CodePanel({ code, name = "example.py" }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      /* clipboard blocked — the code is still selectable */
    }
  }

  return (
    <div className="code">
      <div className="code-bar">
        <span className="lamp r" />
        <span className="lamp y" />
        <span className="lamp g" />
        <span className="code-name">{name}</span>
        <button
          className={copied ? "copy done" : "copy"}
          onClick={copy}
          aria-label="Copy code"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="code-body">
        <code>{highlight(code)}</code>
      </pre>
    </div>
  );
}

function OutputPanel({ text, label = "Output", tone = "" }) {
  return (
    <div className={tone ? `out ${tone}` : "out"}>
      <div className="out-head">
        <span className="pip" />
        {label}
      </div>
      <pre className="out-body">{text}</pre>
    </div>
  );
}

function Practice({ problem, onSolved }) {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [running, setRunning] = useState(false);
  const [booting, setBooting] = useState(false);
  const [result, setResult] = useState(null);

  async function check() {
    if (!answer.trim()) {
      setResult({ kind: "empty" });
      return;
    }
    setRunning(true);
    setResult(null);
    if (!pyodidePromise) setBooting(true);

    try {
      const { out, err } = await runPython(answer, problem.inputs);
      setBooting(false);
      if (err) {
        setResult({ kind: "error", output: out, message: err });
      } else {
        const kind = compare(out, problem.expected);
        setResult({ kind, output: out });
        if (kind === "correct" || kind === "close") onSolved();
      }
    } catch (e) {
      setBooting(false);
      setResult({ kind: "broken", message: e.message });
    } finally {
      setRunning(false);
    }
  }

  const failed = result?.kind === "wrong" || result?.kind === "error";
  const passed = result?.kind === "correct" || result?.kind === "close";

  return (
    <section className="card practice">
      <div className="rule">Your turn</div>

      <p className="task">{problem.task}</p>

      <div className="editor">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          spellCheck={false}
          placeholder="Write your code here..."
          aria-label="Your Python code"
        />
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={check} disabled={running}>
          {running ? (
            <>
              <span className="spinner" />
              Running
            </>
          ) : (
            "Run & check"
          )}
        </button>
        <button className="btn" onClick={() => setShowHint(!showHint)}>
          {showHint ? "Hide hint" : "Show hint"}
        </button>
        <button className="btn" onClick={() => setShowSolution(!showSolution)}>
          {showSolution ? "Hide solution" : "Show solution"}
        </button>
      </div>

      {booting && (
        <div className="booting">
          <span
            className="spinner"
            style={{ borderColor: "rgba(47,125,140,0.3)", borderTopColor: "#2F7D8C" }}
          />
          Starting Python — first run only, about 10 MB
        </div>
      )}

      {result?.kind === "empty" && (
        <div className="verdict v-flat">
          <span className="badge">·</span>
          <span>Write some code in the box first.</span>
        </div>
      )}

      {result?.kind === "correct" && (
        <div className="verdict v-good">
          <span className="badge">✓</span>
          <span>
            <strong>Correct.</strong> Your output matches exactly.
          </span>
        </div>
      )}

      {result?.kind === "close" && (
        <div className="verdict v-good">
          <span className="badge">✓</span>
          <span>
            <strong>Correct.</strong> Your output matches. Spacing and
            capitalisation differ slightly, which is fine.
          </span>
        </div>
      )}

      {result?.kind === "wrong" && (
        <div className="verdict v-warn">
          <span className="badge">!</span>
          <span>
            It ran, but the output isn't what the task asked for. Compare the two
            below, then adjust.
          </span>
        </div>
      )}

      {result?.kind === "error" && (
        <div className="verdict v-bad">
          <span className="badge">×</span>
          <span>
            Python stopped with an error: <strong>{result.message}</strong>
          </span>
        </div>
      )}

      {result?.kind === "broken" && (
        <div className="verdict v-bad">
          <span className="badge">×</span>
          <span>{result.message}</span>
        </div>
      )}

      {failed && (
        <div className="diff">
          <OutputPanel
            tone="bad"
            label="Your output"
            text={result.output || "(nothing printed)"}
          />
          <OutputPanel tone="ok" label="Expected" text={problem.expected} />
        </div>
      )}

      {passed && (
        <div className="stack">
          <OutputPanel tone="ok" label="Your output" text={result.output} />
        </div>
      )}

      {showHint && (
        <div className="hintbox">
          <span className="badge">?</span>
          <span>{problem.hint}</span>
        </div>
      )}

      {showSolution && (
        <div className="reveal">
          <div className="rule">One way to do it</div>
          <CodePanel code={problem.solution} name="solution.py" />
          <div className="stack">
            <OutputPanel text={problem.expected} />
          </div>
          <p className="note">
            Your version doesn't have to match line for line. If it produces the
            same output, it works.
          </p>
        </div>
      )}
    </section>
  );
}

export default function PythonTutor() {
  const [lesson, setLesson] = useState(null);
  const [solved, setSolved] = useState(() => new Set());
  const contentRef = useRef(null);

  const done = solved.size;
  const pct = Math.round((done / LESSONS.length) * 100);

  function pick(next) {
    setLesson(next);
    // On narrow screens the list sits above the article, so bring it into view.
    if (window.matchMedia("(max-width: 940px)").matches) {
      requestAnimationFrame(() =>
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  }

  function markSolved(id) {
    setSolved((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }

  return (
    <div className="app">
      <div className="shell">
        <header className="hero">
          <span className="eyebrow">
            <span className="dot" />
            Learn Python
          </span>
          <h1>
            One concept <em>at a time.</em>
          </h1>
          <p className="lede">
            Pick something from the list. You'll get the definition in plain
            English, two worked examples with their exact output, and a problem
            you can run for real — Python executes right here in your browser.
          </p>
          <div className="hero-meta">
            <span>
              <b>{LESSONS.length}</b> concepts
            </span>
            <span>
              <b>{LESSONS.length * 2}</b> worked examples
            </span>
            <span>
              <b>{done}</b> solved by you
            </span>
          </div>
        </header>

        <div className="layout">
          <aside className="sidebar">
            <nav className="rail" aria-label="Lessons">
              <div className="rail-head">
                <div className="rail-title">
                  <span>Curriculum</span>
                  <b>
                    {done}/{LESSONS.length}
                  </b>
                </div>
                <div className="meter">
                  <i style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="nav-scroll">
                {LESSONS.map((t, i) => {
                  const active = lesson?.id === t.id;
                  const complete = solved.has(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => pick(t)}
                      aria-current={active ? "true" : undefined}
                      className={[
                        "nav-item",
                        active ? "is-active" : "",
                        complete ? "is-done" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span className="nav-num">
                        {complete ? "✓" : String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="nav-label">{t.label}</span>
                      <span className="nav-hint">{t.hint}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </aside>

          <main className="content" ref={contentRef}>
            {!lesson && (
              <div className="empty">
                <div className="empty-mark">&gt;&gt;&gt;</div>
                <h2>Choose a concept to begin</h2>
                <p>
                  Every lesson is self-contained, so you can start anywhere —
                  though the list runs roughly in the order things build on each
                  other.
                </p>
              </div>
            )}

            {lesson && (
              <article className="lesson" key={lesson.id}>
                <section className="card">
                  <div className="crumb">
                    Concept{" "}
                    {String(LESSONS.findIndex((l) => l.id === lesson.id) + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>
                  <h2>{lesson.title}</h2>

                  <p className="definition">{lesson.definition}</p>

                  <div className="prose">
                    {lesson.explanation.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>

                <section className="card">
                  <div className="rule">Worked examples</div>
                  {lesson.examples.map((ex, i) => (
                    <div className="example" key={i}>
                      <CodePanel code={ex.code} name={`example_${i + 1}.py`} />
                      <div className="stack">
                        <OutputPanel text={ex.output} />
                      </div>
                      <p className="note">{ex.note}</p>
                    </div>
                  ))}
                </section>

                <section className="card">
                  <div className="rule">Worth remembering</div>
                  <ul className="points">
                    {lesson.keyPoints.map((k, i) => (
                      <li key={i}>
                        <span className="tick">✦</span>
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <Practice
                  key={lesson.id}
                  problem={lesson.problem}
                  onSolved={() => markSolved(lesson.id)}
                />
              </article>
            )}

            <footer className="footer">
              <span>Python runs locally in your browser via Pyodide.</span>
              <span>Nothing you write is uploaded anywhere.</span>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
