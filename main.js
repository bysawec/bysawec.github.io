const  canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'img/border.png'

const foodImg = new Image();
foodImg.src = 'img/food.png'

let box = 32;

let score = 0;
let gg = "game over"
function checker () {
if (score > 27) {
    clearInterval(game)
    clearInterval(checks)
    }
}
let checks = setInterval(checker, 10)
let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};


let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
};




document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != "right")
        dir = "left";
    else if (event.keyCode == 38 && dir != "down")
    dir = "up";
    else  if(event.keyCode == 39 && dir != "left")
    dir = "right";
    else if(event.keyCode == 40 && dir != "up")
    dir = "down";
    else if(event.keyCode == 66)
    game = setInterval(render, 10);

}

function eatTail (head, arr) {
    for (let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y)
        end()
    }

};


function render () {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y)

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red"
        ctx.fillRect(snake[i].x, snake[i].y, 30, 30)
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box  * 1.7)

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX === food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
      } else {
          snake.pop()
      }

      if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17)
      score++;

        if (snakeX < box + 1 && dir == "left"){
            snakeX = box * 18;
            score-= 1;
        }
        else if (snakeX > box * 16 && dir == "right") {
            snakeX = box - 32;
            score -=1;
        }
        else if (snakeY > box * 16 && dir == "down") {
            snakeY = box * 2;
            score -= 1;
        }
        else if (snakeY < box * 4 && dir == "up") {
            snakeY = box * 18;    
            score -= 1;
        }

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake)
    snake.unshift(newHead);
}



function end(){
    ctx.fillStyle = "black";
    ctx.font = "77px Arial";
    ctx.fillText(gg, box * 4 , box  * 8)
    score = 0
    clearInterval(game);
}
var game = setInterval(render, 40);
