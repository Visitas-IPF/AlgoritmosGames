let currentLevel = 1;
let currentSteps = [];
let correctSequence = [];
let decision = "";

const level1Steps = [
  "Despertar",
  "Levantarse de la cama",
  "Cepillarse los dientes",
  "Tomar el desayuno",
  "Prepararse para ir a la escuela",
];

const teaSteps = [
  "Hervir agua",
  "Colocar la bolsita de té en la taza",
  "Verter el agua caliente",
  "Esperar unos minutos",
  "Retirar la bolsita y disfrutar",
];

const coffeeSteps = [
  "Hervir agua",
  "Colocar café en la taza y el azúcar",
  "Verter agua caliente en la taza",
  "Revolver",
  "Esperar unos minutos hasta que entibie",
  "Tomarlo y disfrutar",
];

function shuffle(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

function renderButtons(steps) {
  const container = document.getElementById("step-buttons");
  container.innerHTML = "";
  shuffle(steps).forEach((step) => {
    const btn = document.createElement("button");
    btn.textContent = step;
    btn.className = "step";
    btn.onclick = () => selectStep(step);
    container.appendChild(btn);
  });
}

function selectStep(step) {
  currentSteps.push(step);
  const list = document.getElementById("selected-steps");
  const li = document.createElement("li");
  li.textContent = step;
  list.appendChild(li);
  checkProgress();
}

function verifySequence() {
  const message = document.getElementById("result-message");

  if (currentSteps.length !== correctSequence.length) {
    message.textContent = "🚨 Aún faltan pasos por agregar.";
    message.style.color = "orange";
    return;
  }

  const isCorrect = currentSteps.every((step, index) => step === correctSequence[index]);

  if (isCorrect) {
    message.textContent = "✅ ¡Correcto! Has completado el algoritmo.";
    message.style.color = "green";
    launchConfetti(); 

    if (currentLevel === 1) {
      document.getElementById("next-level").style.display = "inline-block";
      document.getElementById("instructions").textContent = "¡Nivel completado! 🎉";
      launchConfetti(); 
    } else {
      showFinalPage();
    }
  } else {
    message.textContent = "❌ El orden no es correcto. Intentá de nuevo.";
    message.style.color = "red";
    resetGame();
  }
}

function checkProgress() {
  if (currentSteps.length === correctSequence.length) {
    verifySequence();
  }
}

function resetGame() {
  currentSteps = [];
  document.getElementById("selected-steps").innerHTML = "";
  document.getElementById("next-level").style.display = "none";

  if (currentLevel === 1) {
    correctSequence = level1Steps;
    renderButtons(correctSequence);
  } else if (currentLevel === 2) {
    showDecision();
  }
}

function nextLevel() {
  currentLevel = 2;
  decision = "";
  document.getElementById("result-message").textContent = "";
  document.getElementById("instructions").textContent = "Elige qué bebida preparar:";
  document.getElementById("next-level").style.display = "none";
  document.getElementById("selected-steps").innerHTML = "";
  document.getElementById("step-buttons").innerHTML = "";
  document.getElementById("choice-container").innerHTML = `
    <button class="choice-button" onclick="startDrink('té')">🍵 Té</button>
    <button class="choice-button" onclick="startDrink('café')">☕ Café</button>
  `;
}

function showDecision() {
  if (decision === "té") {
    correctSequence = teaSteps;
  } else {
    correctSequence = coffeeSteps;
  }
  renderButtons(correctSequence);
}

function startDrink(type) {
  decision = type;
  document.getElementById("choice-container").innerHTML = "";
  document.getElementById("instructions").textContent = `Preparando ${type}...`;
  resetGame();
}

function showFinalPage() {
  // Ocultamos el juego
  document.getElementById("main-content").style.display = "none";

  // Creamos pantalla final
  document.getElementById("final-page").innerHTML = `
    <div class="victory-screen">
      <div class="victory-border">
        <div class="cloud cloud1"></div>
        <div class="cloud cloud2"></div>
        <div class="cloud cloud3"></div>
        <h1 class="victory-text">YOU WIN!!!</h1>
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

window.onload = () => {
  correctSequence = level1Steps;
  renderButtons(correctSequence);
};