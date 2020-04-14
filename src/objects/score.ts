import { WIDTH } from "../constants"

class Score {
  private bananaCount: Phaser.GameObjects.Image
  private xMark: Phaser.GameObjects.Image

  constructor(scene: Phaser.Scene, currentStage: number, maxBananaCount: number) {
    const y = 30

    scene.add.image(WIDTH * 0.2, y, `number_${currentStage + 1}`).setScrollFactor(0)

    scene.add.image(WIDTH * 0.5, y, "tileMaps", 0).setScrollFactor(0).setAlpha(0.5)
    this.bananaCount = scene.add.image(WIDTH * 0.45, y, `number_0`).setScrollFactor(0).setDisplaySize(16, 24)
    scene.add.image(WIDTH * 0.55, y + 5, `number_${maxBananaCount}`).setScrollFactor(0).setDisplaySize(16, 24)

    scene.add.image(WIDTH * 0.8, y, "tileMaps", 2).setScrollFactor(0).setDisplaySize(20, 20)
    this.xMark = scene.add.image(WIDTH * 0.8, y, "x").setScrollFactor(0).setDisplaySize(24, 24).setAlpha(0.5)
  }

  setBananaCount(n: number) {
    this.bananaCount.setTexture(`number_${n}`)
  }

  eraseXMark() {
    this.xMark.setVisible(false)
  }
}

export {
  Score
}
