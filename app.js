
var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10; 
var ballSpeedY = 5;

var paddle1 = 250;
var paddle2 = 250;

const paddleHeight = 100;
const paddleThickness = 10;

var player1Score = 0;
var player2Score = 0;
const playerWins = 3;

var showWins = false;

function calcMousePos(evt) {
    //black field
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };

}
function mouseClick(evt) {
    if (showWins) {
        player1Score = 0;
        player2Score = 0;
        showWins = false;
    }
}


window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function () {
        move();
        draw();
    }, 1000 / framesPerSecond);

    canvas.addEventListener('mousedown', mouseClick);

    canvas.addEventListener('mousemove',
        function (evt) {
            var mousePos = calcMousePos(evt);
            paddle1 = mousePos.y - (paddleHeight / 2);
        }
    );
}

function ballReset() {

    if (player1Score >= playerWins ||
        player2Score >= playerWins) {
        player1Score = 0;
        player2Score = 0;
        showWins = true;
    }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function computerTurn() {
    var paddle2Center = paddle2 + (paddleHeight / 2);
    if (paddle2Center < ballY - 35) {
        paddle2 += 6;
    } else if (paddle2Center > ballY + 35)
        paddle2 -=  6;
    }


function move() {
    if (showWins) {
        return;
    }
    computerTurn();
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX < 0) {
        if (ballY > paddle1 &&
            ballY < paddle1 + paddleHeight) {
            ballSpeedX = -ballSpeedX;

            var angle = ballY
                - (paddle1 + paddleHeight / 2);
            ballSpeedY = angle * 0.35;
        } else {
            player2Score++;
            ballReset();
        }
    }
    if (ballX > canvas.width) {
        if (ballY > paddle2 &&
            ballY < paddle2 + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            var angle = ballY
                - (paddle2 + paddleHeight / 2);
            ballSpeedY = angle * 0.35;

        } else {
            player1Score++;
            ballReset();
        }
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawNet() {
    for (var i = 0; i < canvas.height; i += 40) {
        color(canvas.width / 2 - 1, i, 2, 20, 'white');
    }
}

function draw() {

    //choose color black for the field
    color(0, 0, canvas.width, canvas.height, 'black');

    if (showWins) {
        canvasContext.fillStyle = 'white';

        if (player1Score >= playerWins) {
            canvasContext.fillText("Left Player Won!", 350, 200);

        } else if (player2Score >= playerWins) {
            canvasContext.fillText("Right Player Won!", 350, 200);

        }
        canvasContext.fillText("Click to Continue!", 350, 500);
    }

    drawNet();

    //left player
    color(0, paddle1, paddleThickness, paddleHeight, 'white');

    //right player
    color(canvas.width - paddleThickness, paddle2, paddleThickness, paddleHeight, 'white');

    //ball
    colorBall(ballX, ballY, 10, 'white');

    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width - 100, 100);

}

function colorBall(centerX, centerY, radius, selectColor) {
    canvasContext.fillStyle = selectColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function color(leftX, topY, width, height, selectColor) {
    canvasContext.fillStyle = selectColor;
    canvasContext.fillRect(leftX, topY, width, height);

}
