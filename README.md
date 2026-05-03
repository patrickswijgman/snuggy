# Snuggy

A snuggy simple game engine to make games with HTML canvas. Perfect for small games!

## Features

- Game loop
- Resources (textures, fonts and sounds)
- Auto sizing canvas (based on screen and aspect ratio)
- Drawing (textures, sprites, text and shapes)
- Render textures (draw your own textures in code!)
- Camera (with smoothing and boundary)
- A few handy util functions

## Installation

### With a starter template

```shell
npx degit patrickswijgman/snuggy-template#main <project-name>
cd <project-name>
npm ci
npm start
```

### Manually

```shell
npm i snuggy
```

## Usage

There is no extensive documentation, the example below should be enough to get you started! Also the source code of snuggy is not a lot :wink:

```typescript
import {
  addCameraTransform,
  delta,
  drawSprite,
  isInputDown,
  loadFont,
  loadSound,
  loadTexture,
  resetTransform,
  run,
  scaleTransform,
  setCameraBoundary,
  setCameraSmoothing,
  setCameraTarget,
  setFont,
  setFontOffset,
  setInput,
  translateTransform,
  updateCamera,
} from "snuggy";

// const enums are compiled to inline values instead of objects, making it more speedy.
// Use indexes for resources as they are stored in arrays. Make sure the numbers are contiguous.
const enum Texture {
  ATLAS = 0,
}

const enum Font {
  DEFAULT = 0,
}

const enum Sound {
  MUSIC = 0,
  OOF = 1,
}

const enum Input {
  LEFT = 0,
  RIGHT = 1,
  LMB = 2,
  MMB = 3,
  RMB = 4,
}

const enum Type {
  UNKNOWN = 0,
  PLAYER = 1,
  ENEMY = 2,
}

// Arbitrary amount, can be less or more depending on your needs.
const MAX_ENTITIES = 2048;

// Entity data (Structure of Arrays).
const type = new Uint8Array(MAX_ENTITIES);
const positionX = new Float32Array(MAX_ENTITIES);
const positionY = new Float32Array(MAX_ENTITIES);
const velocityX = new Float32Array(MAX_ENTITIES);
const velocityY = new Float32Array(MAX_ENTITIES);
const isActive = new Uint8Array(MAX_ENTITIES);
const isFlipped = new Uint8Array(MAX_ENTITIES);

// Let's reserve the first index for the player.
const PLAYER_IDX = 0;

async function setup() {
  // Use Promise.all to load all resources in parallel, increasing page load speed!
  await Promise.all([
    // Textures.
    loadTexture(Texture.ATLAS, "textures/atlas.png"),

    // Fonts.
    loadFont(Font.DEFAULT, "fonts/ComicSans.ttf", "ComicSans", 8),

    // Sounds.
    loadSound(Sound.MUSIC, "sounds/music.mp3", true),
    loadSound(Sound.OOF, "sounds/oof.wav"),
  ]);

  setCameraSmoothing(0.1);
  setCameraBoundary(0, 0, 1000, 1000); // Restrict camera to the level size.

  setFont(Font.DEFAULT);
  setFontOffset(0, 0);

  // Map key codes and mouse button numbers to Input enum values.
  setInput("ArrowLeft", Input.LEFT);
  setInput("ArrowRight", Input.RIGHT);
  setInput("0", Input.LMB);
  setInput("1", Input.MMB);
  setInput("2", Input.RMB);

  // Setup the player.
  type[PLAYER_IDX] = Type.PLAYER;
  positionX[PLAYER_IDX] = 50;
  positionY[PLAYER_IDX] = 50;
  isActive[PLAYER_IDX] = 1;
}

// Update and draw each frame.
function update() {
  for (let i = 0; i < MAX_ENTITIES; i++) {
    if (!isActive[i]) {
      continue;
    }

    // Update entity logic.
    switch (type[i]) {
      case Type.PLAYER:
        {
          velocityX[i] = 0;

          if (isInputDown(Input.LEFT)) {
            velocityX[i] -= 1;
            isFlipped[i] = 1;
          }
          if (isInputDown(Input.RIGHT)) {
            velocityX[i] += 1;
            isFlipped[i] = 0;
          }

          setCameraTarget(positionX[i], positionY[i]);
        }
        break;
    }

    // Update position with velocity.
    // Important to use the delta here, otherwise the entity will move slower on lower FPS and faster on higher FPS.
    positionX[i] += velocityX[i] * delta;
    positionY[i] += velocityY[i] * delta;

    // Transformation matrix operations (AKA the drawing pencil):
    resetTransform(); // 1. Reset transformations back to x=0, y=0
    addCameraTransform(); // 2. Add camera transform (not needed for e.g. UI elements)
    translateTransform(positionX[i], positionY[i]); // 3. Translate to entity's position
    if (isFlipped[i]) {
      scaleTransform(-1, 1); // 4. Flip sprite horizontally if flipped
    }

    // Render entity.
    switch (type[i]) {
      case Type.PLAYER:
        drawSprite(
          Texture.ATLAS, // Texture ID
          -8, // Pivot point x
          -16, // Pivot point y
          0, // Frame x
          0, // Frame y
          16, // Frame width
          16, // Frame height
        );
        break;
    }
  }

  // Call this once every frame, the camera will then pan automatically to the camera's target.
  updateCamera();
}

run(
  // Logical canvas size, will be auto sized and scaled based on screen and aspect ratio.
  640,
  360,

  setup,
  update,
);
```
