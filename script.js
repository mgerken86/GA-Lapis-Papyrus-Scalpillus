const player = {
  currentChoice: null
}
const computer = {
  currentChoice: null
}

//these two variables come into play throughout game to show various results in different functions
const outcomeDisplay = document.querySelector(".results span");
const rulesContainerDiv = document.querySelector('#rulesSpan');


const choices = ["Lapis", "Papyrus", "Scalpellus"];

//HTML buttons assigned to a choice. chose to make each a variable to be able to hide buttons and have them come back during game reset
const lapis = document.getElementById('lapis')
  lapis.onclick = function() {
    player.currentChoice = choices[0];
} 
const papyrus = document.getElementById('papyrus')
  papyrus.onclick = function() {
    player.currentChoice = choices[1];
}
const scalpellus = document.getElementById('scalpellus')
  scalpellus.onclick = function() {
    player.currentChoice = choices[2];
};


let playerScore = 0;
let computerScore = 0;
showScores();

//makes the scores visible. called throughout the game to update scores
function showScores(){
  const romanNumeralScores = ["Ø", "I", "II", "III", "IV", "V"];
  let playerScoreDiv = document.getElementById('playerScoreDiv');
    playerScoreDiv.innerText = `Player Score: `;
  let playerScoreSpan = document.createElement("span");
    playerScoreSpan.innerText = romanNumeralScores[playerScore];
    playerScoreDiv.appendChild(playerScoreSpan);
  let computerScoreDiv = document.getElementById('computerScoreDiv');
    computerScoreDiv.innerText = `Computer Score: `;
  let computerScoreSpan = document.createElement("span");
    computerScoreSpan.innerText = romanNumeralScores[computerScore];
    computerScoreDiv.appendChild(computerScoreSpan);  
};


//randomly chooses one of 3 computer choices
function computerChooses() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  computer.currentChoice = choices[randomIndex];
};

//this function is called when a button is pushed. it calls computer choice function, then compares all choices and calls function depending on who wins. also creates a button to reset game when a score reaches 5
function playRound(){
  computerChooses();
  if (player.currentChoice == computer.currentChoice){
    displayResult(`The Player and the Computer both chose ${player.currentChoice}. THE RESULT IS A TIE`);
    outcomeDisplay.style.backgroundColor = '#660022'
  } else
 //rounds the Player wins
  if ((player.currentChoice == choices[0] && computer.currentChoice == choices[2]) ||
        (player.currentChoice == choices[2] && computer.currentChoice == choices[1]) ||
        (player.currentChoice == choices[1] && computer.currentChoice == choices[0])) {      
    playerWins();      
      if(playerScore == 5){
        showWinnerAndReset();
      };
  } else {     
    computerWins();     
      if(computerScore == 5){
        showWinnerAndReset();
      };
  };  
}

//chooses result text and adds playerscore when player wins a round
function playerWins(){
  displayResult(`The Player chose ${player.currentChoice} and the Computer chose ${computer.currentChoice}. THE PLAYER WINS!`);
  playerScore++;
  outcomeDisplay.style.background = '#4d9900'
  showScores();
};

//chooses result text and adds computerscore when computer wins a round
function computerWins(){
  displayResult(`The Player chose ${player.currentChoice} and the Computer chose ${computer.currentChoice}. THE COMPUTER WINS!`);
  computerScore ++;
  outcomeDisplay.style.backgroundColor = '#ff5c33'
  showScores();
};

//creates new 'p' that displays the outcome is the HTML span in Results class
function displayResult(outcome){ 
  const resultText = document.createElement('p');
  resultText.innerText = outcome;
  outcomeDisplay.innerText = outcome;
}

//called when a player reaches 5. informs who wins and resets scores to 0. makes buttons disappear and a new Reset button appear
function showWinnerAndReset (){
  lapis.style.display = "none";
  scalpellus.style.display = "none";
  papyrus.style.display = "none";
  if (playerScore == 5){
    rulesContainerDiv.innerText = 
      `You won ${playerScore} rounds, and the Computer won ${computerScore} rounds. YOU WIN!!!`;
  } else {
    rulesContainerDiv.innerText = 
      `You won ${playerScore} rounds, and the Computer won ${computerScore} rounds. THE COMPUTER WINS!!!`;
  };
//creates a reset button 
  resetButton = document.createElement('button');
	  resetButton.textContent = 'New Game';
    resetButton.id = "resetButton";
	  const buttonsContainer = document.getElementById('buttonsContainer');
	  buttonsContainer.appendChild(resetButton);
//sets everything back to default when reset button pushed  
    resetButton.addEventListener('click', () => {
        resetButton.parentNode.removeChild(resetButton);
        rulesContainerDiv.innerText = "First one to score 5 points wins!";
        computerScore = 0;
        playerScore = 0;
        outcomeDisplay.style.backgroundColor = '#660022'
        showScores();
        displayResult("And the winner is...")
        lapis.style.display = "inline";
        scalpellus.style.display = "inline";
        papyrus.style.display = "inline";  
    });
}

// adds event listener to call playRound function when buttons are clicked
document.getElementById("lapis").addEventListener('click', playRound)
document.getElementById("papyrus").addEventListener('click', playRound)
document.getElementById("scalpellus").addEventListener('click', playRound)


