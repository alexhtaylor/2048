export default class Tile {
  #tileElement
  #x
  #y
  #value
  constructor(tileContainer, value = Math.random() > 0.5 ? 2 : 4) {// if random number generates is above 0.5 return 2 otherwise return 4
    this.#tileElement = document.createElement("div")
    this.#tileElement.classList.add("tile")
    tileContainer.append(this.#tileElement)
    this.value = value
  }

  get value() {
    return this.#value
  }

  set x(value) {
    this.#x = value
    this.#tileElement.style.setProperty("--x", value)
  }

  set value(v) {
    this.#value = v
    this.#tileElement.textContent = Math.round(v)
    const power = Math.log2(v)
    const backgroundLightness = 100 - power * 9
    this.#tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`)
    this.#tileElement.style.setProperty("--text-lightness", `${backgroundLightness < 50 ? 90 : 10}%`)
  }

  set y(value) {
    this.#y = value
    this.#tileElement.style.setProperty("--y", value)
  }

  remove() {
    this.#tileElement.remove()
  }

  waitForTransition(animation = false) {
    return new Promise(resolve => {
      this.#tileElement.addEventListener(
        animation ? "animationend" : "transitionend", resolve, { once: true, })
    })
  }
}
