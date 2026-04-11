const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export const playSound = (type) => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const createTone = (freq, typeWave, duration, startTime = 0) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = typeWave;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + startTime);
    gain.gain.setValueAtTime(0.25, audioCtx.currentTime + startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + startTime + duration);
    osc.start(audioCtx.currentTime + startTime);
    osc.stop(audioCtx.currentTime + startTime + duration);
  };

  switch (type) {
    case 'correct':
      createTone(523.25, 'sine', 0.15);
      createTone(659.25, 'sine', 0.15, 0.1);
      break;
    case 'wrong':
      createTone(220, 'sawtooth', 0.25);
      createTone(180, 'sawtooth', 0.25, 0.15);
      break;
    case 'levelup':
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => createTone(f, 'sine', 0.2, i * 0.1));
      break;
    default:
      break;
  }
};