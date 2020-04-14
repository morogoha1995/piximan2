import { Character } from "../objects/character"
import { StageMap } from "../objects/stageMap"
import { Background } from "../objects/background"
import { Score } from "../objects/score"

export default class Game extends Phaser.Scene {
  character!: Character
  stageMap!: StageMap
  bg!: Background
  score!: Score

  currentStage = 0
  bananaCount = 0

  constructor() {
    super({ key: "game" })
  }

  init(data: any) {
    this.bananaCount = 0

    if (data.stage)
      this.currentStage = data.stage
    else
      this.currentStage = 0
  }

  create() {
    this.bg = new Background(this, this.currentStage)
    this.character = new Character(this)
    this.stageMap = new StageMap(this, this.currentStage)
    this.score = new Score(this, this.currentStage, this.stageMap.maxBananaCount)

    this.physics.add.collider(this.character, this.stageMap.layer, (_, tile: any) => {
      if (tile.index === 0) {
        this.bananaCount++
        this.score.setBananaCount(this.bananaCount)
        this.stageMap.layer.removeTileAt(tile.x, tile.y)

        if (this.bananaCount === this.stageMap.maxBananaCount) {
          // To visible star.
          this.stageMap.layer.swapByIndex(6, 2).setCollision(2)
          this.score.eraseXMark()
        }
      } else if (tile.index === 2)
        this.nextStage()
    })

    this.cameras.main.startFollow(this.character)
  }

  private nextStage() {
    if (this.currentStage === 2)
      this.scene.start("title")
    else
      this.scene.restart({ stage: this.currentStage + 1 })
  }

  update() {
    this.character.update()
  }
}
