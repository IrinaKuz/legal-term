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

const legalTerm = await fetch('terminology.json')
    .then(response => response.json())
    .catch(err => console.log(err));

document.getElementById('startQuiz').addEventListener('click', function() {
    initialize(legalTerm);
});

function initialize(legalTerm) {
    const terms = shuffle(legalTerm);
    console.log(terms);
    // delete all contents
    document.getElementById('flash-card').innerHTML = '';

    let currentQuestion = 0;

    addQuestion(terms[currentQuestion]);

    function addQuestion(item) {
        // delete previous flash card
        document.getElementById('flash-card').innerHTML = '';

        // construct a card with a question and answer
        const card = document.createElement('div');
        card.setAttribute('class', 'flash-card');
        const questionCount = document.createElement('div');
        questionCount.setAttribute('class', 'question-count');
        questionCount.innerText = (currentQuestion + 1) + "/" + terms.length;
        card.append(questionCount);
        const question = document.createElement('h3');
        question.innerText = item.name;
        card.append(question);

        const answer = document.createElement('div');
        answer.setAttribute('class', 'answer');
        answer.innerText = item.def;
        card.append(answer);
        
        const flipButton = document.createElement('button');
        flipButton.setAttribute('class', 'flip-button');
        flipButton.innerText = 'See Definitions';
        flipButton.addEventListener('click', function() {
            answer.setAttribute('class', 'show-answer');
        });
        card.append(flipButton);

        const nextButton = document.createElement('button');
        nextButton.setAttribute('class', 'next-button');
        nextButton.innerText = '>>';
        nextButton.addEventListener('click', function() {
            nextQuestion(1);
        });
        document.getElementById('flash-card').append(nextButton);

        const prevButton = document.createElement('button');
        prevButton.setAttribute('class', 'prev-button');
        prevButton.innerText = '<<';
        prevButton.addEventListener('click', function() {
            nextQuestion(-1);
        });
        document.getElementById('flash-card').append(prevButton);

        document.getElementById('flash-card').append(card);
    }

    function nextQuestion(nextFlashCard) {
        currentQuestion += nextFlashCard;
        if(currentQuestion >= terms.length) {
            currentQuestion = 0;
        } else if (currentQuestion < 0) {
            currentQuestion = terms.length-1;
        }
        addQuestion(terms[currentQuestion]);
    }
}