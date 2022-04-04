const player = {
    currentChoice: null
  }
  const computer = {
    currentChoice: null
  }
  let playerScore = 0;
  let computerScore = 0;
  showScores();

  const choices = ["Lapis", "Papyrus", "Scalpellus"];
  
  //makes the scores visible. called throughout the game to update scores
  function showScores(){
    document.getElementById('playerScoreDiv').innerText = ("Player Score: 0" + playerScore);
    document.getElementById('computerScoreDiv').innerText = ("Computer Score: 0" + computerScore);
  };
  

  //HTML buttons assigned to a choice
  document.getElementById('lapis').onclick = function(){
    player.currentChoice = "Lapis";
  }
  document.getElementById('papyrus').onclick = function(){
    player.currentChoice = "Papyrus";
  }
  document.getElementById('scalpellus').onclick = function(){
    player.currentChoice = "Scalpellus";
  };
  
  
  //randomly chooses one of 3 computer choices
  function computerChooses() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    computer.currentChoice = choices[randomIndex];
  };
  
  //chooses result text and adds player score when player wins a round
  function playerWins(){
    displayResult("The Player chose " + player.currentChoice + " and the Computer chose " + computer.currentChoice + ". THE PLAYER WINS!");
    playerScore++;
    showScores();
  };
  
  //chooses result text and adds computer score when computer wins a round
  function computerWins(){
    displayResult("The Player chose " + player.currentChoice + " and the Computer chose " + computer.currentChoice + ". THE COMPUTER WINS!");
    computerScore ++;
    showScores();
  };
  
  
  //this function is called when a button is pushed. it calls computer choice function, then compares all choices and calls function depending on who wins. also says to reset game when a score reaches 5
  function playRound(){
    computerChooses();
    if (player.currentChoice == computer.currentChoice){
      displayResult("The Player and the Computer both chose " + player.currentChoice + ". THE RESULT IS A TIE");
    } else
     
    //rounds thd Player wins
    if ((player.currentChoice == choices[0] && computer.currentChoice == choices[2]) ||
          (player.currentChoice == choices[2] && computer.currentChoice == choices[1]) ||
          (player.currentChoice == choices[1] && computer.currentChoice == choices[0])) {    
      
      playerWins();
          
        if(playerScore == 5){
          resetPlayerWins();
        };
    } else {
        
      computerWins();
         
        if(computerScore == 5){
          resetComputerWins();
        };
    }  
  }
  
  //called when playerScore reaches 5. alerts that player won and resets scores to 0
  function resetPlayerWins (){
    alert("You won " + playerScore + " rounds, and the Computer won " + computerScore + " rounds. YOU WON!")
    computerScore = 0;
    playerScore = 0;
    showScores();
    displayResult("And the winner is...")
  }
  
  //called when computerScore reaches 5. alerts that computer won and resets scores to 0
  function resetComputerWins (){
    alert("You won " + playerScore + " rounds, and the Computer won " + computerScore + " rounds. YOU LOST!")
    computerScore = 0;
    playerScore = 0;
    showScores();
    displayResult("And the winner is...")
  }
  
  //creates new 'p' that displays the outcome; is the HTML span in Results class
  function displayResult(outcome){ 
    const resultText = document.createElement('p');
    resultText.innerText = outcome;
    document.querySelector(".results span").innerHTML = outcome;
  }
  
  
  // adds event listener to call playRound function when buttons are clicked
  document.getElementById("lapis").addEventListener('click', playRound)
  document.getElementById("papyrus").addEventListener('click', playRound)
  document.getElementById("scalpellus").addEventListener('click', playRound)