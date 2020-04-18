class Character extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body
  private size = 26
  private speed = 180
  private jumpPower = 300
  private isJumping = false
  private currentFrame = 0
  maxLife = 5
  life: number

  private keys: any = {
    left: false,
    right: false,
    up: false
  }

  constructor(scene: Phaser.Scene, life: number) {
    super(scene, 45, 90, "character", 0)

    this.life = life

    scene.physics.world.enable(this)
    scene.add.existing(this)
    this.body.setCollideWorldBounds(true)
    this.setDisplaySize(this.size, this.size)
    this.body.maxVelocity.y = 800
  }

  update() {
    if (this.isDead())
      return

    this.move()
    this.animate()
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

  private move() {
    this.isJumping = !this.body.onFloor() && !this.body.touching.down && !this.body.blocked.down

    if (this.keys.left)
      this.body.setVelocityX(-this.speed)
    else if (this.keys.right)
      this.body.setVelocityX(+this.speed)
    else
      this.body.setVelocityX(0)

    if (this.keys.up && !this.isJumping)
      this.jump()
  }

  downKey(key: string) {
    this.keys[key] = true
  }

  upKey(key: string) {
    this.keys[key] = false
  }

  isDead() {
    return this.life === 0
  }

  bounce() {
    this.scene.sound.play("bounce")
    this.scene.add.tween({
      targets: this,
      y: this.y - 10,
      duration: 100
    })
  }

  jump() {
    this.scene.sound.play("jump")
    this.body.setVelocityY(-this.jumpPower)
    this.isJumping = true
  }

  damaged() {
    this.life--

    if (this.isDead())
      this.die()
    else
      this.hurt()
  }

  private hurt() {
    this.scene.sound.play("hurt")

    this.body.checkCollision.none = true

    this.scene.add.tween({
      targets: this,
      alpha: 0,
      duration: 100,
      repeat: 3,
      yoyo: true,
      onComplete: () => this.body.checkCollision.none = false
    })
  }

  private die() {
    this.scene.sound.play("die")

    this.scene.physics.pause()

    this.scene.add.tween({
      targets: this,
      alpha: 0,
      duration: 1000,
      yoyo: false,
      onComplete: () => this.scene.scene.start("gameover")
    })
  }
}

export {
  Character
}
