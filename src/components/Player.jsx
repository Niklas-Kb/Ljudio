import React, { useState, useEffect, useContext } from 'react'
import { PlayerContext } from '/src/context/PlayerContext'
import '/src/css/Player.css'

function Player({ videoId }) {

  const [context, updateContext] = useContext(PlayerContext)
  // const [currentVideoId, setCurrentVideoId] = useState()
  const [progress, setProgress] = useState(0)
  const [songTime, setSongTime] = useState(0)
  
  
  //useEffect is called everytime component is rendered
  useEffect(() => {
    loadPlayer()
  }, [])

  //checks playedPercent to call next song functions at the end of a song
  useEffect(() => {
    if (!context.player) return

    // let contextFix = test()

    // console.log("OK", context.currentSong);

    setInterval(() => {

      // Fungerar ej! context props => null

      // console.log(test)
      // console.log(contextFix)
      // console.log(test())

      if (getPlayerProgress() > 98) {
        nextSong()
        updateContext({ songs: JSON.parse(localStorage.getItem('songs')) });
      }
    }, 5000)
  }, [context.player])

  //load youtube player
  function loadPlayer() {
    let ytPlayer = new YT.Player('yt-player', {
      height: '350px',
      width: '100%',
      events: {
        'onReady': (e) => {
          e.target.setVolume(10)
          updateContext({
            player: e.target
          })
        }
      }
    });

    document.getElementById("yt-player").style.display = 'none'
    updateContext({ playerHidden: true })
  }

  function playSong() {
    context.player.playVideo();
  }

  function pauseSong() {
    context.player.pauseVideo();
  }

  function previousSong() {
    if (!context.player) return

    let index = context.songs.map(function (e) { return e.videoId; }).indexOf(context.currentSong.videoId);

    if (index < 1) {
      index = 1;
    }

    let newSong = context.songs[index - 1];

    context.player.loadVideoById(newSong.videoId)
    updateContext({ currentSong: newSong });
  }

  function nextSong() {
    if (!context.player) return

    // console.log(context.songs);

    // let index = context.songs.map(function (e) { return e.videoId; }).indexOf(context.currentSong.videoId);

    // // TODO: Ska listan börja om?
    // if (index > context.songs.length-1) {
    //   index = context.songs.length-2;
    // }

    // let newSong = context.songs[index + 1];


    let songs = JSON.parse(localStorage.getItem('songs'));
    let currentSong = JSON.parse(localStorage.getItem('currentSong'));

    console.log(songs);

    let index = songs.map(function (e) { return e.videoId; }).indexOf(currentSong.videoId);

    console.log(index, currentSong.videoId);

    if (index > songs.length - 1) {
      index = songs.length-2;
    }

    let newSong = songs[index + 1];

    console.log(newSong);
    context.player.loadVideoById(newSong.videoId)
    localStorage.setItem('currentSong', JSON.stringify(newSong));
    updateContext({ currentSong: newSong });
  }


  //progressbar
  useEffect(() => {
    if (!context.player) return

    setInterval(() => {
      setProgress(getPlayerProgress())
      setSongTime(getSongTime());
    }, 1000)
  }, [context.player])

  function getPlayerProgress() {
    let currentTime = context.player.getCurrentTime()
    let duration = context.player.getDuration()
    let playedPercent = (duration > 0) ? currentTime * (100 / duration) : 0
    return playedPercent
  }

  function getSongTime() {
    let currentTime = context.player.getCurrentTime()
    let duration = context.player.getDuration()
    return parseInt(currentTime) + " / " + parseInt(duration)
  }
  
  function changeSongPosition(e) {
    setProgress(e.target.value)
    let newPosition = context.player.getDuration() * (e.target.value / 100)
    console.log(newPosition)
    context.player.seekTo(newPosition, true)
  }
  
  function tooglePlayer(e) {

    console.log(context.player);

    if (context.playerHidden) {

      // Show
      document.getElementById("yt-player-toggle").classList.add("active");
      document.getElementById("yt-player").style.display = 'block';
      updateContext({ playerHidden: false })


    } else {

      // Hide
      document.getElementById("yt-player-toggle").classList.remove("active");
      document.getElementById("yt-player").style.display = 'none';
      updateContext({ playerHidden: true })

    }
  }

  return (
    <div>
      <div id="yt-container">
        <div id="yt-player">
        </div>
      </div>
      <div id="yt-toolbar">
        <div className="progressBarDiv playerItems">
          <input
            className="slider"
            value={progress}
            onChange={changeSongPosition}
            type="range"
          />
        </div>
        <div className="playItems">
          <button className="prevButt fa fa-step-backward" onClick={previousSong}></button>
          <button className="pauseButt fa fa-pause" onClick={pauseSong}></button>
          <button className="playButt fa fa-play" onClick={playSong}></button>
          <button id="_nextBtn" className="nextButt fa fa-step-forward" onClick={nextSong}></button>
          {songTime}
          <div className="switchContainer">
            <label>Video</label>
            <div id="yt-player-toggle" className="switch" onClick={tooglePlayer}><span></span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player