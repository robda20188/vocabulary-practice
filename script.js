const createListBtn = document.getElementById("create-list");
const nameInput = document.getElementById("name-input");
const pasteInput = document.getElementById("paste-input");
const home = document.getElementById("home");
const modeSelection = document.getElementById("mode-selection");
const listsDiv = document.getElementById("lists");
const questionContainer = document.getElementById("question-container");
const listTitle = document.getElementById("list-title");
const word = document.getElementById("word");
const answerInput = document.getElementById("answer-input");
const bar = document.getElementById("bar");
const correct = document.getElementById("correct");
const incorrect = document.getElementById("incorrect");
const result = document.getElementById("result");
const conclusion = document.getElementById("conclusion");
const correctAnswersDiv = document.getElementById("correct-answers");
const incorrectAnswersDiv = document.getElementById("incorrect-answers");
const homeBtn = document.getElementById("home-btn");
const errorsBtn = document.getElementById("errors-btn");

let actualList = undefined;
let actualIndex = 0;
let answer = undefined;
let correctAnswers = undefined;
let incorrectAnswers = undefined;

let lists = [
    {
        "name": "Verbs",
        "words": [
            {
                "word": "can",
                "answer": "poder"
            },
            {
                "word": "run",
                "answer": "correr"
            },
            {
                "word": "eat",
                "answer": "comer"
            }
        ]
    }
];

renderLists();

class List{
    constructor(name, words){
        this.name = name;
        this.words = words;
        this.isReversed = false;
    }
}

class Word{
    constructor(word, answer){
        this.word = word;
        this.answer = answer;
    }
}



createListBtn.addEventListener("click", function(){
    let words = pasteInput.value.split(",");

    for(let i = 0; i < words.length; i++){
        words[i] = words[i].split(":");
        words[i] = new Word(words[i][0].trim(), words[i][1].trim());
    }

    lists.push(new List(nameInput.value, words));

    pasteInput.value = "";
    nameInput.value = "";

    renderLists();
})



listsDiv.addEventListener("click", function(e){
    let id = e.target.id;
    let index = id[id.length - 1];

    if(id.includes("delete-")){
        lists.splice(index, 1);
    }else if(id.includes("practice-")){
        home.style.display = "none";
        modeSelection.style.display = "flex";
        actualList = lists[index];
    }

    renderLists();
})



modeSelection.addEventListener("click", function(e){
    let id = e.target.id;

    if(id === "reverse"){
        actualList = reverseList(actualList); 
    }

    modeSelection.style.display = "none";
    questionContainer.style.display = "flex";
    listTitle.innerHTML = actualList.name;
    renderQuestion(actualList.words[actualIndex]);
})



document.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        renderCorrection(answerInput.value === answer);
    }
})

homeBtn.addEventListener("click", function(){goHome()});

errorsBtn.addEventListener("click", function(){


    console.log(new List(`Errors of ${actualList.name}`, incorrectAnswers));
    lists.push(new List(`Errors of ${actualList.name}`, incorrectAnswers));
    renderLists();
    goHome();
})




//______________F  U  N  C  T  I  O  N  S______________

function renderLists(){
    listsDiv.innerHTML = "";

    if(lists.length === 0){
        listsDiv.innerHTML = `<h3 id="no-lists">There are no lists</h3>`;
        return;
    }

    for(let i = 0; i < lists.length; i++){
        listsDiv.innerHTML += `
        <div class="list">
            <h3>${lists[i].name}</h3>
            <div class="buttons">
                <button id="practice-${i}">Practice</button>
                <button class="delete-button" id="delete-${i}">Delete</button>
            </div>
        </div>
        `
    }
}

function reverseList(list){
    for(let i = 0; i < list.words.length; i++){
        let exchange = list.words[i].word;
        list.words[i].word = list.words[i].answer;
        list.words[i].answer = exchange;
    }

    return list;
}

function renderCorrection(isCorrect){
    questionContainer.style.display = "none";
    answerInput.value = "";

    if(isCorrect){
        correct.style.display = "flex";
        correctAnswers.push(actualList[actualIndex]);
    }else{
        incorrect.style.display = "flex";
        incorrect.innerHTML = `No! The answer was: ${answer}`;
        incorrectAnswers.push(actualList[actualIndex]);
    }

    setTimeout(function(){
        if(actualIndex >= actualList.words.length){
            result.style.display = "flex";
            correct.style.display = "none";
            incorrect.style.display = "none";

            if(correctAnswers.length / incorrectAnswers >= 1){
                conclusion.innerHTML = "Good job!";
            }else{
                conclusion.innerHTML = "You have to practice more!";
            }

            correctAnswersDiv.innerHTML = String(correctAnswers.length);
            incorrectAnswersDiv.innerHTML = String(incorrectAnswers.length);

            return;
        }

        renderQuestion(actualList.words[actualIndex])
    }, 2000);
}

function renderQuestion(wordObject){
    word.innerHTML = wordObject.word;
    answer = wordObject.answer;
    
    correct.style.display = "none";
    incorrect.style.display = "none";
    questionContainer.style.display = "flex";
    bar.style.width = `${(actualIndex / actualList.words.length) * 100}vw`;

    actualIndex++;

    answerInput.focus();
}

function goHome(){
    home.style.display = "flex";
    result.style.display = "none";

    actualList = undefined;
    actualIndex = 0;
    answer = undefined;
    correctAnswers = undefined;
    incorrectAnswers = undefined;
}
