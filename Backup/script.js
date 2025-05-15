document.addEventListener("DOMContentLoaded", function() {
    let startObstacle2Movement = false;
    const gameArea = document.getElementById("gameArea");
    const car = document.getElementById("car");
    const obstacle1 = document.getElementById("obstacle1");
    const obstacle2 = document.getElementById("obstacle2");

    let contPointPlayer = 0;
    let contCarDogde = 10;
    let carPosition = 130; // Posizione iniziale della macchina
    let obstacle1Y = -70;   // Posizione iniziale dell'ostacolo
    let gameRunning = true;
    let posizioni = [0, 60, 120, 180, 240];
    let obstacle2Y = -70;
    let obstacle2Active = false; // Attivo solo dopo 1000 punti

    // Funzione per generare una posizione casuale per il secondo ostacolo
    function getRandomPositionForObstacle(excludePosition) {
        let newPosition;
        do {
            newPosition = Math.floor(Math.random() * 260); // Genera una posizione casuale tra 0 e 260px
        } while (Math.abs(newPosition - excludePosition) < 60); // Assicurati che non sia troppo vicino al primo ostacolo
        return newPosition;
    }

    // Controlla le collisioni
    function checkCollision(obstacle) {
        const carRect = car.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        return (
            carRect.x < obstacleRect.x + obstacleRect.width &&
            carRect.x + carRect.width > obstacleRect.x &&
            carRect.y < obstacleRect.y + obstacleRect.height &&
            carRect.y + carRect.height > obstacleRect.y
        );
    }

    // Sposta la macchina con i tasti sinistra/destra
    document.addEventListener("keydown", (e) => {
        if(gameRunning){
            if (e.key === "ArrowLeft" && carPosition > 10) {
                carPosition -= 60;
                car.style.left = carPosition + "px";
            } else if (e.key === "ArrowRight" && carPosition < 250) {
                carPosition += 60;
                car.style.left = carPosition + "px";
            }
        }
    });

    function moveSingleObstacle(obstacle, obstacleY) {
        obstacleY += 5;
        obstacle.style.top = obstacleY + "px";

        if (obstacleY > 500) {
            obstacleY = -70;
            contPointPlayer += contCarDogde;
            obstacle.style.left = posizioni[Math.floor((Math.random() * 5))] + 10 + "px"; // Nuova posizione casuale
        }
        return obstacleY;
    }

    // Anima l'ostacolo
    function moveObstacle() {
        if (!gameRunning) return;

        contPointPlayer += 1; // Incrementa il punteggio

        obstacle1Y = moveSingleObstacle(obstacle1, obstacle1Y);

        if (obstacle2Active && startObstacle2Movement) {
          obstacle2Y = moveSingleObstacle(obstacle2, obstacle2Y);
        }


        if (contPointPlayer >= 1000 && !obstacle2Active) {
          obstacle2Active = true;

          // Mostra subito ma non inizia a muoversi
          obstacle2.style.display = "block";
          obstacle2.style.left = posizioni[Math.floor(Math.random() * 5)] + 10 + "px";
    
          // Ritardo di 1000ms (1 secondo) prima di iniziare a farlo cadere
          setTimeout(() => {
            obstacle2Y = -70; // Reset posizione
            startObstacle2Movement = true;
          }, 1000);
        }

        // Rileva collisione
        if (checkCollision(obstacle1) || (obstacle2Active && checkCollision(obstacle2))) {
            alert("Game Over! Il tuo Punteggio è di: " + contPointPlayer);
            gameRunning = false;
        }

        requestAnimationFrame(moveObstacle);
    }

    moveObstacle();
});














/*

const obstacle1 = document.getElementById("obstacle1");
const obstacle2 = document.getElementById("obstacle2");

/*let obstacle1Y = -70;
let obstacle2Y = -70;
let obstacle2Active = false; // Attivo solo dopo 1000 punti

// Funzione per spostare un ostacolo
function moveSingleObstacle(obstacle, obstacleY, setNewYCallback) {
  obstacleY += 5;
  obstacle.style.top = obstacleY + "px";

  if (obstacleY > 500) {
    obstacleY = -70;
    contPointPlayer += contCarDogde;
    obstacle.style.left = posizioni[Math.floor(Math.random() * posizioni.length)] + "px";
  }

  setNewYCallback(obstacleY);
}

// Rileva collisione tra auto e ostacolo
/*function checkCollision(obstacle) {
  const carRect = car.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  return (
    carRect.x < obstacleRect.x + obstacleRect.width &&
    carRect.x + carRect.width > obstacleRect.x &&
    carRect.y < obstacleRect.y + obstacleRect.height &&
    carRect.y + carRect.height > obstacleRect.y
  );
}

// Funzione principale di animazione
function moveObstacles() {
  if (!gameRunning) return;

  contPointPlayer += 1;

  // Muove il primo ostacolo
  moveSingleObstacle(obstacle1, obstacle1Y, (newY) => obstacle1Y = newY);

  // Attiva il secondo ostacolo al punteggio 1000
  if (contPointPlayer >= 1000 && !obstacle2Active) {
    obstacle2Active = true;
    obstacle2.style.display = "block";
    obstacle2.style.left = posizioni[Math.floor(Math.random() * posizioni.length)] + "px";
  }

  // Muove il secondo ostacolo se attivo
  if (obstacle2Active) {
    moveSingleObstacle(obstacle2, obstacle2Y, (newY) => obstacle2Y = newY);
  }

  // Controlla collisione con entrambi gli ostacoli
 /* if (checkCollision(obstacle1) || (obstacle2Active && checkCollision(obstacle2))) {
    alert("Game Over! Il tuo Punteggio è di: " + contPointPlayer);
    gameRunning = false;
    return;
  }

  requestAnimationFrame(moveObstacles);
}

moveObstacles();*/