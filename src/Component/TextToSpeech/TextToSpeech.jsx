let voicesLoaded = false;
let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
let audioContext = null;

// Pre-initialize speech synthesis immediately
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  // Force voices to load
  window.speechSynthesis.getVoices();
  voicesLoaded = true; // Assume voices are available immediately
  window.speechSynthesis.onvoiceschanged = () => {
    voicesLoaded = true;
  };
}

export const getTextToSpeech = (text, lang = "en-US", audioFile) => {
  return new Promise((resolve) => {
    // IMMEDIATE resolution if no content
    if ((!text || !text.trim()) && !audioFile) {
      resolve();
      return;
    }
    
    // Skip animation frame for immediate execution
    if (audioFile) {
      playAudioWithFallback(audioFile, text, lang, resolve);
    } else {
      playTTSFast(text, lang, resolve);
    }
  });
};

const playAudioWithFallback = async (audioFile, text, lang, resolve) => {
  try {
    await playAudioDirect(audioFile);
    resolve();
  } catch (error) {
    console.warn("Audio failed, quick fallback to TTS");
    // IMMEDIATE fallback without delay
    if (text && text.trim()) {
      playTTSFast(text, lang, resolve);
    } else {
      resolve();
    }
  }
};

const playAudioDirect = (audioFile) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioFile);
    audio.preload = 'auto';

    let resolved = false;

    const complete = () => {
      if (!resolved) {
        resolved = true;
        resolve();
      }
    };

    const fail = () => {
      if (!resolved) {
        resolved = true;
        reject(new Error('Audio playback failed'));
      }
    };

    audio.onended = complete;
    audio.onerror = fail;
    
    // iOS-SPECIFIC OPTIMIZATION
    if (isIOS) {
      // For iOS, user interaction might be required
      document.body.style.touchAction = 'manipulation';
    }

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(complete).catch(fail);
    } else {
      // Immediate play for older browsers
      complete();
    }

    // MUCH FASTER TIMEOUT - 1 second only
    setTimeout(() => {
      if (!resolved) {
        audio.pause();
        fail();
      }
    }, 1000); // Reduced from 3000ms to 1000ms
  });
};

const playTTSFast = (text, lang, resolve) => {
  if (!("speechSynthesis" in window)) {
    resolve();
    return;
  }

  // IMMEDIATE cancellation
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1.2; // Slightly faster for quick response
  utterance.pitch = 1;
  utterance.volume = 1;

  // ULTRA-FAST voice selection - no waiting
  if (window.speechSynthesis.getVoices().length > 0) {
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(lang)) || voices[0];
    utterance.voice = voice;
  }

  let completed = false;

  const complete = () => {
    if (!completed) {
      completed = true;
      resolve();
    }
  };

  utterance.onend = complete;
  utterance.onerror = complete;

  // Start speaking IMMEDIATELY
  window.speechSynthesis.speak(utterance);

  // ULTRA-FAST timeout - 2 seconds maximum
  setTimeout(() => {
    if (!completed) {
      window.speechSynthesis.cancel();
      complete();
    }
  }, 2000); // Reduced from 5000ms to 2000ms
};

// IMMEDIATE audio preload
export const preloadAudio = (audioFile) => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = audioFile;
    
    // Immediate resolution for iOS
    if (isIOS) {
      resolve();
      return;
    }
    
    audio.oncanplaythrough = resolve;
    audio.onerror = resolve;
  });
};

// ULTRA-FAST TTS - immediate response guaranteed
export const quickTTS = (text, lang = "en-US") => {
  return new Promise((resolve) => {
    if (!text || !text.trim() || !("speechSynthesis" in window)) {
      resolve();
      return;
    }

    // IMMEDIATE cancellation and resolution
    window.speechSynthesis.cancel();

    // Very short text for maximum speed
    const shortText = text.length > 100 ? text.substring(0, 100) + "..." : text;
    
    const utterance = new SpeechSynthesisUtterance(shortText);
    utterance.lang = lang;
    utterance.rate = 1.3; // Faster speech rate
    
    // IMMEDIATE resolution callbacks
    utterance.onend = resolve;
    utterance.onerror = resolve;

    window.speechSynthesis.speak(utterance);

    // MAX 1.5 second timeout
    setTimeout(resolve, 1500);
  });
};

// NEW: Immediate response function that doesn't wait for completion
export const immediateTTS = (text, lang = "en-US") => {
  if (!text || !text.trim() || !("speechSynthesis" in window)) {
    return Promise.resolve();
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Start speaking but don't wait for completion
  const utterance = new SpeechSynthesisUtterance(text.substring(0, 150));
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);

  // Resolve immediately - don't wait for speech to finish
  return Promise.resolve();
};