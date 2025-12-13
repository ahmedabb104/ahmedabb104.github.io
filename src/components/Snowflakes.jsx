import { useEffect, useState } from 'react'

const Snowflakes = () => {
  const [snowflakes, setSnowflakes] = useState([])

  useEffect(() => {
    // Create 50 snowflakes with random properties
    const createSnowflakes = () => {
      const flakes = []
      for (let i = 0; i < 50; i++) {
        // Random starting vertical position (-20% to 100% of viewport)
        const startTop = -20 + Math.random() * 120
        flakes.push({
          id: i,
          left: Math.random() * 100, // Random horizontal position
          startTop: startTop, // Random starting vertical position
          animationDuration: 10 + Math.random() * 20, // 10-30 seconds
          animationDelay: Math.random() * 5, // Random delay
          size: 10 + Math.random() * 15, // 4-10px
          opacity: 0.9 + Math.random() * 0.4, // 0.3-0.7 opacity
        })
      }
      setSnowflakes(flakes)
    }

    createSnowflakes()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute snowflake"
          style={{
            left: `${flake.left}%`,
            top: `${flake.startTop}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `fall ${flake.animationDuration}s linear infinite`,
            animationDelay: `${flake.animationDelay}s`,
          }}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            className="w-full h-full text-primary-400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 0 L50 20 M50 80 L50 100 M0 50 L20 50 M80 50 L100 50 M14.64 14.64 L28.28 28.28 M71.72 71.72 L85.36 85.36 M14.64 85.36 L28.28 71.72 M71.72 28.28 L85.36 14.64 M25 25 L35 35 M65 65 L75 75 M25 75 L35 65 M65 35 L75 25"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="50" cy="50" r="3" fill="currentColor" />
          </svg>
        </div>
      ))}
    </div>
  )
}

export default Snowflakes

