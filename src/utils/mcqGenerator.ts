import { MCQOption, MCQQuestion, Word, WordWithProgress } from '../types/database';

// Rich fallback distractor bank categorized by part of speech
const FALLBACK_DISTRACTORS: Record<string, string[]> = {
  adjective: [
    'Existing or lasting for a very long, indefinite period',
    'Practical and focused on real-world outcomes rather than theory',
    'Present, widespread, and found everywhere in daily life',
    'Persistent, determined, and holding firmly to a goal',
    'Extremely thorough, careful, and attentive to fine details',
    'Showing a readiness to give more of something than strictly necessary',
    'Difficult to understand or explain clearly; obscure',
    'Having or showing deep religious or spiritual devotion',
    'Able to recover quickly from difficult or traumatic conditions',
    'Occurring irregularly, intermittently, or in scattered instances',
    'Showing clever ingenuity, resourcefulness, and skill',
    'Having a peaceful, calm, and untroubled atmosphere',
    'Expressing opinions in a very forceful and authoritative manner',
    'Existing in large quantities; plentiful and abundant',
    'Showing great knowledge, learning, and academic scholarship',
  ],
  noun: [
    'The occurrence of valuable events by fortunate chance',
    'A state of complete balance, stability, or equal distribution',
    'A strong feeling of passion, enthusiasm, and devotion',
    'The quality of staying true to facts, accuracy, and truthfulness',
    'A subtle difference or distinction in meaning, sound, or expression',
    'A feeling of deep regret or guilt for past wrongdoing',
    'The ability to understand and share the feelings of another person',
    'An official order or commission to do something specific',
    'A sudden, unpredictable, or erratic change in behavior or mindset',
    'A large, magnificent, or impressive building or structure',
  ],
  verb: [
    'To make something less severe, harmful, or painful',
    'To explain, interpret, or make something completely clear',
    'To prove that someone is not guilty of a crime or wrongdoing',
    'To encourage, promote, or stimulate the development of something',
    'To waver or hesitate indecisively between different opinions',
    'To express sharp disapproval or criticism of someone',
    'To give new energy, vitality, or vigor to something',
    'To assemble or bring together people, resources, or forces',
  ],
  adverb: [
    'In a way that is clear, distinct, and directly expressed',
    'Without interruption; continuously and unceasingly',
    'In a careful, thorough, and painstaking manner',
    'By lucky chance rather than by deliberate design',
    'In a way that is clearly apparent and obvious to everyone',
  ],
  general: [
    'Causing a strong feeling of interest, curiosity, or wonder',
    'Having a profound and far-reaching impact on future events',
    'Characterized by simple elegance and natural grace',
    'Showing an inability to make firm or timely decisions',
    'Relating to the practical aspects of daily human existence',
  ],
};

/**
 * Shuffles an array deterministically / randomly using Fisher-Yates.
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Normalizes definition strings for strict uniqueness comparison.
 */
function cleanDef(str: string): string {
  return str.toLowerCase().trim().replace(/[.,;!?]+$/, '');
}

/**
 * Generates an MCQ Question for a given word using distractors from the user's library
 * and curated fallback banks.
 */
export function generateMCQ(
  target: WordWithProgress | Word,
  allWords: (WordWithProgress | Word)[]
): MCQQuestion {
  const correctMeaning = target.simple_meaning.trim();
  const targetPos = (target.part_of_speech || 'other').toLowerCase();
  const cleanedCorrect = cleanDef(correctMeaning);

  const usedDefinitions = new Set<string>([cleanedCorrect]);
  const candidateDistractors: { text: string; wordSource?: string }[] = [];

  // 1. Try to find distractors from user's other words (prefer matching part of speech)
  const samePosWords = allWords.filter(
    (w) =>
      w.id !== target.id &&
      w.part_of_speech &&
      w.part_of_speech.toLowerCase() === targetPos &&
      w.simple_meaning &&
      !usedDefinitions.has(cleanDef(w.simple_meaning))
  );

  const otherPosWords = allWords.filter(
    (w) =>
      w.id !== target.id &&
      w.simple_meaning &&
      !usedDefinitions.has(cleanDef(w.simple_meaning)) &&
      (!w.part_of_speech || w.part_of_speech.toLowerCase() !== targetPos)
  );

  // Shuffle candidate pools
  const shuffledSamePos = shuffleArray(samePosWords);
  const shuffledOtherPos = shuffleArray(otherPosWords);

  for (const w of shuffledSamePos) {
    if (candidateDistractors.length >= 3) break;
    const cd = cleanDef(w.simple_meaning);
    if (!usedDefinitions.has(cd)) {
      usedDefinitions.add(cd);
      candidateDistractors.push({ text: w.simple_meaning.trim(), wordSource: w.word });
    }
  }

  for (const w of shuffledOtherPos) {
    if (candidateDistractors.length >= 3) break;
    const cd = cleanDef(w.simple_meaning);
    if (!usedDefinitions.has(cd)) {
      usedDefinitions.add(cd);
      candidateDistractors.push({ text: w.simple_meaning.trim(), wordSource: w.word });
    }
  }

  // 2. If we still need distractors, draw from curated fallback bank
  const posFallbacks = FALLBACK_DISTRACTORS[targetPos] || FALLBACK_DISTRACTORS.general;
  const generalFallbacks = FALLBACK_DISTRACTORS.general;
  const combinedFallbacks = shuffleArray([...posFallbacks, ...generalFallbacks]);

  for (const fb of combinedFallbacks) {
    if (candidateDistractors.length >= 3) break;
    const cd = cleanDef(fb);
    if (!usedDefinitions.has(cd)) {
      usedDefinitions.add(cd);
      candidateDistractors.push({ text: fb });
    }
  }

  // Take exactly 3 distractors
  const finalDistractors = candidateDistractors.slice(0, 3);

  // Create option list
  const rawOptions: MCQOption[] = [
    {
      id: `opt-correct-${target.id}`,
      text: correctMeaning,
      isCorrect: true,
      wordSource: target.word,
    },
    ...finalDistractors.map((d, idx) => ({
      id: `opt-dist-${target.id}-${idx}`,
      text: d.text,
      isCorrect: false,
      wordSource: d.wordSource,
    })),
  ];

  // Shuffle options so correct answer position is randomized (A, B, C, or D)
  const options = shuffleArray(rawOptions);
  const correctIndex = options.findIndex((o) => o.isCorrect);

  return {
    wordId: target.id,
    word: target.word,
    correctMeaning,
    partOfSpeech: target.part_of_speech,
    exampleSentence: target.example_sentence,
    phonetic: target.phonetic || target.pronunciation,
    memoryTip: target.memory_tip,
    detailedMeaning: target.detailed_meaning,
    options,
    correctIndex,
  };
}
