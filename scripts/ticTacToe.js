const playerOne = document.querySelector('.playerOne');
const playerTwo = document.querySelector('.playerTwo');
const playerOneSide = document.querySelector('.playerOneSide');
const playerTwoSide = document.querySelector('.playerTwoSide');
const submit = document.querySelector('.submit');
const table = document.querySelector('.table');
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const grid = Array.from(Array(3), () => new Array(3).fill(''));
const gridContainer = document.querySelector('.grid');
const playerTwoForm = document.querySelector('#playerTwoForm');
let isBoardFull = false;
let winner = false;
var currentPlayer = 'X';
let scoreX = 0;
let scoreO = 0;

localStorage.setItem('scoreX', scoreX);
localStorage.setItem('scoreO', scoreO);

var playerTwoInput = document.querySelector('.playerTwoInput');

const addPlayer = () => {
    if(playerTwoInput){
        var inputValue = playerTwoInput.value;
        localStorage.setItem('playerTwo', inputValue);
        playerTwo.innerHTML = localStorage.getItem('playerTwo');
    }    
}

const playerTurn = () => {
  isBoardFull = true;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] == '') {
        isBoardFull = false; 
        break;
      }
    }
  }
    if(currentPlayer == 'X'){
      playerOneSide.classList.add('turnOne');
      playerTwoSide.classList.remove('turnTwo');
    } else {
      playerOneSide.classList.remove('turnOne');
      playerTwoSide.classList.add('turnTwo');
    } checkEndGame();
}

playerTwoForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
  if (playerTwoInput.value !== '') {
    main.classList.remove('main--hidden');
    header.classList.add('header--hidden');
  } else {
    main.classList.add('main--hidden');
    header.classList.remove('header--hidden');
  }
});

function checkEndGame() {
  winner = false;
  for (let i = 0; i < 3; i++) {
    if (grid[i][0] !== '' && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
      if(grid[i][0] == 'X'){
        scoreX++;
        localStorage.setItem('scoreX', scoreX);
        console.log('Vencedor X');
      } else{
        scoreO++;
        localStorage.setItem('scoreO', scoreO);
        console.log('Vencedor O');
      } 
      winner = true;
      loadScore();
      return;
    }
    
  }

  for (let j = 0; j < 3; j++) {
    if (grid[0][j] !== '' && grid[0][j] === grid[1][j] && grid[1][j] === grid[2][j]) {
      if(grid[0][j] == 'X'){
        scoreX++;
        localStorage.setItem('scoreX', scoreX);
      console.log('Vencedor X');
      } else{
        scoreO++;
        localStorage.setItem('scoreO', scoreO);
        console.log('Vencedor O');
      }
      winner = true;
      loadScore();
      return;
    }
  }

  if (grid[0][0] !== '' && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
    if(grid[0][0] == 'X'){
      scoreX++;
      localStorage.setItem('scoreX', scoreX);
      console.log('Vencedor X');
    } else{
      scoreO++;
      localStorage.setItem('scoreO', scoreO);
      console.log('Vencedor O'); 
    }
    winner = true;
    loadScore();
    return;
  }

  if (grid[0][2] !== '' && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
    if(grid[0][2] == 'X'){
      scoreX++;
      localStorage.setItem('scoreX', scoreX);
      console.log('Vencedor X');
    } else{
      scoreO++;
      localStorage.setItem('scoreO', scoreO);
      console.log('Vencedor O');
    }
    winner = true;
    loadScore();
    return;
  }
  checkDraw();
}

function checkDraw() {
  if (isBoardFull && winner == false) {
    alert('Empate!');
    loadScore();
  }
  return;
}

function loadScore() {
  scoreO = localStorage.getItem(scoreO);
  scoreX = localStorage.getItem(scoreX);

  const playerOneScore = document.querySelector('.playerOneScore');
  playerOneScore.innerHTML = scoreX;

  const playerTwoScore = document.querySelector('.playerTwoScore');
  playerTwoScore.innerHTML = scoreO;
  
 resetGame();
}

const createGrid = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const button = document.createElement('button');
        button.className = 'square';
        button.dataset.row = row;
        button.dataset.col = col;
        button.textContent = grid[row][col];
        gridContainer.appendChild(button);
        button.addEventListener('click', () => {
          if (button.textContent === '') {
            button.textContent = currentPlayer;
            grid[row][col] = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerTurn();
          } 
        });
      }
    }
  };

const loadGame = () => {
    if (gridContainer.children.length > 0) {
        while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
 }
 playerTurn(); 
}

const resetGame = () => {
  if (winner || isBoardFull) {
    const buttons = document.querySelectorAll('.square');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].textContent = '';
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        grid[i][j] = '';
      }
    }
  }
}

const backToLogin = () => {
  window.location = '../index.html';
}

window.onload = () => {
    playerOne.innerHTML = localStorage.getItem('player');
    loadGame();
    createGrid();
}

submit.addEventListener('click', addPlayer);
