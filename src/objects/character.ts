import { HEIGHT } from "../constants"

interface Keys {
  up: Phaser.Input.Keyboard.Key
  right: Phaser.Input.Keyboard.Key
  left: Phaser.Input.Keyboard.Key
}

class Character extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body
  size = 32
  speed = 150
  maxSpeed = 200
  jumpSpeed = 210
  isJumping = false
  alive = true

  keys: Keys

  constructor(scene: Phaser.Scene) {
    super(scene, 45, 90, "character", 0)

    scene.physics.world.enable(this)
    scene.add.existing(this)

    this.setDisplaySize(this.size, this.size)
    this.body.maxVelocity.y = 800

    this.body.allowGravity = false

    this.keys = {
      up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
    }
  }

  update() {
    if (this.keys.left.isDown || this.keys.right.isDown) {
      this.move()
    }

    if (this.keys.up.isDown && !this.isJumping) {
      this.jump()
    }
  }

  isOffside(): boolean {
    return 0 > this.y || HEIGHT < this.y
  }

  move() {

  }

  jump() {
    this.body.setVelocityY(-240)
  }
}

export {
  Character
}
