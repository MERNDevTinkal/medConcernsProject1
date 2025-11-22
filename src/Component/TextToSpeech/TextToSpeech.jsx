let voicesLoaded = false;
let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
let audioContext = null;

// Pre-initialize speech synthesis immediately
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  voicesLoaded = true;
  window.speechSynthesis.onvoiceschanged = () => {
    voicesLoaded = true;
  };
}

export const getTextToSpeech = (text, lang = "en-US", audioFile) => {
  return new Promise((resolve) => {
    if ((!text || !text.trim()) && !audioFile) {
      resolve();
      return;
    }
    
    // IMMEDIATE execution - no delay
    if (audioFile) {
      playAudioWithFallback(audioFile, text, lang, resolve);
    } else {
      playTTSFast(text, lang, resolve);
    }
  });
};

const playAudioWithFallback = async (audioFile, text, lang, resolve) => {
  try {
    await playAnyAudioFile(audioFile);
    resolve();
  } catch (error) {
    console.warn("Audio playback failed, quick fallback to TTS:", error);
    if (text && text.trim()) {
      playTTSFast(text, lang, resolve);
    } else {
      resolve();
    }
  }
};

const playAnyAudioFile = (audioFile) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = audioFile;
    
    // SUPPORT ALL AUDIO FORMATS
    audio.type = getAudioMimeType(audioFile);
    
    let resolved = false;
    let playAttempted = false;

    const complete = () => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve();
      }
    };

    const fail = (error) => {
      if (!resolved) {
        resolved = true;
        cleanup();
        reject(error || new Error('Audio playback failed'));
      }
    };

    const cleanup = () => {
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('ended', complete);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('stalled', onStalled);
      audio.removeEventListener('suspend', onSuspend);
    };

    const onCanPlay = () => {
      if (!playAttempted) {
        playAttempted = true;
        attemptPlay();
      }
    };

    const onError = () => {
      fail(new Error(`Audio error: ${audio.error ? audio.error.code : 'unknown'}`));
    };

    const onStalled = () => {
      console.log("Audio stalled, retrying...");
      if (!resolved) {
        attemptPlay();
      }
    };

    const onSuspend = () => {
      console.log("Audio suspended, retrying...");
      if (!resolved) {
        setTimeout(attemptPlay, 100);
      }
    };

    const attemptPlay = () => {
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started successfully
            console.log("Audio playback started successfully");
          })
          .catch(error => {
            // iOS SPECIFIC FIX: Handle autoplay restrictions
            if (isIOS) {
              console.log("iOS autoplay prevention, attempting user gesture workaround");
              // For iOS, we might need to inform user to tap to play
              fail(new Error('iOS autoplay restriction'));
            } else {
              fail(error);
            }
          });
      }
    };

    // Event listeners for all possible states
    audio.addEventListener('canplaythrough', onCanPlay);
    audio.addEventListener('ended', complete);
    audio.addEventListener('error', onError);
    audio.addEventListener('stalled', onStalled);
    audio.addEventListener('suspend', onSuspend);

    // Load the audio
    audio.load();

    // FAST TIMEOUT - 1.5 seconds
    setTimeout(() => {
      if (!resolved) {
        if (audio.readyState >= 3) { // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
          attemptPlay();
        } else {
          fail(new Error('Audio loading timeout'));
        }
      }
    }, 1500);

    // ABSOLUTE TIMEOUT - 3 seconds max
    setTimeout(() => {
      if (!resolved) {
        fail(new Error('Audio playback timeout'));
      }
    }, 3000);
  });
};

// DETECT AUDIO TYPE FROM FILE EXTENSION
const getAudioMimeType = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  
  const mimeTypes = {
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'oga': 'audio/ogg',
    'm4a': 'audio/mp4',
    'aac': 'audio/aac',
    'webm': 'audio/webm',
    'flac': 'audio/flac',
    'aif': 'audio/aiff',
    'aiff': 'audio/aiff',
    'mp4': 'audio/mp4',
    'weba': 'audio/webm'
  };
  
  return mimeTypes[ext] || 'audio/*';
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
  utterance.rate = 1.2;
  utterance.pitch = 1;
  utterance.volume = 1;

  // FAST voice selection
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

  window.speechSynthesis.speak(utterance);

  // FAST timeout - 2 seconds
  setTimeout(() => {
    if (!completed) {
      window.speechSynthesis.cancel();
      complete();
    }
  }, 2000);
};

// PRELOAD ANY AUDIO FILE TYPE
export const preloadAudio = (audioFile) => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = audioFile;
    audio.type = getAudioMimeType(audioFile);
    
    audio.oncanplaythrough = resolve;
    audio.onerror = resolve;
    
    // For iOS, resolve immediately to avoid delays
    if (isIOS) {
      setTimeout(resolve, 100);
    }
  });
};

// ULTRA-FAST TTS
export const quickTTS = (text, lang = "en-US") => {
  return new Promise((resolve) => {
    if (!text || !text.trim() || !("speechSynthesis" in window)) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const shortText = text.length > 100 ? text.substring(0, 100) + "..." : text;
    const utterance = new SpeechSynthesisUtterance(shortText);
    utterance.lang = lang;
    utterance.rate = 1.3;
    
    utterance.onend = resolve;
    utterance.onerror = resolve;

    window.speechSynthesis.speak(utterance);

    setTimeout(resolve, 1500);
  });
};

// IMMEDIATE RESPONSE - doesn't wait for completion
export const immediateTTS = (text, lang = "en-US") => {
  if (!text || !text.trim() || !("speechSynthesis" in window)) {
    return Promise.resolve();
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text.substring(0, 150));
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);

  return Promise.resolve();
};

// NEW: UNIVERSAL AUDIO PLAYER WITH FORMAT SUPPORT
export const playUniversalAudio = (audioFile) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioFile);
    
    // Set proper MIME type for better browser support
    const mimeType = getAudioMimeType(audioFile);
    if (mimeType !== 'audio/*') {
      audio.type = mimeType;
    }
    
    audio.preload = 'auto';
    
    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error('Audio playback error'));
    
    // iOS FIX: Handle autoplay restrictions
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Success - wait for ended event
        })
        .catch(error => {
          // For iOS, we might need user interaction
          console.warn('Autoplay prevented, attempting workaround:', error);
          reject(error);
        });
    }
    
    // Timeout after 2 seconds
    setTimeout(() => {
      if (audio.readyState >= 3) {
        // Audio is loaded and can play
        const retryPromise = audio.play();
        if (retryPromise !== undefined) {
          retryPromise.catch(reject);
        }
      } else {
        reject(new Error('Audio loading timeout'));
      }
    }, 2000);
  });
};