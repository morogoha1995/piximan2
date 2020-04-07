import { HEIGHT } from "../constants"

class Character extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body
  size = 32

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 90, "character")

    scene.physics.world.enable(this)
    scene.add.existing(this)

    this.setDisplaySize(this.size, this.size)
    this.body.maxVelocity.y = 800

    this.body.allowGravity = false
  }

  isOffside(): boolean {
    return 0 > this.y || HEIGHT < this.y
  }

  jump() {
    this.body.setVelocityY(-240)
  }
}

export {
  Character
}
