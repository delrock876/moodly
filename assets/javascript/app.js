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
let renderList =_=> {
  let trackList = document.createElement(`ul`)
  trackList.innerHTML = `
  <div class="collection">
        <a href="#info" class="collection-item modal-trigger"><p>Artist: ${newList[0].name}</p><p>Song: ${newList[0].song}</p></a>
        <a href="#info" class="collection-item modal-trigger"><p>Artist: ${newList[1].name}</p><p>Song: ${newList[1].song}</p></a>
        <a href="#info" class="collection-item modal-trigger"><p>Artist: ${newList[2].name}</p><p>Song: ${newList[2].song}</p></a>
        <a href="#info" class="collection-item modal-trigger"><p>Artist: ${newList[3].name}</p><p>Song: ${newList[3].song}</p></a>
        <a href="#info" class="collection-item modal-trigger"><p>Artist: ${newList[4].name}</p><p>Song: ${newList[4].song}</p></a>
        <a href="#info" class="collection-item modal-trigger"><p>Artist: ${newList[5].name}</p><p>Song: ${newList[5].song}</p></a>
        <a href="#info" class="collection-item modal-trigger"><p>Artist: ${newList[6].name}</p><p>Song: ${newList[6].song}</p></a>
        <a href="#info" class="collection-item modal-trigger"><p>Artist: ${newList[7].name}</p><p>Song: ${newList[7].song}</p></a>
        <a href="#info" class="collection-item modal-trigger"><p>Artist: ${newList[8].name}</p><p>Song: ${newList[8].song}</p></a>
        <a href="#info" class="collection-item modal-trigger"><p>Artist: ${newList[9].name}</p><p>Song: ${newList[9].song}</p></a>
      </div>
  `
  document.getElementById(`main-container`).append(trackList)

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
    let songTitle = event.target.textContent
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

