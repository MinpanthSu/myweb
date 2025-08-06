// ===== เตรียม DOM element หลัก =====
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const muteBtn = document.getElementById('muteBtn');
const unmuteBtn = document.getElementById('unmuteBtn');
const songTitle = document.getElementById('songTitle');
const popup = document.getElementById('musicPopup');
const minimizeBtn = document.getElementById('minimizeBtn');
const expandBtn = document.getElementById('expandBtn');

// ===== เตรียมเพลง =====
const playlist = [
  { title: "Bensound - Love", src: "music/bensound-love.mp3" },
];
let currentIndex = 0;
const hbdAudio = new Audio('music/music_hbd.mp3');
hbdAudio.loop = true;

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
playBtn.addEventListener('click', playSong);
pauseBtn.addEventListener('click', pauseSong);
muteBtn.addEventListener('click', () => toggleMute(true));
unmuteBtn.addEventListener('click', () => toggleMute(false));
minimizeBtn.addEventListener('click', () => {
  popup.classList.add('minimized');
  expandBtn.style.display = 'block';
});
expandBtn.addEventListener('click', () => {
  popup.classList.remove('minimized');
  expandBtn.style.display = 'none';
});
loadSong(currentIndex);
expandBtn.style.display = 'none';

// ===== Intro =====
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const introPopup = document.getElementById("introPopup");
  document.querySelector(".letter-container").style.display = "none";

  startBtn.addEventListener("click", () => {
    introPopup.style.display = "none";
    popup.classList.remove('minimized');
    expandBtn.style.display = "none";
    loadSong(0);
    playSong();

    // แสดง Min
    minWrapper.style.display = 'block';
    setTimeout(() => {
      minWrapper.classList.remove('center');
      minWrapper.classList.add('bottom-right');
      showDialogue(0); 
    }, 1200);
  });
});

// ===== คำถาม =====
const questions = [
  "คำถาม 1: ", "คำถาม 2: ", "คำถาม 3: "
];
let currentQuestion = 0;

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    document.getElementById("questionText").textContent = questions[currentQuestion];
  } else {
    document.getElementById("questionBox").style.display = "none";
    document.querySelector(".letter-container").style.display = "block";
  }
}

// ===== จดหมาย =====
const letterBtn = document.getElementById('letterBtn');
const paperPopup = document.getElementById('paperPopup');
const closePaper = document.getElementById('closePaper');
let letterOpened = false;

letterBtn.addEventListener('click', () => {
  if (letterOpened) return;
  letterOpened = true;
  letterBtn.src = 'image/letter_paper.gif';
  audio.pause();
  hbdAudio.play();
  playBtn.style.display = 'inline-block';
  pauseBtn.style.display = 'none';

  setTimeout(() => {
    paperPopup.classList.remove('hidden');
    setTimeout(() => paperPopup.classList.add('active'), 10);
  }, 1300);
});

closePaper.addEventListener('click', () => {
  paperPopup.classList.remove('active');
  setTimeout(() => {
    paperPopup.classList.add('hidden');
    showFinalDialogues();
  }, 300);
  hbdAudio.pause();
  hbdAudio.currentTime = 0;
  audio.play();
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-block';
  letterBtn.src = 'image/letter_close.png';
  letterOpened = false;
});

// ===== บทสนทนา Min =====
const msgWrapper = document.querySelector('.message-wrapper');
const minImg = document.querySelector('.person-img');
const questionBox = document.getElementById('questionBox');
const minSpeech = document.getElementById("minSpeech");
const minWrapper = document.getElementById("minWrapper");

msgWrapper.style.display = 'none';
questionBox.style.display = 'none';

const dialogues = [
  { text: "...", image: "image/minsmile.png" },
  { text: "สวัสดีค้าบบ ให้ทายใครเอ่ยย ... มินเองงง", image: "image/minbye.png" },
  { text: "เดี๋ยวจะมีเกมตอบคำถามให้เล่นนะ", image: "image/minget.png" }
];
let dialogueIndex = 0;

function showDialogue(index) {
  if (index < dialogues.length) {
    minImg.src = dialogues[index].image;
    typeText(dialogues[index].text, minSpeech);
    document.getElementById("nextBtnContainer").style.display = "block";
  }
}

document.getElementById("nextBtn").addEventListener("click", () => {
  if (!isInFinalDialogue) {
    if (dialogueIndex < dialogues.length - 1) {
      dialogueIndex++;
      showDialogue(dialogueIndex);
    } else if (dialogueIndex === dialogues.length - 1) {
      document.getElementById("nextBtnContainer").style.display = "none";
      minSpeech.textContent = "";
      showQuestion1();
    }
  } else {
    if (finalDialogueIndex < finalDialogues.length - 1) {
      finalDialogueIndex++;
      showNextFinalDialogue();
    } else {
      document.getElementById("nextBtnContainer").style.display = "none";
      minSpeech.textContent = "";
      isInFinalDialogue = false; // ✅ จบบทสุดท้ายแล้ว เคลียร์สถานะ
    }
  }
});


// ===== คำถาม =====
function showQuestion1() {
  minImg.src = 'image/minkid.png';
  questionBox.innerHTML = `
    <p>คำถาม 1: วันหนึ่งคุณกำลังเดินกลับบ้าน เจอสัตว์สองตัวที่น่ารักกำลังจ้องหน้าคุณอยู่ คุณจะลูบสัตว์ตัวไหนก่อน?</p>
    <button onclick="answerQ1('dog')">หมา</button>
    <button onclick="answerQ1('cat')">แมว</button>
  `;
  questionBox.style.display = "block";
}

function answerQ1(choice) {
  if (choice === 'dog') {
    minImg.src = 'image/mindog.png';
    typeText("บ็อกๆ ลูบหัวเค้าหน่อยย ><", minSpeech);
  } else {
    minImg.src = 'image/minmeow.png';
    typeText("เหมี๊ยววว ลูบหัวเค้าหน่อยย ><", minSpeech);
  }
  setTimeout(() => showQuestion2(choice), 100);
}

function showQuestion2(prevChoice) {
  questionBox.innerHTML = `
    <p>คำถาม 2: ทายสิว่าวันนี้วันอะไร?</p>
    <button onclick="answerQ2('birthday')">วันเกิด</button>
    <button id="wrongBtn" onclick="answerQ2('wrong')">ไม่รู้</button>
    <br><br><button onclick="goBackToQ1()">ย้อนกลับ</button>
  `;
}

function goBackToQ1() {
  minImg.src = 'image/minlaugh.png';
  typeText("ฮั่นแน่ อยากให้เป็นสัตว์อีกตัวล่ะสิ้~", minSpeech);
  showQuestion1();
}


function answerQ2(choice) {
  if (choice === 'birthday') {
    minImage.src = 'image/mindaisyflower.png';
    typeText("เก่งมากค้าบเบ้บ เค้ามีอะไรอยากให้ดูด้วยย", minSpeech);
    setTimeout(showQuestion3, 100);
  } else {
    minImage.src = 'image/minngon.png';
    typeText("คิดดีๆสิ เอาใหม่น้าาา", minSpeech);
    
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
  typeText("งั้นมาลองเปิดซองดูกันมั้ยย", minSpeech);
  document.querySelector(".letter-container").style.display = "block";
}

// ===== บทสุดท้าย =====
const finalDialogues = [
  { text: "สุดท้ายแล้วนะ เค้าอยากบอกว่า รักเบ้บนะคั้บบ ><", image: "image/minsmile.png" },
  { text: "ขอบคุณที่อยู่ดูถึงตอนนี้นะงับ", image: "image/minlaugh.png" },
  { text: "ไว้เค้าไปหาบ่อยๆนะ รักนะคนเก่งของเค้า บ๊ะบายน้าาาา", image: "image/minbye.png" }
];

let finalDialogueIndex = 0;
let isInFinalDialogue = false;

function showFinalDialogues() {
  msgWrapper.style.display = 'block';
  isInFinalDialogue = true; // ✅ บอกว่าเข้าโหมด final แล้ว
  finalDialogueIndex = 0;
  showNextFinalDialogue();
}

function showNextFinalDialogue() {
  if (finalDialogueIndex < finalDialogues.length) {
    const { text, image } = finalDialogues[finalDialogueIndex];
    minImg.src = image;
    typeText(text, minSpeech);
    document.getElementById("nextBtnContainer").style.display = "block";
  } else {
    document.getElementById("nextBtnContainer").style.display = "none";
    minSpeech.textContent = "";
  }
}

// ===== ฟังก์ชันพิมพ์ตัวอักษร =====
function typeText(text, element) {
  let i = 0;
  element.textContent = "";
  element.style.opacity = 1;
  const typing = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i === text.length) clearInterval(typing);
  }, 70);
}

// ===== หากเรียกจากนอกไฟล์ =====
window.loadSong = loadSong;
window.playSong = playSong;
