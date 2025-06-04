# KCNA Practice Quiz

This is a simple, fun web-based quiz app I built to help me and others prepare for the Kubernetes and Cloud Native Associate (KCNA) exam. It loads a set of multiple-choice questions from a `questions.json` file and lets you answer them, navigate back and forth, and see your final score and explanations at the end.

## 🚀 Features

- ✅ Multiple-choice questions with options A–D
- ✅ Timer (1hr 30 minutes by default)
- ✅ Navigation between questions (Next/Previous)
- ✅ Submit button appears on the last question
- ✅ Instant results with score, correct answers, and explanations
- ✅ Mobile responsive layout
- ✅ Fully static (can be hosted on GitHub Pages)

## 📁 Folder Structure

kcna-quiz/
├── index.html
├── style.css
├── script.js
├── questions.json
└── README.md


## 🛠️ How to Use

1. **Clone the repository**

```bash
git clone https://github.com/LydiahLaw/kcna-quiz.git
cd kcna-quiz
```


Open index.html in your browser

No server setup is needed. It's a static app built with just HTML, CSS, and JavaScript.

## Or visit the live site:
👉 https://lydiahlaw.github.io/kcna-quiz

🧩 How It Works
Questions are loaded from questions.json

Each question must include:
"question": the question text
"optionA" to "optionD": answer choices
"correctAnswer": the correct letter (e.g., "B")
"explanation": (optional) explanation shown after results

{
  "question": "What is the function of a StorageClass in Kubernetes?",
  "optionA": "To define types of storage",
  "optionB": "To claim a specific PV",
  "optionC": "To attach storage to a Pod",
  "optionD": "To backup volume data",
  "correctAnswer": "A",
  "explanation": "A StorageClass defines how a storage volume is dynamically provisioned in Kubernetes."
}

Hosting on GitHub Pages
Push your code to a GitHub repository
Go to Settings > Pages
Under “Source,” select the main branch and root (/)

Save — GitHub will publish your site at:
https://yourusername.github.io/your-repo-name

🧠 Why I Built This
I'm learning cloud engineering and prepping for the KCNA exam. I wanted to create a small real-world project that uses frontend skills, JSON data, GitHub Pages hosting, and gives me something practical and interactive to share in my portfolio. I also wanted something others could use too!

🙌 Contributing
Feel free to fork and improve:
Add more questions to questions.json
Improve the UI/UX
Add domain filtering or score breakdown

##📜 License
MIT — free to use, modify, and share.

## 📜 License
MIT — free to use, modify, and share.

**Data Source:** [KCNA Exam Question Dump (Google Sheet)](https://docs.google.com/spreadsheets/d/1HsBaU3A6Md8IfRMWyt2vU_nInjMIsDsZtpg8eRxqdRg/edit?gid=0#gid=0)
