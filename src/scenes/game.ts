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

    this.physics.add.collider(this.character, this.stageMap.layer)

    this.bg.switchImg(0)
  }

  update() {
    this.character.update()
  }
}
