import React from 'react'
import { useState, useContext } from 'react'
import { PlayerContext } from '/src/context/PlayerContext'
import '/src/css/Search.css'

// import Player from './components/Player'

function Search() {

  // const [songs, setSongs] = useState()
  const [input, setInput] = useState('')
  const [currentVideoId, setCurrentVideoId] = useState('')
  const [context, updateContext] = useContext(PlayerContext)


  async function searchSong() {
    let response = await fetch('https://yt-music-api.herokuapp.com/api/yt/songs/' + input)
    let result = await response.json()
    console.log(result.content)
    // setSongs(result.content)
    localStorage.setItem('songs', JSON.stringify(result.content));
    updateContext({ songs: result.content });
  }

  function songClick(song) {
    console.log(song.name);
    // setCurrentVideoId(song.videoId)
    context.player.loadVideoById(song.videoId)
    localStorage.setItem('currentSong', JSON.stringify(song));
    updateContext({ currentSong: song });
  }

//      <Player videoId={currentVideoId} />
  return (
    <div className="Search">

      <input type="text" placeholder="search songs" onChange={e => setInput(e.target.value)} />
      <button onClick={searchSong}>Search</button>
      <ul id="songList">
        {context.songs && context.songs.map(song => (
          <li key={song.videoId} onClick={() => songClick(song)}>{song.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Search
