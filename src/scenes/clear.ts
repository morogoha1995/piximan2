import { Base } from "./base"

class Clear extends Base {
  constructor() {
    super("clear", "もう一回")
  }

  create() {
    this.makeBtns()
  }
}

export {
  Clear
}
