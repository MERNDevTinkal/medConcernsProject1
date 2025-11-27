// let voicesLoaded = false;
// let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
// let audioContext = null;
// let userInteracted = false; // NEW: Track user interaction

// // Listen for user interaction to enable audio
// if (typeof window !== 'undefined') {
//   document.addEventListener('click', () => { userInteracted = true; }, { once: true });
//   document.addEventListener('touchstart', () => { userInteracted = true; }, { once: true });
// }

// // Pre-initialize speech synthesis immediately
// if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
//   window.speechSynthesis.getVoices();
//   voicesLoaded = true;
//   window.speechSynthesis.onvoiceschanged = () => {
//     voicesLoaded = true;
//   };
// }

// export const getTextToSpeech = (text, lang = "en-US", audioFile) => {
//   return new Promise((resolve) => {
//     if ((!text || !text.trim()) && !audioFile) {
//       resolve();
//       return;
//     }

//     // IMMEDIATE execution - no delay
//     if (audioFile) {
//       playAudioWithFallback(audioFile, text, lang, resolve);
//     } else {
//       playTTSFast(text, lang, resolve);
//     }
//   });
// };

// const playAudioWithFallback = async (audioFile, text, lang, resolve) => {
//   try {
//     await playAnyAudioFile(audioFile);
//     resolve();
//   } catch (error) {
//     console.warn("Audio playback failed, quick fallback to TTS:", error);
//     if (text && text.trim()) {
//       playTTSFast(text, lang, resolve);
//     } else {
//       resolve();
//     }
//   }
// };

// const playAnyAudioFile = (audioFile) => {
//   return new Promise((resolve, reject) => {
//     // iOS FIX: Check if user has interacted first
//     if (isIOS && !userInteracted) {
//       reject(new Error('iOS requires user interaction for audio'));
//       return;
//     }

//     const audio = new Audio();
//     audio.preload = 'auto';
//     audio.src = audioFile;

//     // SUPPORT ALL AUDIO FORMATS
//     audio.type = getAudioMimeType(audioFile);

//     let resolved = false;
//     let playAttempted = false;

//     const complete = () => {
//       if (!resolved) {
//         resolved = true;
//         cleanup();
//         resolve();
//       }
//     };

//     const fail = (error) => {
//       if (!resolved) {
//         resolved = true;
//         cleanup();
//         reject(error || new Error('Audio playback failed'));
//       }
//     };

//     const cleanup = () => {
//       audio.removeEventListener('canplaythrough', onCanPlay);
//       audio.removeEventListener('loadeddata', onCanPlay);
//       audio.removeEventListener('ended', complete);
//       audio.removeEventListener('error', onError);
//       audio.removeEventListener('stalled', onStalled);
//       audio.removeEventListener('suspend', onSuspend);
//     };

//     const onCanPlay = () => {
//       if (!playAttempted) {
//         playAttempted = true;
//         attemptPlay();
//       }
//     };

//     const onError = () => {
//       fail(new Error(`Audio error: ${audio.error ? audio.error.code : 'unknown'}`));
//     };

//     const onStalled = () => {
//       console.log("Audio stalled, retrying...");
//       if (!resolved) {
//         setTimeout(attemptPlay, 100);
//       }
//     };

//     const onSuspend = () => {
//       console.log("Audio suspended, retrying...");
//       if (!resolved) {
//         setTimeout(attemptPlay, 100);
//       }
//     };

//     const attemptPlay = () => {
//       try {
//         const playPromise = audio.play();

//         if (playPromise !== undefined) {
//           playPromise
//             .then(() => {
//               console.log("Audio playback started successfully");
//             })
//             .catch(error => {
//               console.error("Play failed:", error);
//               fail(error);
//             });
//         }
//       } catch (error) {
//         fail(error);
//       }
//     };

//     // Event listeners for all possible states
//     audio.addEventListener('canplaythrough', onCanPlay);
//     audio.addEventListener('loadeddata', onCanPlay); // ADDED: loadeddata event
//     audio.addEventListener('ended', complete);
//     audio.addEventListener('error', onError);
//     audio.addEventListener('stalled', onStalled);
//     audio.addEventListener('suspend', onSuspend);

//     // Load the audio
//     audio.load();

//     // FAST TIMEOUT - 2 seconds
//     setTimeout(() => {
//       if (!resolved && !playAttempted) {
//         if (audio.readyState >= 2) { // HAVE_CURRENT_DATA or better
//           attemptPlay();
//         } else {
//           fail(new Error('Audio loading timeout'));
//         }
//       }
//     }, 2000);

//     // ABSOLUTE TIMEOUT - 4 seconds max
//     setTimeout(() => {
//       if (!resolved) {
//         fail(new Error('Audio playback timeout'));
//       }
//     }, 4000);
//   });
// };

// // DETECT AUDIO TYPE FROM FILE EXTENSION
// const getAudioMimeType = (filename) => {
//   const ext = filename.split('.').pop().toLowerCase();

//   const mimeTypes = {
//     'mp3': 'audio/mpeg',
//     'wav': 'audio/wav',
//     'ogg': 'audio/ogg',
//     'oga': 'audio/ogg',
//     'm4a': 'audio/mp4',
//     'aac': 'audio/aac',
//     'webm': 'audio/webm',
//     'flac': 'audio/flac',
//     'aif': 'audio/aiff',
//     'aiff': 'audio/aiff',
//     'mp4': 'audio/mp4',
//     'weba': 'audio/webm'
//   };

//   return mimeTypes[ext] || 'audio/*';
// };

// const playTTSFast = (text, lang, resolve) => {
//   if (!("speechSynthesis" in window)) {
//     resolve();
//     return;
//   }

//   // IMMEDIATE cancellation
//   window.speechSynthesis.cancel();

//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = lang;
//   utterance.rate = 1.2;
//   utterance.pitch = 1;
//   utterance.volume = 1;

//   // FAST voice selection
//   if (window.speechSynthesis.getVoices().length > 0) {
//     const voices = window.speechSynthesis.getVoices();
//     const voice = voices.find(v => v.lang.startsWith(lang)) || voices[0];
//     utterance.voice = voice;
//   }

//   let completed = false;

//   const complete = () => {
//     if (!completed) {
//       completed = true;
//       resolve();
//     }
//   };

//   utterance.onend = complete;
//   utterance.onerror = complete;

//   window.speechSynthesis.speak(utterance);

//   // FAST timeout - 2 seconds
//   setTimeout(() => {
//     if (!completed) {
//       window.speechSynthesis.cancel();
//       complete();
//     }
//   }, 2000);
// };

// // PRELOAD ANY AUDIO FILE TYPE
// export const preloadAudio = (audioFile) => {
//   return new Promise((resolve) => {
//     const audio = new Audio();
//     audio.preload = 'auto';
//     audio.src = audioFile;
//     audio.type = getAudioMimeType(audioFile);

//     audio.oncanplaythrough = resolve;
//     audio.onerror = resolve;

//     if (isIOS) {
//       setTimeout(resolve, 100);
//     }
//   });
// };

// // ULTRA-FAST TTS
// export const quickTTS = (text, lang = "en-US") => {
//   return new Promise((resolve) => {
//     if (!text || !text.trim() || !("speechSynthesis" in window)) {
//       resolve();
//       return;
//     }

//     window.speechSynthesis.cancel();

//     const shortText = text.length > 100 ? text.substring(0, 100) + "..." : text;
//     const utterance = new SpeechSynthesisUtterance(shortText);
//     utterance.lang = lang;
//     utterance.rate = 1.3;

//     utterance.onend = resolve;
//     utterance.onerror = resolve;

//     window.speechSynthesis.speak(utterance);

//     setTimeout(resolve, 1500);
//   });
// };

// export const immediateTTS = (text, lang = "en-US") => {
//   if (!text || !text.trim() || !("speechSynthesis" in window)) {
//     return Promise.resolve();
//   }

//   window.speechSynthesis.cancel();

//   const utterance = new SpeechSynthesisUtterance(text.substring(0, 150));
//   utterance.lang = lang;
//   window.speechSynthesis.speak(utterance);

//   return Promise.resolve();
// };

// // NEW: UNIVERSAL AUDIO PLAYER WITH FORMAT SUPPORT
// export const playUniversalAudio = (audioFile) => {
//   return new Promise((resolve, reject) => {
//     // iOS FIX: Check user interaction
//     if (isIOS && !userInteracted) {
//       reject(new Error('User interaction required for iOS audio'));
//       return;
//     }

//     const audio = new Audio(audioFile);

//     // Set proper MIME type for better browser support
//     const mimeType = getAudioMimeType(audioFile);
//     if (mimeType !== 'audio/*') {
//       audio.type = mimeType;
//     }

//     audio.preload = 'auto';

//     audio.onended = () => resolve();
//     audio.onerror = () => reject(new Error('Audio playback error'));

//     // iOS FIX: Handle autoplay restrictions
//     const playPromise = audio.play();

//     if (playPromise !== undefined) {
//       playPromise
//         .then(() => {
//           // Success - wait for ended event
//         })
//         .catch(error => {
//           console.warn('Autoplay prevented:', error);
//           reject(error);
//         });
//     }

//     // Timeout after 3 seconds
//     setTimeout(() => {
//       reject(new Error('Audio loading timeout'));
//     }, 3000);
//   });
// };

// // NEW: Function to ensure user interaction for iOS
// export const ensureUserInteraction = () => {
//   return new Promise((resolve) => {
//     if (!isIOS || userInteracted) {
//       resolve();
//       return;
//     }

//     // Wait for user interaction
//     const handleInteraction = () => {
//       userInteracted = true;
//       document.removeEventListener('click', handleInteraction);
//       document.removeEventListener('touchstart', handleInteraction);
//       resolve();
//     };

//     document.addEventListener('click', handleInteraction, { once: true });
//     document.addEventListener('touchstart', handleInteraction, { once: true });

//     // Auto-resolve after 5 seconds if no interaction
//     setTimeout(resolve, 5000);
//   });
// };
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