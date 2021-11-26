import React, { createContext, useState } from 'react'

export const PlayerContext = createContext()

function PlayerContextProvider(props) {

  //returns a pair of values, the current state and the function that updates it
  const [context, setContext] = useState({
    player: null,
    currentSong: null,
    songs: []
  })

  //using spread to keep old data while replacing only the matching ones
  function updateContext(values) {
    setContext({
      ...context,
      ...values
    })

  }

  return (
    <PlayerContext.Provider value={[context, updateContext]}>
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider
