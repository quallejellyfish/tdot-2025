const editBtn = document.getElementById("editModeBtn312");
let editMode = false;

function updateTotalScore() {
  let totalCorrect = 0;
  let totalPossible = 0;

  document.querySelectorAll(".quiz-item").forEach((room) => {
    const roomName = room.getAttribute("data-room");
    if (!roomName) return;

    const savedScore = localStorage.getItem("quizScore_" + roomName);

    totalCorrect += savedScore ? parseInt(savedScore) : 0;
    totalPossible += 3;
  });

  const totalScoreElement = document.getElementById("totalScore");
  const bonusTextElement = document.getElementById("bonusText");

  if (totalScoreElement) {
    totalScoreElement.textContent = `Gesamtscore: ${totalCorrect} / ${totalPossible - 3}`;
  }
  if (bonusTextElement) {
    const percent = (totalCorrect / totalPossible) * 100;

    if (totalCorrect === totalPossible) {
      bonusTextElement.textContent =
        "Perfekt! Du hast alle Fragen richtig beantwortet! 🎉";
    } else if (percent >= 80) {
      bonusTextElement.textContent = "Sehr gut! Du bist fast perfekt! 🔥";
    } else if (percent >= 50) {
      bonusTextElement.textContent = "Gut gemacht! Hälfte richtig! 💪";
    }
  }
}

const roomItems = document.querySelectorAll(".quiz-item");

roomItems.forEach((room) => {
  const roomName = room.getAttribute("data-room");

  if (!roomName) return;

  const scoreDisplay = room.querySelector(".quiz-score");
  const resetBtn = room.querySelector(".resetScoreBtn");

  // laden von Quiz-Score
  const savedScore = localStorage.getItem("quizScore_" + roomName);
  scoreDisplay.textContent = savedScore !== null ? savedScore + "/3" : "–";

  // zurücksetzten Knopf
  resetBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();

    localStorage.removeItem("quizScore_" + roomName);
    scoreDisplay.textContent = "–";

    updateTotalScore();

    alert("Score von " + roomName + " wurde zurückgesetzt!");
  });
});

editBtn.addEventListener("click", () => {
  editMode = !editMode;
  editBtn.textContent = editMode ? "-" : "-";

  document
    .querySelectorAll(".resetScoreBtn")
    .forEach((btn) => (btn.style.display = editMode ? "inline-block" : "none"));
});

updateTotalScore();

