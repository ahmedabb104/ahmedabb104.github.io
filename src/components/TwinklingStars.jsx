import { useEffect, useState } from 'react'

const TwinklingStars = () => {
  const [stars, setStars] = useState([])

  useEffect(() => {
    // Create stars with random positions
    const createStars = () => {
      const starCount = 50
      const newStars = []
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          left: Math.random() * 100, // Percentage
          top: Math.random() * 100, // Percentage
          color: Math.floor(Math.random() * 3), // 0, 1, or 2 for 3 colors
          animationDuration: 2 + Math.random() * 3, // 2-5 seconds
          animationDelay: Math.random() * 2, // 0-2 seconds
          size: 3 + Math.random() * 2, // 3-5px base size
        })
      }
      
      setStars(newStars)
    }

    createStars()
  }, [])

  // Color classes for 3 different colors
  // Using primary-400, primary-500, and primary-600
  const getColorClass = (colorIndex) => {
    const colors = [
      'bg-primary-400', // Lighter blue
      'bg-primary-500', // Medium blue
      'bg-primary-600', // Darker blue
    ]
    return colors[colorIndex % 3]
  }

  const getGlowClass = (colorIndex) => {
    const glows = [
      'shadow-[0_0_8px_rgba(56,189,248,0.8)]', // primary-400 glow
      'shadow-[0_0_8px_rgba(14,165,233,0.8)]', // primary-500 glow
      'shadow-[0_0_8px_rgba(2,132,199,0.8)]', // primary-600 glow
    ]
    return glows[colorIndex % 3]
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full ${getColorClass(star.color)} ${getGlowClass(star.color)}`}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.animationDuration}s ease-in-out infinite`,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default TwinklingStars

