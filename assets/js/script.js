const nextButton = document.getElementById('next-btn');
const questionBoxElement = document.getElementById('question-box');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const scoreAreaElement = document.getElementById('score-area');
const scorePointsElement = document.getElementById('score-points');

let randomQuestions, currentQuestionIndex;

nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
});

function startGame() {
    startButton.classlList.add('hide');
    randomQuestions = questions.sort(() => Math.random() - .5 );
    currentQuestionIndex = 0;
    questionElement.classList.remove('hide');
    scoreArea.classList.remove('hide');
    setNextQuestion();
    scorePointsElement.textContent = 0;
};

function setNextQuestion() {
    resetState();
    showQuestion(randomQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answers => {
        const button = document.createElement('button');
        button.innerText = answers.text;
        button.classList.add('btn');
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener('click', selectAnswers);
        answersElement.appendChild(button)
        
    })
};

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild)
    }
};