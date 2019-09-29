let mood = ``
let list = []
let newList = []

const randomList = () =>{
  for(let i=0; i<10; i++){
  let newsong = list[Math.floor(Math.random() * list.length)]
  newList.push(newsong)
  }
}
// let renderList = () => {
//   let trackList = document.createElement(`ul`)
//   trackList.innerHTML = `
//   <li class="collection-item avatar">
//       <img src="#" alt="kev" class="circle">
//       <span class="title">Title</span>
//       <p>First Line <br>
//          Second Line
//       </p>
//       <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
//     </li>
//   `
//   document.getElementById(`main-container`).append(trackList)

// }

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
      })
      .catch(e => {
        console.log(e)
      })
      // renderList()
    }
    
  })
  
  

