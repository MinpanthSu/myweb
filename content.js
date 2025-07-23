document.addEventListener("DOMContentLoaded", function() {
  const startBtn = document.getElementById("startBtn");
  const introPopup = document.getElementById("introPopup");
  const musicPopup = document.getElementById("musicPopup");

  startBtn.addEventListener("click", function() {
    // ซ่อน ready popup ด้วย display:none
    introPopup.style.display = "none";

    // แสดง music popup ด้วยการเอา class minimized ออก
    musicPopup.classList.remove('minimized');

    // ถ้ามีปุ่มขยาย ให้ซ่อนไว้ (ถ้าต้องการ)
    const expandBtn = document.getElementById("expandBtn");
    if (expandBtn) {
      expandBtn.style.display = "none";
    }

    // โหลดและเล่นเพลง
    if (typeof loadSong === "function" && typeof playSong === "function") {
      loadSong(0);
      playSong();
    }
  });
});

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

// เริ่มต้นซ่อนปุ่ม expand
expandBtn.style.display = 'none';

// ย่อ popup เพลง + แสดงปุ่ม expand
minimizeBtn.addEventListener('click', () => {
  popup.classList.add('minimized');
  expandBtn.style.display = 'block';
});

// ขยาย popup เพลง + ซ่อนปุ่ม expand
expandBtn.addEventListener('click', () => {
  popup.classList.remove('minimized');
  expandBtn.style.display = 'none';
});

// Event listeners สำหรับปุ่มเพลง
playBtn.addEventListener('click', playSong);
pauseBtn.addEventListener('click', pauseSong);
muteBtn.addEventListener('click', () => toggleMute(true));
unmuteBtn.addEventListener('click', () => toggleMute(false));

// โหลดเพลงแรกตอนเริ่มต้น
loadSong(currentIndex);

// export ฟังก์ชันไว้ถ้าต้องเรียกจากที่อื่น
window.loadSong = loadSong;
window.playSong = playSong;

// จัดการกระดาษและเพลง HBD
const letterBtn = document.getElementById('letterBtn');
const paperPopup = document.getElementById('paperPopup');
const closePaper = document.getElementById('closePaper');

// เตรียมเสียง HBD
const hbdAudio = new Audio('music/music_hbd.mp3');
hbdAudio.loop = true;

letterBtn.addEventListener('click', () => {
  // แสดงกระดาษพร้อม animation
  paperPopup.classList.remove('hidden');
  setTimeout(() => paperPopup.classList.add('active'), 10);

  // หยุดเพลงหลัก
  audio.pause();

  // เล่นเพลง HBD
  hbdAudio.play();

  // ปรับปุ่มเพลงให้ถูกต้อง
  playBtn.style.display = 'inline-block';
  pauseBtn.style.display = 'none';
});

closePaper.addEventListener('click', () => {
  // ซ่อนกระดาษ
  paperPopup.classList.remove('active');
  setTimeout(() => paperPopup.classList.add('hidden'), 300);

  // หยุดเพลง HBD
  hbdAudio.pause();
  hbdAudio.currentTime = 0;

  // กลับมาเล่นเพลงหลัก
  audio.play();

  // ปรับปุ่มเพลง
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-block';
});
