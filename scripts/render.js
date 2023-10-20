
// board
let board = document.getElementById("canvas");
let context = board.getContext('2d');

// Set the board width and height
let boardWidth = 1200;
let boardHeight = 900;
board.height = boardHeight;
board.width = boardWidth;

// set the bgColor to black
const boardColor = 'rgb(0, 0, 0)';
board.style.background = boardColor;

// position the board
board.style.position = 'fixed';
board.style.top = '0';
board.style.left = '0';


window.addEventListener("load", () => {
    document.addEventListener("keyup", changeDirection)
    setInterval(update, 1000/60); // 60 frames per second
});

function update() {
    // Clear the canvas before drawing the updated position
    context.clearRect(0, 0, boardWidth, boardHeight);
    context.fillStyle = boardColor;
    context.fillRect(0, 0, boardWidth, boardHeight);
}

