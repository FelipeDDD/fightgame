const hButton = document.getElementById("hiddenButton");
const arenaD = document.getElementById("arenaDefault");
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
const gosButton = document.getElementById("randomOneStatsButton");
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
gosButton.addEventListener("click", generateOneStat);
hButton.addEventListener("click", hiddenButton);

let gameOn = false;
let gameScore = 0;
let credits = 0;
let fighterHP = 3;
let enemyHP = 3;
let currentBossData = null;
let currentPlayerData = null;
let availableStats = [
  "Raiva",
  "Inteligência",
  "Velocidade",
  "Altura",
  "Peso",
  "Manipulação",
];

function wall() {
  centerDiv.style.backgroundImage = "url(walls/arenaD.jpg)";
  document.body.style.backgroundImage = "url(walls/arenadback.jpg)";
  document.body.style.backgroundColor = "rgba(255, 255, 255, 0";
  document.body.style.backgroundBlrestartMode = "overlay";
  document.body.style.backgroundSize = "cover";
}

window.onload = () => {
  wall();
  updateCredits((credits = 0));
  gameOn = false;
  rbButton.style.display = "none";
};
// Remover detalhes antes do Start Battle
document.addEventListener("DOMContentLoaded", () => {
  const statValues = document.querySelectorAll(".statItem");
  statValues.forEach((statItem) => {
    statItem.classList.remove("clickable");
    statItem.querySelector(
      ".statValue"
    ).innerHTML = `<img src="walls/question-mark.png" class="pulsing-img" style="width: 23px; height:15px;"/>`;
  });
});

arena1.addEventListener("click",()=> arenaChanger("url(walls/arena1back.jpg)", "url(walls/hell.jpg)"));
arena2.addEventListener("click",()=> arenaChanger("url(walls/arena2.jpg)", "url(walls/arena2.jpg)"));
arena3.addEventListener("click", ()=> arenaChanger("url(walls/arena3.jpg)", "url(walls/arena3.jpg)"));
arena4.addEventListener("click", ()=> arenaChanger("url(walls/heaven.jpg)","url(walls/heaven.jpg)"));
arena5.addEventListener("click", ()=> arenaChanger("url(walls/arena5.jpg)", "url(walls/arena5.jpg)"));
arenaD.addEventListener("click", ()=> arenaChanger("url(walls/arenaD.jpg)", "url(walls/arenadback.jpg)"));

function arenaChanger(url, urlB) {
  centerDiv.style.backgroundImage = url;
  document.body.style.backgroundImage = urlB;
}

// function changeArena1() {
//   centerDiv.style.backgroundImage = "url(walls/arena1back.jpg)";
//   document.body.style.backgroundImage = "url(walls/hell.jpg)";
// }
// function changeArena2() {
//   centerDiv.style.backgroundImage = "url(walls/arena2.jpg)";
//   document.body.style.backgroundImage = "url(walls/arena2.jpg)";
// }
// function changeArena3() {
//   centerDiv.style.backgroundImage = "url(walls/arena3.jpg)";
//   document.body.style.backgroundImage = "url(walls/arena3.jpg)";
// }
// function changeArena4() {
//   centerDiv.style.backgroundImage = "url(walls/heaven.jpg)";
//   document.body.style.backgroundImage = "url(walls/heaven.jpg)";
// }
// function changeArena5() {
//   centerDiv.style.backgroundImage = "url(walls/arena5.jpg)";
//   document.body.style.backgroundImage = "url(walls/arena5.jpg)";
// }
// function changeArenaD() {
//   centerDiv.style.backgroundImage = "url(walls/arenaD.jpg)";
//   document.body.style.backgroundImage = "url(walls/arenadback.jpg)";
// }
function hiddenButton() {
  rbButton.style.display = "block";
}

function searchFighter() {
  fetch(`http://localhost:3000/data/`)
    .then((response) => response.json())
    .then((json) => {
      const multiplier = json.players.length;
      const randomNumber = Math.floor(Math.random() * multiplier);
      const fighterData = json.players[randomNumber];

      showFighterInfo(fighterData);
    })
    .catch((error) => console.error("Deu erro carai:", error));
}
function searchBoss(lvl) {
  fetch(`http://localhost:3000/data/`)
    .then((response) => response.json())
    .then((json) => {
      // const bossLvl = `boss${lvl}`;
      // const selectedBoss = json[bossLvl];
      //               /\
      // const bossLvl = json[`boss${lvl}`];

      const bossKey = lvl ? `boss${lvl}` : "boss";
      const bossLvl = json[bossKey];

      if (bossLvl && bossLvl.length > 0) {
        const randomNumber = Math.floor(Math.random() * bossLvl.length);
        showBossInfo(bossLvl[randomNumber]);
      } else {
        console.error(`Nenhum inimigo para o lvl: ${lvl}`);
      }
    });
}
function showFighterInfo(fighter) {
  const name = fighter.info.name;
  const imgSrc = `http://localhost:3000${fighter.info.img}`;
  const img = `<img src="${imgSrc}" alt="${name}"/>`;

  nameDiv.innerHTML = name;
  cardImgDiv.innerHTML = img;
  updateStatsFighter(fighter.stats);
  currentPlayerData = fighter;
  updateCredits(credits - 1);

  if (credits <= 0) {
    rfButton.disabled = true;
    updateCredits((credits = 0));
    gsButton.disabled = true;
  }
}
function showBossInfo(boss) {
  const name = boss.info.name;
  const imgSrc = `http://localhost:3000${boss.info.img}`;
  const img = `<img src="${imgSrc}" alt="${name}"/>`;
  // const classe = boss.info.classe;

  if (boss.info.classe === "humano") {
  } else if (boss.info.classe === "comunista") {
    enemyStatsGenerator(boss);
  } else if (boss.info.classe === "chefe") {
    enemyStatsGenerator(boss);
    enemyStatsGenerator(boss);
  } else {
    console.log("ERROR: Boss classe for enhancement not found!");
  }

  currentBossData = boss;
  nameDiv2.innerHTML = name;
  cardImgDiv2.innerHTML = img;
  updateStatsBoss(boss.stats);
}
function updateStatsFighter(stats) {
  str.textContent = stats.Raiva;
  int.textContent = stats.Inteligência;
  spd.textContent = stats.Velocidade;
  hei.textContent = stats.Altura.toFixed(2);
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
  gameOn = true;

  fighterHP = 3;
  enemyHP = 3;

  rfButton.disabled = false;
  fButton.disabled = true;
  gsButton.disabled = false;

  gameTextDiv.textContent = "Chose a stat to compare!";

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

  searchFighter();
  searchBoss();
  updateCredits(11);
  clicksEnable();
}
function restartBattle() {
  location.reload();
  fighterHP = 0;
  enemyHP = 0;

  gsButton.disabled = false;
  fButton.disabled = false;
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
    gsButton.disabled = true;
    updateCredits((credits = 0));
  }

  const statNames = Object.keys(currentPlayerData.stats);
  const randomStatIndex = Math.floor(Math.random() * statNames.length);

  const randomStat = statNames[randomStatIndex];

  const increment = rollDice();

  if (randomStatIndex == 3) {
    currentPlayerData.stats[randomStat] += increment * 0.02;
    console.log(`Incrementando ${randomStat} em ${increment * 0.02}`);
    gameTextDiv.textContent = `${randomStat}: aumentado em ${increment * 0.02}`;
  } else if (randomStatIndex == 4) {
    currentPlayerData.stats[randomStat] += increment * 2;
    console.log(`Incrementando ${randomStat} em ${increment * 2}`);
    gameTextDiv.textContent = `${randomStat}: aumentado em ${increment * 2}`;
  } else {
    currentPlayerData.stats[randomStat] += increment;
    console.log(`Incrementando ${randomStat} em ${increment}`);
    gameTextDiv.textContent = `${randomStat}: aumentado em ${increment}`;
  }

  updateStatsFighter(currentPlayerData.stats);
}
function generateOneStat() {
  function rollDice() {
    return Math.floor(Math.random() * 51) + 10;
  }

  updateCredits(credits - 3);

  if (credits <= 0) {
    rfButton.disabled = true;
    gsButton.disabled = true;
    updateCredits((credits = 0));
  }

  const statNames = Object.keys(currentPlayerData.stats);
  const randomStatIndex = Math.floor(Math.random() * statNames.length);

  const randomStat = statNames[randomStatIndex];

  const increment = rollDice();

  if (randomStatIndex == 3) {
    currentPlayerData.stats[randomStat] += increment * 0.02;
    console.log(`Incrementando ${randomStat} em ${increment * 0.02}`);
    gameTextDiv.textContent = `${randomStat}: aumentado em ${increment * 0.02}`;
  } else if (randomStatIndex == 4) {
    currentPlayerData.stats[randomStat] += increment * 1.6;
    console.log(`Incrementando ${randomStat} em ${increment * 1.6}`);
    gameTextDiv.textContent = `${randomStat}: aumentado em ${increment * 2}`;
  } else {
    currentPlayerData.stats[randomStat] += increment;
    console.log(`Incrementando ${randomStat} em ${increment}`);
    gameTextDiv.textContent = `${randomStat}: aumentado em ${increment}`;
  }

  updateStatsFighter(currentPlayerData.stats);
  
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
  // const playerValue = Number(statItem.querySelector(".statValue").textContent);
  drawCheck();

  if (currentBossData && currentBossData.stats) {
    const bossValue = currentBossData.stats[statName];

    if (bossValue !== undefined) {
      console.log(`Comparando ${statName}:`);
      console.log(`Jogador: ${playerValue}`);
      console.log(`Boss: ${bossValue}`);

      // Stats do inimigo visíveis!
      updateStatsBoss(currentBossData.stats);
      updateHP();

      if (playerValue > bossValue) {
        console.log(`${statName}: Você venceu!`);
        gameTextDiv.textContent = `Você escolheu ${statName}: Você venceu!`;
        availableStats = availableStats.filter((stat) => stat !== statName);
        enemyHP -= 1;
        updateHP();
      } else if (playerValue < bossValue) {
        console.log(`${statName}: Inimigo venceu!`);
        gameTextDiv.textContent = `Você escolheu ${statName}: ${currentBossData.info.name} venceu!`;
        availableStats = availableStats.filter((stat) => stat !== statName);
        fighterHP -= 1;
        updateHP();
      } else {
        console.log(`Você escolheu ${statName}: It's a draw!`);
        gameTextDiv.textContent = `${statName}: It's a draw! :O`;
      }
    } else {
      console.log(`ERROR: Stat ${statName} not found for Enemy`);
    }
  } else {
    console.log("ERROR: Data not found or invalid for the Enemy");
  }

  const statItemsAll = document.querySelectorAll(".statItem");
  statItemsAll.forEach((item) => {
    const statNameAll = item.querySelector(".statName").textContent;
    if (statNameAll === statName) {
      item.removeEventListener("click", handleClick);
      item.classList.remove("clickable");
      item.style.backgroundColor = "#330a00";
    }
  });

  // updateHP();
  setTimeout(enemyTurn, 1000);
}
function updateHP() {
  HP = fighterHP;
  EHP = enemyHP;

  if (HP > 3) {
    HP = 3;
    // console.log("HP adjusted to 3")
  }
  if (EHP > 3) {
    EHP = 3;
    // console.log("EHP adjusted to 3")
  }

  // console.log("T1", HP, EHP);
  if (HP === 3 ) {
  } else if (HP === 2) {
    document.getElementById("h3").style.display = "none";
  } else if (HP === 1) {
    document.getElementById("h2").style.display = "none";
  } else if (HP === 0) {
    document.getElementById("h1").style.display = "none";
    gameTextDiv.textContent = `Morreu, otário! Tente novamente.`;
    console.log("GAME OVER - RESTART");
    gameOn = false;
    setTimeout(restartBattle, 3000);
  } else {
    console.log("ERRO IF 'HP'");
  }

  if (EHP === 3) {
  } else if (EHP === 2) {
    document.getElementById("bh3").style.display = "none";
  } else if (EHP === 1) {
    document.getElementById("bh2").style.display = "none";
  } else if (EHP === 0) {
    document.getElementById("bh1").style.display = "none";
    gameTextDiv.textContent = `O inimigo suicidou-se, parabuains!`;
    console.log("T5", currentBossData.info.classe);
    if (currentBossData.info.classe === "chefe") {
      gameTextDiv.textContent = `Você matou um demônio, brabo!`;
      rewards();
    } else if (currentBossData.info.classe === "comunista") {
      setTimeout(preGame3, 3000);
    } else {
      setTimeout(preGame2, 3000);
    }
  } else {
    console.log("ERROR: IF 'EHP'");
  }
  console.log("FINAL", HP, EHP);
}
function updateHearts() {
  HP = fighterHP;
  EHP = enemyHP;

  if (EHP === 3) {
    document.getElementById("bh1").style.display = "block";
    document.getElementById("bh2").style.display = "block";
    document.getElementById("bh3").style.display = "block";
  } else if (EHP === 2) {
    document.getElementById("bh1").style.display = "block";
    document.getElementById("bh2").style.display = "block";
  } else if (EHP === 1) {
    document.getElementById("bh1").style.display = "block";
  } else {
    `ERROR: current EHP not found!`;
  }

  if (HP === 3) {
    document.getElementById("h1").style.display = "block";
    document.getElementById("h2").style.display = "block";
    document.getElementById("h3").style.display = "block";
  } else if (HP === 2) {
    document.getElementById("h1").style.display = "block";
    document.getElementById("h2").style.display = "block";
  } else if (HP === 1) {
    document.getElementById("h1").style.display = "block";
  } else {
    `ERROR: current HP not found!`;
  }
}
function enemyTurn() {

 

  console.log("TT", availableStats);
  drawCheck();
  const randomStat = Math.floor(Math.random() * availableStats.length);
  const chosenStat = availableStats[randomStat];

  console.log("PC:", chosenStat);

  availableStats = availableStats.filter((stat) => stat !== chosenStat);

  const playerValue = currentPlayerData.stats[chosenStat];
  const enemyValue = currentBossData.stats[chosenStat];

  console.log(`Enemy chose: ${chosenStat}`);
  console.log(`You: ${playerValue}`);
  console.log(`Enemy: ${enemyValue}`);

  if (enemyHP == 0) {
    setTimeout(
      () => (gameTextDiv.textContent = "Você ganhou, parabuains!"),
      1000
    );

    rfButton.disabled = false;
    fButton.disabled = true;
    gsButton.disabled = false;

    if (currentBossData.info.class === "humano") {
      return setTimeout(() => preGame2, 4500);
    } else {
      return setTimeout(() => preGame3, 4500);
    }
  }

  if (playerValue > enemyValue) {
    console.log(`${chosenStat}: Player wins!`);
    gameTextDiv.textContent = `Inimigo escolheu ${chosenStat}: Você venceu!`;
    availableStats = availableStats.filter((stat) => stat !== chosenStat);
    enemyHP -= 1;
    updateHP();
  } else if (playerValue < enemyValue) {
    console.log(`${chosenStat}: Enemy wins!`);
    gameTextDiv.textContent = `Inimigo escolheu ${chosenStat}: ${currentBossData.info.name} venceu!!`;
    availableStats = availableStats.filter((stat) => stat !== chosenStat);
    fighterHP -= 1;
    updateHP();
  } else {
    console.log(`Inimigo escolheu ${chosenStat}: It's a draw!`);
    gameTextDiv.textContent = `${chosenStat}: It's a draw! :O`;
  }

  const statItem = document.querySelectorAll(".statItem");
  statItem.forEach((item) => {
    const statNameAll = item.querySelector(".statName").textContent;
    if (statNameAll === chosenStat) {
      item.removeEventListener("click", handleClick);
      item.classList.remove("clickable");
      item.style.backgroundColor = "#330a00";
    }
  });

  drawCheck();
}
function drawCheck() {
  console.log("DRAW CHECK INICIOU")

  if (availableStats.length == 0 && enemyHP > 0 && fighterHP > 0) {
    gameTextDiv.textContent = 'Vocês escolheram encostar os ticos. Ambos perderam!'
    gameOn = false;
    console.log("GAME OVER - RESTART");
    setTimeout(restartBattle, 5000);
  }
}
function preGame2() {
  setTimeout(
    () =>
      (gameTextDiv.textContent = "Procurando um comunista para vc surrar, prepare-se!"),3000);
  setTimeout(() => {
    startBattle2();
  }, 5500);
}
function startBattle2() {
  gameTextDiv.textContent = "Game 2 iniciado! Bata nele por favor!";
  console.log("START BATTLE 2 INICIOU")
  availableStats = [
    "Raiva",
    "Inteligência",
    "Velocidade",
    "Altura",
    "Peso",
    "Manipulação",
  ];

  rfButton.disabled = false;
  fButton.disabled = true;
  gsButton.disabled = false;

  const statItemsAll = document.querySelectorAll(".statItem");
  statItemsAll.forEach((item) => {
    item.addEventListener("click", handleClick);
    item.classList.remove("clickable");
    item.style.backgroundColor = "darkred";
  });

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

  enemyHP = 3;
  fighterHP += 1;
  updateHearts();
  updateCredits(credits + 5);
  searchBoss(2);
  clicksEnable();
}
function preGame3() {
  console.log("PRE GAME 3 INICIOU")

  setTimeout(
    () =>
      (gameTextDiv.textContent =
        "Procurando um demônio aleatório, prepare-se!"),
    3000
  );
  setTimeout(startBattle3, 5500);
}
function startBattle3() {
  gameTextDiv.textContent = "Game 3 iniciado! Boa sorte, vc vai precisar!";
  console.log("START BATTLE 3 INICIOU")

  availableStats = [
    "Raiva",
    "Inteligência",
    "Velocidade",
    "Altura",
    "Peso",
    "Manipulação",
  ];

  rfButton.disabled = false;
  fButton.disabled = true;
  gsButton.disabled = false;

  const statItemsAll = document.querySelectorAll(".statItem");
  statItemsAll.forEach((item) => {
    item.addEventListener("click", handleClick);
    item.classList.remove("clickable");
    item.style.backgroundColor = "darkred";
  });

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

  enemyHP = 3;
  fighterHP += 1;
  updateHearts();
  updateCredits(credits + 5);

  if (currentBossData.info.class === "chefe" && gameOn == false) {
    return rewards;
  }

  searchBoss(3);
  clicksEnable();
}
function rewards() {
  gameTextDiv.textContent = `REWARDS`;
  setTimeout(restartBattle, 5000);
}
function enemyStatsGenerator(boss) {
  const stats = [
    "Raiva",
    "Inteligência",
    "Velocidade",
    "Manipulação",
    "Altura",
    "Peso",
  ];
  let totalSum = 0;

  let values = stats.map(() => {
    let r1 = Math.floor(Math.random() * 6 + 1);
    let r2 = Math.floor(Math.random() * 6 + 1);
    let r3 = Math.floor(Math.random() * 5 + 1);
    let r4 = Math.floor(Math.random() * 4 + 1);

    let sum = r1 + r2 + r3 + r4;
    totalSum += sum;
 
    return sum;
  });
  // console.log("TS",totalSum)
  
  // values.push(Math.floor(Math.random() * 20 + 1) * 0.02)
  // values.push(Math.floor(Math.random() * 6 + 1) * 2)

  const [Raiva, Inteligência, Velocidade, Manipulação, alturaRaw, pesoRaw] = values;
  const alturaFinal = parseFloat(alturaRaw * 0.02);
  const pesoFinal = parseFloat(pesoRaw * 2);

  boss.stats.Raiva += Raiva;
  boss.stats.Inteligência += Inteligência;
  boss.stats.Velocidade += Velocidade;
  boss.stats.Manipulação += Manipulação;
  boss.stats.Altura += alturaFinal;
  boss.stats.Peso += pesoFinal;

  // const enhancedBoss = {
  //   Raiva: Raiva + boss.stats.Raiva,
  //   Inteligência: Inteligência + boss.stats.Inteligência,
  //   Velocidade: Velocidade + boss.stats.Velocidade,
  //   Manipulação: Manipulação + boss.stats.Manipulação,
  //   Altura: alturaFinal + boss.stats.Altura,
  //   Peso: pesoFinal + boss.stats.Peso,
  // };
  // console.log(values,"enhancedBoss:", enhancedBoss)
  // return enhancedBoss;


  // console.log("Values:",values, "TotalSum:", totalSum, "enhancedBoss:", boss.stats)
}