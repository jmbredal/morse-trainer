let audioContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

export function playTone(duration: number, frequency = 800) {
  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  gainNode.gain.value = 0.5;
  gainNode.connect(context.destination);

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  oscillator.start();
  oscillator.stop(context.currentTime + duration / 1000);
}
