const backgroundDiv = document.getElementById("container");
const arena1 = document.getElementById("arena1");
const arena2 = document.getElementById("arena2");
const arena3 = document.getElementById("arena3");
const arenaDefault = document.getElementById("arenaDefault");


function wall() {
    document.body.style.backgroundImage = "url(walls/arenaD.jpg)"
    document.body.style.backgroundColor = "gray"
}
wall ()

function changeArena1 () {
    backgroundDiv.style.backgroundImage = "url(walls/arena1.png)"
}
function changeArena2 () {
    backgroundDiv.style.backgroundImage = "url(walls/arena2.jpg)"
}
function changeArena3 () {
    backgroundDiv.style.backgroundImage = "url(walls/arena3.jpg)"
}
function changeArenaDefault () {
    backgroundDiv.style.backgroundImage = "url(walls/arenaD.jpg)"
}


arena1.addEventListener('click', changeArena1)
arena2.addEventListener('click', changeArena2)
arena3.addEventListener('click', changeArena3)
arenaDefault.addEventListener('click', wall)