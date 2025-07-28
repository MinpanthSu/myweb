// เตรียม DOM element หลัก
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const muteBtn = document.getElementById('muteBtn');
const unmuteBtn = document.getElementById('unmuteBtn');
const songTitle = document.getElementById('songTitle');

const popup = document.getElementById('musicPopup');
const minimizeBtn = document.getElementById('minimizeBtn');
const expandBtn = document.getElementById('expandBtn');

// เตรียมเพลงหลัก
const playlist = [
  { title: "Bensound - Love", src: "music/bensound-love.mp3" },
];
let currentIndex = 0;

// เตรียมเพลง HBD
const hbdAudio = new Audio('music/music_hbd.mp3');
hbdAudio.loop = true;

// โหลดเพลงหลัก
function loadSong(index) {
  const song = playlist[index];
  audio.src = song.src;
  songTitle.textContent = "🎶 " + song.title;
  audio.load();
}

// ควบคุมเพลงหลัก
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

// ปุ่มควบคุมเพลงหลัก
playBtn.addEventListener('click', playSong);
pauseBtn.addEventListener('click', pauseSong);
muteBtn.addEventListener('click', () => toggleMute(true));
unmuteBtn.addEventListener('click', () => toggleMute(false));

// ปุ่มย่อ popup เพลง
minimizeBtn.addEventListener('click', () => {
  popup.classList.add('minimized');
  expandBtn.style.display = 'block';
});

// ปุ่มขยาย popup เพลง
expandBtn.addEventListener('click', () => {
  popup.classList.remove('minimized');
  expandBtn.style.display = 'none';
});

// โหลดเพลงหลักทันที
loadSong(currentIndex);
expandBtn.style.display = 'none';

// จัดการ popup intro
document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("startBtn");
  const introPopup = document.getElementById("introPopup");

  startBtn.addEventListener("click", function () {
    introPopup.style.display = "none";
    popup.classList.remove('minimized');
    expandBtn.style.display = "none";

    // เริ่มเล่นเพลงหลัก
    loadSong(0);
    playSong();
  });
});

// คำถาม
const questions = [
  "คำถาม 1: ",
  "คำถาม 2: ",
  "คำถาม 3: "
];
let currentQuestion = 0;

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    document.getElementById("questionText").textContent = questions[currentQuestion];
  } else {
    // ✅ ซ่อนคำถาม
    document.getElementById("questionBox").style.display = "none";

    // ✅ แสดงปุ่มจดหมาย (หรือกระดาษได้ทันที)
    document.querySelector(".letter-container").style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // ซ่อน letter ตอนเริ่ม
  document.querySelector(".letter-container").style.display = "none";
});


// จัดการ "จดหมาย" และ popup กระดาษ
const letterBtn = document.getElementById('letterBtn');
const paperPopup = document.getElementById('paperPopup');
const closePaper = document.getElementById('closePaper');

let letterOpened = false;

letterBtn.addEventListener('click', () => {
  if (letterOpened) return;
  letterOpened = true;

  // เปลี่ยนภาพเป็น gif
  letterBtn.src = 'image/letter_paper.gif';

  // หยุดเพลงหลัก + เล่น HBD ทันที
  audio.pause();
  hbdAudio.play();

  playBtn.style.display = 'inline-block';
  pauseBtn.style.display = 'none';

  // ✅ ดีเลย์ 1.3 วิ ก่อนแสดง popup
  setTimeout(() => {
    paperPopup.classList.remove('hidden');
    setTimeout(() => paperPopup.classList.add('active'), 10);
  }, 1300);
});

closePaper.addEventListener('click', () => {
  paperPopup.classList.remove('active');
  setTimeout(() => paperPopup.classList.add('hidden'), 300);

  // หยุดเพลง HBD
  hbdAudio.pause();
  hbdAudio.currentTime = 0;

  // เล่นเพลงหลักกลับ
  audio.play();
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-block';

  // 🔄 เปลี่ยนกลับเป็นภาพนิ่ง
  letterBtn.src = 'image/letter_close.png';
  letterOpened = false;
});
//------------------------------------------------------------
const msgWrapper = document.querySelector('.message-wrapper');
const minImg = document.querySelector('.person-img');
const questionBox = document.getElementById('questionBox');
const minSpeech = document.getElementById("minSpeech");

// เริ่มจากซ่อนไว้
msgWrapper.style.display = 'none';
questionBox.style.display = 'none';

function typeText(text, element, callback) {
  let i = 0;
  element.textContent = "";
  element.style.opacity = 1;

  const typing = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i === text.length) {
      clearInterval(typing);
      if (callback) {
        setTimeout(() => {
          element.style.opacity = 0;
          callback();
        }, 3000); // หลังพิมพ์เสร็จ รอ 3 วิ แล้วค่อยหาย
      }
    }
  }, 100); // ความเร็วในการพิมพ์ (ms)
}

// หลังกด Ready
startBtn.addEventListener("click", function () {
  // ... introPopup ปิด + เพลงเล่น

  // แสดง Min กลางจอ
  minWrapper.style.display = 'block';

  // เปลี่ยนท่าทาง
  setTimeout(() => {
    minImage.src = 'image/minbye.png';

    // ผ่านไปอีกนิด ย้ายไปมุมล่างขวา + โชว์คำถาม
    setTimeout(() => {
      minWrapper.classList.remove('center');
      minWrapper.classList.add('bottom-right');
    
    // เริ่มแสดงข้อความทีละตัว
    typeText("สวัสดี", minSpeech, () => {
      // หลังข้อความหาย ค่อยย้ายไปมุมล่างขวา + โชว์คำถาม
      minWrapper.classList.remove('center');
      minWrapper.classList.add('bottom-right');
      questionBox.style.display = "block";
    });

    // แสดงกล่องคำถาม
    document.getElementById("questionBox").style.display = "block";
    }, 3000);
  }, 1000);
});


// ฟังก์ชัน export หากต้องใช้จากนอก
window.loadSong = loadSong;
window.playSong = playSong;
