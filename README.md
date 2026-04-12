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
import { addCameraTransform, delta, drawSprite, isInputDown, loadFont, loadSound, loadTexture, resetTransform, run, scaleTransform, setCameraBoundary, setCameraSmoothing, setCameraTarget, setFont, translateTransform, updateCamera } from "snuggy";

// const enums are compiled to inline values instead of objects, making it more speedy.
// Use indexes for resources as they are stored in arrays. Make sure the numbers are contiguous.
const enum Texture {
  ATLAS = 0
}

const enum Font {
  DEFAULT = 0
}

const enum Sound {
  MUSIC = 0,
  OOF = 1,
}

const enum Input {
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
  // Use the button number as string for mouse buttons.
  LMB = "0",
  MMB = "1",
  RMB = "2",
}

const enum Type {
  UNKNOWN = 0,
  PLAYER = 1,
  ENEMY = 2,
}

// Arbitrary amount, can be less or more depending on your needs.
const MAX_ENTITIES = 2048;

// Entity data structure.
type Entity = {
  type: Type;
  positionX: number;
  y: number;
  velocityX: number;
  velocityY: number;
  isActive: boolean;
  isFlipped: boolean;
}

// Fill the array of entities (Array of Structures).
const entities = new Array<Entity>(MAX_ENTITIES);
for (let i = 0; i < MAX_ENTITIES; i++) {
  entities[i] = {
    type: Type.UNKNOWN,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    isActive: false,
    isFlipped: false,
  }
}

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

  // Setup the player.
  entities[PLAYER_IDX] = {
    type: Type.PLAYER,
    x: 50,
    y: 50,
    velocityX: 0,
    velocityY: 0,
    isActive: true,
    isFlipped: false,
  };
}

// Update and draw each frame.
function update() {
  for (const entity of entities) {
    if (!entity.isActive) {
      continue;
    }

    // Update entity logic.
    switch (entity.type) {
      case Type.PLAYER:
        {
          entity.velocityX = 0;

          if (isInputDown(Input.LEFT)) {
            entity.velocityX -= 1;
            entity.isFlipped = true;
          }
          if (isInputDown(Input.RIGHT)) {
            entity.velocityX += 1;
            entity.isFlipped = false;
          }

         setCameraTarget(entity.x, entity.y);
        }
        break;
    }

    // Update position with velocity.
    entity.x += entity.velocityX * delta;
    entity.y += entity.velocityY * delta;

    // Transformation matrix operations (AKA the drawing pencil):
    resetTransform();                       // 1. Reset transformations back to x=0, y=0
    addCameraTransform();                   // 2. Add camera transform (not needed for e.g. UI elements)
    translateTransform(entity.x, entity.y); // 3. Translate to entity's position
    if (entity.isFlipped) {
      scaleTransform(-1, 1);                // 4. Flip sprite horizontally if flipped
    }

    // Render entity.
    switch (entity.type) {
      case Type.PLAYER:
        drawSprite(
          Texture.ATLAS,  // Texture ID
          -8,             // Pivot point (x)
          -16,            // Pivot point (y)
          0,              // Frame x
          0,              // Frame y
          16,             // Frame width
          16              // Frame height
        );
        break;
    }
  }

  // Call this once every frame, the camera will then pan automatically to the camera's target.
  updateCamera();
}

run(
  320, // Canvas size, will be auto sized and scaled based on screen and aspect ratio.
  setup,
  update
);
```
