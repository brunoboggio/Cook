/* ==========================================================================
   FRIDGEFLOW - PROCEDURAL WEB AUDIO ENGINE
   Mathematical sound synthesis without external audio files. 100% offline & robust.
   ========================================================================== */

class FridgeAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('ff_audio_muted') === 'true';
    this.ambientNodes = null;
    this.isAmbientPlaying = false;
    this.initOnUserGesture();
  }

  initOnUserGesture() {
    const unlockAudio = () => {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('ff_audio_muted', this.isMuted);
    if (this.isMuted && this.isAmbientPlaying) {
      this.stopAmbient();
    }
    return this.isMuted;
  }

  // 1. Refrigerator Suction Pop (Door Open/Close)
  playFridgePop() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.18);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, t);
    filter.frequency.linearRampToValueAtTime(80, t + 0.18);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.18);
  }

  // 2. Crisp Knife Board Chop
  playKnifeChop() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Low woody body
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.07);

    oscGain.gain.setValueAtTime(0.4, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.07);

    // High crisp snap
    const bufferSize = this.ctx.sampleRate * 0.03;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1800;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.15, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    noise.start(t);
  }

  // 3. Hot Pan Sizzle Burst
  playSizzle() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const duration = 0.45;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, t);
    filter.Q.value = 3.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
  }

  // 4. Crystal Kitchen Chime (Step / Timer Finish)
  playChime() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const freqs = [880, 1320, 1760, 2640];
    const gains = [0.25, 0.15, 0.08, 0.04];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(gains[idx], t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 1.6);
    });
  }

  // 5. Celebration Harmonic Fanfare (Recipe / Plan Complete)
  playFanfare() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const chords = [
      { f: 523.25, time: 0.00 }, // C5
      { f: 659.25, time: 0.10 }, // E5
      { f: 783.99, time: 0.20 }, // G5
      { f: 987.77, time: 0.32 }, // B5
      { f: 1046.50, time: 0.44 } // C6
    ];

    const baseT = this.ctx.currentTime;

    chords.forEach(note => {
      const t = baseT + note.time;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 1.4);
    });
  }

  // 6. UI Micro Click / Navigation Tap
  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.03);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.03);
  }

  // 7. Ambient Kitchen Soundscape Generator (Simmer + Warm Drone)
  toggleAmbientSoundscape() {
    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  startAmbient() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    this.stopAmbient(); // Ensure cleanup

    const t = this.ctx.currentTime;
    const masterAmbientGain = this.ctx.createGain();
    masterAmbientGain.gain.setValueAtTime(0.001, t);
    masterAmbientGain.gain.linearRampToValueAtTime(0.12, t + 2);
    masterAmbientGain.connect(this.ctx.destination);

    // Warm Low Drone (F2 & C3)
    const drone1 = this.ctx.createOscillator();
    const drone2 = this.ctx.createOscillator();
    drone1.type = 'triangle';
    drone1.frequency.value = 87.31; // F2
    drone2.type = 'sine';
    drone2.frequency.value = 130.81; // C3

    const droneGain = this.ctx.createGain();
    droneGain.gain.value = 0.08;
    drone1.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(masterAmbientGain);

    drone1.start();
    drone2.start();

    // Gentle Simmer Bubbler (Filtered Noise)
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const simmerSource = this.ctx.createBufferSource();
    simmerSource.buffer = buffer;
    simmerSource.loop = true;

    const simmerFilter = this.ctx.createBiquadFilter();
    simmerFilter.type = 'bandpass';
    simmerFilter.frequency.value = 950;
    simmerFilter.Q.value = 4.0;

    const simmerGain = this.ctx.createGain();
    simmerGain.gain.value = 0.05;

    simmerSource.connect(simmerFilter);
    simmerFilter.connect(simmerGain);
    simmerGain.connect(masterAmbientGain);

    simmerSource.start();

    this.ambientNodes = {
      drone1, drone2, simmerSource, masterAmbientGain
    };
    this.isAmbientPlaying = true;
  }

  stopAmbient() {
    if (this.ambientNodes && this.ctx) {
      try {
        const t = this.ctx.currentTime;
        this.ambientNodes.masterAmbientGain.gain.linearRampToValueAtTime(0.001, t + 1);
        setTimeout(() => {
          if (this.ambientNodes) {
            this.ambientNodes.drone1.stop();
            this.ambientNodes.drone2.stop();
            this.ambientNodes.simmerSource.stop();
            this.ambientNodes = null;
          }
        }, 1000);
      } catch (e) {
        console.warn('Audio cleanup exception:', e);
      }
    }
    this.isAmbientPlaying = false;
  }
}

// Instantiate and attach globally
const soundFX = new FridgeAudioEngine();
if (typeof window !== 'undefined') {
  window.soundFX = soundFX;
}
