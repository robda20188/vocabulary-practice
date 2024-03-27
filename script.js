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

let lists = [
    {
        "name": "Nouns",
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
    },
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
    },
    {
        "name": "Modal",
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
    },
    {
        "name": "Errors",
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

class List{
    constructor(name, words){
        this.name = name;
        this.words = words;
    }
}

class Word{
    constructor(word, answer){
        this.word = word;
        this.answer = answer;
    }
}

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

function renderQuestion(wordObject){
    word.innerHTML = wordObject.word;
    answer = wordObject.answer;
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

    refreshLists();
})

let actualList;

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
        for(let i = 0; i < actualList.words.length; i++){
            let exchange = actualList.words[i].word;
            actualList.words[i].word = actualList.words[i].answer;
            actualList.words[i].answer = exchange;
        }
       
    }

    modeSelection.style.display = "none";
    questionContainer.style.display = "flex";
    listTitle.innerHTML = actualList.name;
    renderQuestion(actualList.words[0]);
})

let answer;
let actualIndex = 1;

document.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        if(answerInput.value === answer){
            console.log("Correct");
        }else{
            console.log("Incorrect");
        }

        bar.style.width = `${(actualIndex / actualList.words.length) * 100}vw`;

        renderQuestion(actualList.words[actualIndex]);
        actualIndex++;
    }
})

renderLists();