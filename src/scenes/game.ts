import { Character } from "../objects/character"
import { StageMap } from "../objects/stageMap"
import { Background } from "../objects/background"
import { Score } from "../objects/score"
import { Enemy } from "../objects/enemy"
import { TouchPanel } from "../objects/touchPanel"
import enemyInfo from "../assets/enemy.json"

export default class Game extends Phaser.Scene {
  private character!: Character
  private enemies!: Phaser.GameObjects.Group
  private stageMap!: StageMap
  private score!: Score

  private currentStage = 0
  private life = 0
  private bananaCount = 0
  private inStageTransition = false
  private elapsedTime = 0

  constructor() {
    super({ key: "game" })
  }

  init(data: any) {
    this.inStageTransition = false
    this.bananaCount = 0

    this.currentStage = data.stage || 0
    this.life = data.life || 5
    this.elapsedTime = data.elapsedTime || 0

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => { this.elapsedTime++ }
    })
  }

  create() {
    new Background(this, this.currentStage)
    this.character = new Character(this, this.life)
    this.enemies = this.add.group({ runChildUpdate: true })
    this.stageMap = new StageMap(this, this.currentStage)
    this.score = new Score(this, this.currentStage, this.stageMap.maxStage, this.stageMap.maxBananaCount, this.character.maxLife, this.character.life)
    const touchPanel = new TouchPanel(this)

    touchPanel.left.on("pointerdown", () => {
      this.downKey("left")
    })
    touchPanel.right.on("pointerdown", () => {
      this.downKey("right")
    })
    touchPanel.up.on("pointerdown", () => {
      this.downKey("up")
    })
    touchPanel.left.on("pointerup", () => {
      this.upKey("left")
    })
    touchPanel.right.on("pointerup", () => {
      this.upKey("right")
    })
    touchPanel.up.on("pointerup", () => {
      this.upKey("up")
    })
    touchPanel.left.on("pointerout", () => {
      this.upKey("left")
    })
    touchPanel.right.on("pointerout", () => {
      this.upKey("right")
    })
    touchPanel.up.on("pointerout", () => {
      this.upKey("up")
    })

    this.input.keyboard.on("keydown", (e: any) => {
      e.preventDefault()

      if (e.key === "ArrowLeft")
        this.downKey("left")

      if (e.key === "ArrowRight")
        this.downKey("right")

      if (e.key === "ArrowUp")
        this.downKey("up")
    })
    this.input.keyboard.on("keyup", (e: any) => {
      e.preventDefault()

      if (e.key === "ArrowLeft")
        this.upKey("left")

      if (e.key === "ArrowRight")
        this.upKey("right")

      if (e.key === "ArrowUp")
        this.upKey("up")
    })

    this.makeEnemies()

    this.physics.add.collider(this.character, this.stageMap.layer, this.collideTile, undefined, this)
    this.physics.add.collider(this.enemies, this.stageMap.layer)
    this.physics.add.collider(this.character, this.enemies, this.collideEnemy, undefined, this)

    this.cameras.main.startFollow(this.character, true)
  }

  private makeEnemies() {
    const enemies = enemyInfo[this.currentStage]
    enemies.forEach((enemy: any) => {
      this.enemies.add(new Enemy(this, enemy.x, enemy.y, enemy.key))
    })
  }

  private downKey(key: string) {
    this.character.downKey(key)
  }

  private upKey(key: string) {
    this.character.upKey(key)
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
      if (this.bananaCount === this.stageMap.maxBananaCount) {
        // To visible star.
        this.stageMap.layer.swapByIndex(6, 2).setCollision(2)
      }

      this.stageMap.layer.removeTileAt(tile.x, tile.y)
    } else if (tile.index === 2)
      this.getStar()
  }

  private getStar() {
    this.inStageTransition = true
    const curtain = this.add.image(0, 0, "stageClear").setAlpha(0).setScrollFactor(0).setOrigin(0)
    this.physics.pause()
    this.sound.play("getStar")
    this.add.tween({
      targets: curtain,
      alpha: 1,
      duration: 600,
      yoyo: true,
      onComplete: () => this.nextStage()
    })
  }

  private nextStage() {
    if (this.currentStage === 2)
      this.scene.start("clear", {
        life: this.character.life,
        elapsedTime: this.elapsedTime
      })
    else
      this.scene.restart({
        stage: this.currentStage + 1,
        life: this.character.life,
        elapsedTime: this.elapsedTime
      })
  }

  update() {
    if (this.inStageTransition || this.character.isDead())
      return

    this.character.update()
  }
}
