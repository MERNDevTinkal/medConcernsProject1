// export const getTextToSpeech = (text, lang = "en-US", audioFile) => {
//   return new Promise((resolve, reject) => {
//     if ((!text || !text.trim()) && !audioFile) {
//       resolve();
//       return;
//     }
//     const playMedia = () => {
//       if (audioFile) {
//         const audio = new Audio(audioFile);
//         audio.onended = () => resolve();
//         audio.onerror = (err) => {
//           console.warn("Audio playback failed, falling back to TTS", err);
//           playTTS(text, lang, resolve, reject);
//         };
//         audio.play().catch((err) => {
//           console.warn("Audio play() error, falling back to TTS", err);
//           playTTS(text, lang, resolve, reject);
//         });
//       } else {
//         playTTS(text, lang, resolve, reject);
//       }
//     };
//     if (audioFile) {
//       const audio = new Audio();
//       audio.src = audioFile;
//       audio.play().then(() => {
//         audio.pause(); 
//         playMedia();
//       }).catch(() => {
//         console.warn("Autoplay blocked, waiting for user interaction");
//         const handleInteraction = () => {
//           document.removeEventListener('click', handleInteraction);
//           document.removeEventListener('touchstart', handleInteraction);
//           playMedia();
//         };

//         document.addEventListener('click', handleInteraction);
//         document.addEventListener('touchstart', handleInteraction);
//       });
//     } else {
//       playMedia();
//     }
//   });
// };

// const playTTS = (text, lang, resolve, reject) => {
//   if (!("speechSynthesis" in window)) {
//     reject("Text-to-Speech not supported in this browser.");
//     return;
//   }
//   window.speechSynthesis.cancel();
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = lang;
//   utterance.rate = 1;
//   utterance.pitch = 1;
//   utterance.volume = 1;
//   const voices = window.speechSynthesis.getVoices();
//   if (voices.length === 0) {
//     window.speechSynthesis.onvoiceschanged = () => {
//       const loadedVoices = window.speechSynthesis.getVoices();
//       const selectedVoice = loadedVoices.find((v) => v.lang.startsWith(lang));
//       if (selectedVoice) utterance.voice = selectedVoice;
//       window.speechSynthesis.speak(utterance);
//     };
//   } else {
//     const selectedVoice = voices.find((v) => v.lang.startsWith(lang));
//     if (selectedVoice) utterance.voice = selectedVoice;
//     window.speechSynthesis.speak(utterance);
//   }

//   utterance.onend = () => resolve();
//   utterance.onerror = (err) => reject(err);
// };


// Pre-load voices and detect platform once
let voicesLoaded = false;
let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
let audioContext = null;

// Pre-load voices immediately
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices(); // Trigger voices loading
  window.speechSynthesis.onvoiceschanged = () => {
    voicesLoaded = true;
  };

  // Set timeout to mark voices as loaded anyway
  setTimeout(() => { voicesLoaded = true; }, 1000);
}

export const getTextToSpeech = (text, lang = "en-US", audioFile) => {
  return new Promise((resolve) => {
    if ((!text || !text.trim()) && !audioFile) {
      resolve();
      return;
    }

    // Fast path - use requestAnimationFrame for immediate response
    requestAnimationFrame(() => {
      if (audioFile) {
        playAudioWithFallback(audioFile, text, lang, resolve);
      } else {
        playTTSFast(text, lang, resolve);
      }
    });
  });
};

const playAudioWithFallback = async (audioFile, text, lang, resolve) => {
  try {
    await playAudioDirect(audioFile);
    resolve();
  } catch (error) {
    console.warn("Audio failed, quick fallback to TTS");
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
    audio.oncanplaythrough = () => {
      // Audio is ready to play
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.then(complete).catch(fail);
      }
    };

    // If audio takes too long, fail fast
    setTimeout(() => {
      if (!resolved) {
        audio.pause();
        fail();
      }
    }, 3000);

    // For iOS, we might need to handle audio context
    if (isIOS && !audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  });
};

const playTTSFast = (text, lang, resolve) => {
  if (!("speechSynthesis" in window)) {
    resolve();
    return;
  }

  // Cancel any ongoing speech immediately
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Fast voice selection - use cached voices or don't wait
  if (voicesLoaded) {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const voice = voices.find(v => v.lang.startsWith(lang)) || voices[0];
      utterance.voice = voice;
    }
  }

  let completed = false;

  const complete = () => {
    if (!completed) {
      completed = true;
      resolve();
    }
  };

  utterance.onend = complete;
  utterance.onerror = complete; // Resolve on error too

  // Start speaking immediately
  window.speechSynthesis.speak(utterance);

  // Fast timeout - don't wait too long
  setTimeout(() => {
    if (!completed) {
      window.speechSynthesis.cancel();
      complete();
    }
  }, 5000);
};

// Utility function to pre-warm audio for faster playback
export const preloadAudio = (audioFile) => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = audioFile;
    audio.oncanplaythrough = resolve;
    audio.onerror = resolve;
  });
};

// Quick TTS without waiting for full functionality
export const quickTTS = (text, lang = "en-US") => {
  return new Promise((resolve) => {
    if (!text || !text.trim() || !("speechSynthesis" in window)) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text.substring(0, 200)); // Limit length for speed
    utterance.lang = lang;
    utterance.onend = resolve;
    utterance.onerror = resolve;

    window.speechSynthesis.speak(utterance);

    setTimeout(resolve, 3000);
  });
};