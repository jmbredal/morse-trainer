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

  return [...randomChoices];
}
