import { WIDTH, HEIGHT } from "../constants"

class Title extends Phaser.Scene {
  constructor() {
    super({ key: "title" })
  }

  preload() {
    this.load.image("bg", "imgs/bg.jpg")
    this.load.image("bg1", "imgs/bg1.jpg")
    this.load.image("bg2", "imgs/bg2.jpg")
    this.load.spritesheet("character", "imgs/character.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("tileMaps", "imgs/tile-maps.png", { frameWidth: 32, frameHeight: 32 })
  }

  create() {

    const text = new Phaser.GameObjects.Text(this, WIDTH / 2, HEIGHT / 2, "START", {
      color: "#FFFFFF",
      fontSize: "48px"
    })
    text.setInteractive()
    text.on("pointerdown", () => {
      this.scene.start("game")
    })

    this.add.existing(text)
  }
}

export {
  Title
}
