class StageMap {
  private mapInfos = [
    [
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 1, 1, 1, 1,],
    ],
  ]
  map!: Phaser.Tilemaps.Tilemap
  private tiles!: Phaser.Tilemaps.Tileset
  layer!: Phaser.Tilemaps.DynamicTilemapLayer

  constructor(scene: Phaser.Scene) {
    this.setMap(scene, 0)
  }

  setMap(scene: Phaser.Scene, stage: number) {
    this.map = scene.make.tilemap({ data: this.mapInfos[stage], tileWidth: 32, tileHeight: 32 })
    this.tiles = this.map.addTilesetImage("tileMaps")
    this.layer = this.map.createDynamicLayer(0, this.tiles, 0, 0)
    this.layer.setCollision([1, 0])

    scene.physics.world.bounds.width = this.layer.width
    scene.physics.world.bounds.height = this.layer.height
  }
}

export {
  StageMap
}
