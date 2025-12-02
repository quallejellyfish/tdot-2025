const pageName = window.location.pathname.split("/").pop().replace(".html", "");
const quizKey = "quizScore_" + pageName;

const quizForm = document.getElementById("quizForm");
const quizResult = document.getElementById("quizResult");
const submitBtn = document.getElementById("submitQuiz");

const savedScore = localStorage.getItem(quizKey);

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
    const answer = quizForm.querySelector(`input[name="${q}"]:checked`);
    if (answer && answer.value === "1") score++;
  });

  localStorage.setItem(quizKey, score);

  quizResult.innerHTML = `<h3>Du hast ${score} / 3 richtig!</h3>`;

  quizForm.querySelectorAll("input").forEach((inp) => (inp.disabled = true));
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.5";
});
