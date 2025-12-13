import { useState, useEffect } from 'react'
import Snowflakes from './Snowflakes'

const Hero = () => {
  const [headshotVisible, setHeadshotVisible] = useState(false)
  const [typedName, setTypedName] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [subheadingVisible, setSubheadingVisible] = useState(false)
  const [buttonsVisible, setButtonsVisible] = useState(false)
  const name = 'Ahmed Abbas'

  useEffect(() => {
    // Reset states for animation
    setHeadshotVisible(false)
    setTypedName('')
    setShowCursor(true)
    setSubheadingVisible(false)
    setButtonsVisible(false)

    // Start headshot and buttons animation immediately (fade in from above/bottom)
    setHeadshotVisible(true)
    setButtonsVisible(true)

    // Typing animation for name
    const typingSpeed = 100 // milliseconds per character
    let currentIndex = 0
    
    const typeNextChar = () => {
      if (currentIndex < name.length) {
        setTypedName(name.substring(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeNextChar, typingSpeed)
      } else {
        // Hide cursor after typing completes
        setTimeout(() => {
          setShowCursor(false)
        }, 500)
        
        // Start subheading animation after name completes
        setTimeout(() => {
          setSubheadingVisible(true)
        }, 800)
      }
    }

    // Start typing after a short delay
    setTimeout(typeNextChar, 300)
  }, [name])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openResume = () => {
    window.open('/resume.pdf', '_blank')
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center section-padding bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <Snowflakes />
      <div className="relative max-w-7xl mx-auto text-center z-10">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img
              src="/headshot.jpg"
              alt="Profile"
              className={`w-48 h-48 rounded-lg object-cover border-4 border-primary-500 dark:border-primary-400 shadow-xl transition-all duration-700 ease-out ${
                headshotVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
              onError={(e) => {
                // Fallback to placeholder if image doesn't exist
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EYour Photo%3C/text%3E%3C/svg%3E'
              }}
            />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 dark:from-primary-400 dark:via-primary-300 dark:to-primary-500 bg-clip-text text-transparent">
          {typedName}
          {showCursor && (
            <span className="inline-block w-0.5 h-[0.9em] bg-primary-600 dark:bg-primary-400 ml-1 animate-blink" />
          )}
        </h1>
        
        <p className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 transition-all duration-700 ease-out ${
          subheadingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          Data Scientist | AI/ML Engineer
        </p>
        
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ease-out ${
          buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button
            onClick={scrollToContact}
            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get In Touch
          </button>
          <button
            onClick={openResume}
            className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-2 border-primary-600 dark:border-primary-400 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View Resume
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero

