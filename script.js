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

const listsDiv = document.getElementById("lists");

function refreshLists(){
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


const createListBtn = document.getElementById("create-list");
const nameInput = document.getElementById("name-input");
const pasteInput = document.getElementById("paste-input");

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

const home = document.getElementById("home");
const modeSelection = document.getElementById("mode-selection");

listsDiv.addEventListener("click", function(e){
    let id = e.target.id;
    let index = id[id.length - 1];

    if(id.includes("delete-")){
        lists.splice(index, 1);
    }else if(id.includes("practice-")){
        home.style.display = "none";
        modeSelection.style.display = "flex";
    }

    refreshLists();
})

modeSelection.addEventListener("click", function(e){
    let id = e.target.id;

    if(id === "normal"){

    }else if(id === "reverse"){
        
    }
})

refreshLists();