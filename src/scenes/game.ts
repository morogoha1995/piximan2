import { Character } from "../objects/character"
import { StageMap } from "../objects/stageMap"
import { Background } from "../objects/background"

export default class Game extends Phaser.Scene {
  character!: Character
  stageMap!: StageMap
  bg!: Background

  currentStage = 0

  constructor() {
    super({ key: "game" })
  }

  create() {
    this.bg = new Background(this)
    this.character = new Character(this)
    this.stageMap = new StageMap(this)

    this.physics.add.collider(this.character, this.stageMap.layer, (character: any, tile: any) => {
      if (tile.index === 0) {
        console.log("banana")
        this.stageMap.layer.removeTileAt(tile.x, tile.y)
      }
    })

    this.bg.switchImg(0)

    this.setCameras()
  }

  private setCameras() {
    this.cameras.main.startFollow(this.character)
    this.cameras.main.setBounds(0, 0, this.stageMap.map.widthInPixels, this.stageMap.map.heightInPixels)
  }

  update() {
    this.character.update()
  }
}
