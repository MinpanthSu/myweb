const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const muteBtn = document.getElementById('muteBtn');
const unmuteBtn = document.getElementById('unmuteBtn');
const songTitle = document.getElementById('songTitle');

const popup = document.getElementById('musicPopup');
const minimizeBtn = document.getElementById('minimizeBtn');
const expandBtn = document.getElementById('expandBtn');

const playlist = [
  { title: "Bensound - Love", src: "music/bensound-love.mp3" },
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

// // Event listeners
playBtn.addEventListener('click', playSong);
pauseBtn.addEventListener('click', pauseSong);

muteBtn.addEventListener('click', () => toggleMute(true));
unmuteBtn.addEventListener('click', () => toggleMute(false));

// minimize / expand popup
minimizeBtn.addEventListener('click', () => {
  popup.classList.add('minimized');
});

expandBtn.addEventListener('click', () => {
  popup.classList.remove('minimized');
});

// โหลดเพลงแรกตอนเริ่มต้น
loadSong(currentIndex);
playSong();  // สั่งเล่นเพลงทันทีหลังโหลด

