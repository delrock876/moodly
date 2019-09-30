let mood = ``
let list = []
let newList = []

const randomList = () =>{
  for(let i=0; i<10; i++){
  let newsong = list[Math.floor(Math.random() * list.length)]
  newList.push(newsong)
  }
}
let renderList = () => {
  let trackList = document.createElement(`ul`)
  trackList.innerHTML = `
  <div class="collection">
        <a href="#info" class="collection-item modal-trigger">${newList[0]}</a>
        <a href="#info" class="collection-item modal-trigger">${newList[1]}</a>
        <a href="#info" class="collection-item modal-trigger">${newList[2]}</a>
        <a href="#info" class="collection-item modal-trigger">${newList[3]}</a>
        <a href="#info" class="collection-item modal-trigger">${newList[4]}</a>
        <a href="#info" class="collection-item modal-trigger">${newList[5]}</a>
        <a href="#info" class="collection-item modal-trigger">${newList[6]}</a>
        <a href="#info" class="collection-item modal-trigger">${newList[7]}</a>
        <a href="#info" class="collection-item modal-trigger">${newList[8]}</a>
        <a href="#info" class="collection-item modal-trigger">${newList[9]}</a>
      </div>
  `
  document.getElementById(`main-container`).append(trackList)

}

document.addEventListener(`click`, event => {
  if (event.target.className === `moodBtn`) {
    document.getElementById('main-container').innerHTML = ``
    mood = event.target.id
    console.log(mood)
    let url = ` http://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&tag=${mood}&api_key=94d64342e57a2bf09615e32fc90ca58f&format=json`
    fetch(url)
      .then(r => r.json())
      .then(data => {
        data.tracks.track.forEach(track => {
          list.push(track.name)
        })
        console.log(list)
        randomList()
        console.log(newList)
        renderList()
      })
      .catch(e => {
        console.log(e)
      })
      
    }
    
  })

// Initialize Modal
M.Modal.init(document.querySelectorAll(`.modal`),{})

// event listener for getting lyrics once you click on a song
document.addEventListener(`click`, () => {
  if(event.target.className === `collection-item modal-trigger`){
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

