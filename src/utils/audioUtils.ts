let audioContext: AudioContext | null = null;

document.body.addEventListener(
  "click",
  () => {
    getAudioContext().resume();
  },
  { once: true }
);

export function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

export function playTone(duration: number, frequency = 800) {
  const context = getAudioContext();

  // The filter gets rid of the cracking and popping at the start and end of playback
  const filter = context.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = frequency;
  filter.Q.value = 10;
  filter.connect(context.destination);

  const gainNode = context.createGain();
  gainNode.connect(filter);
  gainNode.gain.value = 0.5;

  const oscillator = context.createOscillator();
  oscillator.connect(gainNode);
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  const now = context.currentTime;
  oscillator.start(now);
  oscillator.stop(now + duration / 1000);
}
