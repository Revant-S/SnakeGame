const gameBoard = document.querySelector(".gameBoard");
const scoreBoard1 = document.querySelector("#player1");
const scoreBoard2 = document.querySelector("#player2");
const player1LifeBoard = document.querySelector("#player1Life");
const player2LifeBoard = document.querySelector("#player2Life");
function gameStart() {
  for (let i = 1; i <= 400; i++) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "gridItem");
    gameBoard.appendChild(newDiv);
  }
}
gameStart();
const NodeList = document.querySelectorAll(".gridItem");
const scoreBoard = document.querySelector(".scoreBoard");
let snakeColor = ["snake1", "snake2"];
let p = [0, 40];
const food = "food";
let count = 1;
function createSnake(Name) {
  let q = p[0];
  this.playerName = Name;
  this.colorClass = snakeColor[0];
  this.name = this.colorClass[0];
  this.snakeBody = [q];
  this.current = q;
  this.potentialTailPosition = q;
  this.potentialTailPosition2 = q;
  this.snakeLength = 1;
  this.intervalId = null;
  this.life = 5;
  snakeColor.shift();
  p.shift();
}
function populateLifeBoard() {
  for (let index = 0; index < 5; index++) {
    const newDiv1 = document.createElement("div");
    newDiv1.classList.add("lifeElement");
    player1LifeBoard.appendChild(newDiv1);

    const newDiv2 = document.createElement("div");
    newDiv2.classList.add("lifeElement");
    player2LifeBoard.appendChild(newDiv2);
  }
}
populateLifeBoard();
const snake1 = new createSnake("snake1");
const snake2 = new createSnake("snake2");
function updateLife(player) {
  let playerLife = player.life;
  if (player.playerName == "snake1") {
    while (player1LifeBoard.firstChild) {
      player1LifeBoard.removeChild(player1LifeBoard.firstChild);
    }
  } else if (player.playerName == "snake2") {
    while (player2LifeBoard.firstChild) {
      player2LifeBoard.removeChild(player2LifeBoard.firstChild);
    }
  }
  for (let index = 0; index < playerLife; index++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("lifeElement");
    if (player.playerName == "snake1") {
      player1LifeBoard.appendChild(newDiv);
    } else {
      player2LifeBoard.appendChild(newDiv);
    }
  }
}
function changeColour(array, classToset) {
  NodeList.forEach((node) => {
    node.classList.remove(classToset);
  });
  for (let index = 0; index < array.length; index++) {
    NodeList[array[index]].classList.add(classToset);
  }
}
function generateFood() {
  try {
    q = Math.floor(Math.random() * NodeList.length);
    NodeList[q].classList.add(food);
    return q;
  } catch (error) {
    console.log(error);
  }
}
function removeTheSnake(player) {
  for (let index = 0; index < player.snakeBody.length; index++) {
    NodeList[player.snakeBody[index]].classList.remove(player.colorClass);
  }
  player.snakeBody = [];
  player.snakeLength = 0;
  player.current = null;
}
let foodPosition = generateFood();
function moveTheSnake(player, foodPosition) {
  try {
    if (
      player.snakeBody.includes(player.current) &&
      foodPosition != player.current
    ) {
      player.life--;
      updateLife(player);
      if (!player.life) {
        alert("Game Over!! for " + player.colorClass);
        clearInterval(player.intervalId);
        removeTheSnake(player);
        return;
      }
    }
    player.snakeBody.shift();
    player.snakeBody.push(player.current);
    changeColour(player.snakeBody, player.colorClass);
  } catch (error) {
    player.life--;
    updateLife(player);
    if (!player.life) {
      alert("Game Over! for " + player.colorClass);
      clearInterval(player.intervalId);
      removeTheSnake(player);
      console.log(error);
    }
  }
}
function updateScoreBoard(player) {
  if (player === "snake1") {
    scoreBoard1.innerText = (snake1.snakeLength - 1) * 5;
  } else {
    scoreBoard2.innerText = (snake2.snakeLength - 1) * 5;
  }
}
function responseToKey(keyStroke, player) {
  player.potentialTailPosition2 = player.potentialTailPosition;
  player.potentialTailPosition = player.current;
  switch (keyStroke) {
    case "ArrowDown":
      player.current += 20;
      break;
    case "ArrowUp":
      player.current -= 20;
      break;
    case "ArrowRight":
      player.current += 1;
      break;
    case "ArrowLeft":
      player.current -= 1;
      break;
  }
  changeColour(player.snakeBody, player.colorClass);
  moveTheSnake(player, foodPosition);
  if (foodPosition == player.current) {
    player.snakeBody.unshift(player.potentialTailPosition);
    NodeList[foodPosition].classList.remove(food);
    foodPosition = generateFood();
    player.snakeLength++;
    updateScoreBoard(player.colorClass);
  }
}
changeColour(snake1.snakeBody, snake1.colorClass);
changeColour(snake2.snakeBody, snake2.colorClass);
window.addEventListener("keydown", function (e) {
  if (snake1.snakeLength) {
    if (e.code === "ArrowDown") {
      clearInterval(snake1.intervalId);
      snake1.intervalId = setInterval(() => {
        responseToKey("ArrowDown", snake1);
      }, 100);
    } else if (e.code === "ArrowUp") {
      clearInterval(snake1.intervalId);
      snake1.intervalId = setInterval(() => {
        responseToKey("ArrowUp", snake1);
      }, 100);
    } else if (e.code === "ArrowRight") {
      clearInterval(snake1.intervalId);
      snake1.intervalId = setInterval(() => {
        responseToKey("ArrowRight", snake1);
      }, 100);
    } else if (e.code === "ArrowLeft") {
      clearInterval(snake1.intervalId);
      snake1.intervalId = setInterval(() => {
        responseToKey("ArrowLeft", snake1);
      }, 100);
    }
  } else {
    console.log("snake is dead");
  }
});
window.addEventListener("keydown", function (e) {
  if (snake2.snakeLength) {
    if (e.code === "KeyS" || e.code === "Keys") {
      clearInterval(snake2.intervalId);
      snake2.intervalId = setInterval(() => {
        responseToKey("ArrowDown", snake2);
      }, 100);
    } else if (e.code === "KeyW" || e.code === "Keyw") {
      clearInterval(snake2.intervalId);
      snake2.intervalId = setInterval(() => {
        responseToKey("ArrowUp", snake2);
      }, 100);
    } else if (e.code === "KeyD" || e.code === "Keyd") {
      clearInterval(snake2.intervalId);
      snake2.intervalId = setInterval(() => {
        responseToKey("ArrowRight", snake2);
      }, 100);
    } else if (e.code === "KeyA" || e.code === "Keya") {
      clearInterval(snake2.intervalId);
      snake2.intervalId = setInterval(() => {
        responseToKey("ArrowLeft", snake2);
      }, 100);
    }
  } else {
    console.log("snake Is Dead!");
  }
});
