import { Character } from "../objects/character"
import { StageMap } from "../objects/stageMap"
import { Background } from "../objects/background"

export default class Game extends Phaser.Scene {
  character!: Character
  stageMap!: StageMap
  bg!: Background

  constructor() {
    super({ key: "game" })
  }

  create() {
    this.bg = new Background(this)
    this.character = new Character(this)
    this.stageMap = new StageMap(this)

    this.bg.switchImg(0)
  }

  update() {

  }
}
