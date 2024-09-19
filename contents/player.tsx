import { useState } from "react";
import playerAvatar from "data-base64:~assets/janine_1982_vitruvian.png"
import { dialogue } from "~dialogue";
import './player.css'

export function Player ({dialogueOptionIndex, handleBinaryChoice, handleShowMenu, handleSpeak, isAnswerChoice, isMenuVisible, isNextDisabled, isSpeechBubbleVisible, speechBubbleContents, sunSpeechBubbleContents, proceedDialogue}) {
    const [right, setRight] = useState(10)
    const [bottom, setBottom] = useState(10)
    const [isPlayerFacingLeft, setIsPlayerFacingLeft] = useState(true)

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
         <button onClick={() => {setBottom(bottom > 75 ? bottom : bottom + 1)}}>Up</button>
         <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <button onClick={() => {setRight(right > 75 ? right : right + 1); setIsPlayerFacingLeft(true)}}>Left</button>
          <img src={playerAvatar} alt="Vitruvian Man from cover of 1982, Janine"
          style={{transform: !isPlayerFacingLeft ? 'rotateY(180deg)' : ''}}></img>
        <button onClick={handleShowMenu}>See menu</button>
        <button onClick={() => {setRight(right < 1 ? right : right - 1); setIsPlayerFacingLeft(false)}}>Right</button>
        </div>
        <button onClick={() => {setBottom(bottom < 1 ? bottom : bottom - 1)}}>Down</button>
        </div>
        
    </div>
    )
}