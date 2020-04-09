import { HEIGHT, WIDTH } from "../constants"

interface Keys {
  up: Phaser.Input.Keyboard.Key
  right: Phaser.Input.Keyboard.Key
  left: Phaser.Input.Keyboard.Key
}

class Character extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body
  size = 32
  speed = 800
  jumpPower = 400
  isJumping = false
  isAlive = true

  keys: Keys

  constructor(scene: Phaser.Scene) {
    super(scene, 45, 90, "character", 0)

    scene.physics.world.enable(this)
    scene.add.existing(this)

    this.setDisplaySize(this.size, this.size)
    this.body.setMaxVelocity(200, 800)

    this.keys = {
      up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
    }
  }

  update() {
    this.move()
    this.animate()
  }



  isOffside(): boolean {
    return HEIGHT < this.y
  }

  private animate() {
    if (this.isJumping) {
      if (this.body.velocity.x > 0) {
        this.setFrame(1)
      } else if (this.body.velocity.x < 0) {
        this.setFrame(0)
      }
    } else {
      if (this.body.velocity.x > 0) {
        this.setFrame(3)
      } else if (this.body.velocity.x < 0) {
        this.setFrame(2)
      }
    }

    if (this.body.velocity.x < 0) {
      if (this.isJumping) {
        this.setFrame(0)
      } else {
        this.setFrame(2)
      }
    }
  }

  private move() {
    // 落ちたら位置が初期化されるように。開発中のみ。
    if (this.y > HEIGHT) {
      this.setPosition(20, 0)
    }

    this.isJumping = !this.body.onFloor() && !this.body.touching.down && !this.body.blocked.down

    if (this.keys.left.isDown) {
      this.body.setAccelerationX(-this.speed)
    } else if (this.keys.right.isDown) {
      this.body.setAccelerationX(this.speed)
    } else {
      this.body.setVelocityX(0)
      this.body.setAccelerationX(0)
    }

    if (this.keys.up.isDown && !this.isJumping) {
      this.jump()
    }
  }

  jump() {
    this.body.setVelocityY(-this.jumpPower)
    this.isJumping = true
  }
}

export {
  Character
}
