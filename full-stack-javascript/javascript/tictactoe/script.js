const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const setMark = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  return { getBoard, setMark, resetBoard };
})();


const Player = (name, marker) => {
  return { name, marker };
};


const GameController = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let isGameOver = false;

  const startGame = (name1, name2) => {
    players = [Player(name1 || "Player 1", "X"), Player(name2 || "Player 2", "O")];
    currentPlayerIndex = 0;
    isGameOver = false;
    Gameboard.resetBoard();
    DisplayController.render();
    DisplayController.setMessage(`${players[currentPlayerIndex].name}'s turn (${players[currentPlayerIndex].marker})`);
  };

  const playRound = (index) => {
    if (isGameOver) return;
    if (!Gameboard.setMark(index, players[currentPlayerIndex].marker)) return;

    DisplayController.render();

    if (checkWinner(players[currentPlayerIndex].marker)) {
      DisplayController.setMessage(`${players[currentPlayerIndex].name} wins!`);
      isGameOver = true;
    } else if (Gameboard.getBoard().every(cell => cell !== "")) {
      DisplayController.setMessage("It's a tie!");
      isGameOver = true;
    } else {
      currentPlayerIndex = 1 - currentPlayerIndex;
      DisplayController.setMessage(`${players[currentPlayerIndex].name}'s turn (${players[currentPlayerIndex].marker})`);
    }
  };

  const checkWinner = (marker) => {
    const b = Gameboard.getBoard();
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
    ];
    return wins.some(comb => comb.every(i => b[i] === marker));
  };

  return { startGame, playRound };
})();


const DisplayController = (() => {
  const boardElement = document.getElementById("gameboard");
  const messageElement = document.getElementById("message");

  const render = () => {
    boardElement.innerHTML = "";
    Gameboard.getBoard().forEach((mark, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = mark;
      cell.addEventListener("click", () => GameController.playRound(index));
      boardElement.appendChild(cell);
    });
  };

  const setMessage = (msg) => {
    messageElement.textContent = msg;
  };

  return { render, setMessage };
})();


document.getElementById("startBtn").addEventListener("click", () => {
  const name1 = document.getElementById("player1").value;
  const name2 = document.getElementById("player2").value;
  GameController.startGame(name1, name2);
});
