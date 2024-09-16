import type { PlasmoMessaging } from "@plasmohq/messaging"
import { sendToContentScript } from "@plasmohq/messaging"

export type RequestBody = {
  showPlayer: boolean
}

export type RequestResponse = number

const handler: PlasmoMessaging.MessageHandler<
  RequestBody,
  RequestResponse
> = async (req, res) => {
  console.log('req in handler', req.body)
  console.log('res in handler', res)
  const { showPlayer } = req.body
  console.log('input', showPlayer)
  sendToContentScript(req)
}

export default handler