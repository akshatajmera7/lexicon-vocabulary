# 🧠 Lexicon — Spaced Repetition Vocabulary Learning App

A focused, polished, and mobile-centric **single-user vocabulary learning web application** built with **React.js, TypeScript, and Supabase**.

Lexicon streamlines the lifelong vocabulary mastery loop:
**Find interesting words → Paste & auto-enrich → Spaced-Repetition Revision (MCQs + Recall Rating) → Long-Term Memory & Streaks**.

---

## 🌟 Key Features

* **⚡ Zero Friction Word Addition**: Paste single or batch words (supports newlines and comma-separated lists). Real-time progress tracker with automatic duplicate prevention (`user_id + normalized_word`).
* **🧠 Multi-Provider AI & Dictionary Enrichment**:
  * **Free Public Dictionary API**: Instant, reliable lexical definitions, phonetic pronunciation, and parts of speech with zero API keys required.
  * **OpenRouter AI (Free Models Supported)**: Seamless support for free models like `google/gemini-2.0-flash-thinking-exp:free`, `deepseek/deepseek-r1:free`, `meta-llama/llama-3.3-70b-instruct:free`, etc.
  * **Google Gemini AI**: Fast, structured context, memory mnemonics, and simplified meanings.
  * **Custom OpenAI / Kimi LLM**: Custom API keys and endpoints.
* **📚 Deterministic Spaced Repetition (SM-2 Modified)**:
  * Only revives words that are strictly due (`next_review_at <= now()`). Never random questions.
  * Priority ordering: Overdue magnitude $\rightarrow$ Weakness history (Forgot/Incorrect ratio) $\rightarrow$ Repetition count.
  * Four-tier recall rating: `[ Forgot ]`, `[ Hard ]`, `[ Good ]`, `[ Easy ]`.
* **🎯 Balanced MCQ Generation**:
  * Correct answer strictly matches stored definition.
  * Distractors are intelligently drawn from other words in the user's library with matching parts of speech, with semantic fallback banks.
  * Full keyboard navigation (Options `1-4` / `A-D`, Recall `1-4` / `F-H-G-E`).
* **📱 Mobile-First UI & Native Web Speech Pronunciation**:
  * Bottom mobile navigation bar with real-time due counter badges.
  * Responsive glassmorphism cards and dark/light mode toggle.
  * Crystal-clear audio pronunciation using the Web Speech Synthesis API.
* **🔥 Daily Streak & Activity Engine**:
  * Tracks current streak, longest streak, and daily added/reviewed counters.
  * Handles consecutive days accurately without double counting multiple sessions on the same day.
* **🗄️ Supabase PostgreSQL + Row Level Security (RLS)**:
  * Fully normalized relational schema with `user_id` on all tables for future multi-user readiness.
  * Offline-resilient local cache fallback for zero-latency testing.

---

## 🚀 Tech Stack

* **Frontend**: React 19, TypeScript, Vite
* **Styling**: Vanilla CSS with modern custom properties, glassmorphism, responsive utilities
* **Database & Auth**: Supabase (PostgreSQL, Row Level Security, Indexes)
* **Icons & Animation**: Lucide React, Canvas Confetti
* **Speech Synthesis**: Native Web Speech API

---

## 🛠️ Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/akshatajmera7/lexicon-vocabulary.git
cd lexicon-vocabulary
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and provide your Supabase and optional AI provider credentials:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional: Add OpenRouter, Gemini, or OpenAI keys for rich memory aids
VITE_OPENROUTER_API_KEY=
VITE_OPENROUTER_MODEL=google/gemini-2.0-flash-thinking-exp:free
VITE_GEMINI_API_KEY=
```

### 3. Setup Supabase Database Schema
Run the SQL script located in `supabase/schema.sql` inside your Supabase SQL Editor, or use the Supabase CLI.

### 4. Run Locally
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📐 Database Schema

```sql
-- Words table
words (
  id uuid primary key,
  user_id uuid,
  word text,
  normalized_word text unique(user_id, normalized_word),
  simple_meaning text,
  detailed_meaning text,
  part_of_speech text,
  example_sentence text,
  synonyms text[],
  antonyms text[],
  pronunciation text,
  phonetic text,
  difficulty text,
  usage_context text,
  memory_tip text,
  created_at timestamptz
)

-- Spaced Repetition State
word_progress (
  id uuid primary key,
  word_id uuid references words(id),
  user_id uuid,
  status text, -- 'learning' | 'learned' | 'mastered'
  repetition_count integer,
  interval_days double precision,
  ease_factor double precision,
  last_reviewed_at timestamptz,
  next_review_at timestamptz
)

-- Review History
review_history (
  id uuid primary key,
  word_id uuid references words(id),
  user_id uuid,
  reviewed_at timestamptz,
  was_correct boolean,
  rating text, -- 'forgot' | 'hard' | 'good' | 'easy'
  previous_interval double precision,
  new_interval double precision
)
```

---

## 📜 License
MIT License
