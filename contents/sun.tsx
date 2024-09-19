import { dialogue } from "~dialogue"
import gray_sun from "data-base64:~assets/gray-sun.png"
import './player.css'

export function Sun({dialogueOptionIndex, isAnswerChoice, isNextDisabled, isSunSpeechBubbleVisible, proceedDialogue, sunSpeechBubbleContents}) {
    
    return (
    <div id="sun">
        <img src={gray_sun} 
      alt="a sun with a face, leering and suspect; section of an image from a draft manuscript of Gray's novel Lanark"
      ></img>
      {isSunSpeechBubbleVisible && <div>
        <span>{sunSpeechBubbleContents}</span>
        {(dialogue[dialogueOptionIndex]?.["speaker"] === "sun") && !isAnswerChoice && <button disabled={isNextDisabled} onClick={() => proceedDialogue()}>Next</button>}
        </div>}
    </div>)
}