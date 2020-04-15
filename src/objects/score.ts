import { WIDTH } from "../constants"

class Score {
  private bananaCount: Phaser.GameObjects.Image

  constructor(scene: Phaser.Scene, currentStage: number, maxStage: number, maxBananaCount: number) {
    const y = 30
    const scoreWidth = 16
    const scoreHeight = 24
    const scoreMargin = 8

    // star
    scene.add.image(WIDTH * 0.3, y, "tileMaps", 2).setScrollFactor(0).setAlpha(0.6)
    scene.add.image(WIDTH * 0.25, y - scoreMargin, `number_${currentStage}`).setScrollFactor(0).setDisplaySize(scoreWidth, scoreHeight)
    scene.add.image(WIDTH * 0.35, y + scoreMargin, `number_${maxStage}`).setScrollFactor(0).setDisplaySize(scoreWidth, scoreHeight)

    // banana
    scene.add.image(WIDTH * 0.7, y, "tileMaps", 0).setScrollFactor(0).setAlpha(0.6)
    this.bananaCount = scene.add.image(WIDTH * 0.65, y - scoreMargin, `number_0`).setScrollFactor(0).setDisplaySize(scoreWidth, scoreHeight)
    scene.add.image(WIDTH * 0.75, y + scoreMargin, `number_${maxBananaCount}`).setScrollFactor(0).setDisplaySize(scoreWidth, scoreHeight)
  }

  setBananaCount(n: number) {
    this.bananaCount.setTexture(`number_${n}`)
  }
}

export {
  Score
}
