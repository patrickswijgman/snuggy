# Snuggy

A snuggy simple game engine to make games with HTML canvas. Perfect for little data oriented games!

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
import { addCameraTransform, delta, drawSprite, isInputDown, loadFont, loadSound, loadTexture, resetTransform, run, scaleTransform, setCameraBoundary, setCameraSmoothing, setFont, translateTransform } from "snuggy";

// const enums are compiled to inline values instead of objects, making it more speedy.
const enum Texture {
  ATLAS = "atlas",
}

const enum Font {
  DEFAULT = "default",
}

const enum Sound {
  MUSIC = "music",
  OOF = "oof",
}

const enum Input {
  // See for example https://www.toptal.com/developers/keycode for key codes.
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
  // Use the button number as string for mouse buttons.
  LMB = "0",
  MMB = "1",
  RMB = "2",
}

const enum Type {
  PLAYER = 1,
  ENEMY = 2,
}

// Arbitrary amount, can be less or more depending on your needs.
const MAX_ENTITIES = 2048;

// Entity data (Structure of Arrays)
// See my other library https://github.com/patrickswijgman/game-data-gen to create these data structures easily.
const type = new Uint8Array(MAX_ENTITIES);
const positionX = new Float32Array(MAX_ENTITIES);
const positionY = new Float32Array(MAX_ENTITIES);
const velocityX = new Float32Array(MAX_ENTITIES);
const velocityY = new Float32Array(MAX_ENTITIES);
const isActive = new Uint8Array(MAX_ENTITIES);
const isFlipped = new Uint8Array(MAX_ENTITIES);

// Let's reserve the first index for the player.
// In the real world you'd want to make a function to get the next free entity index.
const playerIndex = 0;

async function setup() {
  // Use Promise.all to load all resources in parallel, increasing page load speed!
  await Promise.all([
    // Textures.
    // A texture would contain all the sprites you need for your game.
    // Using a single texture for all sprites is more efficient for the GPU!
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

  // Setup the player.
  type[playerIndex] = Type.PLAYER;
  positionX[playerIndex] = 50;
  positionY[playerIndex] = 50;
  isActive[playerIndex] = 1; // A positive number equals true, zero equals false.
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
        }
        break;
    }

    // NOTE:
    // `delta` is the delta time as a scalar value.
    // At 30 fps it will have a value of 2 if max frames per seconds is 60.
    // Use this when doing frame-dependent operations such as movement.
    //
    // Use `time` instead to increase timers as this is the delta time in milliseconds.
    positionX[i] += velocityX[i] * delta;
    positionY[i] += velocityY[i] * delta;

    // Transformation matrix operations:
    // 1. Put the drawing pencil back at 0,0 and reset scaling and reset rotation.
    resetTransform();
    // 2. Add camera translation (don't do this if you want to draw UI elements).
    addCameraTransform();
    // 3. Put the drawing pencil at the entity's position to draw the sprite at.
    translateTransform(positionX[i], positionY[i]);
    // 4. Scale by -1 on the x-axis to horizontally flip a sprite.
    if (isFlipped[i]) {
      scaleTransform(-1, 1);
    }

    // Render entity.
    switch (type[i]) {
      case Type.PLAYER:
        {
          // A sprite is a sub-region (frame) within a texture.
          drawSprite(
            // textureId
            Texture.ATLAS,

            // Pivot point: x, y
            // The point of rotation and scaling.
            // Before we can do this, we need to translate to the position of the
            // entity (see `translateTransform` above).
            // Otherwise it will simply be the x and y coordinates to draw at.
            -8,
            -16,

            // Frame: x, y, width, height
            0,
            0,
            16,
            16,
          );
        }
        break;
    }
  }
}

run(
  320, // Canvas size, will be auto sized and scaled based on screen and aspect ratio.
  setup,
  update,
);
```
