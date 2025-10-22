export type Language = 'c' | 'cpp' | 'java' | 'python';
export type Mode = 'random' | 'dsa';
export type Duration = 30 | 60 | 120 | number;

export const DSA_TOPICS = [
  'arrays',
  'strings',
  'linked_lists',
  'stacks',
  'queues',
  'trees',
  'graphs',
  'sorting',
  'searching',
  'recursion',
  'dynamic_programming',
  'two_pointers',
  'sliding_window',
  'hashing',
  'bit_manipulation',
  'heap',
  'trie',
  'union_find',
  'matrix'
] as const;

export type DSATopic = typeof DSA_TOPICS[number];

export interface PracticeConfig {
  language: Language;
  mode: Mode;
  topic?: DSATopic;
  duration: Duration;
}

export interface TypingStats {
  accuracy: number;
  cpm: number;
  wpm: number;
  mistakes: number;
  progress: number;
  syntaxAccuracy: number;
}
