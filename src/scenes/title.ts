import { WIDTH, HEIGHT } from "../constants"

class Title extends Phaser.Scene {
  constructor() {
    super({ key: "title" })
  }

  preload() {
    this.load
      .image("bg", "imgs/bg.jpg")
      .image("bg1", "imgs/bg1.jpg")
      .image("bg2", "imgs/bg2.jpg")
      .image("x", "imgs/x.png")
      .image("duck", "imgs/duck.png")
      .image("uncle", "imgs/uncle.png")
      .image("number_0", "imgs/number_0.png")
      .image("number_1", "imgs/number_1.png")
      .image("number_2", "imgs/number_2.png")
      .image("number_3", "imgs/number_3.png")
      .image("number_4", "imgs/number_4.png")
      .image("number_5", "imgs/number_5.png")
      .image("number_6", "imgs/number_6.png")
      .image("number_7", "imgs/number_7.png")
      .image("number_8", "imgs/number_8.png")
      .image("number_9", "imgs/number_9.png")
      .spritesheet("character", "imgs/character.png", { frameWidth: 32, frameHeight: 32 })
      .spritesheet("tileMaps", "imgs/tile-maps.png", { frameWidth: 32, frameHeight: 32 })
  }

  create() {

    const text = new Phaser.GameObjects.Text(this, WIDTH / 2, HEIGHT / 2, "START", {
      color: "red",
      fontSize: "48px"
    })
    text.setInteractive()
    text.on("pointerdown", () => {
      this.scene.start("game", { stage: 0 })
    })

    this.add.existing(text)
  }
}

export {
  Title
}
