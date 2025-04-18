import { morseList } from "./morseCodes";

// Generate three options, with one correct answer
export function generateOptions(correct: string) {
  const randomOptions = new Set<string>();
  randomOptions.add(correct);

  while (randomOptions.size < 3) {
    const randomOption =
      morseList[Math.floor(Math.random() * morseList.length)].char;
    randomOptions.add(randomOption);
  }

  return [...randomOptions];
}
