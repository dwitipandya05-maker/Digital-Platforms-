# Weekly update prompt for Claude Code

1. Copy the speaker's PDF into the `slides/` folder of this project.
2. Open Claude Code in this project folder.
3. Paste the prompt below and change the parts in [brackets].

---

I've added a new guest speaker deck at `slides/[file-name].pdf`.
The session was on [YYYY-MM-DD] with [speaker name, role, company].

Please:
1. Read the PDF and work out the main ideas of the session.
2. Add a new session object to the END of the `window.SESSIONS` list in `data/sessions.js`.
   Follow the exact format of the existing sessions and the TEMPLATE comment in that file:
   - `id`: short, lowercase, hyphens, no spaces
   - `tabLabel`: 1–3 words
   - `title` and `highlight` (a phrase that appears in the title)
   - `summary`: 2–3 sentences
   - `takeaways`: exactly 4, each with a title and 1–2 sentences
   - `games`: one `quiz` (5–6 questions with `why` explanations), one `match` (5–6 pairs)
     and one `order` (4–7 steps) — only use facts that are in the slides
3. Don't change any other file.
4. Check that `data/sessions.js` has no syntax errors (e.g. `node -e "require('./data/sessions.js')"`
   won't work because it uses `window`, so instead run:
   `node -e "global.window={}; require('./data/sessions.js'); console.log(window.SESSIONS.length)"`).
5. Commit with the message "Add session: [speaker name]" and push to GitHub.

---

Vercel picks up the push and the new tab is live within a minute.

**If the PDF is bigger than ~25 MB**, also ask Claude Code:
"Compress `slides/[file-name].pdf` so it's under 15 MB without making the slides blurry."
