import Phaser from "phaser"
import Game from "./scenes/game"
import { WIDTH, HEIGHT } from "./constants"
import { Title } from "./scenes/title"
import { End } from "./scenes/end"

window.onload = () => {
  const main = new Phaser.Game({
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    //zoom: 2,
    parent: 'app',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 600 },
        debug: false
      }
    },
    scene: [
      Title,
      Game,
      End,
    ]
  })
}
