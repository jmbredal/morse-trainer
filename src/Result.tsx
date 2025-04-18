import { MorseEntry } from "./morseCodes";

type Props = {
  morseEntry: MorseEntry;
  guess: string;
};

export default function Result({ morseEntry, guess }: Props) {
  const isCorrect = morseEntry.char === guess;

  return isCorrect ? (
    <p style={{ color: "green" }}>{guess} is correct! 🎉</p>
  ) : (
    <>
      <p style={{ color: "red" }}>{guess} is not correct!</p>
      <p style={{ color: "red" }}>
        The sequence <code>{morseEntry.sequence}</code> represents
        {morseEntry.char}
      </p>
    </>
  );
}
