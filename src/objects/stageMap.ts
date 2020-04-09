import { TILE_SIZE } from "../constants"

class StageMap extends Phaser.Physics.Arcade.Group {
  private mapInfos = [
    [
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
      [1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
    ],
  ]
  private map!: Phaser.Tilemaps.Tilemap
  private tiles!: Phaser.Tilemaps.Tileset
  layer!: Phaser.Tilemaps.StaticTilemapLayer

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene)

    this.map = scene.make.tilemap({ data: this.mapInfos[0], tileWidth: TILE_SIZE, tileHeight: TILE_SIZE })
    this.tiles = this.map.addTilesetImage("tileMaps")
    this.layer = this.map.createStaticLayer(0, this.tiles, 0, 0).setCollision([1])
  }
}

export {
  StageMap
}
