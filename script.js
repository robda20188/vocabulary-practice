let lists = [];

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

    for(let i = 0; i < lists.length; i++){
        listsDiv.innerHTML += `
        <div class="list">
            <h3>${lists[i].name}</h3>
            <div class="buttons">
                <button id="list-${i}">Practice</button>
            </div>
        </div>
        `
    }
}


const cretaListBtn = document.getElementById("create-list");
const nameInput = document.getElementById("name-input");
const pasteInput = document.getElementById("paste-input");

cretaListBtn.addEventListener("click", function(){
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