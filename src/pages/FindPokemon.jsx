import { useState, useRef } from 'react'
import Webcam from 'react-webcam'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'

const FindPokemon = () => {
  const webcamRef = useRef(null)
  const [geminiResponse, setGeminiResponse] = useState('')
  const navigate = useNavigate()

  const sendToGemini = async () => {
    const imageSrc = webcamRef.current.getScreenshot()

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const parts = [
      {
        text: 'Which pokemon is this, single word answer, if its not a pokemon return 0',
      },
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageSrc.split(',')[1],
        },
      },
    ]

    try {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts }],
      })
      const response = await result.response
      setGeminiResponse(response.text())
      if (geminiResponse != 0) {
        navigate('/pokemon/' + response.text())
      } else toast.info('No Pokemon found')
    } catch (error) {
      console.error('Error sending to Gemini:', error)
      setGeminiResponse('Error processing image. Please check the console.')
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="mb-4 rounded-lg shadow-md size-60"
        />
        <div className="mt-4">
          <button
            onClick={sendToGemini}
            className="px-4 py-2 bg-red-400 text-white rounded"
          >
            Search Pokemon
          </button>
        </div>
      </div>
    </div>
  )
}

export default FindPokemon
