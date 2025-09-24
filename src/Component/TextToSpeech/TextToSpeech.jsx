export const getTextToSpeech = (text, lang = "en-US") => {
  return new Promise((resolve, reject) => {
    if (!text || !text.trim()) {
      resolve();
      return;
    }

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find((v) => v.lang.startsWith(lang));
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.onend = () => resolve();
      utterance.onerror = (err) => reject(err);
      window.speechSynthesis.speak(utterance);
    } else {
      reject("Text-to-Speech not supported in this browser.");
    }
  });
};
