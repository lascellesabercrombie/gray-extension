import { sendToBackground } from "@plasmohq/messaging"
import "contents/player.css"

function IndexPopup() {

  return (
    <div
      style={{
        border: "0.4rem double black",
        display: "flex",
        fontFamily: 'serif',
        flexDirection: "column",
        padding: "15px 25px",
        textAlign: "center",
        minWidth: "100px",
        alignItems: "center"
      }}
      >
      <h1 style={{textTransform: 'uppercase'}}>
        Poor Codings
        </h1>
        <h2 style={{fontStyle: 'italic'}}>An unofficial homage to the work of Alasdair Gray</h2>
        <button 
        className="speech-bubble-button"
        onClick={async() => { await sendToBackground({
  name: "start",
  body: {
    showPlayer: true
  }
})}}>Begin</button>
    </div>
  )
}

export default IndexPopup
