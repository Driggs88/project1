//Math Maze Runner
$(document).ready(function(){
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
    var timeElapsed = 0;
    var playerOneTimeElapsed = 0;
    var playerTwoTimeElapsed = 0;
    var interval = null;


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
    function changeOperator (operator){
      operation = operator;
    }
    function ask() {
      totalAnswers++;
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
              while(maxNum % minNum !==0){
                minNum = Math.floor(Math.random() * 10) + 1;
              }
                correctAnswer = maxNum / minNum;
                operationChallenge = divide;
            }
            break;
          default:

        }
        var userAnswer = prompt("How much is " + maxNum + " " + operationChallenge + " " + minNum + "?");
        if(correctAnswer === Number(userAnswer)){
          correctAnswers++;
          boost();
          alert("Speed Boost Activated!");
        }
    }

    function checkRandomChallenge() {
        var odds = [3, 7, 12, 16, 24, 29, 35, 38, 41, 47];
        var randomNum =  Math.floor(Math.random() * (50 - 0)) + 1;
        return odds.indexOf(randomNum) !== -1;
    }

    function boost() {
      dx = 6;
      dy = 6;
      setTimeout(function(){
        dx = 4;
        dy = 4;
      },5000);
    }

    function doKeyUp(evt){

      if (evt.keyCode == 38 || evt.keyCode == 40 || evt.keyCode == 37 || evt.keyCode == 39){
        isMoving = false;
      }
    }


    //total  questions answer correctly
    function giveFeedBack(){
      alert("You got "+correctAnswers+"/"+totalAnswers+" correctly");
    }

    //finish line
    function checkIfPlayerDone() {
      if (x > 900) {
        //user passes fininsh line
        clearInterval(interval);
        giveFeedBack();
        if (playerOneTimeElapsed === 0) {
          //player one is done
          prepareForPlayerTwo();
          setPlayerTime();
        } else {
          //player two is done
            setPlayerTime();
            prepareEndOfGame();
        }
      }
    }
    function prepareEndOfGame(){
        //compare the two player times
        if(playerOneTimeElapsed < playerTwoTimeElapsed){
          alert("Player One is the Winner!");
        }else {
          alert("Player Two is the Winner!");
        }
    }
    function prepareForPlayerTwo() {
      //reset player two to start position
      x = 290;
      y = 5;
      draw();
      //reset interval timer
      initInterval();

    }
    function setPlayerTime(){
      if (playerOneTimeElapsed === 0) {
        playerOneTimeElapsed = timeElapsed;
        timeElapsed = 0;
      } else {
        playerTwoTimeElapsed = timeElapsed;
      }
    }
    function prepareCharacterMove() {
        isMoving = true;
        checkcollision();
        stepCounter += dx;
        checkIfPlayerDone();
        if(stepCounter % 50 === 0) {
          if  (checkRandomChallenge()){
              ask();
        }
      }
    }

    function doKeyDown(evt){
      switch (evt.keyCode) {
        case 38:  /* Up arrow was pressed */
        evt.preventDefault();
          if (y - dy > 0){
            y -= dy;
            spriteSheetY = 0;
            prepareCharacterMove();
            if (collision == 1){
              y += dy;
              collision = 0;
            }
          }

          break;
          case 40:  /* Down arrow was pressed */
          evt.preventDefault();
          if (y + dy < HEIGHT ){
            y += dy;
            spriteSheetY = 64;
            prepareCharacterMove();
            if (collision == 1){
              y -= dy;
              collision = 0;
            }
          }

          break;
          case 37:  /* Left arrow was pressed */
          evt.preventDefault();
          if (x - dx > 0){
            x -= dx;
            spriteSheetY = 96;
            prepareCharacterMove();
            if (collision == 1){
              x += dx;
              collision = 0;
            }
          }
          break;
          case 39:  /* Right arrow was pressed */
          evt.preventDefault();
          if ((x + dx < WIDTH)){
            x += dx;
            spriteSheetY = 32;
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
      clear();
      drawSprite();
    }
    function initInterval(){
      interval = setInterval(setTime, 10);
    }
    init();
    window.addEventListener('keydown',doKeyDown,true);
    window.addEventListener('keyup',doKeyUp,true);

      $("#exampleModal").modal();

      $('.add').on('click', (function(){
        changeOperator('add');
        initInterval();
    }));
      $('.subtract').on('click', (function(){
        changeOperator('subtract');
            initInterval();
    }));
      $('.divide').on('click', (function(){
        changeOperator('divide');
            initInterval();
    }));
      $('.multiply').on('click', (function(){
        changeOperator('multiply');
            initInterval();
    }));

    //Game timer
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    function setTime()
      {
        timeElapsed += 10;
        var seconds = ((timeElapsed/1000) % 60).toFixed(2);
        var minutes = Math.floor( (timeElapsed/1000/60) % 60 );
        secondsLabel.innerHTML = pad(seconds);
        minutesLabel.innerHTML = pad(minutes);
    }
    function pad(val)
      {
        if(val < 10) {
          return '0' + val;
        } else {
          return val;
        }
      }
});
