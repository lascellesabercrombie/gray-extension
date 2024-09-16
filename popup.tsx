import { sendToBackground } from "@plasmohq/messaging"
import { useState } from "react"

function IndexPopup() {

  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
        Welcome to the Gray Extension
        </h2>
        <button onClick={async() => { await sendToBackground({
  name: "start",
  body: {
    showPlayer: true
  }
})}}>Begin</button>
    </div>
  )
}

export default IndexPopup
