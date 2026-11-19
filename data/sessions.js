/* =====================================================================
   SESSIONS DATA — this is the ONLY file you edit each week.
   ---------------------------------------------------------------------
   To add a new guest speaker:
   1. Put the speaker's PDF in the /slides folder
      (name it like: 2026-11-20-speaker-topic.pdf — no spaces).
   2. Copy the TEMPLATE at the bottom of this file, paste it at the END
      of the SESSIONS list (before the closing  ];  ), and fill it in.
   3. Commit + push to GitHub. Vercel updates the live site by itself.
   A new tab appears automatically — no HTML changes needed.
   ===================================================================== */

window.SITE = {
  course: "Digital Platforms",
  school: "ESSEC Business School",
  term: "Fall 2026",
  student: "Your Name",            // ← put your name here
  tagline:
    "One tab for every guest speaker this semester: the key ideas, a quick game to lock them in, and the original slides."
};

window.SESSIONS = [
  /* ------------------------------------------------------------------ */
  {
    id: "vibe-coding",                       // used in the URL: /#vibe-coding
    tabLabel: "Vibe Coding",                 // short name shown on the tab
    date: "2026-10-09",                      // YYYY-MM-DD
    title: "Vibe coding with Claude, GitHub & Vercel",
    highlight: "Vibe coding",                // word(s) from title shown as a pill
    speakers: "Yibo, Nirvan & Rishabh",
    org: "LaunchLab",
    summary:
      "How to go from an idea to a live website without writing code by hand: design the front end in Claude Design, build it with Claude Code, store it on GitHub and publish it with Vercel.",
    slides: "slides/2026-10-09-vibe-coding.pdf",
    takeaways: [
      {
        title: "Design the front end first",
        text: "Claude Design builds the visual shell from a description. Strong prompts give a role, goal, audience, style, the pages needed and the output wanted. Share → “Handoff to Claude Code…” sends the design on."
      },
      {
        title: "Claude Code builds it",
        text: "An agentic coding system: it reads the whole codebase, runs shell commands, debugs failures, runs routines, refactors and keeps context across the session."
      },
      {
        title: "GitHub stores, Vercel publishes",
        text: "GitHub keeps every file and version in a repository. Vercel turns that repo into a live link and redeploys on every push — plus a preview link for every pull request."
      },
      {
        title: "Static sites forget people",
        text: "A plain site can’t remember users or fetch live data. A backend like Supabase adds sign-up, log-in and a database; logging in is just an API call that returns a token."
      }
    ],
    games: [
      {
        type: "match",
        title: "Git vocabulary",
        intro: "Pair each GitHub term with what it does.",
        pairs: [
          ["Fork", "Your own copy of someone else’s repo on your GitHub account"],
          ["Clone", "Download a repo onto your computer to edit locally"],
          ["Commit", "Save a snapshot of changes with a note — locally only"],
          ["Push", "Send your saved commits up to GitHub"],
          ["Pull request", "Propose changes and ask teammates to review"],
          ["Merge", "Combine approved changes into the main project"]
        ]
      },
      {
        type: "order",
        title: "Idea → live site",
        intro: "Put the workflow in the right order.",
        steps: [
          "Describe the look in Claude Design",
          "Hand the design off to Claude Code",
          "Claude Code builds the real files",
          "Push the project to a GitHub repo",
          "Import the repo into Vercel and deploy",
          "Every new push updates the live site"
        ]
      },
      {
        type: "quiz",
        title: "Quick check",
        intro: "Six questions from the session.",
        questions: [
          {
            q: "Which file do you open to change the text on your main button?",
            options: ["index.html", "styles.css", "script.js"],
            answer: 0,
            why: "index.html holds the words and structure people read."
          },
          {
            q: "Which file do you open to make that button orange?",
            options: ["index.html", "styles.css", "script.js"],
            answer: 1,
            why: "styles.css controls colours, fonts and spacing."
          },
          {
            q: "Which file makes the button do something when clicked?",
            options: ["index.html", "styles.css", "script.js"],
            answer: 2,
            why: "script.js is the behaviour layer: clicks, typing, submitting."
          },
          {
            q: "You just made a commit. Where is it saved?",
            options: ["On GitHub", "On your computer only", "On Vercel"],
            answer: 1,
            why: "A commit is local until you push it."
          },
          {
            q: "You’re working on a team project. Push straight to main, or open a pull request?",
            options: ["Push — it’s faster", "Pull request — teammates review first"],
            answer: 1,
            why: "PRs let others comment and approve before anything is merged."
          },
          {
            q: "What is a login token?",
            options: [
              "Your password, stored in the browser",
              "A temporary pass that tells the site who you are on each request",
              "A row in the user table"
            ],
            answer: 1,
            why: "The browser shows it on every request so you aren’t asked for your password each click. It expires on its own."
          }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "ai-marketing-team",
    tabLabel: "AI Marketing Team",
    date: "2026-10-30",
    title: "Building an AI marketing team with Claude",
    highlight: "AI marketing team",
    speakers: "Nick Goh",
    org: "CEO, INSPIRO Consulting · CMO, Yellow Pages Singapore",
    summary:
      "A lite agentic workflow: six specialist roles — from brief writer to creative reviewer — set up as Claude skills inside one project, handing work down a chain, with a human approving at the key step. Demonstrated on a Louis Vuitton “Terra” social launch.",
    slides: "slides/2026-10-30-ai-marketing-team.pdf",
    takeaways: [
      {
        title: "Planning team",
        text: "Brief Writer drafts the brief from project context. Brief Validator critiques it in a fresh chat. Strategist digests the validated brief and shapes the Big Idea one-pager."
      },
      {
        title: "Production team",
        text: "Designer / Art Director creates key visuals (with connectors such as Higgsfield). Copywriter builds the messaging hierarchy and channel copy. Reviewer checks brand voice and signs off."
      },
      {
        title: "Each role is a skill",
        text: "One Claude project holds the instructions and knowledge base; each role is a reusable skill — including a compliance check against Singapore’s advertising code and a creative review scorer. A scheduled task can run the brief builder automatically."
      },
      {
        title: "The human stays in the loop",
        text: "You approve the strategy and save it to the knowledge base before production starts. The AI reviewer then scores the creative — the close-up “hand on the clasp” shot beat the wide desert story."
      }
    ],
    games: [
      {
        type: "order",
        title: "The handoff chain",
        intro: "Rebuild the six-step chain from brief to sign-off.",
        steps: [
          "Brief Writer drafts the brief",
          "Brief Validator reviews it in a new chat",
          "Strategist shapes the Big Idea",
          "You approve and save to the knowledge base",
          "Designer + Copywriter create KVs and channel messaging",
          "Reviewer checks the brand voice"
        ]
      },
      {
        type: "match",
        title: "Who delivers what?",
        intro: "Match each AI team member to their output.",
        pairs: [
          ["Brief Writer", "A draft brief"],
          ["Brief Validator", "A verdict and the top fixes"],
          ["Strategist", "The Big Idea one-pager"],
          ["Designer / Art Director", "Key visual concepts and assets"],
          ["Copywriter", "Channel-by-channel copy"],
          ["Reviewer", "Edits and sign-off"]
        ]
      },
      {
        type: "quiz",
        title: "Quick check",
        intro: "Five questions from the session.",
        questions: [
          {
            q: "Why does the Brief Validator work in a new chat?",
            options: ["To save tokens", "Fresh eyes — no bias from the drafting conversation", "Skills only run in new chats"],
            answer: 1,
            why: "Separating writer and critic gives an independent review."
          },
          {
            q: "Before drafting, what does the Brief Writer need?",
            options: ["Goal, audience, budget and timing", "Only the product photo", "The final key visual"],
            answer: 0,
            why: "Those four inputs make the brief actionable."
          },
          {
            q: "At which step does the human step in?",
            options: ["Never — it’s fully automated", "Approving the strategy and saving it to the knowledge base", "Only at final sign-off"],
            answer: 1,
            why: "Step 4: you approve before production spends effort."
          },
          {
            q: "Which tool was used to generate the key visuals?",
            options: ["Canva", "Higgsfield / Cinema Studio", "Figma"],
            answer: 1,
            why: "The Designer role connected to Higgsfield for KVs."
          },
          {
            q: "Which creative scored higher with the review scorer?",
            options: ["The 3-frame desert Instagram story", "The close-up of a hand on the bag’s clasp"],
            answer: 1,
            why: "About 6.7/10 vs 5.7/10 — a specific craft detail beat a generic scenic shot."
          }
        ]
      }
    ]
  }

  /* ====================== TEMPLATE — copy below ======================
  ,{
    id: "short-id-no-spaces",
    tabLabel: "Short Tab Name",
    date: "2026-11-20",
    title: "Full session title",
    highlight: "word from title",
    speakers: "Speaker Name",
    org: "Role, Company",
    summary: "Two or three sentences on what the session was about.",
    slides: "slides/2026-11-20-file-name.pdf",
    takeaways: [
      { title: "Idea 1", text: "One or two sentences." },
      { title: "Idea 2", text: "One or two sentences." },
      { title: "Idea 3", text: "One or two sentences." },
      { title: "Idea 4", text: "One or two sentences." }
    ],
    games: [
      { type: "quiz", title: "Quick check", intro: "…",
        questions: [
          { q: "Question?", options: ["A", "B", "C"], answer: 0, why: "Explanation." }
        ] },
      { type: "match", title: "Match it", intro: "…",
        pairs: [ ["Term", "Meaning"], ["Term", "Meaning"], ["Term", "Meaning"] ] },
      { type: "order", title: "Put it in order", intro: "…",
        steps: [ "First", "Second", "Third", "Fourth" ] }
    ]
  }
  ==================================================================== */
];
