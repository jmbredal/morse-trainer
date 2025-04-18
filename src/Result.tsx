import { MorseEntry } from "./morseCodes";

type Props = {
  morseEntry: MorseEntry;
  guess: string;
};

export default function Result({ morseEntry, guess }: Props) {
  const isCorrect = morseEntry.char === guess;

  return (
    <div>
      {isCorrect ? (
        <p style={{ color: "green" }}>{guess} is correct! 🎉</p>
      ) : (
        <p style={{ color: "red" }}>
          The answer for <code>{morseEntry.sequence}</code> is {morseEntry.char}
        </p>
      )}
    </div>
  );
}
