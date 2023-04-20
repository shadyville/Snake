var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gridSize = 10;
var snake = [{ x: 20, y: 20 }, { x: 10, y: 20 }];
var direction = "right";
var food = { x: 0, y: 0 };
var score = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "green";
  for (var i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);

  // Move snake
  var head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "up":
      head.y -= gridSize;
      break;
    case "down":
      head.y += gridSize;
      break;
    case "left":
      head.x -= gridSize;
      break;
    case "right":
      head.x += gridSize;
      break;
  }

  // Check for collision with wall
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    clearInterval(gameLoop);
    alert("Game over! Final score: " + score);
    return;
  }

  // Check for collision with food
  if (head.x == food.x && head.y == food.y) {
    score++;
    snake.push({});
    generateFood();
  }

  // Move snake segments
  for (var i = snake.length - 1; i > 0; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }
  snake[0] = head;

  // Check for collision with self
  for (var i = 1; i < snake.length; i++) {
    if (head.x == snake[i].x && head.y == snake[i].y) {
      clearInterval(gameLoop);
      alert("Game over! Final score: " + score);
      return;
    }
  }
}

function generateFood() {
  food.x = getRandomInt(canvas.width / gridSize) * gridSize;
  food.y = getRandomInt(canvas.height / gridSize) * gridSize;
}

document.addEventListener("keydown", function (event) {
  switch (event.code) {
    case "ArrowUp":
      if (direction != "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction != "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction != "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction != "left") direction = "right";
      break;
  }
});

generateFood();
var gameLoop = setInterval(draw, 100);
