export const getTextToSpeech = (text) => {
  return new Promise((resolve, reject) => {
    if (!text || !text.trim()) {
      resolve();
      return;
    }
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onend = () => {
        resolve();
      };
      utterance.onerror = (err) => {
        reject(err);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      reject("Text-to-Speech not supported in this browser.");
    }
  });
};
