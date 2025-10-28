export const getTextToSpeech = (text, lang = "en-US", audioFile) => {
  console.log("==>audioFile", audioFile);
  return new Promise((resolve, reject) => {
    if ((!text || !text.trim()) && !audioFile) {
      resolve();
      return;
    }
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
  });
};
const playTTS = (text, lang, resolve, reject) => {
  if (!("speechSynthesis" in window)) {
    reject("Text-to-Speech not supported in this browser.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find((v) => v.lang.startsWith(lang));
  if (selectedVoice) utterance.voice = selectedVoice;

  utterance.onend = () => resolve();
  utterance.onerror = (err) => reject(err);
  window.speechSynthesis.speak(utterance);
};
