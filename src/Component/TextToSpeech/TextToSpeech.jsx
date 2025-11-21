export const getTextToSpeech = (text, lang = "en-US", audioFile) => {
  return new Promise((resolve, reject) => {
    if ((!text || !text.trim()) && !audioFile) {
      resolve();
      return;
    }
    const playMedia = () => {
      if (audioFile) {
        const audio = new Audio(audioFile);
        audio.onended = () => resolve();
        audio.onerror = (err) => {
          console.warn("Audio playback failed, falling back to TTS", err);
          playTTS(text, lang, resolve, reject);
        };
        audio.play().catch((err) => {
          console.warn("Audio play() error, falling back to TTS", err);
          playTTS(text, lang, resolve, reject);
        });
      } else {
        playTTS(text, lang, resolve, reject);
      }
    };
    if (audioFile) {
      const audio = new Audio();
      audio.src = audioFile;
      audio.play().then(() => {
        audio.pause(); 
        playMedia();
      }).catch(() => {
        console.warn("Autoplay blocked, waiting for user interaction");
        const handleInteraction = () => {
          document.removeEventListener('click', handleInteraction);
          document.removeEventListener('touchstart', handleInteraction);
          playMedia();
        };
        
        document.addEventListener('click', handleInteraction);
        document.addEventListener('touchstart', handleInteraction);
      });
    } else {
      playMedia();
    }
  });
};

const playTTS = (text, lang, resolve, reject) => {
  if (!("speechSynthesis" in window)) {
    reject("Text-to-Speech not supported in this browser.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      const loadedVoices = window.speechSynthesis.getVoices();
      const selectedVoice = loadedVoices.find((v) => v.lang.startsWith(lang));
      if (selectedVoice) utterance.voice = selectedVoice;
      window.speechSynthesis.speak(utterance);
    };
  } else {
    const selectedVoice = voices.find((v) => v.lang.startsWith(lang));
    if (selectedVoice) utterance.voice = selectedVoice;
    window.speechSynthesis.speak(utterance);
  }

  utterance.onend = () => resolve();
  utterance.onerror = (err) => reject(err);
};