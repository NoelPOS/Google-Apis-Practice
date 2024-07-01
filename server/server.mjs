import express from 'express'
import axios from 'axios'
import cors from 'cors'
import env from 'dotenv'

const app = express()
app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
  })
)
app.use(express.json())
env.config()

app.post('/synthesize', async (req, res) => {
  const text_in = req.body.input
  const apiKey = process.env.API
  const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`
  const payload = {
    input: {
      text: text_in,
    },
    voice: {
      languageCode: 'en-US',
      name: 'en-US-Standard-A',
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: 1.0,
      pitch: 0.0,
      volumeGainDb: 0.0,
    },
    enableTimePointing: ['SSML_MARK'],
  }

  const response = await axios.post(endpoint, payload)
  res.json(response.data)
})

const port = 3001
app.listen(port, () => {
  console.log('server running on port 3001')
})
