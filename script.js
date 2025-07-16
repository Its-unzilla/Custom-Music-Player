// Define the songs in a playlist
const songs = [
  {
    title: "Dreamscape",
    artist: "John Smith",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=crop&h=400&w=400"
  },
  {
    title: "Night Drive",
    artist: "Emily Rose",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1511376777868-611b54f68947?crop=entropy&cs=tinysrgb&fit=crop&h=400&w=400"
  },
  {
    title: "Ocean Breeze",
    artist: "Michael Blue",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=crop&h=400&w=400"
  }
];

const audio = document.getElementById("audio");
const albumArt = document.getElementById("album-art");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

let songIndex = 0;
let isPlaying = false;

// Load song into DOM
function loadSong(song) {
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  albumArt.src = song.cover;
  audio.src = song.file;

  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
  });
}

// Format time in mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Play the song
function playSong() {
  audio.play()
    .then(() => {
      playBtn.textContent = "❚❚";
      document.querySelector(".album-art").classList.add("playing");
      isPlaying = true;
    })
    .catch(err => {
      console.error("Playback error:", err.name, err.message);
    });
}

prevBtn.addEventListener("click", () => {
  pauseSong();
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});



// Pause the song
function pauseSong() {
  audio.pause();
  playBtn.innerHTML = " ▶︎";
  document.querySelector(".album-art").classList.remove("playing");
  isPlaying = false;
}

// Toggle play/pause
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Previous song
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Next song
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

// Seek when clicking progress bar
progressBar.addEventListener("click", e => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Play next song automatically
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// Load initial song
loadSong(songs[songIndex]);
