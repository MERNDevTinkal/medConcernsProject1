let voicesLoaded = false;
let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
let userInteracted = false;
let currentAudio = null;

// Listen for user interaction
if (typeof window !== 'undefined') {
  document.addEventListener('click', () => { userInteracted = true; }, { once: true });
  document.addEventListener('touchstart', () => { userInteracted = true; }, { once: true });
}

// Stop any ongoing audio
export const stopAllAudio = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const getTextToSpeech = (text, lang = "en-US", audioFile) => {
  return new Promise((resolve) => {
    if ((!text || !text.trim()) && !audioFile) {
      resolve();
      return;
    }

    // Stop any previous audio first
    stopAllAudio();

    // If audio file provided, ONLY play audio file (no TTS fallback)
    if (audioFile) {
      playAudioOnly(audioFile, resolve);
    } else {
      // If no audio file, ONLY use TTS
      playTTSOnly(text, lang, resolve);
    }
  });
};

// ONLY play audio file - no TTS fallback
const playAudioOnly = (audioFile, resolve) => {
  playAnyAudio(audioFile)
    .then(() => {
      resolve();
    })
    .catch((error) => {
      console.warn("Audio playback failed:", error);
      resolve(); // Just resolve, don't fallback to TTS
    });
};

// ONLY play TTS - no audio file
const playTTSOnly = (text, lang, resolve) => {
  if (!("speechSynthesis" in window)) {
    resolve();
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1.2;

  utterance.onend = resolve;
  utterance.onerror = resolve;

  window.speechSynthesis.speak(utterance);

  setTimeout(resolve, 2000);
};

const playAnyAudio = (audioFile) => {
  return new Promise((resolve, reject) => {
    // iOS requires user tap first
    if (isIOS && !userInteracted) {
      reject(new Error('Tap screen to enable audio'));
      return;
    }

    const audio = new Audio(audioFile);
    currentAudio = audio;

    // CRITICAL for iOS
    audio.setAttribute('playsinline', '');
    audio.setAttribute('webkit-playsinline', '');

    audio.preload = 'auto';

    let played = false;
    let resolved = false;

    const playNow = () => {
      if (played) return;
      played = true;

      const promise = audio.play();

      if (promise !== undefined) {
        promise
          .then(() => {
            console.log('Audio playing');
          })
          .catch(error => {
            console.error('Play failed:', error);
            if (!resolved) {
              resolved = true;
              currentAudio = null;
              reject(error);
            }
          });
      }
    };

    const cleanup = () => {
      if (!resolved) {
        resolved = true;
        currentAudio = null;
        resolve();
      }
    };

    audio.oncanplaythrough = playNow;
    audio.onloadeddata = playNow;
    audio.onended = cleanup;
    audio.onerror = (e) => {
      console.error('Audio error:', audio.error);
      if (!resolved) {
        resolved = true;
        currentAudio = null;
        reject(new Error('Audio file error'));
      }
    };

    // Load the audio
    audio.load();

    setTimeout(() => {
      if (!played && audio.readyState >= 2) {
        playNow();
      }
    }, 500);

    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        currentAudio = null;
        reject(new Error('Audio timeout'));
      }
    }, 3000);
  });
};

// Quick TTS - ONLY TTS
export const quickTTS = (text, lang = "en-US") => {
  return new Promise((resolve) => {
    if (!text || !text.trim()) {
      resolve();
      return;
    }

    stopAllAudio();

    const utterance = new SpeechSynthesisUtterance(text.substring(0, 100));
    utterance.lang = lang;
    utterance.onend = resolve;
    utterance.onerror = resolve;

    window.speechSynthesis.speak(utterance);

    setTimeout(resolve, 1500);
  });
};

// Immediate response - ONLY TTS
export const immediateTTS = (text, lang = "en-US") => {
  if (!text || !text.trim()) return Promise.resolve();

  stopAllAudio();

  const utterance = new SpeechSynthesisUtterance(text.substring(0, 150));
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);

  return Promise.resolve();
};

// Force user interaction for iOS
export const ensureAudioReady = () => {
  return new Promise((resolve) => {
    if (!isIOS || userInteracted) {
      resolve();
      return;
    }
    const handleTap = () => {
      userInteracted = true;
      document.removeEventListener('click', handleTap);
      document.removeEventListener('touchstart', handleTap);
      resolve();
    };

    document.addEventListener('click', handleTap, { once: true });
    document.addEventListener('touchstart', handleTap, { once: true });
  });
};