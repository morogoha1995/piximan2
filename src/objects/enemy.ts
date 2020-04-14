// TODO
class Enemy extends Phaser.GameObjects.Sprite {

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)

    scene.physics.world.enable(this)
    scene.add.existing(this)
  }

  die() { }
}
