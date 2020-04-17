class TouchPanel {
  left!: Phaser.GameObjects.Image
  right!: Phaser.GameObjects.Image
  up!: Phaser.GameObjects.Image

  constructor(scene: Phaser.Scene) {
    const y = 360

    const minX = 40

    this.left = scene.add.image(minX, y, "touchPanel", 0).setInteractive().setScrollFactor(0)

    this.right = scene.add.image(minX + 80, y, "touchPanel", 1).setInteractive().setScrollFactor(0)

    this.up = scene.add.image(minX + 240, y, "touchPanel", 2).setInteractive().setScrollFactor(0)
  }
}

export {
  TouchPanel
}
