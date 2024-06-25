const arenaDefault = document.getElementById("arenaDefault");
const arena1 = document.getElementById("arena1");
const arena2 = document.getElementById("arena2");
const arena3 = document.getElementById("arena3");
const arena4 = document.getElementById("arena4");
const arena5 = document.getElementById("arena5");
const backgroundDiv = document.getElementById("container");
const centerDiv = document.getElementById("centerDiv");
const rfButton = document.getElementById("randomFighterButton")
const rbButton = document.getElementById("randomBossButton")
const nameDiv = document.getElementById("cardNameDiv")
const nameDiv2 = document.getElementById("cardNameDiv2")
const cardImgDiv = document.getElementById("cardImgDiv")


function wall() {
    centerDiv.style.backgroundImage = "url(walls/arenaD.jpg)"
    document.body.style.backgroundImage = "url(walls/arenaDback.jpg)"
    document.body.style.backgroundColor = "rgba(255, 255, 255, 0";
    document.body.style.backgroundBlendMode = "overlay";
    document.body.style.backgroundSize = "cover";
}
wall()

function changeArena1 () {
    centerDiv.style.backgroundImage = "url(walls/arena1back.jpg)"
    document.body.style.backgroundImage = "url(walls/hell.jpg)"
}
function changeArena2 () {
    centerDiv.style.backgroundImage = "url(walls/arena2.jpg)"
    document.body.style.backgroundImage = "url(walls/arena2.jpg)"
}
function changeArena3 () {
    centerDiv.style.backgroundImage = "url(walls/arena3.jpg)"
    document.body.style.backgroundImage = "url(walls/arena3.jpg)"
}
function changeArena4 () {
    centerDiv.style.backgroundImage = "url(walls/heaven.jpg)"
    document.body.style.backgroundImage = "url(walls/heaven.jpg)"
}
function changeArena5 () {
    centerDiv.style.backgroundImage = "url(walls/arena5.jpg)"
    document.body.style.backgroundImage = "url(walls/arena5.jpg)"
}
function changeArenaDefault () {
    centerDiv.style.backgroundImage = "url(walls/arenaD.jpg)"
    document.body.style.backgroundImage = "url(walls/arenadback.jpg)"
}
arena1.addEventListener('click', changeArena1)
arena2.addEventListener('click', changeArena2)
arena3.addEventListener('click', changeArena3)
arena4.addEventListener('click', changeArena4)
arena5.addEventListener('click', changeArena5)
arenaDefault.addEventListener('click', changeArenaDefault)

// const getRandomFighter = () => {
//     const randomNumber = Math.floor(Math.random() * 11)
//     searchFighter(randomNumber)
// } 
function searchFighter () {
    fetch(`http://localhost:3000/data/`)
    .then((response) => response.json())
    .then((json) => {
        const multiplier = json.players.length;
        const randomNumber = Math.floor(Math.random() * multiplier)
        const fighterData = json.players[randomNumber];
        showFighterInfo (fighterData)
    })
    .catch (error => console.error("Deu erro carai:", error))
}
function searchBoss () {
    fetch(`http://localhost:3000/data/`)
    .then((response) => response.json())
    .then((json) => {
        const multiplier = json.boss.length;
        const randomNumber = Math.floor(Math.random() * multiplier)
        const bossData = json.boss[randomNumber];
        showBossInfo (bossData)
    })
    .catch (error => console.error("Deu erro carai:", error))
}
function showFighterInfo (fighter) {
    const name = fighter.info.name;
    const imgSrc = `http://localhost:3000${fighter.info.img}`;
    const img = `<img src="${imgSrc}" alt="${name}"/>`
    const classe = fighter.info.classe;

    nameDiv.innerHTML = name;
    cardImgDiv.innerHTML = img
}
function showBossInfo (boss) {
    const name = boss.info.name;
    const imgSrc = `http://localhost:3000${boss.info.img}`;
    const img = `<img src="${imgSrc}" alt="${name}"/>`
    const classe = boss.info.classe;
    nameDiv2.innerHTML = name;
    cardImgDiv2.innerHTML = img
}

rfButton.addEventListener("click", searchFighter)
rbButton.addEventListener("click", searchBoss)
