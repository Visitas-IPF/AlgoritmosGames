let currentSteps = [];
let correctSequence = [
"Hervir el agua.",
" Colocar el agua caliente en el termo.",
" Colocar boldo en el termo.",
" Cerrar el termo.",
" Preparar la yerba en el mate.",
"Colocar la bombilla.",
"colocar yuyito en el mate.",
-"Cebar y disfrutarlo.",
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

window.onload = renderButtons;
