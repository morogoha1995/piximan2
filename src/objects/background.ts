class Background {
  constructor(scene: Phaser.Scene, stage: number) {
    let texture = "bg"
    if (stage >= 1)
      texture = `${texture}${stage}`

    scene.add.image(0, 0, texture).setOrigin(0).setScrollFactor(0)
  }
}

export {
  Background
}
