document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.getElementById("gridContainer");
  const resizeGridBtn = document.getElementById("resizeGridBtn");

  function createGrid(size) {
    gridContainer.innerHTML = "";
    const totalSquares = size * size;
    const squareSize = 960 / size;

    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement("div");
      square.classList.add("gridSquare");
      square.style.width = `${squareSize}px`;
      square.style.height = `${squareSize}px`;

     
      square.addEventListener("mouseenter", () => {
        let currentOpacity = parseFloat(square.style.opacity);
        if (currentOpacity > 0) {
          square.style.opacity = (currentOpacity - 0.1).toFixed(1);
        }
        square.style.backgroundColor = "black";
      });

      gridContainer.appendChild(square);
    }
  }

 
  createGrid(16);

  
  resizeGridBtn.addEventListener("click", () => {
    const userSize = parseInt(prompt("Enter grid size (max 100):"), 10);
    if (userSize > 0 && userSize <= 100) {
      createGrid(userSize);
    } else {
      alert("Please enter a valid number between 1 and 100.");
    }
  });
});
