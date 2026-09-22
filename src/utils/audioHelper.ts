/**
 * Web Speech API helper for native, zero-latency word pronunciation.
 */

let synth: SpeechSynthesis | null = null;
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  synth = window.speechSynthesis;
}

export function speakWord(word: string, lang = 'en-US'): Promise<boolean> {
  return new Promise((resolve) => {
    if (!synth) {
      resolve(false);
      return;
    }

    // Cancel any active speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = lang;
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;

    // Pick English voice if available
    const voices = synth.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => resolve(true);
    utterance.onerror = () => resolve(false);

    synth.speak(utterance);
  });
}

export function isSpeechAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
