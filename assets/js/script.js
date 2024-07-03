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
    randomQuestions = questions.sort(() => Math.random() - .5);
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

function selectAnswers(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    processResults(correct);
    setStatusClass(document.body, correct);

    Array.from(answersElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (randomQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'Restart';
        nextButton.classList.remove('hide');
    }
};

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
};

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
};

let questions = [{
    question: 'What is the capital of France?',
    answers: [{
        text: 'Prague',
        correct: false
    },
    {
        text: 'Paris',
        correct: true
    },
    {
        text: 'Pristina',
        correct: false
    },
    ]
},
{
    question: 'What is the capital of Luxembourg?',
    answers: [{
        text: 'Bonn',
        correct: false
    },
    {
        text: 'Lima',
        correct: false
    },
    {
        text: 'Luxembourg',
        correct: true
    },
    ]
},
{
    question: 'What is the capital of Canada?',
    answers: [{
        text: 'Toronto',
        correct: false
    },
    {
        text: 'Ottawa',
        correct: true
    },
    {
        text: 'Vancouver',
        correct: false
    },
    ]
},
{
    question: 'What is the capital of Japan?',
    answers: [{
        text: 'Kyoto',
        correct: false
    },
    {
        text: 'Nara',
        correct: false
    },
    {
        text: 'Tokyo',
        correct: true
    },
    ]
},
{
    question: 'What is the capital of Albania?',
    answers: [{
        text: 'Tirana',
        correct: true
    },
    {
        text: 'Tbilisi',
        correct: false
    },
    {
        text: 'Tunis',
        correct: false
    },
    ]
},
{
    question: 'What is the capital of Denmark?',
    answers: [{
        text: 'Canberra',
        correct: false
    },
    {
        text: 'Copenhagen',
        correct: true
    },
    {
        text: 'Cairo',
        correct: false
    },
    ]
},
{
    question: 'What is the capital of England?',
    answers: [{
        text: 'Leeds',
        correct: false
    },
    {
        text: 'Liverpool',
        correct: false
    },
    {
        text: 'London',
        correct: true
    },
    ]
},
];

function processResults(isCorrect) {
    if (!isCorrect) {
        return;
    }

    const scorePoints = parse(scorePointsElement.textContent, 1) || 0;

    scorePointsElement.textContent = scorePoints + 1;
}