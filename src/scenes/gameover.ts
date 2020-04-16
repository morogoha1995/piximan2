import { Base } from "./base"

class Gameover extends Base {
  constructor() {
    super("gameover", "もう一回")
  }

  create() {
    this.makeBtns()
  }
}

export {
  Gameover
}
