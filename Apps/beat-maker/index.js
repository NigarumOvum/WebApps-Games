// creation of variables with window.addEventListener funcion to select elements with querySelector & querySelectorAll
window.addEventListener("load", () => {
  const sounds = document.querySelectorAll(".sound");
  const pads = document.querySelectorAll(".pads div");
  const visual = document.querySelector(".visual");
  const colors = [
    "#000000",
    "#460461",
    "#001692",
    "#00ccdb",
    "#606bd3",
    "#6b6b6b"
  ];
// Play sound when every pad clicked thanks to addEvent.Listener & create the jump bubble 
  pads.forEach((pad, index) => {
    pad.addEventListener("click", function() {
      sounds[index].currentTime = 0;
      sounds[index].play();
      createBubble(index);
    });
  });

  const createBubble = index => {
    // Create a div with createElement then append color bubbles jump animation 
    const bubble = document.createElement("div");
    visual.appendChild(bubble);
    bubble.style.backgroundColor = colors[index];
    bubble.style.animation = `jump 1s ease`;
    bubble.addEventListener("animationend", function() {
      visual.removeChild(this);
    });
  };
});
