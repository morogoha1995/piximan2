interface Keys {
  up: Phaser.Input.Keyboard.Key
  right: Phaser.Input.Keyboard.Key
  left: Phaser.Input.Keyboard.Key
}

class Character extends Phaser.Physics.Arcade.Sprite {
  body!: Phaser.Physics.Arcade.Body
  size = 26
  speed = 200
  jumpPower = 320
  isJumping = false
  isAlive = true
  currentFrame = 0

  keys: Keys

  constructor(scene: Phaser.Scene) {
    super(scene, 45, 90, "character", 0)

    scene.physics.world.enable(this)
    scene.add.existing(this)
    this.setCollideWorldBounds(true)
    this.setDisplaySize(this.size, this.size)
    this.body.maxVelocity.y = 800

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
    return this.y + this.size >= this.scene.physics.world.bounds.height
  }

  private animate() {
    if (this.isJumping) {
      if (this.body.velocity.x > 0 || this.currentFrame === 3) {
        this.currentFrame = 1
      } else if (this.body.velocity.x < 0 || this.currentFrame === 2) {
        this.currentFrame = 0
      }
    } else {
      if (this.body.velocity.x > 0 || this.currentFrame === 1) {
        this.currentFrame = 3
      } else if (this.body.velocity.x < 0 || this.currentFrame === 0) {
        this.currentFrame = 2
      }
    }

    this.setFrame(this.currentFrame)
  }

  initPosition() {
    this.setPosition(20, 0)
  }

  private move() {
    // 落ちたら位置が初期化されるように。開発中のみ。
    if (this.isOffside()) {
      this.initPosition()
    }

    this.isJumping = !this.body.onFloor() && !this.body.touching.down && !this.body.blocked.down

    if (this.keys.left.isDown) {
      this.body.setVelocityX(-this.speed)
    } else if (this.keys.right.isDown) {
      this.body.setVelocityX(+this.speed)
    } else {
      this.body.setVelocityX(0)
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
