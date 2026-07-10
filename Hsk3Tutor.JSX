import { useState, useMemo } from "react";

// ---------- HSK 3 vocabulary (90 core words) ----------
const VOCAB = [
  // Verbs
  { h: "搬", p: "bān", e: "to move (house/objects)", c: "Verbs" },
  { h: "帮忙", p: "bāngmáng", e: "to help", c: "Verbs" },
  { h: "参加", p: "cānjiā", e: "to participate", c: "Verbs" },
  { h: "迟到", p: "chídào", e: "to arrive late", c: "Verbs" },
  { h: "打扫", p: "dǎsǎo", e: "to clean, sweep", c: "Verbs" },
  { h: "打算", p: "dǎsuàn", e: "to plan, intend", c: "Verbs" },
  { h: "带", p: "dài", e: "to bring, carry", c: "Verbs" },
  { h: "担心", p: "dānxīn", e: "to worry", c: "Verbs" },
  { h: "锻炼", p: "duànliàn", e: "to exercise", c: "Verbs" },
  { h: "发烧", p: "fāshāo", e: "to have a fever", c: "Verbs" },
  { h: "发现", p: "fāxiàn", e: "to discover", c: "Verbs" },
  { h: "放", p: "fàng", e: "to put, place", c: "Verbs" },
  { h: "放心", p: "fàngxīn", e: "to be at ease", c: "Verbs" },
  { h: "复习", p: "fùxí", e: "to review", c: "Verbs" },
  { h: "感冒", p: "gǎnmào", e: "to catch a cold", c: "Verbs" },
  { h: "关心", p: "guānxīn", e: "to care about", c: "Verbs" },
  { h: "害怕", p: "hàipà", e: "to be afraid", c: "Verbs" },
  { h: "画", p: "huà", e: "to draw, paint", c: "Verbs" },
  { h: "换", p: "huàn", e: "to exchange, change", c: "Verbs" },
  { h: "记得", p: "jìde", e: "to remember", c: "Verbs" },
  { h: "检查", p: "jiǎnchá", e: "to check, examine", c: "Verbs" },
  { h: "见面", p: "jiànmiàn", e: "to meet (in person)", c: "Verbs" },
  { h: "讲", p: "jiǎng", e: "to speak, explain", c: "Verbs" },
  { h: "教", p: "jiāo", e: "to teach", c: "Verbs" },
  { h: "接", p: "jiē", e: "to pick up, receive", c: "Verbs" },
  { h: "结婚", p: "jiéhūn", e: "to get married", c: "Verbs" },
  { h: "结束", p: "jiéshù", e: "to end, finish", c: "Verbs" },
  { h: "解决", p: "jiějué", e: "to solve", c: "Verbs" },
  { h: "借", p: "jiè", e: "to borrow, lend", c: "Verbs" },
  { h: "决定", p: "juédìng", e: "to decide", c: "Verbs" },
  // Nouns
  { h: "爱好", p: "àihào", e: "hobby", c: "Nouns" },
  { h: "办法", p: "bànfǎ", e: "method, way", c: "Nouns" },
  { h: "办公室", p: "bàngōngshì", e: "office", c: "Nouns" },
  { h: "比赛", p: "bǐsài", e: "competition, match", c: "Nouns" },
  { h: "变化", p: "biànhuà", e: "change", c: "Nouns" },
  { h: "冰箱", p: "bīngxiāng", e: "refrigerator", c: "Nouns" },
  { h: "菜单", p: "càidān", e: "menu", c: "Nouns" },
  { h: "衬衫", p: "chènshān", e: "shirt", c: "Nouns" },
  { h: "成绩", p: "chéngjì", e: "grades, results", c: "Nouns" },
  { h: "城市", p: "chéngshì", e: "city", c: "Nouns" },
  { h: "船", p: "chuán", e: "boat, ship", c: "Nouns" },
  { h: "词典", p: "cídiǎn", e: "dictionary", c: "Nouns" },
  { h: "蛋糕", p: "dàngāo", e: "cake", c: "Nouns" },
  { h: "灯", p: "dēng", e: "lamp, light", c: "Nouns" },
  { h: "地铁", p: "dìtiě", e: "subway", c: "Nouns" },
  { h: "地图", p: "dìtú", e: "map", c: "Nouns" },
  { h: "电梯", p: "diàntī", e: "elevator", c: "Nouns" },
  { h: "动物", p: "dòngwù", e: "animal", c: "Nouns" },
  { h: "耳朵", p: "ěrduo", e: "ear", c: "Nouns" },
  { h: "故事", p: "gùshi", e: "story", c: "Nouns" },
  { h: "关系", p: "guānxi", e: "relationship", c: "Nouns" },
  { h: "国家", p: "guójiā", e: "country", c: "Nouns" },
  { h: "河", p: "hé", e: "river", c: "Nouns" },
  { h: "护照", p: "hùzhào", e: "passport", c: "Nouns" },
  { h: "环境", p: "huánjìng", e: "environment", c: "Nouns" },
  { h: "会议", p: "huìyì", e: "meeting", c: "Nouns" },
  { h: "机会", p: "jīhuì", e: "opportunity", c: "Nouns" },
  { h: "季节", p: "jìjié", e: "season", c: "Nouns" },
  { h: "节日", p: "jiérì", e: "festival, holiday", c: "Nouns" },
  { h: "经理", p: "jīnglǐ", e: "manager", c: "Nouns" },
  // Adjectives
  { h: "矮", p: "ǎi", e: "short (height)", c: "Adjectives" },
  { h: "安静", p: "ānjìng", e: "quiet", c: "Adjectives" },
  { h: "饱", p: "bǎo", e: "full (after eating)", c: "Adjectives" },
  { h: "聪明", p: "cōngming", e: "smart, clever", c: "Adjectives" },
  { h: "短", p: "duǎn", e: "short (length)", c: "Adjectives" },
  { h: "饿", p: "è", e: "hungry", c: "Adjectives" },
  { h: "方便", p: "fāngbiàn", e: "convenient", c: "Adjectives" },
  { h: "干净", p: "gānjìng", e: "clean", c: "Adjectives" },
  { h: "坏", p: "huài", e: "bad, broken", c: "Adjectives" },
  { h: "简单", p: "jiǎndān", e: "simple", c: "Adjectives" },
  { h: "健康", p: "jiànkāng", e: "healthy", c: "Adjectives" },
  { h: "旧", p: "jiù", e: "old (things)", c: "Adjectives" },
  { h: "久", p: "jiǔ", e: "a long time", c: "Adjectives" },
  { h: "黄", p: "huáng", e: "yellow", c: "Adjectives" },
  // Adverbs & grammar
  { h: "必须", p: "bìxū", e: "must", c: "Adverbs & grammar" },
  { h: "比较", p: "bǐjiào", e: "comparatively, rather", c: "Adverbs & grammar" },
  { h: "才", p: "cái", e: "only then, just", c: "Adverbs & grammar" },
  { h: "除了", p: "chúle", e: "except, besides", c: "Adverbs & grammar" },
  { h: "当然", p: "dāngrán", e: "of course", c: "Adverbs & grammar" },
  { h: "根据", p: "gēnjù", e: "according to", c: "Adverbs & grammar" },
  { h: "更", p: "gèng", e: "even more", c: "Adverbs & grammar" },
  { h: "关于", p: "guānyú", e: "about, regarding", c: "Adverbs & grammar" },
  { h: "还是", p: "háishi", e: "or (in questions); still", c: "Adverbs & grammar" },
  { h: "或者", p: "huòzhě", e: "or (in statements)", c: "Adverbs & grammar" },
  { h: "几乎", p: "jīhū", e: "almost", c: "Adverbs & grammar" },
  { h: "经常", p: "jīngcháng", e: "often", c: "Adverbs & grammar" },
  // Time & places
  { h: "刚才", p: "gāngcái", e: "just now", c: "Time & places" },
  { h: "后来", p: "hòulái", e: "later, afterwards", c: "Time & places" },
  { h: "过去", p: "guòqù", e: "the past", c: "Time & places" },
  { h: "附近", p: "fùjìn", e: "nearby", c: "Time & places" },
  { h: "地方", p: "dìfang", e: "place", c: "Time & places" },
  { h: "超市", p: "chāoshì", e: "supermarket", c: "Time & places" },
  { h: "公园", p: "gōngyuán", e: "park", c: "Time & places" },
  { h: "街道", p: "jiēdào", e: "street", c: "Time & places" },
];

const CATS = ["All", ...Array.from(new Set(VOCAB.map((v) => v.c)))];

// ---------- design tokens: blue-and-white porcelain ----------
const T = {
  bg: "#F3F5F9",
  surface: "#FFFFFF",
  cobalt: "#22439C",
  cobaltDark: "#172E6E",
  ink: "#1B2233",
  mist: "#C9D6EE",
  faint: "#68738C",
  seal: "#B5342B",
  green: "#2E7D5B",
  paleBlue: "#E8EEF9",
};

const hanziFont = { fontFamily: "'Kaiti SC','KaiTi','STKaiti','Noto Serif SC','SimSun',serif" };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Red seal-stamp logo
function Seal() {
  return (
    <div
      className="flex items-center justify-center select-none"
      style={{
        width: 44,
        height: 44,
        background: T.seal,
        borderRadius: 6,
        boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.55)",
      }}
    >
      <span style={{ ...hanziFont, color: "#fff", fontSize: 18, lineHeight: 1.05, textAlign: "center" }}>
        汉<br />语
      </span>
    </div>
  );
}

// Tian-zi-ge practice square (the signature element)
function TianZiGe({ children, flipped, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={flipped ? "Card back — tap to flip" : "Card front — tap to reveal"}
      className="relative w-full focus:outline-none"
      style={{
        aspectRatio: "1 / 1",
        maxWidth: 340,
        background: T.surface,
        border: `2.5px solid ${T.cobalt}`,
        borderRadius: 10,
        boxShadow: "0 10px 30px rgba(34,67,156,0.12)",
        cursor: "pointer",
      }}
    >
      {/* dashed crosshair guides, like character practice paper */}
      {!flipped && (
        <>
          <div className="absolute left-0 right-0" style={{ top: "50%", borderTop: `1.5px dashed ${T.mist}` }} />
          <div className="absolute top-0 bottom-0" style={{ left: "50%", borderLeft: `1.5px dashed ${T.mist}` }} />
          <div
            className="absolute"
            style={{ inset: 0, transform: "rotate(45deg) scale(1.42)", borderTop: `1px dashed ${T.paleBlue}`, top: "50%" }}
          />
        </>
      )}
      <div className="absolute inset-0 flex items-center justify-center p-6">{children}</div>
    </button>
  );
}

function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-sm rounded-full transition-colors"
      style={{
        background: active ? T.cobalt : T.paleBlue,
        color: active ? "#fff" : T.cobaltDark,
        border: `1px solid ${active ? T.cobalt : T.mist}`,
      }}
    >
      {children}
    </button>
  );
}

// ---------- Flashcards ----------
function Flashcards({ known, setKnown }) {
  const [cat, setCat] = useState("All");
  const [deck, setDeck] = useState(() => shuffle(VOCAB));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [session, setSession] = useState({ got: 0, again: 0 });

  const startDeck = (c) => {
    setCat(c);
    setDeck(shuffle(c === "All" ? VOCAB : VOCAB.filter((v) => v.c === c)));
    setIdx(0);
    setFlipped(false);
    setSession({ got: 0, again: 0 });
  };

  const card = deck[idx];
  const done = idx >= deck.length;

  const grade = (gotIt) => {
    if (gotIt) {
      setKnown((k) => new Set(k).add(card.h));
      setSession((s) => ({ ...s, got: s.got + 1 }));
      setIdx(idx + 1);
    } else {
      // missed cards go to the back of the deck
      setDeck((d) => [...d.slice(0, idx), ...d.slice(idx + 1), card]);
      setSession((s) => ({ ...s, again: s.again + 1 }));
    }
    setFlipped(false);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap gap-2 justify-center">
        {CATS.map((c) => (
          <Pill key={c} active={c === cat} onClick={() => startDeck(c)}>
            {c}
          </Pill>
        ))}
      </div>

      {done ? (
        <div className="text-center py-10">
          <div style={{ ...hanziFont, fontSize: 56, color: T.cobalt }}>好!</div>
          <p className="mt-2" style={{ color: T.ink }}>
            Deck finished — {session.got} known, {session.again} repeats along the way.
          </p>
          <button
            onClick={() => startDeck(cat)}
            className="mt-5 px-5 py-2.5 rounded-lg text-white"
            style={{ background: T.cobalt }}
          >
            Shuffle and go again
          </button>
        </div>
      ) : (
        <>
          <TianZiGe flipped={flipped} onClick={() => setFlipped(!flipped)}>
            {!flipped ? (
              <span style={{ ...hanziFont, fontSize: card.h.length > 2 ? 56 : 88, color: T.ink }}>{card.h}</span>
            ) : (
              <div className="text-center">
                <div style={{ ...hanziFont, fontSize: 40, color: T.cobalt }}>{card.h}</div>
                <div className="mt-1 text-2xl" style={{ color: T.ink }}>
                  {card.p}
                </div>
                <div className="mt-2 text-base" style={{ color: T.faint }}>
                  {card.e}
                </div>
                <div
                  className="mt-3 inline-block px-2 py-0.5 text-xs rounded"
                  style={{ background: T.paleBlue, color: T.cobaltDark }}
                >
                  {card.c}
                </div>
              </div>
            )}
          </TianZiGe>

          <p className="text-sm" style={{ color: T.faint }}>
            {flipped ? "Did you know it?" : "Tap the card to reveal"} · card {Math.min(idx + 1, deck.length)} of {deck.length}
          </p>

          {flipped && (
            <div className="flex gap-3">
              <button
                onClick={() => grade(false)}
                className="px-6 py-2.5 rounded-lg font-medium"
                style={{ background: "#FBEAE8", color: T.seal, border: `1px solid ${T.seal}` }}
              >
                Again 再来
              </button>
              <button
                onClick={() => grade(true)}
                className="px-6 py-2.5 rounded-lg font-medium text-white"
                style={{ background: T.green }}
              >
                Got it 会了
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ---------- Quiz ----------
function makeQuiz(n = 10) {
  const words = shuffle(VOCAB).slice(0, n);
  return words.map((w) => {
    const toEnglish = Math.random() < 0.5;
    const wrong = shuffle(VOCAB.filter((v) => v.h !== w.h)).slice(0, 3);
    const options = shuffle([w, ...wrong]);
    return { word: w, toEnglish, options };
  });
}

function Quiz({ setKnown }) {
  const [questions, setQuestions] = useState(() => makeQuiz());
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);

  const q = questions[qi];
  const finished = qi >= questions.length;

  const restart = () => {
    setQuestions(makeQuiz());
    setQi(0);
    setPicked(null);
    setScore(0);
  };

  const choose = (opt) => {
    if (picked) return;
    setPicked(opt);
    if (opt.h === q.word.h) {
      setScore((s) => s + 1);
      setKnown((k) => new Set(k).add(q.word.h));
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center py-10">
        <div style={{ ...hanziFont, fontSize: 56, color: pct >= 70 ? T.green : T.seal }}>
          {pct >= 70 ? "很棒!" : "加油!"}
        </div>
        <p className="mt-2 text-lg" style={{ color: T.ink }}>
          {score} / {questions.length} correct
        </p>
        <button onClick={restart} className="mt-5 px-5 py-2.5 rounded-lg text-white" style={{ background: T.cobalt }}>
          New round
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex items-center gap-3 text-sm" style={{ color: T.faint }}>
        <span>
          Question {qi + 1} of {questions.length}
        </span>
        <span>·</span>
        <span>Score {score}</span>
      </div>

      <div
        className="w-full max-w-md text-center rounded-xl px-6 py-8"
        style={{ background: T.surface, border: `1.5px solid ${T.mist}` }}
      >
        <p className="text-xs uppercase tracking-wide mb-3" style={{ color: T.faint }}>
          {q.toEnglish ? "What does this mean?" : "Which character matches?"}
        </p>
        {q.toEnglish ? (
          <div style={{ ...hanziFont, fontSize: 52, color: T.ink }}>{q.word.h}</div>
        ) : (
          <div>
            <div className="text-xl font-medium" style={{ color: T.ink }}>
              {q.word.e}
            </div>
            <div className="text-sm mt-1" style={{ color: T.faint }}>
              ({q.word.p})
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
        {q.options.map((opt) => {
          const isRight = opt.h === q.word.h;
          const isPicked = picked && picked.h === opt.h;
          let bg = T.surface;
          let border = T.mist;
          let color = T.ink;
          if (picked) {
            if (isRight) {
              bg = "#E7F3EC";
              border = T.green;
              color = T.green;
            } else if (isPicked) {
              bg = "#FBEAE8";
              border = T.seal;
              color = T.seal;
            }
          }
          return (
            <button
              key={opt.h}
              onClick={() => choose(opt)}
              className="rounded-lg px-4 py-3 text-center transition-colors"
              style={{ background: bg, border: `1.5px solid ${border}`, color }}
            >
              {q.toEnglish ? (
                <span>{opt.e}</span>
              ) : (
                <span style={{ ...hanziFont, fontSize: 26 }}>{opt.h}</span>
              )}
            </button>
          );
        })}
      </div>

      {picked && (
        <button
          onClick={() => {
            setQi(qi + 1);
            setPicked(null);
          }}
          className="px-6 py-2.5 rounded-lg text-white"
          style={{ background: T.cobalt }}
        >
          Next →
        </button>
      )}
    </div>
  );
}

// ---------- Word list ----------
function WordList({ known }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const results = useMemo(() => {
    const ql = query.trim().toLowerCase();
    return VOCAB.filter(
      (v) =>
        (cat === "All" || v.c === cat) &&
        (ql === "" || v.h.includes(ql) || v.p.toLowerCase().includes(ql) || v.e.toLowerCase().includes(ql))
    );
  }, [query, cat]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by character, pinyin, or English…"
        className="w-full px-4 py-2.5 rounded-lg focus:outline-none"
        style={{ background: T.surface, border: `1.5px solid ${T.mist}`, color: T.ink }}
      />
      <div className="flex flex-wrap gap-2">
        {CATS.map((c) => (
          <Pill key={c} active={c === cat} onClick={() => setCat(c)}>
            {c}
          </Pill>
        ))}
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${T.mist}` }}>
        {results.length === 0 && (
          <p className="p-5 text-center" style={{ color: T.faint }}>
            No matches — try a shorter search.
          </p>
        )}
        {results.map((v, i) => (
          <div
            key={v.h}
            className="flex items-center gap-4 px-4 py-3"
            style={{
              background: i % 2 ? T.paleBlue : T.surface,
              borderTop: i === 0 ? "none" : `1px solid ${T.mist}`,
            }}
          >
            <span style={{ ...hanziFont, fontSize: 26, color: T.ink, minWidth: 72 }}>{v.h}</span>
            <span className="flex-1">
              <span style={{ color: T.cobalt }}>{v.p}</span>
              <span className="mx-2" style={{ color: T.mist }}>
                ·
              </span>
              <span style={{ color: T.ink }}>{v.e}</span>
            </span>
            {known.has(v.h) && (
              <span className="text-xs px-2 py-0.5 rounded" style={{ background: "#E7F3EC", color: T.green }}>
                learned
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- App shell ----------
export default function HSK3Tutor() {
  const [mode, setMode] = useState("learn");
  const [known, setKnown] = useState(new Set());

  const tabs = [
    { id: "learn", zh: "学", label: "Flashcards" },
    { id: "quiz", zh: "测", label: "Quiz" },
    { id: "words", zh: "词", label: "Word list" },
  ];

  const pct = Math.round((known.size / VOCAB.length) * 100);

  return (
    <div className="min-h-screen w-full" style={{ background: T.bg, color: T.ink }}>
      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Seal />
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-semibold" style={{ color: T.cobaltDark }}>
              HSK 3 Study Hall
            </h1>
            <p className="text-sm" style={{ color: T.faint }}>
              {known.size} of {VOCAB.length} words learned this session
            </p>
          </div>
        </header>

        {/* Progress bar */}
        <div className="h-2 rounded-full mb-8 overflow-hidden" style={{ background: T.paleBlue }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, background: T.cobalt }}
          />
        </div>

        {/* Tabs */}
        <nav className="flex gap-2 mb-8 justify-center">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setMode(t.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{
                background: mode === t.id ? T.cobalt : "transparent",
                color: mode === t.id ? "#fff" : T.cobaltDark,
                border: `1.5px solid ${mode === t.id ? T.cobalt : T.mist}`,
              }}
            >
              <span style={{ ...hanziFont, fontSize: 18 }}>{t.zh}</span>
              <span className="text-sm hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </nav>

        <main>
          {mode === "learn" && <Flashcards known={known} setKnown={setKnown} />}
          {mode === "quiz" && <Quiz setKnown={setKnown} />}
          {mode === "words" && <WordList known={known} />}
        </main>

        <footer className="mt-12 text-center text-xs" style={{ color: T.faint }}>
          学而时习之 — learn, then practice at the right time. Progress resets when you close the page.
        </footer>
      </div>
    </div>
  );
}
