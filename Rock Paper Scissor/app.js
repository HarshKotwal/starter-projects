let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
let resetBtn = document.querySelector("button");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randonIdx = Math.floor(Math.random() * 3);
  return options[randonIdx];
};

const resetGame = () => {
  userScore = compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b33";
};

const drawGame = () => {
  msg.innerText = "Game Draw! Play again";
  msg.style.backgroundColor = "#495057";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "#6a994e";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `Computer Win! ${compChoice} beats Your ${userChoice}`;
    msg.style.backgroundColor = "#e63946";
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    //Draw condition
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      //scissors, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      //rock, scissore
      userWin = compChoice === "scissors" ? false : true;
    } else {
      // scissors, rock
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

resetBtn.addEventListener("click", resetGame);
