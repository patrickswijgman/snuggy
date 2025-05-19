const targetFrameTime = 1000 / 60;

let last = 0;
let now = 0;
let frames = 0;
let framesTime = 0;

export let delta = 0;
export let time = 0;
export let elapsed = 0;
export let fps = 0;

export function startLoop(update: () => void) {
  last = performance.now();
  now = performance.now();

  const tick = () => {
    last = now;
    now = performance.now();

    time = now - last;
    delta = time / targetFrameTime;
    elapsed += time;

    frames++;
    framesTime += time;
    if (framesTime >= 1000) {
      fps = frames;
      frames = 0;
      framesTime = 0;
    }

    update();
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
