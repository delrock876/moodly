let mood = ``
let list = []
let newList = []

//generates a new list of 10 songs from the array of  'list'
const randomList = _ => {
  for (let i = 0; i < 10; i++) {
    let newsong = list[Math.floor(Math.random() * list.length)]
    newList.push(newsong)
  }
}

//renders 'newList' array of songs on page with dataset values
const renderList = _ => {
  for (let i = 0; i < newList.length; i++) {
    let trackList = document.createElement(`ul`)
    trackList.innerHTML = `
          <a href="#info" class="collection-item modal-trigger" 
          data-artist="${newList[i].name}" 
          data-song="${newList[i].song}">
          Artist: <span>${newList[i].name}</span>
          <br>
          Song: <span>${newList[i].song}</span></a>
          `
    document.getElementById(`main-container`).append(trackList)
  }
}

//onclick of moodBtn, a fetch request is made to grab 50 songs relating to that mood
document.addEventListener(`click`, event => {
  if (event.target.className === `moodBtn`) {
    document.getElementById('main-container').innerHTML = ``
    mood = event.target.id
    let url = ` http://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&tag=${mood}&api_key=94d64342e57a2bf09615e32fc90ca58f&format=json`
    fetch(url)
      .then(r => r.json())
      .then(data => {
        //puts the artist and song title into an object and pushes that object into array 'list'
        for (let i = 0; i < 50; i++) {
          list.push({ 'name': data.tracks.track[i].artist.name, 'song': data.tracks.track[i].name })
        }
        randomList()
        renderList()
      })
      .catch(e => console.log(e))
  }
})


// Initialize Modal
M.Modal.init(document.querySelectorAll(`.modal`), {})

// event listener for getting lyrics once you click "INFO" button
document.addEventListener(`click`, event => {
  if (event.target.className === `collection-item modal-trigger`) {
    console.log(event.target.dataset.song)
    // opens modal
    M.Modal.getInstance(document.getElementById(`info`)).open()
    let artistName = event.target.dataset.artist
    let songTitle = event.target.dataset.song
    // displays artist & song in modal
    document.getElementById(`artistName`).innerHTML = artistName
    document.getElementById(`trackName`).innerHTML = songTitle
    // gets the lyrics
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
    .then(r => r.json())
    .then(data => {
      document.getElementById(`lyric`).innerHTML = data.lyrics
    })
    .catch(e => console.log(e))
  }
})
