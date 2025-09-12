import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function SubComp1() {
  
  const [count, setCount] = useState(0)
  console.log("sub comp rendering...")
  return (
    <>
      <h1>This is sub component 1</h1>
      <h4>This is sub component 1 details</h4>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}

export default SubComp1
