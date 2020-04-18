const createFontStyle = (color: string, strokeColor: string, size: number) => {
  return {
    color: color,
    stroke: strokeColor,
    fontFamily: "Fira code, Meiryo",
    fontSize: `${size}px`,
    fontStyle: "bold",
    strokeThickness: 6
  }
}

export {
  createFontStyle
}
