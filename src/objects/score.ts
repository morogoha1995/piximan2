import { WIDTH } from "../constants"

class Score {
  private bananaCount: Phaser.GameObjects.Image
  private life: Phaser.GameObjects.Image

  constructor(scene: Phaser.Scene, currentStage: number, maxStage: number, maxBananaCount: number, maxLife: number, life: number) {
    const y = 30
    const scoreMargin = 8
    const scale = 0.6

    // life
    const lifeCenterX = 0.2
    scene.add.image(WIDTH * lifeCenterX, y, "heart").setScrollFactor(0).setAlpha(0.6)
    this.life = scene.add.image(WIDTH * (lifeCenterX - 0.05), y - scoreMargin, `number_${life}`).setScrollFactor(0).setScale(scale)
    scene.add.image(WIDTH * (lifeCenterX + 0.05), y + scoreMargin, `number_${maxLife}`).setScrollFactor(0).setScale(scale)

    // star
    const starCenterX = 0.5
    scene.add.image(WIDTH * starCenterX, y, "tileMaps", 2).setScrollFactor(0).setAlpha(0.6)
    scene.add.image(WIDTH * (starCenterX - 0.05), y - scoreMargin, `number_${currentStage}`).setScrollFactor(0).setScale(scale)
    scene.add.image(WIDTH * (starCenterX + 0.05), y + scoreMargin, `number_${maxStage}`).setScrollFactor(0).setScale(scale)

    // banana
    const bananaCenterX = 0.8
    scene.add.image(WIDTH * bananaCenterX, y, "tileMaps", 0).setScrollFactor(0).setAlpha(0.6)
    this.bananaCount = scene.add.image(WIDTH * (bananaCenterX - 0.05), y - scoreMargin, `number_0`).setScrollFactor(0).setScale(scale)
    scene.add.image(WIDTH * (bananaCenterX + 0.05), y + scoreMargin, `number_${maxBananaCount}`).setScrollFactor(0).setScale(scale)
  }

  setBananaCount(n: number) {
    this.bananaCount.setTexture(`number_${n}`)
  }

  setLife(n: number) {
    this.life.setTexture(`number_${n}`)
  }
}

export {
  Score
}
