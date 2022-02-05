// Fisher-Yates shuffle
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

const quizQuestions = await fetch('quiz.json')
    .then(response => response.json())
    .catch(err => console.log(err));

document.getElementById('startQuiz').addEventListener('click', function() {
    initialize(quizQuestions);
});

function initialize(quizQuestions) {
    const questions = shuffle(quizQuestions);
    console.log(questions);
    // delete all quiz contains
    document.getElementById('quiz').innerHTML = '';

    let currentQuestion = 0;
    let correctAnswer = 0;
    addQuestion(questions[currentQuestion]);

    function addQuestion(item) {
        // delete previous question
        document.getElementById('quiz').innerHTML = '';

        // construct a card with a question and answers
        const card = document.createElement('div');
        card.setAttribute('class', 'quiz-card');
        const questionCount = document.createElement('div');
        questionCount.setAttribute('class', 'question-count');
        questionCount.innerText = 'Question ' + (currentQuestion + 1) + "/" + questions.length;
        card.append(questionCount);
        const question = document.createElement('h3');
        question.innerText = item.question;
        card.append(question);

        // 4 possible answers
        let j = 0;
        // random index for right answer
        const random = Math.floor(Math.random() * 4);
        for (let i = 0; i < item.wrongAnswers.length + 1; i++) {
            const div = document.createElement('div');
            const input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', 'answer');
            const label = document.createElement('label');
            if(i === random) {
                input.setAttribute('id', item.rightAnswer);
                input.setAttribute('value', item.rightAnswer);
                label.innerText = item.rightAnswer;
                label.setAttribute('for', item.rightAnswer);
            } else {
                input.setAttribute('id', item.wrongAnswers[j]);
                input.setAttribute('value', item.wrongAnswers[j]);
                label.innerText = item.wrongAnswers[j];
                label.setAttribute('for', item.wrongAnswers[j]);
                j++;
            }
            div.append(input);
            div.append(label);
            card.append(div);
        }
        const button = document.createElement('button');
        button.setAttribute('class', 'next-button');
        button.innerText = 'Next';
        button.addEventListener('click', function() {
            checkAnswer(random, correctAnswer);
        });
        card.append(button);
        document.getElementById('quiz').append(card);
    }

    function checkAnswer(rightAnswer) {
        const radioBtnGroup = document.getElementsByTagName('input');
        for(let i = 0; i < radioBtnGroup.length; i++) {
            if(radioBtnGroup[i].checked && i === rightAnswer) {
                correctAnswer++;
            }
        }
        nextQuestion();
    }

    function nextQuestion() {
        currentQuestion++;
        if(currentQuestion >= questions.length) {
            document.getElementById('quiz').innerHTML = 'Your Score: ' + correctAnswer + ' out of ' + questions.length + ' questions.';
            const btn = document.createElement('button');
            btn.innerText = 'Take Quiz Again?';
            btn.setAttribute('id', 'startQuiz')
            document.getElementById('quiz').append(btn);
            document.getElementById('startQuiz').addEventListener('click', function() {
                initialize(questions);
            })
        } else {
            addQuestion(questions[currentQuestion]);
        } 
    }
}