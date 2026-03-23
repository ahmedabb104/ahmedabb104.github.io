import { useEffect, useRef } from 'react'

const TRAIL_LIFETIME = 500 // ms each point lives

export default function CursorTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const points = [] // { x, y, t, hue }
    let hue = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      hue = (hue + 2) % 360
      points.push({ x: e.clientX, y: e.clientY, t: performance.now(), hue })
    }
    window.addEventListener('mousemove', onMouseMove)

    let animId
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      const now = performance.now()

      // Remove expired points
      while (points.length > 0 && now - points[0].t > TRAIL_LIFETIME) {
        points.shift()
      }

      // Draw segments between consecutive points
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1]
        const curr = points[i]
        const age = now - curr.t
        const life = 1 - age / TRAIL_LIFETIME

        ctx.beginPath()
        ctx.moveTo(prev.x, prev.y)
        ctx.lineTo(curr.x, curr.y)
        ctx.strokeStyle = `hsla(${curr.hue}, 100%, 65%, ${life * 0.8})`
        ctx.lineWidth = 1.5
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
    />
  )
}
