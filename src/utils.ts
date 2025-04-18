import { MorseEntry, morseList } from "./morseCodes";

// Generate three options, with one correct answer
export function generateChoices(correct: MorseEntry) {
  const randomChoices = new Set<MorseEntry>();
  randomChoices.add(correct);

  while (randomChoices.size < 3) {
    const randomChoice =
      morseList[Math.floor(Math.random() * morseList.length)];
    randomChoices.add(randomChoice);
  }

  return shuffle([...randomChoices]);
}

function shuffle<T>(array: T[]) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function getRandom(size: number) {
  return Math.floor(Math.random() * size);
}

export function getRandomMorseEntry() {
  return { ...morseList[getRandom(morseList.length)] };
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
