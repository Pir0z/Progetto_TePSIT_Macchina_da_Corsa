const gameArea = document.getElementById("gameArea");
const car = document.getElementById("car");
const obstacle1 = document.querySelector(".obstacle1");
const obstacle2 = document.querySelector(".obstacle2");

let contPointPlayer = 0;
let contCarDogde = 10;
let carPosition = 130; // Posizione iniziale della macchina
let obstacle1Y = -70;   // Posizione iniziale dell'ostacolo 1
let obstacle2Y = -70;   // Posizione iniziale dell'ostacolo 2
let gameRunning = true;

// Distanza tra gli ostacoli (per evitare sovrapposizioni)
const minDistance = 60; // Distanza minima tra i due ostacoli

// Funzione per generare una posizione casuale per il secondo ostacolo
function getRandomPositionForObstacle(excludePosition) {
  let newPosition;
  do {
    newPosition = Math.floor(Math.random() * 260); // Genera una posizione casuale tra 0 e 260px
  } while (Math.abs(newPosition - excludePosition) < minDistance); // Assicurati che non sia troppo vicino al primo ostacolo
  return newPosition;
}

// Sposta la macchina con i tasti sinistra/destra
document.addEventListener("keydown", (e) => {
  if(!gameRunning) {
    return; // Non permette di muovere la macchina se il gioco è finito
  }
  if (e.key === "ArrowLeft" && carPosition > 10) {
    carPosition -= 64;
    car.style.left = carPosition + "px";
  } else if (e.key === "ArrowRight" && carPosition < 250) {
    carPosition += 64;
    car.style.left = carPosition + "px";
  }
});

// Anima gli ostacoli
function moveObstacles() {
  if (!gameRunning) {
    return;
  }

  contPointPlayer += 1; // Incrementa il punteggio

  // Velocità e movimento per i due ostacoli
  obstacle1Y += 5;
  obstacle2Y += 5;

  // Imposta la posizione verticale dei due ostacoli
  obstacle1.style.top = obstacle1Y + "px";
  obstacle2.style.top = obstacle2Y + "px";

  // Posiziona orizzontalmente gli ostacoli
  obstacle1.style.left = carPosition + "px"; // Primo ostacolo alla posizione della macchina
  obstacle2.style.left = getRandomPositionForObstacle(carPosition) + "px"; // Secondo ostacolo con posizione casuale, ma non nella stessa posizione del primo

  // Resetta gli ostacoli una volta fuori dallo schermo
  if (obstacle1Y > 500 && obstacle2Y > 500) {
    obstacle1Y = -70;
    obstacle2Y = -70;
    contPointPlayer += contCarDogde; // Incrementa il punteggio per aver schivato l'ostacolo
    obstacle1.style.left = carPosition + "px"; // Posiziona il primo ostacolo sulla posizione della macchina
    obstacle2.style.left = getRandomPositionForObstacle(carPosition) + "px"; // Genera una nuova posizione casuale per il secondo ostacolo
  }

  // Rileva collisione con i due ostacoli
  const carRect = car.getBoundingClientRect();
  const obstacle1Rect = obstacle1.getBoundingClientRect();
  const obstacle2Rect = obstacle2.getBoundingClientRect();

  if ((carRect.x < obstacle1Rect.x + obstacle1Rect.width && carRect.x + carRect.width > obstacle1Rect.x && carRect.y < obstacle1Rect.y + obstacle1Rect.height && carRect.y + carRect.height > obstacle1Rect.y) ||
    (carRect.x < obstacle2Rect.x + obstacle2Rect.width && carRect.x + carRect.width > obstacle2Rect.x && carRect.y < obstacle2Rect.y + obstacle2Rect.height && carRect.y + carRect.height > obstacle2Rect.y)
  ) {
    alert("Game Over! Il tuo Punteggio è di: " + contPointPlayer);
    gameRunning = false;
  }
  requestAnimationFrame(moveObstacles);
}
moveObstacles();