import { useEffect, useRef, useState } from "react"
import cssText from "data-text:~/contents/player.css"
import type { PlasmoCSConfig } from "plasmo"
import { dialogue } from "~dialogue"
import { useMessage} from "@plasmohq/messaging/hook"
import type { RequestBody } from "~background/messages/start"
import { Sun } from "./sun"
import { Player } from "./player"
import { Modal } from "./modal"
import gray_sun from "data-base64:~assets/gray-sun.png"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PLAYER_WIDTH = 100
const PLAYER_HEIGHT = 200

const Overlay = () => {
   
    const [title, setTitle] = useState(null)
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
    const [stage, setStage] = useState(0)
    const [isRay1Visible, setIsRay1Visible] = useState(false)
    const [playerRight, setPlayerRight] = useState(1)
    const [playerBottom, setPlayerBottom] = useState(1)
    const [isPlayerFacingLeft, setIsPlayerFacingLeft] = useState(true)
    const [projBottom, setProjBottom] = useState(57)
    const [projRight, setProjRight] = useState(57)
    const [showPlayer, setShowPlayer] = useState(false)
    const [isVictory, setIsVictory] = useState(null)
    const [isSunrise, setIsSunrise] = useState(false)
    const [isOverlayPresent, setIsOverlayPresent] = useState(false)
    const [playerTabIndex, setPlayerTabIndex] = useState(null)
    const [text, setText] = useState("")
    const [isModalButtonVisible, setIsModalButtonVisible] = useState(true)

    const playerRightRef = useRef(playerRight);
    const playerBottomRef = useRef(playerBottom); 
    
    useEffect(() => {
      playerRightRef.current = playerRight;
      playerBottomRef.current = playerBottom;
    }, [playerRight, playerBottom]);

  function handleAction(direction) {
    switch(direction) {
      case "a":
        setPlayerRight(playerRight > 75 ? playerRight : playerRight + 1);
        setIsPlayerFacingLeft(true)
        break;
      case "d":
        setPlayerRight(playerRight < 1 ? playerRight : playerRight - 1); 
        setIsPlayerFacingLeft(false)
        break;
      case "w":
        setPlayerBottom(playerBottom > 75 ? playerBottom : playerBottom + 1);
        break;
      case "s":
        setPlayerBottom(playerBottom < 1 ? playerBottom : playerBottom - 1);
        break;
      case "j":
        handleSpeak()
      default:
      break; 
    }
  }


  useEffect(() => {
    if (stage === 1 && !isModalOpen) {
      setShowPlayer(true)
      setPlayerTabIndex(0)
    }
    if (stage === 2 && !isModalOpen) {
      setIsRay1Visible(true);
      let frameId;
  
      const initialPlayerRight = playerRight;
      const initialPlayerBottom = playerBottom;
  
      const deltaX = initialPlayerRight - projRight;
      const deltaY = initialPlayerBottom - projBottom;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const speed = 0.5;
  
      const stepX = (deltaX / distance) * speed;
      const stepY = (deltaY / distance) * speed;
  
      let currentProjRight = projRight;
      let currentProjBottom = projBottom;
  
      function moveProjectile() {
        currentProjRight += stepX;
        currentProjBottom += stepY;
  
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const playerWidthVW = (PLAYER_WIDTH / windowWidth) * 100;
        const playerHeightVH = (PLAYER_HEIGHT / windowHeight) * 100;
  
        const currentPlayerRight = playerRightRef.current;
        const currentPlayerBottom = playerBottomRef.current;
       
        const hasHitPlayer = (Math.abs(currentProjRight - currentPlayerRight) <= playerWidthVW) &&
                                  (Math.abs(currentProjBottom - currentPlayerBottom) <= playerHeightVH);
  
        const isOutOfBounds = (currentProjRight < 0 || currentProjRight > windowWidth || 
                               currentProjBottom < 0 || currentProjBottom > windowHeight);
  
        if (!hasHitPlayer && !isOutOfBounds) {
          setProjRight(currentProjRight); 
          setProjBottom(currentProjBottom);
          frameId = requestAnimationFrame(moveProjectile);
        } else {
          if (hasHitPlayer) {
            setIsVictory(false);
          } else {
            setIsVictory(true);
          }
          cancelAnimationFrame(frameId);
          setIsRay1Visible(false);
          setStage(3)
        }
      }
  
      frameId = requestAnimationFrame(moveProjectile);
  
      return () => {
        cancelAnimationFrame(frameId);
      };
    }
  }, [stage, isModalOpen]);

  useEffect(() => {
    if (isVictory) {
      setModalTitleContents("Victory")
      setModalPararaphContents("Well dodged.")
      setIsModalOpen(true)
      setIsModalButtonVisible(false)
    } else if (isVictory === false){
      setModalTitleContents("Defeat")
      setModalPararaphContents("You were burnt to a crisp.")
      setIsModalOpen(true)
      setIsModalButtonVisible(false)
    }
    
  }, [isVictory])
    
    const data = useMessage<RequestBody, string>(async (req, res) => {
      if (req.body.showPlayer === true) {
        setIsOverlayPresent(true)
        setStage(1)
        setModalTitleContents("Stage 1")
        setModalPararaphContents("Click or tab to focus your player. Move using WASD. Speak by clicking the relevant button or by pressing J.")
        setIsModalOpen(true)
      }
      })

    function executeSunrise() {
      setIsSunrise(true)
    }

    function executeSayWords() {
        if (title && typeof title === 'string') {
          setSpeechBubbleContents(title)
        }
      }
    
    function executeSayWords1() {
      let text = document?.querySelector("h1")?.innerText || document?.querySelector("h2")?.innerText
      setText(text)
      setSpeechBubbleContents(text)
    }

    function executeSayWords2() {
      const textLength = text?.split(" ")?.length
       if (!textLength || textLength < 1) {
          setSpeechBubbleContents("Nothing? Oh well.")
        } else if (textLength === 1) {
          setSpeechBubbleContents("It's terse at least.")
        } else {
          setSpeechBubbleContents("Verbose rubbish.")
        }
    }

    function executeEatWords() {
      let textToEat = document?.querySelector("h1") || document?.querySelector("h2")
      if (textToEat.innerText) {
        textToEat.innerText = ""
      }
    }

    function executeAdulterateWords() {
      if (text) {
        const textArray = text.split(" ")
        let adulteredArray = textArray.map((item) => {
          return Array.from(item).sort().join("")
        })
        let newTextString = adulteredArray.join(" ")
        document.querySelector('h1').innerText = newTextString
      }
    }

    function executeZenith() {
      setIsSunVisible(true)
    }

    function executeStage2() {
      setStage(2)
      setModalTitleContents("Stage 2")
      setModalPararaphContents("Use the direction buttons to dodge the rays of the sun.")
      setIsModalOpen(true)
    }

    function handleSpeak() {
      if (!isSpeechBubbleVisible) {
         proceedDialogue()
      }
      setIsSpeechBubbleVisible(!isSpeechBubbleVisible)      
    }

    function handleToggleModal() {
      setIsModalOpen(!isModalOpen)
    }

    useEffect(() => {
      if (document.title) {
        setTitle(document.title)
      }
    }, [document?.title])

    const functions = {
      "execute_sunrise": executeSunrise,
      "execute_say_words": executeSayWords,
      "execute_say_words_1": executeSayWords1,
      "execute_say_words_2": executeSayWords2,
      "execute_eat_words": executeEatWords,
      "execute_adulterate_words": executeAdulterateWords,
      "execute_zenith": executeZenith,
      "execute_stage_2": executeStage2
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
{isOverlayPresent &&
    <div id="custom-overlay" className={isModalOpen ? "highlight-modal" : isSunrise ? "sunrise-colors" : ""}>
  
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
    {isRay1Visible && 
    <div id="ray_1"   style={{
      right:`${projRight}vw`,
      bottom:`${projBottom}vh`,
      width: '50vw',
      position: 'absolute'
    }}>
      <img src={gray_sun} style={{maxWidth: '100%',
maxHeight: '100%'}} ></img>
    </div>
     }
    {isModalOpen && 
    <Modal
    modalTitleContents={modalTitleContents}
    modalParagraphContents={modalParagraphContents}
    handleToggleModal={handleToggleModal}
    isModalButtonVisible={isModalButtonVisible}
    />}
    {showPlayer &&
    <Player
    dialogueOptionIndex={dialogueOptionIndex} 
    isAnswerChoice={isAnswerChoice}
    isNextDisabled={isNextDisabled} 
    isPlayerFacingLeft={isPlayerFacingLeft}
    isSpeechBubbleVisible={isSpeechBubbleVisible}
    bottom={playerBottom}
    right={playerRight}
    speechBubbleContents={speechBubbleContents}
    sunSpeechBubbleContents={sunSpeechBubbleContents}
    handleBinaryChoice={handleBinaryChoice}
    handleSpeak={handleSpeak}
    handleAction={handleAction}
    proceedDialogue={proceedDialogue}
    tabIndex={playerTabIndex}
    width={PLAYER_WIDTH}
    height={PLAYER_HEIGHT}
    />
  }
    </div>
  }
    </>

  )
}

export default Overlay