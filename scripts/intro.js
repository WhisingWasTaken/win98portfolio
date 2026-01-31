  const video = document.getElementById('bootVideo');
  const startMessage = document.getElementById('startMessage');
  const skipPopup = document.getElementById('skipPopup');
  const powerBtn = document.getElementById('powerBtn');

  video.addEventListener('ended', () => {
    window.location.href = "login.html";
  });

  function startSequence() {
    startMessage.style.display = "none";
    video.style.display = "block";
    skipPopup.style.display = "block";
    powerBtn.style.display = "none";

    video.muted = false;
    video.play();
  }

  document.addEventListener('keydown', (e) => {
    if (e.code === "F11") {
      setTimeout(() => {
        if (document.fullscreenElement || window.innerHeight === screen.height) {
          startSequence();
        }
      }, 500);
    }

    if (e.code === "Space" && video.style.display === "block") {
      window.location.href = "login.html";
    }
  });

  powerBtn.addEventListener('click', () => {
    alert("Please enable fullscreen manually (F11 or browser menu). Starting PCX...");
    startSequence();
  });