import { useEffect, useState } from "react"
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
    const [title, setTitle] = useState(null)
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const [isSpeechBubbleVisible, setIsSpeechBubbleVisible] = useState(false)
      
useEffect(() => {
  if (document?.querySelector('h1')) {
    setTitle(document?.querySelector('h1').innerText)
  }
}, [])


  return (
    <div
      id="player-area"
      style={{
        display: 'flex',
        padding: 12,
        right,
        bottom: bottom
      }}
      >
        {isMenuVisible && <div>
          <button onClick={() => {
          setIsSpeechBubbleVisible(!isSpeechBubbleVisible)
          setIsMenuVisible(!isMenuVisible)
          }}>Speak</button></div>}
        {isSpeechBubbleVisible && <span>{`Ahhh, ${title}!`}</span>}
        <div   style={{
        display: 'flex',
        flexDirection: 'column'
        }}>
         <button onClick={() => {setBottom(bottom + 10)}}>Up</button>
         <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <button onClick={() => {setRight(right + 10)}}>Left</button>
          <span>Player</span>
        <button onClick={() => {
          setIsMenuVisible(!isMenuVisible)
          setIsSpeechBubbleVisible(false)
          }}>See menu</button>
        <button onClick={() => {setRight(right - 10)}}>Right</button>
        </div>
        <button onClick={() => {setBottom(bottom - 10)}}>Down</button>
        </div>
        
    </div>

  )
}

export default PlasmoOverlay