const ui = {
  button: document.querySelector("#game-interface-play-button"),
  attackPlayer: document.querySelector("#character-gallery-attack-player"),
  attackComputer: document.querySelector("#character-gallery-attack-computer"),
  imagePlayer: document.querySelector("#character-display-player"),
  imageComputer: document.querySelector("#character-display-computer"),
  itemNbGames: document.querySelector("#game-stats-plays"),
  itemNbDeaths: document.querySelector("#game-stats-deaths"),
};
var games = 0;
var loses = 0;
function hasPlayToolMethod() {
  const playTools = ["Rock", "Paper", "Scissors"];
  return playTools[Math.floor(Math.random() * playTools.length)];
}
(function play() {
  ui.button.addEventListener("click", () => {
    startCountDown(() => {
      playHandler();
    });
  });
})();
function resetRound() {
  if (
    document.querySelector("#player-choice") ||
    document.querySelector("#computer-choice")
  ) {
    document.querySelector("#player-choice").remove();
    document.querySelector("#computer-choice").remove();
  }
  if (document.querySelector("#player-wins")) {
    document.querySelector("#player-wins").remove();
  } else if (document.querySelector("#player-loses")) {
    document.querySelector("#player-loses").remove();
  }
  if (document.querySelector("#item-nb-games")) {
    document.querySelector("#item-nb-games").remove();
  }
  if (document.querySelector("#item-nb-loses")) {
    document.querySelector("#item-nb-loses").remove();
  }
}

function startCountDown(callback) {
  if (document.querySelector("#equal-sign")) {
    document.querySelector("#equal-sign").remove();
  }
  const countDownDiv = document.createElement("div");
  countDownDiv.id = "countdown-timer";
  ui.imagePlayer.appendChild(countDownDiv);
  let countdown = 3;
  countDownDiv.textContent = countdown;
  const timer = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      countDownDiv.textContent = countdown;
    } else {
      clearInterval(timer);
      countDownDiv.remove();
      callback();
    }
  }, 1000);
}

function playHandler(event) {
  resetRound();
  const playerChoice = hasPlayToolMethod();
  const computerChoice = hasPlayToolMethod();

  if (playerChoice == "Paper" && computerChoice == "Rock") {
    ui.imageComputer.insertAdjacentHTML(
      "afterbegin",
      `<h1 id="player-wins">ENEMY FELLED</h1>`
    );
    games++;
  } else if (playerChoice == "Paper" && computerChoice == "Scissors") {
    ui.imagePlayer.insertAdjacentHTML(
      "afterbegin",
      `<h1 id="player-loses">YOU DIED</h1>`
    );
    games++;
    loses++;
  } else if (playerChoice == "Rock" && computerChoice == "Paper") {
    ui.imagePlayer.insertAdjacentHTML(
      "afterbegin",
      `<h1 id="player-loses">YOU DIED</h1>`
    );
    games++;
    loses++;
  } else if (playerChoice == "Rock" && computerChoice == "Scissors") {
    ui.imageComputer.insertAdjacentHTML(
      "afterbegin",
      `<h1 id="player-wins">ENEMY FELLED</h1>`
    );
    games++;
  } else if (playerChoice == "Scissors" && computerChoice == "Paper") {
    ui.imageComputer.insertAdjacentHTML(
      "afterbegin",
      `<h1 id="player-wins">ENEMY FELLED</h1>`
    );
    games++;
  } else if (playerChoice == "Scissors" && computerChoice == "Rock") {
    ui.imagePlayer.insertAdjacentHTML(
      "afterbegin",
      `<h1 id="player-loses">YOU DIED</h1>`
    );
    games++;
    loses++;
  } else {
    const equalitySign = document.createElement("div");
    equalitySign.id = "equal-sign";
    equalitySign.textContent = "=";
    ui.imagePlayer.appendChild(equalitySign);
  }

  ui.attackPlayer.insertAdjacentHTML(
    "afterend",
    `<li id="player-choice" type="none">${playerChoice}</li>`
  );
  ui.attackComputer.insertAdjacentHTML(
    "afterend",
    `<li id="computer-choice" type="none">${computerChoice}</li>`
  );
  ui.itemNbGames.insertAdjacentHTML(
    "beforeend",
    `<span id="item-nb-games">${games}</span>`
  );
  ui.itemNbDeaths.insertAdjacentHTML(
    "beforeend",
    `<span id="item-nb-loses">${loses}</span>`
  );
}
