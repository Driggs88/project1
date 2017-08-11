//Maze collision

var canvas;
var ctx;
var dx = 4;
var dy = 4;
var x = 290;
var y = 5;
var stepCounter = 0;
var WIDTH = 982;
var HEIGHT = 482;
var img = new Image();
var collision = 0;
var totalAnswers = 0;
var correctAnswers = 0;
var sprite = new Image();
sprite.src = "img/walk.png";
var isMoving = false;
var spriteSheetX = 0;
var spriteSheetY = 64;
var operation = null;


function drawSprite() {
  ctx.drawImage(sprite,spriteSheetX,spriteSheetY,24,32,x,y,24,32);
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.drawImage(img, 30, 0);
}

function init() {
  // canvas image
  // canvas = document.getElementById("canvas");
  // ctx = canvas.getContext("2d");
  // img.src = "img/maze.png";
  // return setInterval(draw, 10);

  // png to canvas draw pattern
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    img.src = 'img/mazeT.png';
    img.onload = function() {
      var pattern = ctx.createPattern(img, 'repeat');
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, 400, 400);
      draw();
    };


}

//random math problem
function ask() {
    var a = Math.floor(Math.random() * 10) + 1;
    var b = Math.floor(Math.random() * 10) + 1;
    var maxNum = Math.max(a, b);
    var minNum = Math.min(a, b);
    var correctAnswer, operationChallenge;
    var add = ["+"][Math.floor(Math.random()*1)];
    var subtract = ["-"][Math.floor(Math.random()*1)];
    var multiply = ["*"][Math.floor(Math.random()*1)];
    var divide = ["/"][Math.floor(Math.random()*1)];

    switch (operation) {
        case 'add': {
            correctAnswer = a + b;
            operationChallenge = add;
        }
        break;
        case 'subtract': {
            correctAnswer = maxNum - minNum;
            operationChallenge = subtract;
        }
        break;
        case 'multiply': {
            correctAnswer = a * b;
            operationChallenge = multiply;
        }
        break;
        case 'divide': {
            correctAnswer = maxNum / minNum;
            operationChallenge = divide;
        }
        break;
      default:

    }
    var userAnswer = prompt("How much is " + maxNum + " " + operationChallenge + " " + minNum + "?");
    return correctAnswer === Number(userAnswer);
}

function checkRandomChallenge() {
    var odds = [3, 23, 11, 30, 44, 10, 2, 32, 49, 17];
    var randomNum =  Math.floor(Math.random() * (50 - 0)) + 1;
    console.log(randomNum);
    return odds.indexOf(randomNum) !== -1;
}

// function boost() {
//   var dx = 4;
//   var dy = 4;
//   if (correct == true){
//
//   }
// }

function doKeyUp(evt){
  if (evt.keyCode == 38 || evt.keyCode == 40 || evt.keyCode == 37 || evt.keyCode == 39){
    isMoving = false;
  }
}

function prepareCharacterMove() {
    isMoving = true;
    checkcollision();
    stepCounter += dx;
    if(stepCounter % 50 === 0) {
        if(checkRandomChallenge()){
            if(ask()){
                correctAnswers++;
            }
            totalAnswers++;
            alert( "You got "+correctAnswers+"/"+totalAnswers+" correctly");
        }
    }
}

function doKeyDown(evt){
  switch (evt.keyCode) {
    case 38:  /* Up arrow was pressed */
      if (y - dy > 0){
        y -= dy;
        spriteSheetY = 0;
        // clear();
        prepareCharacterMove();
        if (collision == 1){
          y += dy;
          collision = 0;
        }
      }

      break;
      case 40:  /* Down arrow was pressed */
      if (y + dy < HEIGHT ){
        y += dy;
        spriteSheetY = 64;
        // clear();
        prepareCharacterMove();
        if (collision == 1){
          y -= dy;
          collision = 0;
        }
      }

      break;
      case 37:  /* Left arrow was pressed */
      if (x - dx > 0){
        x -= dx;
        spriteSheetY = 96;
        // clear();
        prepareCharacterMove();
        if (collision == 1){
          x += dx;
          collision = 0;
        }
      }
      break;
      case 39:  /* Right arrow was pressed */
      if ((x + dx < WIDTH)){
        x += dx;
        spriteSheetY = 32;
        // clear();
        prepareCharacterMove();
        if (collision == 1){
          x -= dx;
          collision = 0;
        }
      }
      break;
    }
  }

  function checkcollision() {
    var imgd = ctx.getImageData(x, y, 20, 35);
    var pix = imgd.data;
    // console.log(pix);
    collision = 0;
    for (var i = 0; n = pix.length, i < n; i++) {
      if (pix[i] === 223) {
        collision = 1;
        break;
      }
    }

  }

// loop through sprite sheet
setInterval(function(){
  if (isMoving === true){
    spriteSheetX += 24;
    if (spriteSheetX === 168){
      spriteSheetX = 0;
    }
    draw();
  }
}, 100);

function draw() {
  // console.log('Drawing');
  clear();
  drawSprite();
}

init();
window.addEventListener('keydown',doKeyDown,true);
window.addEventListener('keyup',doKeyUp,true);
