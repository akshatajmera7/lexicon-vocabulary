-- ==============================================================================
-- LEXICON VOCABULARY SEED DATA (High quality sample words with progress)
-- ==============================================================================

insert into public.user_profiles (id, current_streak, longest_streak, last_activity_date)
values ('00000000-0000-0000-0000-000000000001', 3, 5, current_date)
on conflict (id) do update set
  current_streak = excluded.current_streak,
  longest_streak = excluded.longest_streak,
  last_activity_date = excluded.last_activity_date;

-- Insert sample words
with new_words as (
  insert into public.words (
    id, user_id, word, normalized_word, simple_meaning, detailed_meaning,
    part_of_speech, example_sentence, synonyms, antonyms, pronunciation, phonetic,
    difficulty, usage_context, memory_tip, created_at
  ) values
  (
    'a1111111-1111-1111-1111-111111111111',
    '00000000-0000-0000-0000-000000000001',
    'ephemeral',
    'ephemeral',
    'Lasting for a very short time',
    'Existing, occurring, or living for only a brief period; momentary or fleeting in nature.',
    'adjective',
    'The beauty of the sunset was ephemeral, fading within minutes into twilight.',
    array['fleeting', 'transitory', 'momentary', 'evanescent'],
    array['permanent', 'enduring', 'perpetual', 'eternal'],
    '/ɪˈfɛm.ər.əl/',
    'ih-FEM-er-uhl',
    'medium',
    'Frequently used in literature and philosophical contexts to describe short-lived experiences, art, or emotions.',
    'Think of "ephemera" — things like concert tickets or autumn leaves that are brief and quickly fade.',
    now() - interval '2 days'
  ),
  (
    'a2222222-2222-2222-2222-222222222222',
    '00000000-0000-0000-0000-000000000001',
    'pragmatic',
    'pragmatic',
    'Dealing with things sensibly and realistically based on practical considerations',
    'Solving problems in a way that suits the conditions that really exist, rather than following a fixed theory or rule.',
    'adjective',
    'She took a pragmatic approach to team management, prioritizing results over rigid corporate dogma.',
    array['practical', 'sensible', 'realistic', 'utilitarian'],
    array['idealistic', 'impractical', 'dogmatic'],
    '/præɡˈmæt.ɪk/',
    'prag-MAT-ik',
    'medium',
    'Used in professional, political, and decision-making discussions where practical utility beats theoretical idealism.',
    'Rhymes with "automatic" — think of solving problems with practical tools right in front of you.',
    now() - interval '2 days'
  ),
  (
    'a3333333-3333-3333-3333-333333333333',
    '00000000-0000-0000-0000-000000000001',
    'ubiquitous',
    'ubiquitous',
    'Present, appearing, or found everywhere',
    'Constantly encountered, widespread, or existing omnipresently in daily life.',
    'adjective',
    'Smartphones have become ubiquitous in modern society, present in almost every pocket.',
    array['omnipresent', 'pervasive', 'universal', 'widespread'],
    array['rare', 'scarce', 'isolated', 'uncommon'],
    '/juːˈbɪk.wɪ.təs/',
    'yoo-BIK-wih-tus',
    'medium',
    'Used to describe technology, cultural trends, or natural phenomena that are pervasive.',
    'Sounds like "you-be-everywhere" — something found at every corner you look.',
    now() - interval '1 day'
  ),
  (
    'a4444444-4444-4444-4444-444444444444',
    '00000000-0000-0000-0000-000000000001',
    'tenacious',
    'tenacious',
    'Tending to keep a firm hold of something; persistent and determined',
    'Not easily stopped or pulled apart; demonstrating unrelenting resolve in the face of obstacles.',
    'adjective',
    'Her tenacious spirit allowed her to finish the marathon despite severe muscle cramps.',
    array['persistent', 'resolute', 'determined', 'unyielding'],
    array['irresolute', 'yielding', 'wavering', 'weak'],
    '/təˈneɪ.ʃəs/',
    'tuh-NAY-shus',
    'medium',
    'Complimenting someone who never gives up on a tough objective.',
    'Tenacious people hold on with "tenacity" like the grip of ten fingers.',
    now() - interval '1 day'
  ),
  (
    'a5555555-5555-5555-5555-555555555555',
    '00000000-0000-0000-0000-000000000001',
    'serendipity',
    'serendipity',
    'The occurrence of events by chance in a happy or beneficial way',
    'Finding valuable or pleasant things not sought for; a fortunate stroke of luck.',
    'noun',
    'Finding my favorite childhood book at a remote flea market was pure serendipity.',
    array['fluke', 'good fortune', 'providence', 'lucky chance'],
    array['misfortune', 'design', 'bad luck'],
    '/ˌser.ənˈdɪp.ə.ti/',
    'sair-en-DIP-ih-tee',
    'medium',
    'Used when celebrating pleasant surprises and unintended scientific or personal discoveries.',
    'Think of "serene dip" — taking a calm dip into life and stumbling upon unexpected treasure.',
    now()
  )
  on conflict (user_id, normalized_word) do nothing
  returning id, word
)
select 1;

-- Insert initial spaced-repetition progress (ephemeral and pragmatic are due now for instant testing!)
insert into public.word_progress (
  word_id, user_id, status, learning_stage, repetition_count, interval_days, ease_factor,
  last_reviewed_at, next_review_at, correct_count, incorrect_count
) values
('a1111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000001', 'learning', 'learning', 1, 1, 2.5, now() - interval '2 days', now() - interval '1 hour', 1, 0),
('a2222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000001', 'learning', 'learning', 0, 0, 2.5, null, now() - interval '30 minutes', 0, 0),
('a3333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000001', 'learning', 'learning', 2, 3, 2.6, now() - interval '1 day', now() + interval '2 days', 2, 0),
('a4444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000001', 'learned', 'reviewing', 4, 14, 2.7, now() - interval '1 day', now() + interval '13 days', 4, 0),
('a5555555-5555-5555-5555-555555555555', '00000000-0000-0000-0000-000000000001', 'learning', 'new', 0, 0, 2.5, null, now() + interval '1 day', 0, 0)
on conflict (word_id) do nothing;
