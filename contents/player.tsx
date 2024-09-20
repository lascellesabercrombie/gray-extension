import playerAvatar from "data-base64:~assets/janine_1982_vitruvian.png"
import { dialogue } from "~dialogue";
import './player.css'

export function Player ({
  bottom, 
  right, 
  dialogueOptionIndex, 
  isPlayerFacingLeft, 
  handleBinaryChoice, 
  handleMove, 
  handleShowMenu, 
  handleSpeak, 
  isAnswerChoice, 
  isMenuVisible, 
  isNextDisabled, 
  isSpeechBubbleVisible, 
  speechBubbleContents, 
  sunSpeechBubbleContents, 
  proceedDialogue
}) {

    return (
        <div
      id="player-area"
      style={{
        right:`${right}vw`,
        bottom:`${bottom}vh`
      }}
      >
        {isMenuVisible && <div>
          <button onClick={handleSpeak}>Speak</button></div>}
        {isSpeechBubbleVisible && 
        <div>
          <span>{speechBubbleContents}</span>
          {isAnswerChoice && 
          <div>
            <button onClick={() => handleBinaryChoice(1)}>{dialogue[dialogueOptionIndex]["answers"][1]["message"]}</button>
            <button onClick={() => handleBinaryChoice(0)}>{dialogue[dialogueOptionIndex]["answers"][0]["message"]}</button>
          </div>}
          {!isAnswerChoice && (!sunSpeechBubbleContents || sunSpeechBubbleContents === "...") &&
          <button disabled={isNextDisabled} onClick={() => proceedDialogue()}>Next</button>}
          </div>
          }
        <div   style={{
        display: 'flex',
        flexDirection: 'column'
        }}>
         <button onClick={() => handleMove("up")}>Up</button>
         <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <button onClick={() => handleMove("left")}>Left</button>
          <img src={playerAvatar} alt="Vitruvian Man from cover of 1982, Janine"
          style={{transform: !isPlayerFacingLeft ? 'rotateY(180deg)' : ''}}></img>
        <button onClick={handleShowMenu}>See menu</button>
        <button onClick={() => handleMove("right")}>Right</button>
        </div>
        <button onClick={() => handleMove("down")}>Down</button>
        </div>
        
    </div>
    )
}