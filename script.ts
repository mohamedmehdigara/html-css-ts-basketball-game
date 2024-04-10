// Define constants
const basketball = document.getElementById('basketball')!;
const player = document.getElementById('player')!;
const basket = document.getElementById('basket')!;
const court = document.getElementById('court') as SVGSVGElement; // Cast to SVGSVGElement

// Initialize variables
let score = 0;
let isDribbling = false;
const dribbleSpeed = 3;
const playerSpeed = 5;

// Add score display
const scoreDisplay = document.createElement('div');
scoreDisplay.id = 'score-display';
scoreDisplay.textContent = 'Score: 0';
document.body.appendChild(scoreDisplay);

// Add dribble animation
function dribble() {
  const basketballRect = basketball.getBoundingClientRect();
  const courtRect = court.getBoundingClientRect();

  if (basketballRect.bottom + dribbleSpeed < courtRect.bottom) {
    basketball.setAttribute('cy', String(parseInt(basketball.getAttribute('cy')!) + dribbleSpeed));
  } else {
    isDribbling = false;
  }
}

// Update score display
function updateScoreDisplay() {
  scoreDisplay.textContent = 'Score: ' + score;
}

// Function to handle shooting the ball
function shootBall() {
  if (!isDribbling) {
    const basketballRect = basketball.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if (basketballRect.right >= basketRect.left && basketballRect.left <= basketRect.right &&
      basketballRect.bottom >= basketRect.top && basketballRect.top <= basketRect.bottom) {
      score++;
      alert('Score! Current score: ' + score);
      resetBasketball();
      updateScoreDisplay();
    } else {
      alert('Miss! Try again.');
    }
  }
}

// Function to reset basketball position
function resetBasketball() {
  basketball.setAttribute('cx', '50');
  basketball.setAttribute('cy', '150');
}

// Move player with arrow keys
window.addEventListener('keydown', (event) => {
  const playerX = parseInt(player.getAttribute('cx')!);
  const playerY = parseInt(player.getAttribute('cy')!);

  switch (event.key) {
    case 'ArrowUp':
      if (playerY - playerSpeed >= 0) {
        player.setAttribute('cy', String(playerY - playerSpeed));
      }
      break;
    case 'ArrowDown':
      if (playerY + playerSpeed <= 280) { // Adjusted to fit within the court
        player.setAttribute('cy', String(playerY + playerSpeed));
      }
      break;
    case 'ArrowLeft':
      if (playerX - playerSpeed >= 0) {
        player.setAttribute('cx', String(playerX - playerSpeed));
      }
      break;
    case 'ArrowRight':
      if (playerX + playerSpeed <= 580) { // Adjusted to fit within the court
        player.setAttribute('cx', String(playerX + playerSpeed));
      }
      break;
    case ' ': // Spacebar for dribbling
      isDribbling = true;
      dribble();
      break;
  }
});
