// get DOM elements
const musicContainer = document.querySelector('.music-container');
const musicInfo = document.querySelector('.music-info');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const cover = document.querySelector('.cover');
const music = document.querySelector('.music');
const playBtn = document.querySelector('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');
const seekBar = document.querySelector('.seek-bar');
const playlist = document.querySelector('.playlist');
const fileInput = document.querySelector('#file-input');
const addSongContainer = document.querySelector('.add-song-container');

let songs = []; // array to store all songs

// function to update music info
function updateMusicInfo(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  music.src = song.src;
}

// function to play song
function playSong() {
  musicContainer.classList.add('playing');
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'block';
  music.play();
}

// function to pause song
function pauseSong() {
  musicContainer.classList.remove('playing');
  playBtn.style.display = 'block';
  pauseBtn.style.display = 'none';
  music.pause();
}

// function to update seek bar
function updateSeekBar() {
  const { currentTime, duration } = music;
  const progressPercent = (currentTime / duration) * 100;
  seekBar.value = progressPercent;
}

// function to seek song
function seekSong() {
  const { duration } = music;
  const progress = seekBar.value / 100;
  music.currentTime = duration * progress;
}

// function to add song to playlist
function addSongToPlaylist(song) {
  const li = document.createElement('li');
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener('click', () => {
    updateMusicInfo(song);
    playSong();
  });
  playlist.appendChild(li);
}

// function to handle file input change
function handleFileInputChange(event) {
  const { files } = event.target;
  for (const file of files) {
    const url = URL.createObjectURL(file);
    const song = {
      title: file.name,
      artist: 'Artist',
      cover: 'default-cover.jpg',
      src: url
    };
    songs.push(song);
    addSongToPlaylist(song);
  }
}

// add event listeners
playBtn.addEventListener('click', playSong);
pauseBtn.addEventListener('click', pauseSong);
music.addEventListener('timeupdate', updateSeekBar);
seekBar.addEventListener('change', seekSong);
fileInput.addEventListener('change', handleFileInputChange);

// initialize with first song in playlist
if (songs.length > 0) {
  updateMusicInfo(songs[0]);
  addSongToPlaylist(songs[0]);
  music.addEventListener('ended', () => {
    const index = songs.indexOf(song);
    const nextIndex = (index + 1) % songs.length;
    const nextSong = songs[nextIndex];
    updateMusicInfo(nextSong);
    playSong();
  });
}
