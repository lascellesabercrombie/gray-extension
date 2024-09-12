import { useEffect, useState } from "react"
import cssText from "data-text:~/contents/player.css"
import './player.css'
import type { PlasmoCSConfig } from "plasmo"
import { dialogue } from "~dialogue"
import playerAvatar from "data-base64:~assets/janine_1982_vitruvian.png"
import sun from "data-base64:~assets/gray-sun.png"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}



const Player = () => {
    const [right, setRight] = useState(10)
    const [bottom, setBottom] = useState(10)
    const [title, setTitle] = useState(null)
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const [isSpeechBubbleVisible, setIsSpeechBubbleVisible] = useState(false)
    const [speechBubbleContents, setSpeechBubbleContents] = useState("")
    const [dialogueOptionIndex, setDialogueOptionIndex] = useState(0)
    const [isNextDisabled, setIsNextDisabled] = useState(false)
    const [isPlayerFacingLeft, setIsPlayerFacingLeft] = useState(true)
    const [isAnswerChoice, setIsAnswerChoice] = useState(false)
    const [isSunVisible, setIsSunVisible] = useState(false)
      
    function executeSunrise() {
      document.body.style.background =  "linear-gradient(to top, #FF512F, #F09819, #FFFFFF)"
    }

    function executeSayWords() {
      setSpeechBubbleContents(title)
    }

    function executeSayWords2() {
      const titleLength = title?.split(" ")?.length
       if (!titleLength || titleLength < 1) {
          setSpeechBubbleContents("Nothing? Oh well.")
        } else if (titleLength === 1) {
          setSpeechBubbleContents("It's terse at least.")
        } else {
          setSpeechBubbleContents("Verbose rubbish.")
        }
    }

    function executeEatWords() {
      if (document?.querySelector('h1')) {
        document.querySelector('h1').innerText = ""
      }
    }

    function executeAdulterateWords() {
      const titleArray = title.split(" ")
      let adulteredArray = titleArray.map((item) => {
        return Array.from(item).sort().join("")
      })
      let newTitleString = adulteredArray.join(" ")
      document.querySelector('h1').innerText = newTitleString
    }

    function executeZenith() {
      setIsSunVisible(true)
    }

useEffect(() => {
  if (document?.querySelector('h1')) {
    setTitle(document?.querySelector('h1').innerText)
  }
}, [document?.querySelector('h1')])

const functions = {
  "execute_sunrise": executeSunrise,
  "execute_say_words": executeSayWords,
  "execute_say_words_2": executeSayWords2,
  "execute_eat_words": executeEatWords,
  "execute_adulterate_words": executeAdulterateWords,
  "execute_zenith": executeZenith
}


function handleBinaryChoice(choice: 0 | 1) {
  let currentStep = dialogue[dialogueOptionIndex];
  setIsAnswerChoice(false)
  proceedDialogue(dialogue.findIndex((element) => element.label === currentStep.answers[choice].next))
}

async function proceedDialogue(index?: number) {
  if (dialogueOptionIndex >= dialogue.length) {
    return
  }
  let currentStep = dialogue[index || dialogueOptionIndex];
    if (currentStep.message) {
      setSpeechBubbleContents(currentStep.message);
    }
    if (currentStep.action) {
      setIsNextDisabled(true)
        if (!currentStep.action.delay) {
          functions[currentStep.action.function]()
          setIsNextDisabled(false)
        } else {
          await new Promise<void>((resolve) => setTimeout(() => {functions[currentStep.action.function](); resolve()}, currentStep.action.delay))
          setIsNextDisabled(false)
        }
      }
     
    if (currentStep.answers) {
      return setIsAnswerChoice(true)
    } else {
      setIsAnswerChoice(false)
    }
    if (currentStep.next) {
      setDialogueOptionIndex(dialogue.findIndex((element) => element.label === currentStep.next))
    } else {
      setDialogueOptionIndex(index ? index + 1 : dialogueOptionIndex + 1)
    }
    
  }

  return (
    <div>
      {isSunVisible && <img src={sun} 
      alt="a sun with a face, leering and suspect; section of an image from a draft manuscript of Gray's novel Lanark"
      style={{
        position: 'absolute',
        padding: 12,
      }}
      ></img>}
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
          {isAnswerChoice ? 
          <div>
            <button onClick={() => handleBinaryChoice(1)}>Yes</button>
            <button onClick={() => handleBinaryChoice(0)}>No</button>
          </div> :
          <button disabled={isNextDisabled} onClick={() => proceedDialogue()}>Next</button>}
          </div>
          }
        <div   style={{
        display: 'flex',
        flexDirection: 'column'
        }}>
         <button onClick={() => {setBottom(bottom + 10)}}>Up</button>
         <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <button onClick={() => {setRight(right + 10); setIsPlayerFacingLeft(true)}}>Left</button>
          <img src={playerAvatar} alt="Vitruvian Man from cover of 1982, Janine"
          style={{transform: !isPlayerFacingLeft ? 'rotateY(180deg)' : ''}}></img>
        <button onClick={() => {
          setIsMenuVisible(!isMenuVisible)
          setIsSpeechBubbleVisible(false)
          }}>See menu</button>
        <button onClick={() => {setRight(right - 10); setIsPlayerFacingLeft(false)}}>Right</button>
        </div>
        <button onClick={() => {setBottom(bottom - 10)}}>Down</button>
        </div>
        
    </div>
    </div>
  )
}

export default Player