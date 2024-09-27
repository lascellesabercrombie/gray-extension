import playerAvatar from "data-base64:~assets/janine_1982_vitruvian.png"
import { dialogue } from "~dialogue";
import './player.css'

export function Player ({
  bottom, 
  right, 
  dialogueOptionIndex, 
  isPlayerFacingLeft, 
  handleBinaryChoice, 
  handleAction, 
  handleSpeak, 
  isAnswerChoice, 
  isNextDisabled, 
  isSpeechBubbleVisible, 
  speechBubbleContents, 
  sunSpeechBubbleContents, 
  proceedDialogue,
  tabIndex,
  width,
  height
}) {

    return (
        <div
      id="player-area"
      style={{
        right:`${right}vw`,
        bottom:`${bottom}vh`,
      }}
      tabIndex={tabIndex}
      onKeyDown={(e) => {handleAction(e.key)}}
      >
          
        {isSpeechBubbleVisible ?
        <div className="speech-bubble">
          <span>{speechBubbleContents}</span>
          {isAnswerChoice && 
          <div className="button-container">
            <button className="speech-bubble-button" onClick={() => handleBinaryChoice(1)}>{dialogue[dialogueOptionIndex]["answers"][1]["message"]}</button>
            <button className="speech-bubble-button" onClick={() => handleBinaryChoice(0)}>{dialogue[dialogueOptionIndex]["answers"][0]["message"]}</button>
          </div>}
          {!isAnswerChoice && (!sunSpeechBubbleContents || sunSpeechBubbleContents === "...") &&
          <button className="speech-bubble-button" disabled={isNextDisabled} onClick={() => proceedDialogue()}>Next</button>}
          </div>
          : 
          <button className="speech-bubble-button" onClick={handleSpeak}>Speak</button>
          }
          <img src={playerAvatar} alt="Vitruvian Man from cover of 1982, Janine"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: !isPlayerFacingLeft ? 'rotateY(180deg)' : ''
          }}>
          </img>
    </div>
    )
}