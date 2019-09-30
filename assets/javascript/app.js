let mood = ``
let list = []
let newList = []

const randomList = _ => {
  for (let i = 0; i < 10; i++) {
    let newsong = list[Math.floor(Math.random() * list.length)]
    newList.push(newsong)
  }
  console.log(newList)
}

const renderList = _ => {
  for (let i = 0; i < newList.length; i++) {
    let trackList = document.createElement('ul')
    trackList.innerHTML = `
          <a href="#info" class="collection-item modal-trigger">Artist: <span data-artist="${newList[i].name}">${newList[i].name}</span>
          <br>
          Song: <span data-song="${newList[i].song}">${newList[i].song}</span></a>
          `
    document.getElementById('main-container').append(trackList)
  }
}


document.addEventListener(`click`, event => {
  if (event.target.className === `moodBtn`) {
    document.getElementById('main-container').innerHTML = ``
    mood = event.target.id
    let url = ` http://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&tag=${mood}&api_key=94d64342e57a2bf09615e32fc90ca58f&format=json`
    fetch(url)
      .then(r => r.json())
      .then(data => {
        for (let i = 0; i < 50; i++) {
          list.push({ 'name': data.tracks.track[i].artist.name, 'song': data.tracks.track[i].name })
        }
        console.log(list)
        randomList()
        renderList()
      })
      .catch(e => console.log(e))
      
      
    }
  })
  

// Initialize Modal
M.Modal.init(document.querySelectorAll(`.modal`), {})

// event listener for getting lyrics once you click on a song
document.addEventListener(`click`, () => {
  if (event.target.className === `collection-item modal-trigger`) {
    M.Modal.getInstance(document.getElementById(`info`)).open()
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
      .then(r => r.json())
      .then(data => {
        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
  }
})