import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import Hero from './components/custome/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Hero />
    </>
  )
}

export default App
