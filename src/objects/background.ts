class Background {
  imgs: Phaser.GameObjects.Image[] = []

  constructor(scene: Phaser.Scene) {
    const imgNames = ["bg", "bg1", "bg2"]

    for (const imgName of imgNames) {
      const addedImg = scene.add.image(0, 0, imgName)
        .setOrigin(0)
        .setScrollFactor(0)
      addedImg.visible = false
      this.imgs.push(addedImg)
    }
  }

  switchImg(stage: number) {
    for (let i = 0; i < this.imgs.length; i++) {
      this.imgs[i].visible = i === stage
    }
  }
}

export {
  Background
}
