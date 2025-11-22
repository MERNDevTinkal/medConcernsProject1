let voicesLoaded = false;

function loadVoices() {
  return new Promise(resolve => {
    const voices = speechSynthesis.getVoices();
    if (voices.length) {
      voicesLoaded = true;
      resolve(voices);
    } else {
      speechSynthesis.onvoiceschanged = () => {
        voicesLoaded = true;
        resolve(speechSynthesis.getVoices());
      };
    }
  });
}

export const getTextToSpeech = async (text, lang = "en-US", audioFile) => {
  if ((!text || !text.trim()) && !audioFile) return;

  // iOS: Cancel previous speech (prevents queue freeze)
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }

  // Priority: play audio file first if provided
  if (audioFile) {
    try {
      await playAudio(audioFile);
      return;
    } catch (e) {
      console.warn("Audio failed, falling back to TTS");
    }
  }

  // Fallback to TTS
  await playTTS(text, lang);
};

function playAudio(src) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.oncanplaythrough = () => {
      audio.play().then(resolve).catch(reject);
    };
    audio.onerror = reject;
  });
}

async function playTTS(text, lang) {
  if (!("speechSynthesis" in window)) {
    return console.warn("TTS not supported");
  }

  await loadVoices(); // Ensure voices ready for iOS

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 1;
  utter.pitch = 1;
  utter.volume = 1;

  const voices = speechSynthesis.getVoices();
  const selected = voices.find(v => v.lang.includes(lang));
  if (selected) utter.voice = selected;

  return new Promise(resolve => {
    utter.onend = resolve;
    utter.onerror = (e) => {
      console.error("TTS error:", e);
      resolve();
    };

    // iOS requires cancel before speak to avoid silence delay
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  });
}
