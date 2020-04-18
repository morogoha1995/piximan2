import { Base } from "./base"
import { WIDTH } from "../constants"
import { createFontStyle } from "../utils/text"

class Title extends Base {
  constructor() {
    super("title", "始める")
  }

  preload() {
    this.load
      .image("title", "imgs/title.png")
      .image("clear", "imgs/clear.png")
      .image("gameover", "imgs/gameover.png")
      .image("stageClear", "imgs/stageclear.png")
      .image("bg", "imgs/bg.jpg")
      .image("bg1", "imgs/bg1.jpg")
      .image("bg2", "imgs/bg2.jpg")
      .image("x", "imgs/x.png")
      .image("heart", "imgs/heart.png")
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
      .spritesheet("touchPanel", "imgs/touch-panel.png", {
        frameWidth: 60, frameHeight: 60
      })
      .audio("hurt", "audio/hurt.mp3")
      .audio("die", "audio/die.mp3")
      .audio("jump", "audio/jump.mp3")
      .audio("bounce", "audio/bounce.mp3")
      .audio("getBanana", "audio/get-banana.mp3")
      .audio("getStar", "audio/get-star.mp3")
  }

  create() {
    this.makeBtns()

    this.add.text(
      WIDTH / 2,
      50,
      "ピクシーマン2",
      createFontStyle("gold", "teal", 40)
    ).setOrigin(0.5)
  }
}

export {
  Title
}
