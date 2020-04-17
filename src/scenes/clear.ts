import { Base } from "./base"
import { WIDTH } from "../constants"

class Clear extends Base {
  clearTime = 0
  life = 0

  constructor() {
    super("clear", "もう一回")
  }

  init(data: any) {
    this.life = data.life
  }

  create() {
    this.makeBtns()

    const text = `残りライフ： ${this.life}`
    this.add.text(WIDTH / 2, 60, text, {
      color: "#000000",
      stroke: "#FFFFFF",
      fontSize: "16px",
      fontStyle: "bold",
      strokeThickness: 6
    }).setOrigin(0.5)
  }
}

export {
  Clear
}
