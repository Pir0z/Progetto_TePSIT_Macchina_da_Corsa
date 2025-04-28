const gameArea = document.getElementById("gameArea");
const car = document.getElementById("car");
const obstacle = document.querySelector(".obstacle");

let contPointPlayer = 0;
let contCarDogde = 10;
let carPosition = 130; // Posizione iniziale della macchina
let obstacleY = -70;   // Posizione iniziale dell'ostacolo
let gameRunning = true;

// Sposta la macchina con i tasti sinistra/destra
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && carPosition > 10) {
    carPosition -= 32;
    car.style.left = carPosition + "px";
  } else if (e.key === "ArrowRight" && carPosition < 250) {
    carPosition += 32;
    car.style.left = carPosition + "px";
  }
});

// Anima l'ostacolo
function moveObstacle() {
  if (!gameRunning) return;

  contPointPlayer += 1; // Incrementa il punteggio
  obstacleY += 5; // Velocità dell'ostacolo
  obstacle.style.top = obstacleY + "px";

  // Resetta l'ostacolo una volta fuori dallo schermo
  if (obstacleY > 500) {
    obstacleY = -70;
    contPointPlayer += contCarDogde; // Incrementa il punteggio per aver schivato l'ostacolo
    obstacle.style.left = Math.random() * 260 + "px"; // Nuova posizione casuale
  }

  // Rileva collisione
  const carRect = car.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    carRect.x < obstacleRect.x + obstacleRect.width &&
    carRect.x + carRect.width > obstacleRect.x &&
    carRect.y < obstacleRect.y + obstacleRect.height &&
    carRect.y + carRect.height > obstacleRect.y
  ) {
    alert("Game Over! Il tuo Punteggio è di: " + contPointPlayer);
    gameRunning = false;
  }

  requestAnimationFrame(moveObstacle);
}

moveObstacle();