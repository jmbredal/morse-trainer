import { MorseEntry, morseList } from "./morseCodes";

export type Option = {
  label: string;
  value: number;
};

export const allOptions = [
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
  {
    label: "3",
    value: 3,
  },
  {
    label: "4",
    value: 4,
  },
  {
    label: "5",
    value: 5,
  },
] as const;

// Generate three options, with one correct answer
export function generateChoices(
  correct: MorseEntry,
  selected: number[]
): MorseEntry[] {
  const randomChoices = new Set<string>();
  randomChoices.add(correct.char);

  const selection = morseList.filter((e) =>
    selected.includes(e.sequence.length)
  );

  while (randomChoices.size < 3) {
    const randomChoice = getRandom(
      selection.length >= 3 ? selection : morseList
    );
    randomChoices.add(randomChoice.char);
  }

  const choices = [...randomChoices]
    .map((s) => morseList.find((c) => c.char === s))
    .filter((x) => !!x);

  return shuffle(choices);
}

function shuffle<T>(array: T[]) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function getRandom<T>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export function getRandomMorseEntry(options: number[]) {
  const selection = morseList.filter((e) =>
    options.includes(e.sequence.length)
  );
  return { ...getRandom(selection) };
}

export function getMorseEntry(char: string) {
  return morseList.find((e) => e.char === char);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compose(...fns: any[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (initialValue: any) =>
    fns.reduceRight((prev, fn) => fn(prev), initialValue);
}

// function shuffle2<T>(array: T[]): T[] {
//   const copy = [...array];
//   for (let i = copy.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [copy[i], copy[j]] = [copy[j], copy[i]];
//   }
//   return copy;
// }
