
// board
let board = document.getElementById("canvas");
let context = board.getContext('2d');

// Set the board width and height
let boardWidth = 1200;
let boardHeight = 940;
board.height = boardHeight;
board.width = boardWidth;

// set the bgColor to black
const boardColor = 'rgb(0, 0, 0)';
board.style.background = boardColor;

// position the board
board.style.position = 'fixed';
board.style.top = '0';
board.style.left = '0';

// get constants
const EGP = 9.807; // The average gravitational pull of the Earth
const FPS = 120;

const numberOfSquaresContainer = document.getElementById("number-of-squares");
let numberOfSquares = 0;

// Create an array to store the squares
let squares = [];

// Listen for mouse clicks
board.addEventListener("click", createSquare);


window.addEventListener("load", () => {
    setInterval(update, 1000/FPS); 
});

// Create square
function createSquare(event) {
    const squareSize = 50;
    const x = event.clientX - board.getBoundingClientRect().left - squareSize / 2;
    const y = event.clientY - board.getBoundingClientRect().top - squareSize / 2;
    
    squares.push({ x, y, size: squareSize, velocityY: 0 });
    numberOfSquares++;
    numberOfSquaresContainer.innerHTML = `Squares: ${numberOfSquares}`;
}

// check collisions
function isCollision(square1, square2) {
    if (
        square1.x < square2.x + square2.size &&
        square1.x + square1.size > square2.x &&
        square1.y < square2.y + square2.size &&
        square1.y + square1.size > square2.y
    ) {
        // Squares are colliding
        return true;
    }
    return false;
}


function update() {
    // Clear the canvas before drawing the updated position
    context.clearRect(0, 0, boardWidth, boardHeight);
    context.fillStyle = boardColor;
    context.fillRect(0, 0, boardWidth, boardHeight);

    // Draw and update the position of each square
    context.fillStyle = 'rgb(25,30,255)'; // Blue color for squares
    for (const square of squares) {
        // Apply gravitational force
        square.velocityY += EGP / 60; // 60 frames per second

        // Update square position
        square.y += square.velocityY;

        // Detect collision with the bottom of the canvas
        if (square.y + square.size >= boardHeight) {
            // Stop the square from falling further and place it at the bottom
            square.y = boardHeight - square.size;
            square.velocityY = -square.velocityY * ((square.velocityY /2) * (3/100));
        }

        // Check for collisions with other squares
        for (const otherSquare of squares) {
            if (square !== otherSquare && isCollision(square, otherSquare)) {
                square.y = otherSquare.y - square.size;
                square.velocityY = -square.velocityY * ((square.velocityY /2) * (3/100));
            }
        }

        // Draw the square
        context.fillRect(square.x, square.y, square.size, square.size);
    }
}

const resetBtn = document.getElementById("reset");

resetBtn.addEventListener("click", () => {
    squares = [];
    numberOfSquares = 0;
    numberOfSquaresContainer.innerHTML = `Squares: ${numberOfSquares}`;
    context.clearRect(0, 0, boardWidth, boardHeight);
    context.fillStyle = boardColor;
    context.fillRect(0, 0, boardWidth, boardHeight);
});


function randomRGB() {
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);

    return `rgb(${r}, ${g}, ${b})`
}
