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

const cretaListBtn = document.getElementById("create-list");
const nameInput = document.getElementById("name-input");
const pasteInput = document.getElementById("paste-input");

cretaListBtn.addEventListener("click", function(){
    let words = pasteInput.value.replace(" ", "").split(",");

    for(let i = 0; i < words.length; i++){
        words[i] = words[i].split(":");
        words[i] = new Word(words[i][0], words[i][1]);
    }

    lists.push(new List(nameInput.value, words));
})