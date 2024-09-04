import { useState } from "react"
import cssText from "data-text:~/contents/player.css"
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}



const PlasmoOverlay = () => {
    const [right, setRight] = useState(10)
    const [bottom, setBottom] = useState(10)
      
  return (
    <div
      id="player"
      style={{
        padding: 12,
        right,
        bottom: bottom
      }}
      >
        <button onClick={(e) => {setRight(right + 10)}}>Left</button>
        <button onClick={(e) => {setRight(right - 10)}}>Right</button>
        <button onClick={(e) => {setBottom(bottom + 10)}}>Up</button>
        <button onClick={(e) => {setBottom(bottom - 10)}}>Down</button>
    </div>
  )
}

export default PlasmoOverlay