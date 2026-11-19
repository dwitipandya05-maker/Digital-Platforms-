/* ============================================================
   App logic — builds the tabs, pages and games from
   data/sessions.js. You normally never need to edit this file.
   ============================================================ */
(function () {
  "use strict";

  const SITE = window.SITE || {};
  const SESSIONS = (window.SESSIONS || []).slice().sort((a, b) => a.date.localeCompare(b.date));
  const app = document.getElementById("app");
  const tabsEl = document.getElementById("tabs");

  const STAR = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2c1 8 6 13 14 14-8 1-13 6-14 14-1-8-6-13-14-14 8-1 13-6 14-14z"/></svg>';

  // ---------- helpers ----------
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const fmtDate = (iso) => {
    const d = new Date(iso + "T12:00:00");
    return isNaN(d) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  // wrap the highlight words of a title in a pill
  const pillTitle = (title, hl) => {
    const t = esc(title);
    if (!hl) return t;
    const i = title.toLowerCase().indexOf(hl.toLowerCase());
    if (i < 0) return t;
    return esc(title.slice(0, i)) + '<span class="pill-word">' + esc(title.slice(i, i + hl.length)) + STAR + "</span>" + esc(title.slice(i + hl.length));
  };
  // best scores (kept in this browser only)
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem("dp:" + k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem("dp:" + k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };

  // ---------- chrome ----------
  document.getElementById("brand-name").textContent = SITE.course || "Course";
  document.getElementById("term-pill").textContent = [SITE.school && SITE.school.split(" ")[0], SITE.term].filter(Boolean).join(" · ");
  document.getElementById("footer-left").textContent = [SITE.student, SITE.course, SITE.school].filter(Boolean).join(" · ");

  function renderTabs(active) {
    const items = [{ id: "overview", label: "Overview" }].concat(
      SESSIONS.map((s, i) => ({ id: s.id, label: s.tabLabel || s.title, num: pad(i + 1) }))
    );
    tabsEl.innerHTML = items.map((t) =>
      `<button class="tab" role="tab" data-id="${esc(t.id)}" aria-selected="${t.id === active}">` +
      (t.num ? `<span class="num">${t.num}</span>` : "") + esc(t.label) + "</button>"
    ).join("");
    const cur = tabsEl.querySelector('[aria-selected="true"]');
    if (cur) cur.scrollIntoView({ block: "nearest", inline: "center" });
  }
  tabsEl.addEventListener("click", (e) => {
    const b = e.target.closest(".tab");
    if (b) location.hash = b.dataset.id;
  });

  // ---------- overview ----------
  function renderOverview() {
    const first = SESSIONS[0];
    const styles = ["light", "", "mist", ""];
    app.innerHTML = `
      <div class="view">
        <div class="hero">
          ${STAR.replace("<svg", '<svg class="star"')}
          <h1>Every guest speaker, one <span class="pill-word">tab${STAR}</span> at a time</h1>
          <p>${esc(SITE.tagline || "")}</p>
          ${first ? `<a class="btn" href="#${esc(first.id)}">Start with session 01 <span class="arrow">→</span></a>` : ""}
          <div class="bloom"></div><div class="disc a"></div><div class="disc b"></div>
        </div>

        <section>
          <div class="split">
            <div>
              <span class="label">sessions<sup>[01]</sup></span>
              <h2>What we’ve covered so far</h2>
            </div>
            <p class="lede">${SESSIONS.length} session${SESSIONS.length === 1 ? "" : "s"} so far. Each tab has the speaker’s key ideas, a short game to practise them, and the full slide deck.</p>
          </div>
          <div class="cards">
            ${SESSIONS.map((s, i) => `
              <button class="card ${styles[i % styles.length]}" data-go="${esc(s.id)}">
                <div class="top">
                  <div><span class="num">${pad(i + 1)} · ${esc(fmtDate(s.date))}</span><h3>${esc(s.title)}</h3></div>
                  <span class="go" aria-hidden="true">↗</span>
                </div>
                <div class="meta">${esc(s.speakers)}${s.org ? " — " + esc(s.org) : ""}</div>
              </button>`).join("")}
            <div class="card ghost">
              <div class="top"><div><span class="num">${pad(SESSIONS.length + 1)} · next week</span><h3>Next speaker</h3></div></div>
              <div class="meta">A new tab appears here after each session.</div>
            </div>
          </div>
        </section>
      </div>`;
    app.querySelectorAll("[data-go]").forEach((el) => el.addEventListener("click", () => (location.hash = el.dataset.go)));
  }

  // ---------- session page ----------
  function renderSession(s, index) {
    const games = s.games || [];
    app.innerHTML = `
      <div class="view">
        <div class="session-hero">
          <span class="label">session<sup>[${pad(index + 1)}]</sup></span>
          <h1>${pillTitle(s.title, s.highlight)}</h1>
          <div class="facts">
            <span class="fact"><b>Date</b> · ${esc(fmtDate(s.date))}</span>
            <span class="fact"><b>Speaker</b> · ${esc(s.speakers)}</span>
            ${s.org ? `<span class="fact">${esc(s.org)}</span>` : ""}
          </div>
          <p class="lede">${esc(s.summary)}</p>
          <div class="actions">
            ${games.length ? `<a class="btn" href="#${esc(s.id)}/play">Play the games <span class="arrow">→</span></a>` : ""}
            ${s.slides ? `<a class="btn ghost" href="${esc(s.slides)}" target="_blank" rel="noopener">Open slides <span class="arrow">↗</span></a>` : ""}
          </div>
          <div class="disc b"></div>
        </div>

        ${(s.takeaways || []).length ? `
        <section>
          <span class="label">key ideas<sup>[01]</sup></span>
          <h2>What to remember</h2>
          <div class="takeaways">
            ${s.takeaways.map((t, i) => `<article class="tk"><span class="n">${pad(i + 1)}</span><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></article>`).join("")}
          </div>
        </section>` : ""}

        ${games.length ? `
        <section id="play">
          <span class="label">play<sup>[02]</sup></span>
          <h2>Lock it in</h2>
          <div class="game-shell">
            <div class="chips" role="group" aria-label="Choose a game">
              ${games.map((g, i) => `<button class="chip" data-g="${i}" aria-pressed="${i === 0}">${esc(g.title)}<span class="best" data-best="${i}"></span></button>`).join("")}
            </div>
            <div id="game"></div>
          </div>
        </section>` : ""}

        ${s.slides ? `
        <section>
          <span class="label">slides<sup>[03]</sup></span>
          <div class="split">
            <h2>The original deck</h2>
            <div class="actions" style="justify-content:flex-end;margin:0">
              <a class="btn ghost" href="${esc(s.slides)}" download>Download PDF <span class="arrow">↓</span></a>
            </div>
          </div>
          <div class="slides-frame"><iframe src="${esc(s.slides)}#view=FitH" title="Slides: ${esc(s.title)}" loading="lazy"></iframe></div>
        </section>` : ""}
      </div>`;

    if (!games.length) return;
    const chips = app.querySelectorAll(".chip");
    const refreshBest = () => games.forEach((g, i) => {
      const b = store.get(s.id + ":" + i);
      app.querySelector(`[data-best="${i}"]`).textContent = b ? `best ${b}` : "";
    });
    const play = (i) => {
      chips.forEach((c) => c.setAttribute("aria-pressed", String(+c.dataset.g === i)));
      mountGame(document.getElementById("game"), games[i], s.id + ":" + i, refreshBest);
    };
    chips.forEach((c) => c.addEventListener("click", () => play(+c.dataset.g)));
    refreshBest();
    play(0);
  }

  // ---------- game engine ----------
  function mountGame(root, g, key, onSave) {
    const saveBest = (label, value) => {
      const prev = store.get(key + ":v");
      if (prev === null || value > prev) { store.set(key + ":v", value); store.set(key, label); }
      onSave();
    };
    const head = (right) => `<div class="game-head"><div><h3>${esc(g.title)}</h3><p>${esc(g.intro || "")}</p></div>${right || ""}</div>`;
    ({ quiz, match, order }[g.type] || (() => (root.innerHTML = "<p>Unknown game type.</p>")))();

    // --- multiple-choice quiz ---
    function quiz() {
      const qs = g.questions || [];
      let i = 0, score = 0;
      const step = () => {
        if (i >= qs.length) return done();
        const q = qs[i];
        root.innerHTML = head(`<span class="score">${i + 1} / ${qs.length}</span>`) + `
          <div class="q-progress"><span style="width:${(i / qs.length) * 100}%"></span></div>
          <div class="q-text">${esc(q.q)}</div>
          <div class="options">${q.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}</div>
          <div class="why" hidden></div>
          <div class="row-end" hidden><button class="btn next">${i + 1 < qs.length ? "Next" : "See score"} <span class="arrow">→</span></button></div>`;
        root.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => {
          const k = +b.dataset.k, right = k === q.answer;
          if (right) score++;
          root.querySelectorAll(".opt").forEach((o) => {
            o.disabled = true;
            if (+o.dataset.k === q.answer) o.classList.add("correct");
          });
          if (!right) b.classList.add("wrong");
          const why = root.querySelector(".why");
          why.textContent = (right ? "Correct. " : "Not quite. ") + (q.why || "");
          why.hidden = false;
          root.querySelector(".row-end").hidden = false;
          root.querySelector(".next").focus();
        }));
        root.querySelector(".next").addEventListener("click", () => { i++; step(); });
      };
      const done = () => {
        saveBest(`${score}/${qs.length}`, score / qs.length);
        result(`${score}/${qs.length}`, score === qs.length ? "Perfect — you’ve got this session down." : "Have another go to lock in the rest.", quiz);
      };
      step();
    }

    // --- match pairs ---
    function match() {
      const pairs = g.pairs || [];
      const right = shuffle(pairs.map((p, i) => ({ text: p[1], i })));
      let sel = null, found = 0, tries = 0;
      root.innerHTML = head(`<span class="score" id="mscore">0 / ${pairs.length}</span>`) + `
        <div class="match">
          <div class="col">${pairs.map((p, i) => `<button class="tile term" data-i="${i}">${esc(p[0])}</button>`).join("")}</div>
          <div class="col">${right.map((r) => `<button class="tile def" data-i="${r.i}">${esc(r.text)}</button>`).join("")}</div>
        </div>`;
      root.querySelectorAll(".tile").forEach((t) => t.addEventListener("click", () => {
        if (t.disabled) return;
        if (!sel || sel.classList.contains(t.classList.contains("term") ? "term" : "def")) {
          if (sel) sel.classList.remove("sel");
          sel = t; t.classList.add("sel"); return;
        }
        tries++;
        if (sel.dataset.i === t.dataset.i) {
          [sel, t].forEach((x) => { x.classList.remove("sel"); x.classList.add("done"); x.disabled = true; });
          found++;
          root.querySelector("#mscore").textContent = `${found} / ${pairs.length}`;
          sel = null;
          if (found === pairs.length) {
            const acc = Math.round((pairs.length / tries) * 100);
            saveBest(`${acc}%`, acc);
            setTimeout(() => result(`${acc}%`, `Accuracy — ${tries} attempts for ${pairs.length} pairs.`, match), 450);
          }
        } else {
          [sel, t].forEach((x) => { x.classList.add("shake"); setTimeout(() => x.classList.remove("shake", "sel"), 380); });
          sel = null;
        }
      }));
    }

    // --- put steps in order ---
    function order() {
      const steps = g.steps || [];
      let cur = shuffle(steps.map((t, i) => ({ t, i })));
      if (steps.length > 1) while (cur.every((c, k) => c.i === k)) cur = shuffle(cur);
      let checks = 0;
      const draw = (marks) => {
        root.innerHTML = head(`<span class="score">${checks ? `check #${checks}` : "unsorted"}</span>`) + `
          <ol class="order">${cur.map((c, k) => `
            <li class="${marks ? (c.i === k ? "ok" : "no") : ""}">
              <span>${esc(c.t)}</span>
              <button class="mv" data-k="${k}" data-d="-1" aria-label="Move up" ${k === 0 ? "disabled" : ""}>↑</button>
              <button class="mv" data-k="${k}" data-d="1" aria-label="Move down" ${k === cur.length - 1 ? "disabled" : ""}>↓</button>
            </li>`).join("")}
          </ol>
          <div class="row-end" style="max-width:680px"><button class="btn check">Check order <span class="arrow">✓</span></button></div>`;
        root.querySelectorAll(".mv").forEach((b) => b.addEventListener("click", () => {
          const k = +b.dataset.k, d = +b.dataset.d;
          [cur[k], cur[k + d]] = [cur[k + d], cur[k]];
          draw(false);
          const again = root.querySelector(`.mv[data-k="${k + d}"][data-d="${d}"]`) || root.querySelector(`.mv[data-k="${k + d}"]`);
          if (again && !again.disabled) again.focus();
        }));
        root.querySelector(".check").addEventListener("click", () => {
          checks++;
          if (cur.every((c, k) => c.i === k)) {
            saveBest(checks === 1 ? "1st try" : `${checks} tries`, -checks);
            result(checks === 1 ? "First try" : `${checks} tries`, "Every step is in the right place.", order);
          } else draw(true);
        });
      };
      draw(false);
    }

    function result(big, text, again) {
      root.innerHTML = head() + `
        <div class="result">
          <div class="big">${esc(big)}</div>
          <p>${esc(text)}</p>
          <button class="btn ghost again">Play again <span class="arrow">↻</span></button>
        </div>`;
      root.querySelector(".again").addEventListener("click", again);
    }
  }

  // ---------- router ----------
  function route() {
    const [id, sub] = (location.hash.slice(1) || "overview").split("/");
    const idx = SESSIONS.findIndex((s) => s.id === id);
    renderTabs(idx >= 0 ? id : "overview");
    if (idx >= 0) {
      renderSession(SESSIONS[idx], idx);
      document.title = `${SESSIONS[idx].tabLabel || SESSIONS[idx].title} — ${SITE.course || "Course"}`;
      if (sub === "play") document.getElementById("play")?.scrollIntoView();
      else window.scrollTo(0, 0);
    } else {
      renderOverview();
      document.title = `${SITE.course || "Course"} — Guest Speaker Series`;
      window.scrollTo(0, 0);
    }
  }
  window.addEventListener("hashchange", route);
  route();
})();
