const pageName = window.location.pathname.split("/").pop().replace(".html", "");
const quizKey = "quizScore_" + pageName;
const colorKey = "quizColored_" + pageName;

const quizForm = document.getElementById("quizForm");
const quizResult = document.getElementById("quizResult");
const submitBtn = document.getElementById("submitQuiz");

const savedScore = localStorage.getItem(quizKey);
const colored = localStorage.getItem(colorKey);

if (savedScore !== null) {
  const score = parseInt(savedScore);
  if (score <= 0) {
    quizForm.querySelectorAll("input").forEach((inp) => (inp.disabled = false));
    submitBtn.disabled = false;
    quizResult.innerHTML = "";
    localStorage.removeItem(quizKey);
  } else {
    quizForm.querySelectorAll("input").forEach((inp) => (inp.disabled = true));
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.5";

    quizResult.innerHTML = `<h3>Du hast ${score} / 3 richtig!</h3>`;
  }
}

submitBtn.addEventListener("click", function () {
  let score = 0;
  const answers = ["q1", "q2", "q3"];

  answers.forEach((q) => {
    const correctInput = quizForm.querySelector(
      `input[name="${q}"][value="1"]`
    );
    const userInput = quizForm.querySelector(`input[name="${q}"]:checked`);

    if (userInput && userInput.value === "1") score++;

    if (!colored) {
      if (userInput) {
        if (userInput.value === "1") {
          userInput.parentElement.style.color = "green";
        } else {
          userInput.parentElement.style.color = "red";

          correctInput.parentElement.style.color = "green";
        }
      }
    }
  });

  localStorage.setItem(quizKey, score);
  localStorage.setItem(colorKey, "1");

  quizResult.innerHTML = `<h3>Du hast ${score} / 3 richtig!</h3>`;

  quizForm.querySelectorAll("input").forEach((inp) => (inp.disabled = true));
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.5";
});
