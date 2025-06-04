let questions = [];
let currentQuestion = 0;
let userAnswers = [];
let timer;
let timeLeft = 900; // 15 minutes in seconds

// Load questions from the JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data.filter(q => q.question && q.options); // filter out invalid questions
    showQuestion();
    startTimer();
  })
  .catch(error => {
    console.error('Error loading questions:', error);
    document.getElementById('quiz-container').innerHTML = '<p>Error loading quiz questions. Please try again.</p>';
  });

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question').textContent = `Q${currentQuestion + 1}: ${q.question}`;
  
  // Access options correctly from the JSON structure
  document.getElementById('optionA').textContent = q.options.A;
  document.getElementById('optionB').textContent = q.options.B;
  document.getElementById('optionC').textContent = q.options.C;
  document.getElementById('optionD').textContent = q.options.D;
  
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
    const correct = userAnswer === q.correct_answer; // Note: correct_answer not correctAnswer
    if (correct) score++;
    
    resultsHTML += `<li><strong>Q${i + 1}:</strong> ${q.question}<br/>
                    Your answer: ${userAnswer ? q.options[userAnswer] : 'No answer'}<br/>
                    Correct answer: ${q.correct_answer} - ${q.options[q.correct_answer]}<br/>
                    ${correct ? '✅ Correct' : '❌ Incorrect'}<br/><br/></li>`;
  });
  
  resultsHTML += `</ul><p><strong>Score: ${score} / ${questions.length} (${Math.round(score/questions.length*100)}%)</strong></p>`;
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