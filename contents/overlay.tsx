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

const PLAYER_WIDTH = 5
const PLAYER_HEIGHT = 5

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
    const [stage, setStage] = useState(0)
    const [isRay1Visible, setIsRay1Visible] = useState(false)
    const [playerRight, setPlayerRight] = useState(1)
    const [playerBottom, setPlayerBottom] = useState(1)
    const [isPlayerFacingLeft, setIsPlayerFacingLeft] = useState(true)
    const [projBottom, setProjBottom] = useState(57)
    const [projRight, setProjRight] = useState(57)
    const [showPlayer, setShowPlayer] = useState(false)
    const [isVictory, setIsVictory] = useState(null)

    const playerRightRef = useRef(playerRight);
    const playerBottomRef = useRef(playerBottom); 
    
    useEffect(() => {
      playerRightRef.current = playerRight;
      playerBottomRef.current = playerBottom;
    }, [playerRight, playerBottom]);

  function handleMove(direction) {
    switch(direction) {
      case "left":
        setPlayerRight(playerRight > 75 ? playerRight : playerRight + 1);
        setIsPlayerFacingLeft(true)
        break;
      case "right": 
        setPlayerRight(playerRight < 1 ? playerRight : playerRight - 1); 
        setIsPlayerFacingLeft(false)
        break;
      case "up":
        setPlayerBottom(playerBottom > 75 ? playerBottom : playerBottom + 1);
        break;
      case "down":
        setPlayerBottom(playerBottom < 1 ? playerBottom : playerBottom - 1);
        break;
      default:
      break; 
    }
  }


  useEffect(() => {
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
  
        const currentPlayerRight = playerRightRef.current;
        const currentPlayerBottom = playerBottomRef.current;
  
        const hasHitPlayer = (Math.abs(currentProjRight - currentPlayerRight) <= PLAYER_WIDTH &&
                                  Math.abs(currentProjBottom - currentPlayerBottom) <= PLAYER_HEIGHT);
  
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
    } else if (isVictory === false){
      setModalTitleContents("Defeat")
      setModalPararaphContents("You were burnt to a crisp.")
      setIsModalOpen(true)
    }
    
  }, [isVictory])
    
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
      setIsMenuVisible(!isMenuVisible)
      setIsSpeechBubbleVisible(!isSpeechBubbleVisible)      
    }

    function handleToggleModal() {
      setIsModalOpen(!isModalOpen)
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
      "execute_zenith": executeZenith,
      "execute_stage_2": executeStage2
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
    <div id="custom-overlay" className={isModalOpen ? "highlight-modal" : ""}>
  
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
    />}
    <Player
    dialogueOptionIndex={dialogueOptionIndex} 
    isAnswerChoice={isAnswerChoice}
    isMenuVisible={isMenuVisible}
    isNextDisabled={isNextDisabled} 
    isPlayerFacingLeft={isPlayerFacingLeft}
    isSpeechBubbleVisible={isSpeechBubbleVisible}
    bottom={playerBottom}
    right={playerRight}
    speechBubbleContents={speechBubbleContents}
    sunSpeechBubbleContents={sunSpeechBubbleContents}
    handleBinaryChoice={handleBinaryChoice}
    handleShowMenu={handleShowMenu} 
    handleSpeak={handleSpeak}
    handleMove={handleMove}
    proceedDialogue={proceedDialogue}
    />
    </div>
}
    </>

  )
}

export default Overlay