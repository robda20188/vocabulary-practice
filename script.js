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
const articlePasteTitle = document.getElementById("article-paste-title");



let correctAnswer = undefined;
let correctAnswers = undefined;
let incorrectAnswers = undefined;
let lists;
let isCorrected = undefined;

let practising = {
    list: undefined,
    index: 0
}

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



if(localStorage.getItem("data") === null){
    lists = [];
}else{
    lists = JSON.parse(localStorage.getItem("data"));
}

renderLists();



createListBtn.addEventListener("click", function(){
    lists.push(new List(nameInput.value, stringToWords(pasteInput.value)));

    articlePasteTitle.innerHTML = "Create a list with your vocabulary";
    createListBtn.innerHTML = "Create list";

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
        practising.list = new List(lists[index].name, randomize(lists[index].words));
        correctAnswers = new List(`Correct of ${practising.list.name}`, []);
        incorrectAnswers = new List(`Errors of ${practising.list.name}`, []);
    }else if(id.includes("edit-")){
        nameInput.value = lists[index].name;
        pasteInput.value = wordsToString(lists[index].words);
        lists.splice(index, 1);
        articlePasteTitle.innerHTML = "Edit the list";
        createListBtn.innerHTML = "Edit";
    }

    renderLists();
})



modeSelection.addEventListener("click", function(e){
    let id = e.target.id;

    if(id === "reverse"){
        practising.list = reverseList(practising.list); 
    }

    correctAnswers.isReversed = practising.list.isReversed;
    incorrectAnswers.isReversed = practising.list.isReversed;

    modeSelection.style.display = "none";
    questionContainer.style.display = "flex";
    listTitle.innerHTML = practising.list.name;
    renderQuestion(practising.list.words[practising.index]);
})



document.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        if(isCorrected){
            next();
        }else if(isCorrected === false){
            renderCorrection(answerInput.value === correctAnswer);
        }
    }
})

homeBtn.addEventListener("click", function(){goHome()});

errorsBtn.addEventListener("click", function(){
    if(incorrectAnswers.isReversed){
        lists.push(reverseList(incorrectAnswers));
    }else{
        lists.push(incorrectAnswers);
    }

    renderLists();
    goHome();
})




//______________F  U  N  C  T  I  O  N  S______________

function renderLists(){
    listsDiv.innerHTML = "";

    localStorage.setItem("data", JSON.stringify(lists));

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
                <button class="edit-button" id="edit-${i}">Edit</button>
                <button class="delete-button" id="delete-${i}">Delete</button>
            </div>
        </div>
        `
    }
}

function renderQuestion(wordObject){
    word.innerHTML = wordObject.word;
    correctAnswer = wordObject.answer;
    isCorrected = false;
    
    correct.style.display = "none";
    incorrect.style.display = "none";
    questionContainer.style.display = "flex";
    bar.style.width = `${(practising.index / practising.list.words.length) * 100}vw`;

    practising.index++;

    answerInput.focus();
}

function renderCorrection(isCorrect){
    questionContainer.style.display = "none";
    answerInput.value = "";
    isCorrected = true;

    if(isCorrect){
        correct.style.display = "flex";
        correctAnswers.words.push(practising.list.words[practising.index - 1]);
    }else{
        incorrect.style.display = "flex";
        incorrect.innerHTML = `<div>
        No!<br>The answer for <span class="black">${practising.list.words[practising.index - 1].word}</span> was: <span class="green">${correctAnswer}</span>
        </div>`;
        incorrectAnswers.words.push(practising.list.words[practising.index - 1]);
    }
}

function reverseList(listToReverse){
    let list = listToReverse;

    for(let i = 0; i < list.words.length; i++){
        let exchange = list.words[i].word;
        list.words[i].word = list.words[i].answer;
        list.words[i].answer = exchange;
    }

    list.isReversed = true;

    return list;
}

function goHome(){
    home.style.display = "flex";
    result.style.display = "none";

    practising.list = undefined;
    practising.index = 0;
    correctAnswer = undefined;
    correctAnswers = undefined;
    incorrectAnswers = undefined;
}


function next(){
    if(practising.index >= practising.list.words.length){
        renderResults();
        return;
    }
    renderQuestion(practising.list.words[practising.index]);
}

function renderResults(){
    result.style.display = "flex";
    correct.style.display = "none";
    incorrect.style.display = "none";
    isCorrected = undefined;

    if(incorrectAnswers.words.length === 0){
        errorsBtn.style.display = "none";
    }else{
        errorsBtn.style.display = "block";
    }

    if(correctAnswers.words.length / incorrectAnswers.words.length >= 1){
        conclusion.innerHTML = "Good job!";
        conclusion.style.color = "#6ab04c"; //green
    }else{
        conclusion.innerHTML = "You have to practice more!";
        conclusion.style.color = "#b04c4c"; //red
    }

    correctAnswersDiv.innerHTML = String(correctAnswers.words.length);
    incorrectAnswersDiv.innerHTML = String(incorrectAnswers.words.length);
}

function stringToWords(string){
    let words = string.split(",");

    for(let i = 0; i < words.length; i++){
        words[i] = words[i].split(":");
        words[i] = new Word(words[i][0].trim(), words[i][1].trim());
    }

    return words;
}

function wordsToString(words){
    let string = "";

    for(let i = 0; i < words.length; i++){
        string += `${words[i].word}: ${words[i].answer}`;

        if(i + 1 != words.length){
            string += ", ";
        }
    }

    return string;
}

function random(max){
    return Math.round(Math.random() * max);
}

function randomize(array){
    let oldArray = structuredClone(array); 
    let newArray = [];
    let randomIndex;

    while(oldArray.length > 0){
        randomIndex = random(oldArray.length - 1);

        newArray.push(oldArray[randomIndex]);
        oldArray.splice(randomIndex, 1);
        
    }

    return newArray;
}
