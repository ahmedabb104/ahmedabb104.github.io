import { useState, useEffect } from 'react'

const CodeWindow = ({ snippets, position }) => {
  const [currentCode, setCurrentCode] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [codeIndex, setCodeIndex] = useState(0)

  const codeSnippets = snippets

  useEffect(() => {
    if (codeSnippets.length === 0) return
    
    const currentSnippet = codeSnippets[codeIndex]
    
    if (isTyping) {
      // Typing out the code
      if (currentIndex < currentSnippet.length) {
        const timeout = setTimeout(() => {
          setCurrentCode(currentSnippet.substring(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }, 30 + Math.random() * 20) // Random typing speed
        
        return () => clearTimeout(timeout)
      } else {
        // Finished typing, wait then start erasing
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000) // Wait 2 seconds before erasing
        
        return () => clearTimeout(timeout)
      }
    } else {
      // Erasing the code
      if (currentIndex > 0) {
        const timeout = setTimeout(() => {
          setCurrentCode(currentSnippet.substring(0, currentIndex - 1))
          setCurrentIndex(currentIndex - 1)
        }, 15) // Faster erasing
        
        return () => clearTimeout(timeout)
      } else {
        // Finished erasing, move to next snippet
        setIsTyping(true)
        setCodeIndex((codeIndex + 1) % codeSnippets.length)
        setCurrentCode('')
      }
    }
  }, [currentIndex, isTyping, codeIndex, codeSnippets])

  return (
    <div 
      className="absolute opacity-40 dark:opacity-50 pointer-events-none"
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
        right: position.right ? `${position.right}%` : 'auto',
        maxWidth: '400px',
      }}
    >
      <pre className="font-mono text-xs md:text-sm text-primary-600 dark:text-primary-400 leading-relaxed whitespace-pre-wrap">
        {currentCode}
        <span className="animate-blink">|</span>
      </pre>
    </div>
  )
}

const CodeAnimation = () => {
  const codeSets = [
    // Set 1: Python/ML
    [
      'import torch\nmodel = nn.Sequential(\n  nn.Linear(128, 64),\n  nn.ReLU(),\n  nn.Linear(64, 10)\n)',
      'def train_model(X, y):\n  optimizer = Adam(model.parameters())\n  loss_fn = CrossEntropyLoss()\n  for epoch in range(epochs):\n    pred = model(X)\n    loss = loss_fn(pred, y)',
      'import pandas as pd\ndf = pd.read_csv("data.csv")\nfeatures = df.drop("target", axis=1)\nX_train, X_test = train_test_split(features)',
    ],
    // Set 2: SQL
    [
      'SELECT customer_id, COUNT(*) as orders\nFROM transactions\nWHERE date >= CURRENT_DATE - 30\nGROUP BY customer_id\nHAVING COUNT(*) > 5',
      'WITH ranked_sales AS (\n  SELECT *, ROW_NUMBER() OVER (\n    PARTITION BY region ORDER BY revenue DESC\n  ) as rank\n  FROM sales\n)',
    ],
    // Set 3: Math/Statistics
    [
      'P(y|x) = P(x|y) * P(y) / P(x)',
      'L(θ) = ∏ᵢ₌₁ⁿ f(xᵢ|θ)',
      '∇f(x) = [∂f/∂x₁, ∂f/∂x₂, ..., ∂f/∂xₙ]',
      'E[X] = ∫ x * f(x) dx',
      'σ² = (1/n) * Σ(xᵢ - μ)²',
    ],
    // Set 4: Math equations
    [
      'f(x) = Σᵢ wᵢ * xᵢ + b',
      'minimize: ||Ax - b||² + λ||x||₁',
      'argmax P(θ|D) = argmax P(D|θ) * P(θ)',
    ],
    // Set 5: JavaScript/React
    [
      'const model = useMemo(() => {\n  return new TensorFlowModel(config)\n}, [config])',
      'function optimize(params) {\n  return params.reduce((acc, p) => {\n    return acc + p.weight * p.value\n  }, 0)\n}',
    ],
  ]

  const positions = [
    { top: 5, left: 5 },
    { top: 15, right: 5 },
    { top: 35, left: 10 },
    { top: 50, right: 10 },
    { top: 70, left: 5 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeSets.slice(0, 5).map((snippets, index) => (
        <CodeWindow 
          key={index} 
          snippets={snippets} 
          position={positions[index]}
        />
      ))}
    </div>
  )
}

export default CodeAnimation

