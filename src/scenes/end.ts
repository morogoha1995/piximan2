import { WIDTH, HEIGHT } from "../constants"

class End extends Phaser.Scene {
  constructor() {
    super({ key: "end" })
  }

  create() {
    const text = new Phaser.GameObjects.Text(this, WIDTH / 2, HEIGHT / 2, "END", {
      color: "skyblue",
      fontSize: "48px"
    })

    this.add.existing(text)
  }
}

export {
  End
}
