// Word list
let easyWords = ["CODING","WEBSITE","HANGMAN","HTML","JAVA"]; 
let mediumWords = ["JAVASCRIPT","COMPUTER","VARIABLE","FUNCTION"]; 
let hardWords = ["DEVELOPER","PROGRAM","OBJECT","ALGORITHM"]; 

// variables
let secretWord = "";          
let guessedLetters = [];      
let wrongGuesses = 0;         
let maxGuesses = 6;           
let gameOver = false;         
let difficultySelected = false; 

// Wait until page loads to run thing
document.addEventListener("DOMContentLoaded", function () {
 setupDifficultyButtons(); 
 setupLetterButtons();
 updateStats();            
 updateHealth();           
 updateWordDisplay();
});

// Difficulty Stuff
function setupDifficultyButtons(){

 let easyBtn = document.getElementById("easyBtn");     
 let mediumBtn = document.getElementById("mediumBtn"); 
 let hardBtn = document.getElementById("hardBtn");     

 easyBtn.addEventListener("click", function(){
  startGame(
    "easy");
 });

 mediumBtn.addEventListener("click", function(){
  startGame("medium");
 });

 hardBtn.addEventListener("click", function(){
  startGame("hard");
 });

}

// Start the game with selected difficulty
function startGame(difficulty){

 guessedLetters = [];     
 wrongGuesses = 0;         
 gameOver = false;         
 difficultySelected = true; 

 let letterSpans = document.querySelectorAll(".letter-grid span");
 letterSpans.forEach(span => span.classList.remove("selected"));

 let randomIndex;
 if(difficulty === "easy"){
  randomIndex = Math.floor(Math.random() * easyWords.length);
  secretWord = easyWords[randomIndex];
 }
 else if(difficulty === "medium"){
  randomIndex = Math.floor(Math.random() * mediumWords.length);
  secretWord = mediumWords[randomIndex];
 }
 else if(difficulty === "hard"){
  randomIndex = Math.floor(Math.random() * hardWords.length);
  secretWord = hardWords[randomIndex];
 }

 updateWordDisplay(); 
 updateStats();       
 updateHealth();      
 updateComments("Game started! Pick a letter."); 

}

// Letter buttons
function setupLetterButtons(){
 let letterPanel = document.querySelector(".letter-grid");

 letterPanel.addEventListener("click", function(event){

  if(gameOver || !difficultySelected){
   return; 
  }

  let letter = event.target.textContent.toUpperCase(); //if the player clicks a letter in the word that is meant to be uppercase(the first letter in word) it will be capitilized (chatGPT)

  if(letter.length !== 1){
   return; 
  }

  event.target.classList.add("selected"); // when you click the letter it gets brighter and you can't use it again (Chatgpt)

  handleGuess(letter); 

 });

 let restartButton = document.getElementById("restartBtn");

 restartButton.addEventListener("click", function(){
  difficultySelected = false; 
  secretWord = "";
  guessedLetters = [];
  wrongGuesses = 0;
  gameOver = false;
  updateComments("Select a difficulty to start a new game."); 
  updateWordDisplay();        
  updateStats();              
  updateHealth();          
  let letterSpans = document.querySelectorAll(".letter-grid span");
  letterSpans.forEach(span => span.classList.remove("selected"));
 });
}

// Handle guess
function handleGuess(letter){

 if(gameOver || !difficultySelected){
  return; 
 }

 if(guessedLetters.includes(letter)){
  return; 
 }

 guessedLetters.push(letter); 

 let correct = false;

 // Check if the guessed letter is in the secret word shhhhhhh secretttt
 for(let i = 0; i < secretWord.length; i++){
  if(secretWord.charAt(i) === letter){
   correct = true;
  }
 }

 if(correct === false){
  wrongGuesses = wrongGuesses + 1; 
 }

 updateWordDisplay(); 
 updateStats();       
 updateHealth();      
 updateComments(letter); 

 checkWin();  
 checkLoss(); 

}

// Display the word with guessed letters and underscores bc those are cool 
function updateWordDisplay(){

 let display = "";

 for(let i = 0; i < secretWord.length; i++){
  let letter = secretWord.charAt(i);
  if(guessedLetters.includes(letter)){
   display += letter + " "; 
  }
  else{
   display += "_ "; // Show underscore for un-guessed letters bc we hope it will be guessed and they will win because that is good 
  }
 }

 let wordDisplay = document.getElementById("wordDisplay");
 wordDisplay.textContent = display; // Update the big H-TML
}


function updateStats(){

 let wrongCount = document.getElementById("wrongCount");
 let remaining = document.getElementById("remainingGuesses");

 wrongCount.textContent = wrongGuesses;       
 remaining.textContent = maxGuesses - wrongGuesses; 

}


function updateHealth(){

 let healthImage = document.getElementById("healthImage");
 let remaining = maxGuesses - wrongGuesses;

 if(remaining === 6){ healthImage.src = "heart.png"; }
 if(remaining === 5){ healthImage.src = "heart.png"; }
 if(remaining === 4){ healthImage.src = "heart.png"; }
 if(remaining === 3){ healthImage.src = "heart.png"; }
 if(remaining === 2){ healthImage.src = "heart.png"; }
 if(remaining === 1){ healthImage.src = "heart.png"; }
 if(remaining === 0){ healthImage.src = "heart.png"; }

}

// Update comments so they aren't lonely
function updateComments(letter){

 let log = document.getElementById("commentsLog");

 if(!difficultySelected){
  log.textContent = "Select a difficulty to start!"; // Force them to pick how smart they are 
  return;
 }

 if(letter === "Game started! Pick a letter."){
   log.textContent = letter;
   return;
 }

 let correct = false;

 // Check if guessed letter is in the secret word
 for(let i = 0; i < secretWord.length; i++){
  if(secretWord.charAt(i) === letter){
   correct = true;
  }
 }

 if(correct){
  log.textContent = log.textContent + "Correct guess: " + letter + "\n"; // Log correct guess
 }
 else{
  log.textContent = log.textContent + "Wrong guess: " + letter + "\n"; // Log wrong guess
 }

}

// Check if player won
function checkWin(){

 let won = true;

 for(let i = 0; i < secretWord.length; i++){
  let letter = secretWord.charAt(i);
  if(!guessedLetters.includes(letter)){
   won = false; // Player hasn't guessed all letters yet because they are really not good at this and should stick to anthony's project
  }
 }

 if(won){
  let log = document.getElementById("commentsLog");
  log.textContent = log.textContent + "You won! The word was " + secretWord + "\n";
  gameOver = true; // End game finally im FREEEEEEEEEEEEEEEEEEEEEE
 }

}

// Check if player lost cuz they suck and gotta stick to roblox 
function checkLoss(){

 if(wrongGuesses >= maxGuesses){

  let log = document.getElementById("commentsLog");
  log.textContent = log.textContent + "You lost! The word was " + secretWord + "\n";
  gameOver = true; // End game but this time they lost 

 }

}