import { useEffect, useState } from 'react'
import './App.css' 
import { PaperTextureBackground } from './background'
import { Draw } from './draw'
function App() {

  return (
    <div className="App">
      {/* <PaperTextureBackground></PaperTextureBackground> */}
      <Draw></Draw>
    </div>
  )
}

export default App
