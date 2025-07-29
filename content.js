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
  introPopup.style.display = "none";
  popup.classList.remove('minimized');
  expandBtn.style.display = "none";
  loadSong(0);
  playSong();

  // แสดง Min กลางจอ
  minWrapper.style.display = 'block';

  setTimeout(() => {
    minWrapper.classList.remove('center');
    minWrapper.classList.add('bottom-right');
    showDialogue(0); // 👈 เรียกตรงนี้เพื่อเริ่มลำดับ
  }, 1200);
});


const dialogues = [
  { text: "สวัสดี", image: "image/minsmile.png" },
  { text: "เดี๋ยวจะมีเกมตอบคำถามให้เล่นนะ", image: "image/minsmile.png" }
];

let dialogueIndex = 0;

// โชว์ข้อความพร้อมปุ่มถัดไป
function showDialogue(index) {
  if (index < dialogues.length) {
    minImage.src = dialogues[index].image;
    typeText(dialogues[index].text, minSpeech);
    document.getElementById("nextBtnContainer").style.display = "block";
  }
}

document.getElementById("nextBtn").addEventListener("click", () => {
  dialogueIndex++;
  if (dialogueIndex < dialogues.length) {
    showDialogue(dialogueIndex);
  } else {
    // เริ่มคำถาม 1
    document.getElementById("nextBtnContainer").style.display = "none";
    showQuestion1();
  }
});

// เริ่มคำถาม 1
function showQuestion1() {
  minImage.src = 'image/minkid.png';
  questionBox.innerHTML = `
    <p>คำถาม 1: วันหนึ่งคุณกำลังเดินกลับบ้าน เจอสัตว์สองตัวที่น่ารักกำลังจ้องหน้าคุณอยู่ คุณจะลูบสัตว์ตัวไหนก่อน?</p>
    <button onclick="answerQ1('dog')">หมา</button>
    <button onclick="answerQ1('cat')">แมว</button>
  `;
  questionBox.style.display = "block";
}

function answerQ1(choice) {
  if (choice === 'dog') {
    minImage.src = 'image/mindog.png';
    minSpeech.textContent = "บ็อกๆ ลูบหัวเค้าหน่อยย ><";
  } else {
    minImage.src = 'image/minmeow.png';
    minSpeech.textContent = "เหมี๊ยววว ลูบหัวเค้าหน่อยย ><";
  }
  setTimeout(() => showQuestion2(choice), 800); // รอแป๊บแล้วไปต่อ
}

function showQuestion2(prevChoice) {
  questionBox.innerHTML = `
    <p>คำถาม 2: หลังจากกนั้นคุณก็กลับมาถึงห้อง และพบว่าวันนี้เป็นวันพิเศษของคุณ ทายสิว่าวันนี้วันอะไร?</p>
    <button onclick="answerQ2('birthday')">วันเกิด</button>
    <button id="wrongBtn" onclick="answerQ2('wrong')">ไม่รู้</button>
    <br><br>
    <button onclick="goBackToQ1()">ย้อนกลับ</button>
  `;
}

function goBackToQ1() {
  // ล้างคำพูดและเปลี่ยนเป็นภาพเริ่มต้น
  minSpeech.textContent = "ฮั่นแน่ อยากให้เป็นสัตว์อีกตัวล่ะสิ้~";

  // แสดงคำถาม 1 ใหม่
  minImage.src = 'image/minlaugh.png';
  questionBox.innerHTML = `
    <p>คำถาม 1: วันหนึ่งคุณกำลังเดินกลับบ้าน เจอสัตว์สองตัวที่น่ารักกำลังจ้องหน้าคุณอยู่ คุณจะลูบสัตว์ตัวไหนก่อน?</p>
    <button onclick="answerQ1('dog')">หมา</button>
    <button onclick="answerQ1('cat')">แมว</button>
  `;
  questionBox.style.display = "block";
}


function answerQ2(choice) {
  if (choice === 'birthday') {
    minImage.src = 'image/mindaisyflower.png';
    minSpeech.innerHTML = "เก่งมากค้าบบี๋ เอาดอกไม้ไปก่อนน้าา <br>และเค้ามีอะไรอยากให้ดูด้วยย";
    setTimeout(showQuestion3, 800);
  } else {
    minImage.src = 'image/minngon.png';
    minSpeech.textContent = "คิดดีๆสิ เอาใหม่น้าาา";

    // ปิดปุ่ม "ไม่รู้"
    const wrongBtn = document.getElementById("wrongBtn");
    wrongBtn.disabled = true;
    wrongBtn.style.background = "#ccc";
    wrongBtn.style.cursor = "not-allowed";

    // เปลี่ยนคำตอบเหลือแค่ "วันเกิด"
    questionBox.innerHTML = `
      <p>คำถาม 2: ทายสิว่าวันนี้วันอะไร?</p>
      <button onclick="answerQ2('birthday')">วันเกิด</button>
      <button style="background:#ccc; cursor:not-allowed;" disabled>ไม่รู้</button>
    `;
  }
}

function showQuestion3() {
  questionBox.innerHTML = `
    <p>คำถาม 3: พร้อมมั้ยยย?</p>
    <button onclick="answerQ3()">พร้อมม</button>
    <button onclick="answerQ3()">พร้อมมากกกก</button>
  `;
}

function answerQ3() {
  questionBox.style.display = "none";
  minSpeech.textContent = "งั้นมาลองเปิดซองดูกันมั้ยย";
  document.querySelector(".letter-container").style.display = "block";
}

// gen text
function typeText(text, element) {
  let i = 0;
  element.textContent = "";
  element.style.opacity = 1;
  const typing = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i === text.length) {
      clearInterval(typing);
    }
  }, 70);
}


// ฟังก์ชัน export หากต้องใช้จากนอก
window.loadSong = loadSong;
window.playSong = playSong;
