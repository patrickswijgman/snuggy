# Snuggy

A snuggy simple game engine to make games with HTML canvas. Perfect for little data oriented games.

## Features

* Game loop
* Resources (textures, fonts and sounds)
* Canvas (auto scaling)
* Drawing (sprites, text and shapes)
* Camera (with smooooothing)
* A few handy util functions

## Installation

```shell
npm i snuggy
```

## Usage

Below is a very naive example to get started with snuggy to make a data oriented game.

```typescript
import { run, loadTexture, loadFont, drawSprite, delta, resetTransform, translateTransform, drawSprite, setCameraSmoothing } from "snuggy"

const enum EntityType {
  PLAYER,
  ENEMY
}

const MAX_ENTITIES = 2048;

// Entity data (Structure of Arrays)
const type = new Uint8Array(MAX_ENTITIES)
const positionX = new Float32Array(MAX_ENTITIES)
const positionY = new Float32Array(MAX_ENTITIES)
const velocityX = new Float32Array(MAX_ENTITIES)
const velocityY = new Float32Array(MAX_ENTITIES)
const isActive = new Uint8Array(MAX_ENTITIES)

// Let's reserve the first index for the player.
const playerIndex = 0;

run(
  // Canvas size, will be auto scaled based on screen and aspect ratio.
  320,

  // Setup
  async () => {
    await loadTexture("atlas", "textures/atlas.png")
    await loadFont("default", "Pixelmix", 8, "fonts/pixelmix.ttf")

    setCameraSmoothing(0.1)
    setFont("default")

    // Setup the player.
    type[playerIndex] = EntityType.PLAYER
    positionX[playerIndex] = 100
    positionY[playerIndex] = 100
    velocityX[playerIndex] = 1 // Make the player slowly move to the right.
    isActive[playerIndex] = 1
  },

  // Update and draw
  () => {
    for (let i=0; i < MAX_ENTITIES; i++) {
      if (!isActive[i]) {
        continue
      }

      positionX[idx] += velocityX[idx] * delta
      positionY[idx] += velocityY[idx] * delta

      resetTransform()
      translateTransform(positionX[idx], positionY[idx])

      switch (type) {
        case EntityType.PLAYER:
          drawSprite(
            "atlas", // textureId
            0, // frameX
            0, // frameY
            16, // frameWidth
            16, // frameHeight
            8, // pivotX
            16 // pivotY
          )
          break
      }
    }
  }
)
```

## Tip

Use my other library [game-data-gen](https://github.com/patrickswijgman/game-data-gen) to create data structures (such as Structure of Arrays) for your game.
