const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const muteBtn = document.getElementById('muteBtn');
const unmuteBtn = document.getElementById('unmuteBtn');
const songTitle = document.getElementById('songTitle');

const popup = document.getElementById('musicPopup');
const minimizeBtn = document.getElementById('minimizeBtn');
const expandBtn = document.getElementById('expandBtn');

const playlist = [
  { title: "Bensound - Tenderness", src: "https://www.bensound.com/bensound-music/bensound-tenderness.mp3" },
  { title: "Bensound - Love", src: "https://www.bensound.com/bensound-music/bensound-love.mp3" },
  { title: "Bensound - Slow Motion", src: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3" },
  { title: "Bensound - Acoustic Breeze", src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3" },
  { title: "Bensound - Better Days", src: "https://www.bensound.com/bensound-music/bensound-betterdays.mp3" },
  { title: "Bensound - November", src: "https://www.bensound.com/bensound-music/bensound-november.mp3" }
];


let currentIndex = 0;

function loadSong(index) {
  const song = playlist[index];
  audio.src = song.src;
  songTitle.textContent = "🎶 " + song.title;
  audio.load();
}

function playSong() {
  audio.play();
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-block';
}

function pauseSong() {
  audio.pause();
  playBtn.style.display = 'inline-block';
  pauseBtn.style.display = 'none';
}

function toggleMute(mute) {
  audio.muted = mute;
  muteBtn.style.display = mute ? 'none' : 'inline-block';
  unmuteBtn.style.display = mute ? 'inline-block' : 'none';
}

// Event listeners
playBtn.addEventListener('click', playSong);
pauseBtn.addEventListener('click', pauseSong);

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex);
  playSong();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
  playSong();
});

muteBtn.addEventListener('click', () => toggleMute(true));
unmuteBtn.addEventListener('click', () => toggleMute(false));

audio.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
  playSong();
});

// minimize / expand popup
minimizeBtn.addEventListener('click', () => {
  popup.classList.add('minimized');
});

expandBtn.addEventListener('click', () => {
  popup.classList.remove('minimized');
});

// โหลดเพลงแรกตอนเริ่มต้น
loadSong(currentIndex);
