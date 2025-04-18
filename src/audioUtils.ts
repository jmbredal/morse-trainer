// audioUtils.ts
export const playTone = (duration: number, frequency = 600) => {
  const context = new (window.AudioContext ||
    (window as any).webkitAudioContext)();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.type = "square"; // or 'square' for a harsher tone
  oscillator.frequency.value = frequency;

  oscillator.start();
  gainNode.gain.setValueAtTime(1, context.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.00001,
    context.currentTime + duration / 1000
  );

  oscillator.stop(context.currentTime + duration / 1000);
};
