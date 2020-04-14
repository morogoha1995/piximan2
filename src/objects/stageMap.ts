class StageMap {
  private mapInfos = [
    [
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 4, 4,],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 1, 1, 1, 1,],
    ],
    [
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 1, 1, 1, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 4,],
      [1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 1, 1, 1, 1,],
    ],
    [
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 1, 1, 1, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 0, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 1, 1, 1, 1, 1, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 4,],
      [1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1,],
    ]
  ]
  layer!: Phaser.Tilemaps.DynamicTilemapLayer

  constructor(scene: Phaser.Scene, stage: number) {
    const map = scene.make.tilemap({ data: this.mapInfos[stage], tileWidth: 32, tileHeight: 32 })
    const tiles = map.addTilesetImage("tileMaps")
    this.layer = map.createDynamicLayer(0, tiles, 0, 0)
    this.layer.setCollision([0, 1, 2])

    scene.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

    scene.physics.world.bounds.width = this.layer.width
    scene.physics.world.bounds.height = this.layer.height
  }
}

export {
  StageMap
}
