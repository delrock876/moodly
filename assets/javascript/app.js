let mood = ``

document.addEventListener(`click`, event => {
  if (event.target.className === `moodBtn`) {
    mood = event.target.id
    console.log(mood)
    let url = ` http://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&tag=${mood}&api_key=94d64342e57a2bf09615e32fc90ca58f&format=json`
    fetch(url)
      .then(r => r.json())
      .then(data => {
        data.tracks.track.forEach(track => {
          console.log(track.name)

        })
      })
  }
})



