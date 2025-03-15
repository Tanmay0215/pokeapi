import { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useNavigate } from 'react-router-dom'

const FindPokemon = () => {
  const webcamRef = useRef(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [geminiResponse, setGeminiResponse] = useState('')
  const navigate = useNavigate()

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImageSrc(imageSrc)
  }, [webcamRef])

  const sendToGemini = async () => {
    if (!imageSrc) {
      alert('Please capture an image first!')
      return
    }

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const parts = [
      { text: 'Which pokemon is this, single word answer' },
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
      navigate('/pokemon/' + response.text())
    } catch (error) {
      console.error('Error sending to Gemini:', error)
      setGeminiResponse('Error processing image. Please check the console.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="mb-4 rounded-lg shadow-md"
      />
      <button
        onClick={capture}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Capture photo
      </button>
      {imageSrc && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Captured Image:</h2>
          <img
            src={imageSrc}
            alt="Captured"
            className="rounded-lg shadow-md mb-2"
          />
          <button
            onClick={sendToGemini}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Send to Gemini
          </button>
        </div>
      )}
      {geminiResponse && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Gemini Response:</h2>
          <p className="text-gray-700">{geminiResponse}</p>
        </div>
      )}
    </div>
  )
}

export default FindPokemon
