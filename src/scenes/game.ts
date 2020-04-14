import { Character } from "../objects/character"
import { StageMap } from "../objects/stageMap"
import { Background } from "../objects/background"

export default class Game extends Phaser.Scene {
  character!: Character
  stageMap!: StageMap
  bg!: Background

  currentStage = 0
  bananaCount = 0

  constructor() {
    super({ key: "game" })
  }

  init(obj: any) {
    if (obj.stage)
      this.currentStage = obj.stage
  }

  create() {
    this.bg = new Background(this, this.currentStage)
    this.character = new Character(this)
    this.stageMap = new StageMap(this, this.currentStage)

    this.physics.add.collider(this.character, this.stageMap.layer, (_, tile: any) => {
      if (tile.index === 0) {
        this.bananaCount++
        this.stageMap.layer.removeTileAt(tile.x, tile.y)

        if (this.bananaCount === 3) {
          // To visible star.
          this.stageMap.layer.swapByIndex(6, 2).setCollision(2)
        }
      } else if (tile.index === 2)
        this.nextStage()
    })

    this.cameras.main.startFollow(this.character)
  }

  private nextStage() {
    if (this.currentStage === 2) {
      this.scene.start("end")
      return
    }

    this.scene.restart({ stage: this.currentStage + 1 })
    this.bananaCount = 0
  }

  update() {
    this.character.update()
  }
}
