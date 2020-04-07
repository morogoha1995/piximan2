class Title extends Phaser.Scene {
  constructor() {
    super({ key: "title" })
  }

  preload() {
    this.load.spritesheet("character", "imgs/character.png")
  }
}

export {
  Title
}
