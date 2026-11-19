# Digital Platforms — Guest Speaker Series

A website with one tab per guest-speaker session. Each tab has the key ideas, three short games (quiz, match, put-in-order) and the original slides.

Plain HTML/CSS/JS: no build step, no framework. It works on GitHub + Vercel and also opens straight from your computer (double-click `index.html`).

```
course-site/
├── index.html              page shell (you rarely touch this)
├── css/styles.css          the look: colours, fonts, spacing
├── js/app.js               tabs, pages and the game engine
├── data/sessions.js        ← THE ONLY FILE YOU EDIT EACH WEEK
├── slides/                 ← the speakers' PDFs go here
├── WEEKLY_UPDATE_PROMPT.md prompt to paste into Claude Code
└── vercel.json             small hosting settings
```

---

## Part A — First-time setup (about 15 minutes, once)

### 1. Make accounts
- **GitHub**: https://github.com/signup
- **Vercel**: https://vercel.com/signup → choose **Continue with GitHub** (this lets Vercel see your repos).

### 2. Personalise it
Open `data/sessions.js` and change `student: "Your Name"` to your name.

### 3. Put the code on GitHub

**Option 1: with Claude Code (easiest, as shown in class)**
1. On github.com, click the green **New** button (or go to https://github.com/new).
2. Name it `digital-platforms-sessions`, keep it **Public**, don't tick "Add a README", then click **Create repository**. Copy the repo URL.
3. Open Claude Code in the `course-site` folder and paste:
   > Push this project to GitHub. Initialise a git repo, commit everything with a clear message, and push it to <paste your repo URL>.
4. Refresh the GitHub page. Your files should be there.

**Option 2: using the GitHub website, no terminal**
1. Create the repo as above.
2. On the empty repo page, click **uploading an existing file**.
3. Drag in **everything inside** the `course-site` folder: `index.html`, `README.md`, `vercel.json`, `WEEKLY_UPDATE_PROMPT.md`, and the `css`, `js`, `data` and `slides` folders.
4. Click **Commit changes**.

**Option 3: from the terminal yourself**
```bash
cd course-site
git init
git add .
git commit -m "First version of the guest speaker site"
git branch -M main
git remote add origin https://github.com/<your-username>/digital-platforms-sessions.git
git push -u origin main
```

### 4. Deploy on Vercel
1. Go to https://vercel.com/new.
2. Under **Import Git Repository**, pick `digital-platforms-sessions` and click **Import**. If you don't see it, click **Adjust GitHub App Permissions** and allow the repo.
3. Leave everything as it is: Framework Preset **Other**, no build command, root directory `./`.
4. Click **Deploy**. After a few seconds you get a live link like `https://digital-platforms-sessions.vercel.app`. **That link is what you submit.**

From now on, every push to GitHub updates the live site automatically.

---

## Part B — Every week, after a new speaker (about 5 minutes)

### Fastest: let Claude Code do it
1. Save the speaker's PDF into `slides/` with a name like `2026-11-20-speaker-topic.pdf` (lowercase, no spaces).
2. Open Claude Code in the project folder and paste the prompt from **`WEEKLY_UPDATE_PROMPT.md`**, filling in the [brackets].
3. Claude Code reads the PDF, adds the session and its games to `data/sessions.js`, commits and pushes.
4. Wait about a minute and refresh your Vercel link. The new tab is there.

### Manual: no Claude Code
1. **Add the PDF**: on your GitHub repo, open the `slides` folder → **Add file → Upload files** → drop the PDF → **Commit changes**.
2. **Add the session**: open `data/sessions.js` on GitHub → click the ✏️ pencil icon.
   - Scroll to the bottom and find the `TEMPLATE` block.
   - Copy everything from `,{` down to the matching `}`.
   - Paste it **just above** the line `/* ====================== TEMPLATE`, after the last session's closing `}`.
   - Fill in the fields. `slides:` must match the PDF file name exactly.
3. Click **Commit changes**. Vercel redeploys on its own.

### Checklist if the new tab doesn't appear
- Open the live site, right-click → **Inspect** → **Console**. A red error usually means a missing comma or quote in `sessions.js`.
- Every session needs a comma between it and the next one: `},` then `{`.
- Use straight quotes `"` around values. If your text contains a `"`, write `\"` or use curly quotes “ ”.
- Check that the `slides:` path matches the file name exactly, including capitals.
- On Vercel → your project → **Deployments**, the newest one should show **Ready**.

---

## Game types you can use in `games: [...]`

| type    | fields                                                             | what students do                 |
|---------|--------------------------------------------------------------------|----------------------------------|
| `quiz`  | `questions: [{ q, options: [...], answer: <index from 0>, why }]`  | multiple choice with explanations |
| `match` | `pairs: [["Term", "Meaning"], ...]`                                | click a term, then its meaning   |
| `order` | `steps: ["first", "second", ...]` (write them in the correct order) | rearrange the shuffled steps     |

Best scores are saved in each visitor's browser.

## Changing the look
All the colours are at the top of `css/styles.css` (`:root { ... }`). For example, to change the accent colour, edit `--lav-4`. With Claude Code you can just say: *"Make the accent colour teal and the hero gradient light blue."*

## Notes
- Keep PDFs under ~25 MB so the pages load quickly. GitHub rejects files over 100 MB.
- On iPhone, the embedded PDF may only show the first page. The **Open slides** button opens the full deck.
