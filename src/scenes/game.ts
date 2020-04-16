import { Character } from "../objects/character"
import { StageMap } from "../objects/stageMap"
import { Background } from "../objects/background"
import { Score } from "../objects/score"
import { Enemy } from "../objects/enemy"
import enemyInfo from "../assets/enemy.json"
import { HEIGHT, WIDTH } from "../constants"

export default class Game extends Phaser.Scene {
  character!: Character
  enemies!: Phaser.GameObjects.Group
  stageMap!: StageMap
  bg!: Background
  score!: Score

  currentStage = 0
  life = 0
  bananaCount = 0
  inTransition = false

  constructor() {
    super({ key: "game" })
  }

  init(data: any) {
    this.bananaCount = 0

    if (data.stage)
      this.currentStage = data.stage
    else
      this.currentStage = 0

    if (data.life)
      this.life = data.life
    else
      this.life = 3
  }

  create() {
    this.bg = new Background(this, this.currentStage)
    this.character = new Character(this, this.life)
    this.enemies = this.add.group({ runChildUpdate: true })
    this.stageMap = new StageMap(this, this.currentStage)
    console.log(this.character.life)
    this.score = new Score(this, this.currentStage, this.stageMap.maxStage, this.stageMap.maxBananaCount, this.character.maxLife, this.character.life)

    this.makeEnemies()

    this.physics.add.collider(this.character, this.stageMap.layer, this.collideTile, undefined, this)
    this.physics.add.collider(this.enemies, this.stageMap.layer)
    this.physics.add.collider(this.character, this.enemies, this.collideEnemy, undefined, this)

    this.cameras.main.startFollow(this.character)
  }

  private makeEnemies() {
    const enemies = enemyInfo[this.currentStage]
    enemies.forEach((enemy: any) => {
      this.enemies.add(new Enemy(this, enemy.x, enemy.y, enemy.key))
    })
  }

  private collideEnemy(character: any, enemy: any) {
    if (character.body.touching.down && enemy.body.touching.up) {
      character.bounce()
      enemy.die()
    } else {
      character.damaged()
      this.score.setLife(this.character.life)
    }
  }

  private collideTile(_: any, tile: any) {
    if (tile.index === 0) {
      this.sound.play("getBanana")
      this.bananaCount++
      this.score.setBananaCount(this.bananaCount)
      this.stageMap.layer.removeTileAt(tile.x, tile.y)

      if (this.bananaCount === this.stageMap.maxBananaCount) {
        // To visible star.
        this.stageMap.layer.swapByIndex(6, 2).setCollision(2)
      }
    } else if (tile.index === 2)
      this.getStar()
  }

  private getStar() {
    this.inTransition = true
    this.physics.pause()
    this.sound.play("getStar")
    this.tweens.add({
      targets: this.character,
      scale: 5,
      y: HEIGHT / 2,
      duration: 1000,
      yoyo: false,
      onComplete: () => this.nextStage()
    })
  }

  private nextStage() {
    this.inTransition = false

    if (this.currentStage === 2)
      this.scene.start("title")
    else
      this.scene.restart({
        stage: this.currentStage + 1,
        life: this.character.life
      })
  }

  update() {
    if (this.inTransition || this.character.isDead())
      return

    this.character.update()
  }
}
