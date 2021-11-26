import { useState } from 'react'
import './css/App.css'

import Player from './components/Player'
import Search from './components/Search'

function App() {
  return (
    <div className="App">
      <div id="sidebar">
        <Search />
      </div>
      <div id="main">
        <Player />
      </div>
    </div>
  )
}

export default App
