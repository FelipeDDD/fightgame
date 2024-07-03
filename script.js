const hButton = document.getElementById("hiddenButton");
const arenaDefault = document.getElementById("arenaDefault");
const arena1 = document.getElementById("arena1");
const arena2 = document.getElementById("arena2");
const arena3 = document.getElementById("arena3");
const arena4 = document.getElementById("arena4");
const arena5 = document.getElementById("arena5");
const backgroundDiv = document.getElementById("container");
const centerDiv = document.getElementById("centerDiv");
const rfButton = document.getElementById("randomFighterButton");
const rbButton = document.getElementById("randomBossButton");
const fButton = document.getElementById("fightButton");
const rButton = document.getElementById("restartButton");
const gsButton = document.getElementById("randomStatsButton");
const creditsValue = document.getElementById("credits");
const nameDiv = document.getElementById("cardNameDiv");
const nameDiv2 = document.getElementById("cardNameDiv2");
const cardImgDiv = document.getElementById("cardImgDiv");
const gameTextDiv = document.getElementById("gameTextDiv");

const str = document.getElementById("str");
const int = document.getElementById("int");
const spd = document.getElementById("spd");
const hei = document.getElementById("hei");
const wgt = document.getElementById("wgt");
const mStr = document.getElementById("mStr");
const str2 = document.getElementById("str2");
const int2 = document.getElementById("int2");
const spd2 = document.getElementById("spd2");
const hei2 = document.getElementById("hei2");
const wgt2 = document.getElementById("wgt2");
const mStr2 = document.getElementById("mStr2");

rbButton.addEventListener("click", searchBoss);
fButton.addEventListener("click", startBattle);
rButton.addEventListener("click", restartBattle);
rfButton.addEventListener("click", searchFighter);
gsButton.addEventListener("click", generateStats);
hButton.addEventListener("click", hiddenButton)

let gameOn = false;
let credits = 0;
let fighterHP = 3;
let enemyHP = 3;
let currentBossData = null;
let currentPlayerData = null;
let availableStats = ["Força", "Inteligência", "Velocidade", "Altura", "Peso", "Manipulação"];

function wall() {
  centerDiv.style.backgroundImage = "url(walls/arenaD.jpg)";
  document.body.style.backgroundImage = "url(walls/arenaDback.jpg)";
  document.body.style.backgroundColor = "rgba(255, 255, 255, 0";
  document.body.style.backgroundBlrestartMode = "overlay";
  document.body.style.backgroundSize = "cover";
}

window.onload = () => {
  wall();
  updateCredits((credits = 0));
  gameOn = false;
};
// Remover detalhes antes do Start Battle
document.addEventListener("DOMContentLoaded", () => {
  const statValues = document.querySelectorAll(".statItem");
  statValues.forEach((statItem) => {
    statItem.classList.remove("clickable");
    statItem.querySelector(".statValue").innerHTML = `<img src="walls/question-mark.png" class="pulsing-img" style="width: 23px; height:15px;"/>`;
  });
});

function hiddenButton() {
  rbButton.style.display = "block";
}
function changeArena1() {
  centerDiv.style.backgroundImage = "url(walls/arena1back.jpg)";
  document.body.style.backgroundImage = "url(walls/hell.jpg)";
}
function changeArena2() {
  centerDiv.style.backgroundImage = "url(walls/arena2.jpg)";
  document.body.style.backgroundImage = "url(walls/arena2.jpg)";
}
function changeArena3() {
  centerDiv.style.backgroundImage = "url(walls/arena3.jpg)";
  document.body.style.backgroundImage = "url(walls/arena3.jpg)";
}
function changeArena4() {
  centerDiv.style.backgroundImage = "url(walls/heaven.jpg)";
  document.body.style.backgroundImage = "url(walls/heaven.jpg)";
}
function changeArena5() {
  centerDiv.style.backgroundImage = "url(walls/arena5.jpg)";
  document.body.style.backgroundImage = "url(walls/arena5.jpg)";
}
function changeArenaDefault() {
  centerDiv.style.backgroundImage = "url(walls/arenaD.jpg)";
  document.body.style.backgroundImage = "url(walls/arenadback.jpg)";
}
arena1.addEventListener("click", changeArena1);
arena2.addEventListener("click", changeArena2);
arena3.addEventListener("click", changeArena3);
arena4.addEventListener("click", changeArena4);
arena5.addEventListener("click", changeArena5);
arenaDefault.addEventListener("click", changeArenaDefault);


function searchFighter() {
  fetch(`http://localhost:3000/data/`)
    .then((response) => response.json())
    .then((json) => {
      const multiplier = json.players.length;
      const randomNumber = Math.floor(Math.random() * multiplier);
      const fighterData = json.players[randomNumber];
      // Ordena os stats para o sugerido
      
      showFighterInfo(fighterData);
    })
    .catch((error) => console.error("Deu erro carai:", error));
}
function searchBoss() {
  fetch(`http://localhost:3000/data/`)
    .then((response) => response.json())
    .then((json) => {
      const multiplier = json.boss.length;
      const randomNumber = Math.floor(Math.random() * multiplier);
      const bossData = json.boss[randomNumber];
      showBossInfo(bossData);
    })
    .catch((error) => console.error("Deu erro carai:", error));
}
function showFighterInfo(fighter) {
  const name = fighter.info.name;
  const imgSrc = `http://localhost:3000${fighter.info.img}`;
  const img = `<img src="${imgSrc}" alt="${name}"/>`;
  //   const classe = fighter.info.classe;

  nameDiv.innerHTML = name;
  cardImgDiv.innerHTML = img;
  updateStatsFighter(fighter.stats);
  currentPlayerData = fighter;
  updateCredits(credits - 1)

  if (credits <= 0) {
    rfButton.disabled = true;
    rfButton.style.opacity = 0.8;
    updateCredits((credits = 0));
    gsButton.disabled = true;
    gsButton.style.opacity = 0.8;
  }
}

function showBossInfo(boss) {
  const name = boss.info.name;
  const imgSrc = `http://localhost:3000${boss.info.img}`;
  const img = `<img src="${imgSrc}" alt="${name}"/>`;
  const classe = boss.info.classe;

  currentBossData = boss;
  nameDiv2.innerHTML = name;
  cardImgDiv2.innerHTML = img;
  updateStatsBoss(boss.stats);
}
function updateStatsFighter(stats) {
  // gsButton.disabled = false;
  // gsButton.style.opacity = 1;
  // gsButton.textContent = gsButton.getAttribute("data-original-text");

  str.textContent = stats.Raiva;
  int.textContent = stats.Inteligência;
  spd.textContent = stats.Velocidade;
  hei.textContent = stats.Altura.toFixed(2)
  wgt.textContent = stats.Peso;
  mStr.textContent = stats.Manipulação;
}
function updateStatsBoss(stats) {
  document.getElementById("str2").textContent = stats.Raiva;
  document.getElementById("int2").textContent = stats.Inteligência;
  document.getElementById("spd2").textContent = stats.Velocidade;
  document.getElementById("hei2").textContent = stats.Altura.toFixed(2);
  document.getElementById("wgt2").textContent = stats.Peso;
  document.getElementById("mStr2").textContent = stats.Manipulação;
}

function startBattle() {
  searchFighter();
  gameOn = true;

  fighterHP = 3;
  enemyHP = 3;

  rfButton.disabled = false;
  rfButton.style.opacity = 1;
  fButton.disabled = true;
  fButton.style.opacity = 0.2;
  gsButton.disabled = false;
  gsButton.style.opacity = 1;

  const hideStats = document.getElementById("rightDiv");
  const classHunter = hideStats.querySelectorAll(".statValue");
  classHunter.forEach((stat) => {
    stat.style.visibility = "hidden";
  });
  setTimeout(() => {
    classHunter.forEach((stat) => {
      stat.innerHTML = `<img src="walls/question-mark.png" class="pulsing-img" style="width: 23px; height:15px;"/>`;
      stat.style.visibility = "visible";
    });
  }, 100);

  searchBoss();
  updateCredits(11);
  clicksEnable();
}
function restartBattle() {
  location.reload();
  gameOn = false;
  fighterHP = 0;
  enemyHP = 0;

  gsButton.disabled = false;
  gsButton.style.opacity = 1;

  fButton.disabled = false;
  fButton.style.opacity = 1;
}
function updateCredits(newCredits) {
  credits = newCredits;
  creditsValue.textContent = newCredits;
}
function generateStats() {
  function rollDice() {
    return Math.floor(Math.random() * 11) + 5;
  }
  updateCredits(credits - 1);

  if (credits <= 0) {
    rfButton.disabled = true;
    rfButton.style.opacity = 0.8;
    // gsButton.textContent = 'Not enough Credits';
    gsButton.disabled = true;
    gsButton.style.opacity = 0.8;
    updateCredits((credits = 0));
  }
  // const stats = [
  //   "Raiva",
  //   "Inteligência",
  //   "Velocidade",
  //   "Altura",
  //   "Peso",
  //   "Manipulação",
  // ];
  const statNames = Object.keys(currentPlayerData.stats);
  const randomStatIndex = Math.floor(Math.random() * statNames.length);
  // const randomStat = stats[randomStatIndex];
  const randomStat = statNames[randomStatIndex];
  // console.log(randomStatIndex)
  // console.log(currentPlayerData)

  const increment = rollDice();
  // console.log("T2-DICE IS", increment);
  // console.log("T0", currentPlayerData.stats)
  if (randomStatIndex == 3) {
    currentPlayerData.stats[randomStat] += (increment * 0.02);
    console.log(`T3 - Incrementando ${randomStat} em ${increment * 0.02}`);
    gameTextDiv.textContent = `${randomStat}: aumentado em ${increment *0.02}`;
  } else if (randomStatIndex == 4) {
    currentPlayerData.stats[randomStat] += (increment * 2);
    console.log(`T4 Incrementando ${randomStat} em ${increment * 2}`);
    gameTextDiv.textContent = `${randomStat}: aumentado em ${increment * 2}`;
  } else {
    currentPlayerData.stats[randomStat] += increment;
    console.log(`T5 Incrementando ${randomStat} em ${increment}`);
    gameTextDiv.textContent = `${randomStat}: aumentado em ${increment}`;
    
  }

  updateStatsFighter(currentPlayerData.stats)
}

function clicksEnable() {
  const hideStats = document.getElementById("leftDiv");
  const statItems = hideStats.querySelectorAll(".statItem");

  statItems.forEach((statItem) => {
    statItem.addEventListener("click", handleClick);
    statItem.classList.add("clickable");
  });
}
function handleClick(event) {
  const statItem = event.currentTarget;
  const statName = event.target.querySelector(".statName").textContent;
  const statValue = statItem.querySelector(".statValue");
  const playerValue = Number(statValue.textContent);
  
 

    if (currentBossData && currentBossData.stats) {
      const bossValue = currentBossData.stats[statName];


      if (bossValue !== undefined) {
        console.log(`Comparando ${statName}:`);
        console.log(`Jogador: ${playerValue}`);
        console.log(`Boss: ${bossValue}`);

        // Stats do inimigo visíveis!
       updateStatsBoss(currentBossData.stats)

        if (playerValue > bossValue) {
          console.log(`${statName}: Player wins!`);
          gameTextDiv.textContent = `${statName}: Player wins!`
          availableStats = availableStats.filter(stat => stat !== statName)
          console.log(availableStats)
          enemyHP -= 1;
          updateHP()
        } else if (playerValue < bossValue) {
          console.log(`${statName}: Enemy wins!`);
          gameTextDiv.textContent = `${statName}: Enemy wins!`
          availableStats = availableStats.filter(stat => stat !== statName)
          console.log(availableStats)
          fighterHP -= 1;
          updateHP()
        } else {
          console.log(`${statName}: It's a draw!`);
          gameTextDiv.textContent = `${statName}: It's a draw! :O`
        }
      } else {
        console.log(`Stat ${statName} not found for Enemy`);
      }
    } else {
      console.log("Data not found or invalid for the Enemy");
    }

    const statItemsAll = document.querySelectorAll(".statItem");
    statItemsAll.forEach(item => {
      const statNameAll = item.querySelector(".statName").textContent;
      if (statNameAll === statName) {
        item.removeEventListener("click", handleClick);
        item.classList.remove("clickable");
        item.style.backgroundColor = "#330a00";
      }
    })
    
    

    
    // setTimeout(gameTextDiv.textContent = "Enemy will play next", enemyTurn, 3000)
    setTimeout(enemyTurn, 3000)
}

function updateHP() {
  HP = fighterHP
  EHP = enemyHP


  if (HP === 3) {
  } else if (HP === 2) {
    document.getElementById("h3").style.display = "none";
    gameTextDiv.textContent = `Você ainda tem  2 vidas!`
  } else if (HP === 1) {
    document.getElementById("h2").style.display = "none";
    gameTextDiv.textContent = `Cuidado, você tem apenas 1 vida!`
  } else if (HP === 0) {
    document.getElementById("h1").style.display = "none";
    gameTextDiv.textContent = `Morreu, otário!`
  } else {
    console.log("ERRO IF 'HP'")
  }


  if (EHP === 3) {
  } else if (EHP === 2) {
    document.getElementById("bh3").style.display = "none";
  } else if (EHP === 1) {
    document.getElementById("bh2").style.display = "none";
  } else if (EHP ===0) {
    document.getElementById("bh1").style.display = "none";
    gameTextDiv.textContent = `O inimigo suicidou-se, parabuains!`
  } else {
    console.log("ERRO IF 'EHP'")
  }
  console.log("HP3", HP,EHP)
}
function enemyTurn() {
  const randomStat = Math.floor(Math.random() * availableStats.length);
  const chosenStat = availableStats[randomStat];

  console.log (chosenStat)

  availableStats = availableStats.filter(stat => stat !== chosenStat)

  const playerValue = currentPlayerData.stats[chosenStat];
  const enemyValue = currentBossData.stats[chosenStat];

  console.log(`Enemy chose: ${chosenStat}`)
  console.log(`You: ${playerValue}`)
  console.log(`Enemy: ${enemyValue}`)


  if (playerValue > enemyValue) {
    console.log(`${chosenStat}: Player wins!`);
    gameTextDiv.textContent = `${chosenStat}: Player wins!`
    availableStats = availableStats.filter(stat => stat !== chosenStat)
   
    enemyHP -= 1;
    updateHP()
  } else if (playerValue < enemyValue) {
    console.log(`${chosenStat}: Enemy wins!`);
    gameTextDiv.textContent = `${chosenStat}: Enemy wins!`
    availableStats = availableStats.filter(stat => stat !== chosenStat)
  
    fighterHP -= 1;
    updateHP()
  } else {
    console.log(`${chosenStat}: It's a draw!`);
    gameTextDiv.textContent = `${chosenStat}: It's a draw! :O`
  }
  console.log(chosenStat)
  updateHP();

  // const hideStats = document.getElementById("rightDiv");
  // const statItems = hideStats.querySelectorAll(".statItem");
  // const hideStats2 = document.getElementById("leftDiv");
  // const statItems2 = hideStats2.querySelectorAll(".statItem");

  // statItems.forEach(statItem => {
  //   const statName = statItem.querySelector(".statName").textContent;
  //   if (statName === chosenStat) {
  //     statItem.classList.remove("clickable");
  //     statItem.removeEventListener("click", handleClick);
  //     statItem.style.backgroundColor = "#330a00";
  //   }
  //   })
  
  //   statItems2.forEach(statItem => {
  //     const statName2 = statItem.querySelector(".statName").textContent;
  //     if (statName2 === chosenStat) {
  //       statItem.classList.remove("clickable");
  //       statItem.removeEventListener("click", handleClick);
  //       statItem.style.backgroundColor = "#330a00";
  //     }
  // });
  const statItemsAll = document.querySelectorAll(".statItem");
    statItemsAll.forEach(item => {
      const statNameAll = item.querySelector(".statName").textContent;
      if (statNameAll === chosenStat) {
        item.removeEventListener("click", handleClick);
        item.classList.remove("clickable");
        item.style.backgroundColor = "#330a00";
      }
    })
}

