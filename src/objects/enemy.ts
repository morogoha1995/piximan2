class Enemy extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body
  private speed = 60
  private isDying = false

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)

    if (texture === "uncle")
      this.speed = this.speed * 2

    scene.physics.world.enable(this)
    scene.add.existing(this)
    this.body.setCollideWorldBounds(true)
  }

  update() {
    if (this.body.bottom >= this.scene.physics.world.bounds.height)
      this.die()

    if (!this.isDying)
      this.move()
  }

  private move() {
    if (this.body.blocked.left || this.body.blocked.right)
      this.speed = -this.speed

    this.body.setVelocityX(this.speed)
  }

  die() {
    this.body.setVelocity(0, 0)
    this.body.checkCollision.none = true
    this.isDying = true

    this.scene.add.tween({
      targets: this,
      alpha: 0,
      duration: 600,
      yoyo: false,
      onComplete: () => this.dead()
    })
  }

  private dead() {
    this.destroy()
  }
}

export {
  Enemy
}
