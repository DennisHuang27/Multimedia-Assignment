songListEl = document.getElementById("song-list")
songList = []

currentlyPlaying = []

async function loadSongs() {
    try {
        res = await fetch("./assets/song.json")
        songList = await res.json()
        songList.forEach(song => {
            songElement = createSong(song)
            separator = document.createElement("div")
            separator.classList.add("separator")
            songListEl.append(songElement, separator)
        })
    } catch(err) {
        console.error(err)
    }
}

function createSong(song) {
    songElement = document.createElement("li")
    songElement.classList.add("song-item")

    songNumber = document.createElement("div")
    songNumber.classList.add("song-number")
    songNumber.textContent = song.id

    songImageContainer = document.createElement("div")
    songImageContainer.classList.add("song-image-container")
    songImage = document.createElement("img")
    songImage.src = song.image
    songImageContainer.append(songImage)

    songName = document.createElement("div")
    songName.classList.add("song-name")
    songName.textContent = song.name

    songAuthor = document.createElement("div")
    songAuthor.classList.add("song-author")
    songAuthor.textContent = song.author

    songLikeBtn = document.createElement("button")
    songLikeBtn.classList.add("song-like-btn")
    likeBtnIcon = document.createElement("i")
    likeBtnIcon.classList.add("bx")
    likeBtnIcon.classList.add("bx-heart")
    songLikeBtn.append(likeBtnIcon)

    songPlayBtn = document.createElement("button")
    songPlayBtn.classList.add("song-play-btn")
    playBtnIcon = document.createElement("i")
    playBtnIcon.classList.add("bx")
    playBtnIcon.classList.add("bx-play-circle")
    songPlayBtn.append(playBtnIcon)
    songPlayBtn.addEventListener("click", (e) => {
        playSong(song.src)
    })

    songElement.append(
        songNumber,
        songImageContainer,
        songName,
        songAuthor,
        songLikeBtn,
        songPlayBtn
    )

    return songElement
}

function playSong(src) {
    if (currentlyPlaying.length > 0) {
        currentlyPlaying.forEach((audio, i) => {
            audio.pause()
        })
        currentlyPlaying = []
    }
    audio = new Audio(src)
    audio.loop = false
    currentlyPlaying.push(audio)
    audio.play()
}

loadSongs()