let currentSteps = [];
let correctSequence = [
"Levantarse de la cama.",
"Lavarse la cara.",
"Vestirse con el uniforme.",
"Desayunar.",
"Guardar útiles en la mochila.",
"Salir de casa.",
];

function shuffle(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

function renderButtons() {
  const container = document.getElementById("step-buttons");
  container.innerHTML = "";
  shuffle(correctSequence).forEach(step => {
    const btn = document.createElement("button");
    btn.textContent = step;
    btn.className = "step";
    btn.onclick = () => selectStep(step);
    container.appendChild(btn);
  });
}

function selectStep(step) {
  currentSteps.push(step);
  const li = document.createElement("li");
  li.textContent = step;
  document.getElementById("selected-steps").appendChild(li);

  // Si el jugador ya eligió todos los pasos, verificar automáticamente
  if (currentSteps.length === correctSequence.length) {
    verifySequence();
  }
}


function verifySequence() {
  const msg = document.getElementById("result-message");

  if (currentSteps.length !== correctSequence.length) {
    msg.textContent = "🚨 Faltan pasos.";
    msg.className = "error";
    return;
  }

  const correct = currentSteps.every((s, i) => s === correctSequence[i]);
  if (correct) {
    msg.textContent = "✅ ¡Correcto!";
    msg.className = "correct";
    launchConfetti();
    showFinalPage();
  } else {
    msg.textContent = "❌ Orden incorrecto.";
    msg.className = "error";
    resetGame();
  }
}

function resetGame() {
  currentSteps = [];
  document.getElementById("selected-steps").innerHTML = "";
  renderButtons();
}

function showFinalPage() {
  // Ocultar el contenido del juego
  document.getElementById("main-content").style.display = "none";

  // Mostrar la pantalla final en pantalla completa
  document.getElementById("final-page").innerHTML = `
    <div class="victory-screen">
      <div class="victory-border">
        <div class="cloud cloud1"></div>
        <div class="cloud cloud2"></div>
        <div class="cloud cloud3"></div>
        <h1 class="victory-text">¡Felicitaciones!</h1>
        <div class="trophy"></div>
        <button class="replay-btn" onclick="location.reload()">Volver a jugar</button>
      </div>
    </div>
  `;
  document.getElementById("final-page").style.display = "block";
}


function launchConfetti() {
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.textContent = ["🎉", "✨", "🎊", "💥", "🌟"][Math.floor(Math.random() * 5)];
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}

window.onload = renderButtons;
