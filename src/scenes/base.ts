import { WIDTH } from "../constants"

class Base extends Phaser.Scene {
  crossMark!: Phaser.GameObjects.Image
  isMute = false

  constructor(private key: string, private btnWord: string) {
    super({ key: key })
  }

  makeBtns() {
    this.add.image(0, 0, this.key).setOrigin(0)

    // startBtn
    const btnX = WIDTH / 4
    const btnY = 120

    const text = this.add.text(btnX, btnY, this.btnWord, {
      color: "tomato",
      stroke: "white",
      fontSize: "32px",
      fontStyle: "bold",
      strokeThickness: 10
    }).setOrigin(0.5)
    text.setInteractive()
    text.on("pointerdown", () => {
      this.sound.mute = this.isMute
      this.scene.start("game", { stage: 0, life: 0 })
    })

    // audioBtn
    const audioBtnX = btnX * 3

    const audioText = this.add.text(audioBtnX, btnY, "音", {
      color: "royalblue",
      stroke: "white",
      fontSize: "32px",
      fontStyle: "bold",
      strokeThickness: 10
    }).setOrigin(0.5)
    audioText.setInteractive()
    audioText.on("pointerdown", () => {
      this.switchMute()
    })

    this.isMute = this.sound.mute
    this.crossMark = this.add.image(audioBtnX, btnY, "x").setVisible(this.isMute)
  }

  private switchMute() {
    this.isMute = !this.isMute
    this.crossMark.setVisible(this.isMute)
  }
}

export {
  Base
}
