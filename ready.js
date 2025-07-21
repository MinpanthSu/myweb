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
