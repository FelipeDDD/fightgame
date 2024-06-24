const arenaDefault = document.getElementById("arenaDefault");
const arena1 = document.getElementById("arena1");
const arena2 = document.getElementById("arena2");
const arena3 = document.getElementById("arena3");
const backgroundDiv = document.getElementById("container");
const centerDiv = document.getElementById("centerDiv");
const rfButton = document.getElementById("randomFighterButton")


function wall() {
    centerDiv.style.backgroundImage = "url(walls/arenaD.jpg)"
    document.body.style.backgroundImage = "url(walls/arenaDback.jpg)"
}
wall()

function changeArena1 () {
    centerDiv.style.backgroundImage = "url(walls/arena1.png)"
    document.body.style.backgroundImage = "url(walls/forestback.jpg)"
}
function changeArena2 () {
    centerDiv.style.backgroundImage = "url(walls/arena2.jpg)"
    document.body.style.backgroundImage = "url(walls/arena2.jpg)"
}
function changeArena3 () {
    centerDiv.style.backgroundImage = "url(walls/arena3.jpg)"
    document.body.style.backgroundImage = "url(walls/arena3.jpg)"
}
function changeArenaDefault () {
    centerDiv.style.backgroundImage = "url(walls/arenaD.jpg)"
    document.body.style.backgroundImage = "url(walls/arenaDback.jpg)"
}

arena1.addEventListener('click', changeArena1)
arena2.addEventListener('click', changeArena2)
arena3.addEventListener('click', changeArena3)
arenaDefault.addEventListener('click', changeArenaDefault)

const getRandomFighter = () => {
    let randomFighterButton = rfButton.value;
    searchFighter(randomFighterButton)
}
function searchFighter (searchArray) {
    fetch(`http://localhost:3000/`)
    .then((response) => response.json())
    .then((json) => {
        const fighter = json.data.players;
        
        console.log(fighter, randomNumber)
    })
}
function searchArray() {
const randomNumber = Math.floor(Math.random() * 11)

}

rfButton.addEventListener("click", getRandomFighter)
