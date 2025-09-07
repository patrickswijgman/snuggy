const sounds: Record<string, HTMLAudioElement> = Object.create(null);

export let volume = 1;

export async function loadSound(id: string, url: string, stream = false) {
  await new Promise<void>((resolve, reject) => {
    const audio = new Audio(url);
    const event = stream ? "canplay" : "canplaythrough";

    audio.addEventListener(
      event,
      () => {
        sounds[id] = audio;
        resolve();
      },
      { once: true },
    );

    audio.addEventListener(
      "error",
      (e) => {
        reject(e);
      },
      { once: true },
    );
  });
}

export function getSound(id: string) {
  return sounds[id];
}

export function playSound(id: number) {
  const sound = sounds[id];
  sound.currentTime = 0;
  sound.volume = volume;
  sound.play();
}

export function stopSound(id: number) {
  const sound = sounds[id];
  sound.pause();
  sound.currentTime = 0;
}

export function setVolume(value: number) {
  volume = value;
  for (const id in sounds) {
    sounds[id].volume = volume;
  }
}
