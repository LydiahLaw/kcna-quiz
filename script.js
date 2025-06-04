let questions = [];
let currentQuestion = 0;
let userAnswers = [];
let timer;
let timeLeft = 900; // 15 minutes in seconds

// Load questions from the JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data.filter(q => q.question && q.optionA); // filter out NaNs
    showQuestion();
    startTimer();
  });

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question').textContent = `Q${currentQuestion + 1}: ${q.question}`;
  document.getElementById('optionA').textContent = q.optionA;
  document.getElementById('optionB').textContent = q.optionB;
  document.getElementById('optionC').textContent = q.optionC;
  document.getElementById('optionD').textContent = q.optionD;

  // Reset checked option
  document.querySelectorAll('input[name="option"]').forEach(el => el.checked = false);

  if (userAnswers[currentQuestion]) {
    document.querySelector(`input[value="${userAnswers[currentQuestion]}"]`).checked = true;
  }

  updateButtons();
}

function selectAnswer(value) {
  userAnswers[currentQuestion] = value;
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function updateButtons() {
  document.getElementById('prevBtn').disabled = currentQuestion === 0;
  document.getElementById('nextBtn').disabled = currentQuestion === questions.length - 1;
  document.getElementById('submitBtn').style.display = currentQuestion === questions.length - 1 ? 'inline' : 'none';
}

function submitQuiz() {
  clearInterval(timer);
  let score = 0;
  let resultsHTML = "<h2>Quiz Results</h2><ul>";
  questions.forEach((q, i) => {
    const userAnswer = userAnswers[i];
    const correct = userAnswer === q.correctAnswer;
    if (correct) score++;
    resultsHTML += `<li><strong>Q${i + 1}:</strong> ${q.question}<br/>
                    Your answer: ${userAnswer || 'No answer'}<br/>
                    Correct answer: ${q.correctAnswer}<br/>
                    Explanation: ${q.explanation || 'N/A'}<br/><br/></li>`;
  });
  resultsHTML += `</ul><p><strong>Score: ${score} / ${questions.length}</strong></p>`;
  document.getElementById('quiz-container').innerHTML = resultsHTML;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `⏱️ ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitQuiz();
    }
  }, 1000);
}
