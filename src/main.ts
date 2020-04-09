import Phaser from "phaser"
import Game from "./scenes/game"
import { WIDTH, HEIGHT } from "./constants"
import { Title } from "./scenes/title"

window.onload = () => {
  const main = new Phaser.Game({
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    parent: 'app',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 600
        },
        debug: false
      }
    },
    scene: [
      Title,
      Game,
    ]
  })
}
