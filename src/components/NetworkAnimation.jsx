import { useEffect, useRef } from 'react'

const NetworkAnimation = () => {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let clusters = []
    const numClusters = 30
    const nodesPerCluster = 10

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create clusters with nodes
    const createClusters = () => {
      clusters = []
      for (let c = 0; c < numClusters; c++) {
        const cluster = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 200 - 100, // Depth
          rotationX: Math.random() * Math.PI * 2,
          rotationY: Math.random() * Math.PI * 2,
          rotationZ: Math.random() * Math.PI * 2,
          rotationSpeedX: (Math.random() - 0.5) * 0.01,
          rotationSpeedY: (Math.random() - 0.5) * 0.01,
          rotationSpeedZ: (Math.random() - 0.5) * 0.01,
          velocityX: (Math.random() - 0.5) * 0.2,
          velocityY: (Math.random() - 0.5) * 0.2,
          nodes: [],
        }

        // Create nodes in 3D space around cluster center
        for (let n = 0; n < nodesPerCluster; n++) {
          const angle = (n / nodesPerCluster) * Math.PI * 2
          const radius = 40 + Math.random() * 40
          cluster.nodes.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            z: (Math.random() - 0.5) * 60,
          })
        }
        clusters.push(cluster)
      }
    }

    createClusters()

    // 3D to 2D projection
    const project = (x, y, z, cluster) => {
      const centerX = cluster.x
      const centerY = cluster.y
      const scale = 200 / (200 + z)
      return {
        x: centerX + x * scale,
        y: centerY + y * scale,
        scale: scale,
      }
    }

    // Rotate point around X axis
    const rotateX = (x, y, z, angle) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return {
        x: x,
        y: y * cos - z * sin,
        z: y * sin + z * cos,
      }
    }

    // Rotate point around Y axis
    const rotateY = (x, y, z, angle) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return {
        x: x * cos + z * sin,
        y: y,
        z: -x * sin + z * cos,
      }
    }

    // Rotate point around Z axis
    const rotateZ = (x, y, z, angle) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return {
        x: x * cos - y * sin,
        y: x * sin + y * cos,
        z: z,
      }
    }

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      clusters.forEach((cluster) => {
        // Update rotation
        cluster.rotationX += cluster.rotationSpeedX
        cluster.rotationY += cluster.rotationSpeedY
        cluster.rotationZ += cluster.rotationSpeedZ

        // Update position with slow random movement
        cluster.x += cluster.velocityX
        cluster.y += cluster.velocityY

        // Bounce off edges
        if (cluster.x < 0 || cluster.x > canvas.width) cluster.velocityX *= -1
        if (cluster.y < 0 || cluster.y > canvas.height) cluster.velocityY *= -1

        // Keep within bounds
        cluster.x = Math.max(0, Math.min(canvas.width, cluster.x))
        cluster.y = Math.max(0, Math.min(canvas.height, cluster.y))

        // Project and draw nodes
        const projectedNodes = cluster.nodes.map((node) => {
          // Apply rotations
          let rotated = rotateX(node.x, node.y, node.z, cluster.rotationX)
          rotated = rotateY(rotated.x, rotated.y, rotated.z, cluster.rotationY)
          rotated = rotateZ(rotated.x, rotated.y, rotated.z, cluster.rotationZ)

          // Project to 2D
          const projected = project(rotated.x, rotated.y, rotated.z + cluster.z, cluster)
          return { ...projected, originalZ: rotated.z + cluster.z }
        })

        // Draw connections between nearby nodes
        // Use primary-500 color (blue: rgb(14, 165, 233))
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.2)' // primary-500 with low opacity
        ctx.lineWidth = 1
        for (let i = 0; i < projectedNodes.length; i++) {
          for (let j = i + 1; j < projectedNodes.length; j++) {
            const node1 = projectedNodes[i]
            const node2 = projectedNodes[j]
            const distance = Math.sqrt(
              Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)
            )
            if (distance < 80) {
              ctx.beginPath()
              ctx.moveTo(node1.x, node1.y)
              ctx.lineTo(node2.x, node2.y)
              ctx.stroke()
            }
          }
        }

        // Draw nodes
        projectedNodes.forEach((node) => {
          const size = 3 * node.scale
          ctx.fillStyle = 'rgba(14, 165, 233, 0.6)' // primary-500
          ctx.beginPath()
          ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
          ctx.fill()

          // Add glow effect
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 2)
          gradient.addColorStop(0, 'rgba(14, 165, 233, 0.4)')
          gradient.addColorStop(1, 'rgba(14, 165, 233, 0)')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(node.x, node.y, size * 2, 0, Math.PI * 2)
          ctx.fill()
        })
      })

      animationFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  )
}

export default NetworkAnimation

