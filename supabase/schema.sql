-- ==============================================================================
-- LEXICON VOCABULARY LEARNING APPLICATION - COMPLETE DATABASE SCHEMA
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Words Table
create table if not exists public.words (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null default '00000000-0000-0000-0000-000000000001'::uuid,
    word text not null,
    normalized_word text not null,
    simple_meaning text not null,
    detailed_meaning text,
    part_of_speech text,
    example_sentence text,
    synonyms text[] default '{}',
    antonyms text[] default '{}',
    pronunciation text,
    phonetic text,
    difficulty text default 'medium' check (difficulty in ('easy', 'medium', 'hard')),
    usage_context text,
    memory_tip text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint words_user_normalized_unique unique (user_id, normalized_word)
);

-- 2. Word Progress Table (Spaced Repetition State)
create table if not exists public.word_progress (
    id uuid primary key default uuid_generate_v4(),
    word_id uuid not null references public.words(id) on delete cascade,
    user_id uuid not null default '00000000-0000-0000-0000-000000000001'::uuid,
    status text not null default 'learning' check (status in ('learning', 'learned', 'mastered')),
    learning_stage text not null default 'new' check (learning_stage in ('new', 'learning', 'reviewing', 'mastered')),
    repetition_count integer not null default 0,
    interval_days double precision not null default 0,
    ease_factor double precision not null default 2.5,
    last_reviewed_at timestamptz,
    next_review_at timestamptz not null default now(),
    correct_count integer not null default 0,
    incorrect_count integer not null default 0,
    forgot_count integer not null default 0,
    hard_count integer not null default 0,
    good_count integer not null default 0,
    easy_count integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint word_progress_word_unique unique (word_id)
);

-- 3. Review History Table
create table if not exists public.review_history (
    id uuid primary key default uuid_generate_v4(),
    word_id uuid not null references public.words(id) on delete cascade,
    user_id uuid not null default '00000000-0000-0000-0000-000000000001'::uuid,
    reviewed_at timestamptz not null default now(),
    was_correct boolean not null,
    rating text not null check (rating in ('forgot', 'hard', 'good', 'easy')),
    previous_interval double precision not null,
    new_interval double precision not null,
    question_type text not null default 'mcq'
);

-- 4. Daily Activity Table
create table if not exists public.daily_activity (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null default '00000000-0000-0000-0000-000000000001'::uuid,
    activity_date date not null default current_date,
    words_added integer not null default 0,
    words_reviewed integer not null default 0,
    created_at timestamptz not null default now(),
    constraint daily_activity_user_date_unique unique (user_id, activity_date)
);

-- 5. User Profiles Table
create table if not exists public.user_profiles (
    id uuid primary key default '00000000-0000-0000-0000-000000000001'::uuid,
    current_streak integer not null default 0,
    longest_streak integer not null default 0,
    last_activity_date date,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Indexes for lightning fast lookups & queue filtering
create index if not exists idx_words_user_normalized on public.words(user_id, normalized_word);
create index if not exists idx_words_user_created on public.words(user_id, created_at desc);
create index if not exists idx_word_progress_user_next_review on public.word_progress(user_id, next_review_at asc);
create index if not exists idx_review_history_word_reviewed on public.review_history(word_id, reviewed_at desc);
create index if not exists idx_daily_activity_user_date on public.daily_activity(user_id, activity_date desc);

-- Row Level Security (RLS)
alter table public.words enable row level security;
alter table public.word_progress enable row level security;
alter table public.review_history enable row level security;
alter table public.daily_activity enable row level security;
alter table public.user_profiles enable row level security;

-- Default Permissive Policies for Single-User / Auth-Ready environment
create policy "Allow all access to words" on public.words for all using (true) with check (true);
create policy "Allow all access to word_progress" on public.word_progress for all using (true) with check (true);
create policy "Allow all access to review_history" on public.review_history for all using (true) with check (true);
create policy "Allow all access to daily_activity" on public.daily_activity for all using (true) with check (true);
create policy "Allow all access to user_profiles" on public.user_profiles for all using (true) with check (true);
