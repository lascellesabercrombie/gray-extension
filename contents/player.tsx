import { useEffect, useState } from "react"
import cssText from "data-text:~/contents/player.css"
import './player.css'
import type { PlasmoCSConfig } from "plasmo"
import { dialogue } from "~dialogue"
import playerAvatar from "data-base64:~assets/janine_1982_vitruvian.png"

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
    const [speechBubbleContents, setSpeechBubbleContents] = useState("")
    const [dialogueOptionIndex, setDialogueOptionIndex] = useState(0)
    const [isNextDisabled, setIsNextDisabled] = useState(false)
      
    function executeSunrise() {
      document.body.style.background =  "linear-gradient(to top, #FF512F, #F09819, #FFFFFF)"
    }

useEffect(() => {
  if (document?.querySelector('h1')) {
    setTitle(document?.querySelector('h1').innerText)
  }
}, [])

const functions = {
  "execute_sunrise": executeSunrise,

}

function proceedDialogue() {
  if (dialogueOptionIndex >= dialogue.length) {
    return
  }
  let currentStep = dialogue[dialogueOptionIndex];
    if (currentStep.message) {
      setSpeechBubbleContents(currentStep.message);
    }
    if (currentStep.action) {
      setIsNextDisabled(true)
       currentStep.action.forEach(async (item) => {
        if (!item.delay) {
          functions[item.function]()
          setIsNextDisabled(false)
        } else {
          await new Promise<void>((resolve) => setTimeout(() => {functions[item.function](); resolve()}, item.delay))
          setIsNextDisabled(false)
        }
      })
     
    }
    if (currentStep.next) {
      setDialogueOptionIndex(dialogue.findIndex((element) => element.label === currentStep.next))
    } else {
      setDialogueOptionIndex(dialogueOptionIndex + 1)
    }
    
  }

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
               if (!isSpeechBubbleVisible) {
                proceedDialogue()
              }
          setIsMenuVisible(!isMenuVisible)
          setIsSpeechBubbleVisible(!isSpeechBubbleVisible)      
          }}>Speak</button></div>}
        {isSpeechBubbleVisible && 
        <div>
          <span>{speechBubbleContents}</span>
          <button disabled={isNextDisabled} onClick={() => proceedDialogue()}>Next</button>
          </div>
          }
        <div   style={{
        display: 'flex',
        flexDirection: 'column'
        }}>
         <button onClick={() => {setBottom(bottom + 10)}}>Up</button>
         <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <button onClick={() => {setRight(right + 10)}}>Left</button>
          <img src={playerAvatar} alt="Vitruvian Man from cover of 1982, Janine"></img>
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