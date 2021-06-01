let card = document.getElementById("bingocard");
let cardHolder = document.getElementById("tablediv");
let cardHolderHolder = document.getElementById("tabledivdiv");

let eventDiv = document.getElementById("events");

let events = ["New Mainline Wario Game",
"New WarioWare Game",
"New Mario & Luigi Game", 
"Origami King DLC",
"Super Mario Odyssey 2",
"Mario Kart 9",
"Skyward Sword HD showcase",
"Bayonetta 3",
"A Wii U Port Nobody Asked For",
"Groose Amiibo",
"Super Mario Party 2",
"\"Gamer\" Used Thrice In A Minute",
"More Info On <s>Sonic Rangers</s> New Sonic",
"Switch Pro Details",
"Metroid Prime 4",
"Special Edition Switch",
"3 First Person Shooters from Xbox",
"Improved Switch Virtual Console",
"Earthbound or Mother 3 on Switch",
"Half-Life 3",
"New Donkey Kong Game",
"New Kirby Game",
"Bethesda Makes People Upset",
"Smash Ultimate Fighter Reveal",
"Elden Ring",
"No Silksong News :(",
"Mario Golf Showcase"];

let eventElems = [];

const rows = 5;
const columns = 5;

let eventSelected = -1;

// canvas.width = 500;
// canvas.height = 500;

// const cellWidth = canvas.width / columns;
// const cellHeight = canvas.height / columns;

class Cell {
    constructor(row, column, eventID = -1){
        this.row = row;
        this.column = column;
        this.element = card.rows[this.row].cells[this.column];
        this.eventID = eventID;
        this.element.onclick = () => {
            if(eventSelected >= 0){
                if(this.eventID >= 0){
                    eventElems[this.eventID].style.display = "block";
                }
                this.eventID = eventSelected;
                this.element.style.animationName = "chose";
                this.element.style.animationDuration = "500ms";
                this.element.style.animationIterationCount = 1;
                eventElems[eventSelected].style.display = "none";
                eventSelected = -1;
                for(let i = 0; i < cells.length; i ++){
                    cells[i].element.style.backgroundColor = "#ffffff";
                    cells[i].element.style.animationName = "notchose";
                    cells[i].element.style.animationDuration = "50ms";
                    cells[i].element.style.animationIterationCount = 1;
                    cells[i].element.style.cursor = "default";
                }
                this.element.style.animationName = "chose";
                this.element.style.animationDuration = "500ms";
                this.element.style.animationIterationCount = 1;
                updateCells();
            }
        }
    }

    draw () {
        let txt = "Empty";
        if(this.eventID >= 0){
            txt = events[this.eventID];
        }
        this.element.innerHTML = "";
        let tnode = document.createElement("p");
        tnode.innerHTML = txt;
        
        // Cells kept resizing slightly based on text and this is the best I could come up with
        let wwidth = window.innerWidth || document.documentElement.clientWidth || 
document.body.clientWidth;
        let wheight = window.innerHeight|| document.documentElement.clientHeight|| 
    document.body.clientHeight;
        //Header is 50px high
        wheight -= 50;
        cardHolderHolder.style.height = wheight;
        eventDiv.style.height = wheight;
        let using = wwidth;
        if(wheight < using){
            using = wheight;
        }
        using *= 0.8;
        tnode.style.width = using / columns - 5 + "px";
        
        if(this.eventID >= 0){
            tnode.style.fontWeight = "bold";
        }
        this.element.appendChild(tnode); 
    }

}

var cells = []

for(let row = 0; row < rows; row ++){
    let tr = document.createElement("tr");
    card.appendChild(tr);
    for(let column = 0; column < columns; column ++){
        let td = document.createElement("td");
        card.rows[row].appendChild(td);
        cells.push(
            new Cell(row, column)
        );
    }
}

for(let i = 0; i < events.length; i ++){
    let eventElem = document.createElement("p");
    eventElem.className = "event";
    eventElem.innerHTML = events[i];
    eventElem.onclick = function(){
        eventSelected = i;
        for(let i = 0; i < cells.length; i ++){
            cells[i].element.style.backgroundColor = "#c7ffbf";
            cells[i].element.style.animationName = "choosing";
            cells[i].element.style.animationDuration = "50ms";
            cells[i].element.style.animationIterationCount = 1;
            cells[i].element.style.cursor = "pointer";
        }
    }
    eventElems.push(eventElem);
    eventDiv.appendChild(eventElem);
}

var bottomMargin = document.createElement("p");
bottomMargin.style.margin = 0;
bottomMargin.style.height = "20px";
eventDiv.appendChild(bottomMargin);

function updateCells(){
    for(let i = 0; i < cells.length; i ++){
        cells[i].draw();
    }
}

updateCells();

function setSizing(){
    let wwidth = window.innerWidth || document.documentElement.clientWidth || 
document.body.clientWidth;
    let wheight = window.innerHeight|| document.documentElement.clientHeight|| 
document.body.clientHeight;
    //Header is 50px high
    wheight -= 50;
    cardHolderHolder.style.height = wheight;
    eventDiv.style.height = wheight;
    let using = wwidth;
    if(wheight < using){
        using = wheight;
    }
    using *= 0.8;

    card.style.height = card.clientWidth;
    for(let i = 0; i < cells.length; i ++){
        cells[i].element.style.width = using / columns + "px";
        cells[i].element.style.height = using / columns + "px";
    }
    cardHolder.style.width = using + "px";
    cardHolder.style.height = using + "px";
    cardHolder.style.maxWidth = using + "px";
    cardHolder.style.maxHeight = using + "px";
    cardHolder.style.marginTop = (cardHolderHolder.clientHeight - using) / 2 + "px";  
}

setSizing();

window.onresize = function(){
    setSizing();
}