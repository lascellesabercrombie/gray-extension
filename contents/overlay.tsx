import { useEffect, useState } from "react"
import cssText from "data-text:~/contents/player.css"
import type { PlasmoCSConfig } from "plasmo"
import { dialogue } from "~dialogue"
import { useMessage} from "@plasmohq/messaging/hook"
import type { RequestBody } from "~background/messages/start"
import { Sun } from "./sun"
import { Player } from "./player"
import { Modal } from "./modal"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}



const Overlay = () => {
   
    const [title, setTitle] = useState(null)
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const [isSpeechBubbleVisible, setIsSpeechBubbleVisible] = useState(false)
    const [speechBubbleContents, setSpeechBubbleContents] = useState("")
    const [dialogueOptionIndex, setDialogueOptionIndex] = useState(0)
    const [isNextDisabled, setIsNextDisabled] = useState(false)
    const [isAnswerChoice, setIsAnswerChoice] = useState(false)
    const [isSunVisible, setIsSunVisible] = useState(false)
    const [isSunSpeechBubbleVisible, setIsSunSpeechBubbleVisible] = useState(false)
    const [sunSpeechBubbleContents, setSunSpeechBubbleContents] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTitleContents, setModalTitleContents] = useState("")
    const [modalParagraphContents, setModalPararaphContents] = useState("")

    const [showPlayer, setShowPlayer] = useState(false)
    const data = useMessage<RequestBody, string>(async (req, res) => {
      if (req.body.showPlayer === true) {
        setShowPlayer(true)
      }
      })
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

    function handleSpeak() {
        if (!isSpeechBubbleVisible) {
         proceedDialogue()
       }
   setIsMenuVisible(!isMenuVisible)
   setIsSpeechBubbleVisible(!isSpeechBubbleVisible)      
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

function handleShowMenu() {
    setIsMenuVisible(!isMenuVisible)
    setIsSpeechBubbleVisible(false)
}

async function proceedDialogue(index?: number) {
  if (dialogueOptionIndex >= dialogue.length) {
    return
  }
  let currentStep = dialogue[index || dialogueOptionIndex];
    if (currentStep.message && !currentStep.speaker) {
      if (isSunSpeechBubbleVisible) {
        setSunSpeechBubbleContents("...")
      }
      setSpeechBubbleContents(currentStep.message);
    }
    if (currentStep.message && currentStep.speaker === 'sun') {
      setSpeechBubbleContents("...")
      setIsSunSpeechBubbleVisible(true);
      setSunSpeechBubbleContents(currentStep.message)
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
    <>
    {showPlayer &&
    <div id="custom-overlay">
  
    {isSunVisible && 
    <Sun
    dialogueOptionIndex={dialogueOptionIndex} 
    isAnswerChoice={isAnswerChoice}
    isNextDisabled={isNextDisabled}
    isSunSpeechBubbleVisible={isSunSpeechBubbleVisible}
    sunSpeechBubbleContents={sunSpeechBubbleContents}
    proceedDialogue={proceedDialogue}
    />
    }
    {isModalOpen && <Modal
    modalTitleContents={modalTitleContents}
    modalParagraphContents={modalParagraphContents}/>}
    <Player
    dialogueOptionIndex={dialogueOptionIndex} 
    isAnswerChoice={isAnswerChoice}
    isMenuVisible={isMenuVisible}
    isNextDisabled={isNextDisabled} 
    isSpeechBubbleVisible={isSpeechBubbleVisible}
    speechBubbleContents={speechBubbleContents}
    sunSpeechBubbleContents={sunSpeechBubbleContents}
    handleBinaryChoice={handleBinaryChoice}
    handleShowMenu={handleShowMenu} 
    handleSpeak={handleSpeak}
    proceedDialogue={proceedDialogue}
    />
    </div>
}
    </>

  )
}

export default Overlay