import { Base } from "./base"
import { WIDTH } from "../constants"
import { createFontStyle } from "../utils/text"

class Clear extends Base {
  elapsedTime = 0
  isPerfect = false

  constructor() {
    super("clear", "もう一回")
  }

  init(data: any) {
    this.elapsedTime = data.elapsedTime

    if (data.life === 3)
      this.isPerfect = true
  }

  create() {
    this.makeBtns()

    this.add.text(
      WIDTH / 2,
      75,
      `クリアタイム：${this.elapsedTime}秒`,
      createFontStyle("orange", "white", 16)
    ).setOrigin(0.5)


    let perfectText = ""
    if (this.isPerfect) {
      this.add.text(
        WIDTH / 2,
        240,
        "PERFECT!!!",
        createFontStyle("magenta", "lime", 30)
      ).setOrigin(0.5)

      perfectText = "且つノーダメージ"
    }


    const url = "https://meisoudev.com/games/piximan2/"
    const tweetURL = `https://twitter.com/intent/tweet?text=ピクシーマン2を${this.elapsedTime}秒${perfectText}でクリアしました。&url=${url}&hashtags=ピクシーマン2`

    this.add.text(
      WIDTH / 2,
      280,
      "ツイートする",
      createFontStyle("white", "skyblue", 20)
    )
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        window.open(tweetURL, "blank")
      })
  }
}

export {
  Clear
}
