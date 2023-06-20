import { useState } from 'react'
import './styles.scss';
import GameMenu from './components/GameMenu';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GameMenu/>
    </>
  )
}

export default App
