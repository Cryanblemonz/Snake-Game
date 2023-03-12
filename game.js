let rows=20;
let cols=20;
let blockSize = 25;
let c;

// snake head
let randomStartPosition = Math.floor(Math.random()*rows);
console.log(randomStartPosition);
let snakeX = blockSize * randomStartPosition;
let snakeY = blockSize * randomStartPosition;

let velocityX = 0;
let velocityY = 0;

let foodPosX;
let foodPosY;

let snakeBody = [];

let difficulty = document.getElementById('difficulty');



    let board = document.querySelector("canvas");   
    c = board.getContext('2d');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    placeFood();
    document.addEventListener('keyup', changeDirection);
    update();
    difficulty.addEventListener('change', event => {
    if (difficulty.value == "Impossible"){
        let speed = 50;
        setInterval(update, speed);
    }
    if (difficulty.value == "EZPZ"){
        let speed = 200;
        setInterval(update, speed);
    } 
    if (difficulty.value == "Easy"){
        let speed = 150;
        setInterval(update, speed);
    }
    if (difficulty.value == "Medium"){
        let speed = 100;
        setInterval(update, speed);
    }
    if (difficulty.value == "Hard"){
        let speed = 75;
        setInterval(update, speed);
    }
    })

function update(){
    c.fillStyle="black";
    c.fillRect(0,0, board.width, board.height);

    c.fillStyle="yellow";
    c.fillRect(foodPosX, foodPosY, blockSize, blockSize);

    if(snakeX == foodPosX && snakeY == foodPosY){
        snakeBody.push([foodPosX, foodPosY])
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody [i-1];
    }

    

    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }


    c.fillStyle="blue";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    c.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i=0; i< snakeBody.length; i++){
        c.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

        if(snakeX <0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
            document.querySelector('h1').innerHTML = "Game Over";
            document.querySelector('h1').classList.add('game-over');
        }
    
        for(let i = 0; i<snakeBody.length; i++){
            if(snakeX ==snakeBody[i][0] && snakeY == snakeBody[i][1]){
                document.querySelector('h1').innerHTML = "Game Over";
                document.querySelector('h1').classList.add('game-over');
            };
        }
    }



function placeFood(){
    foodPosX = blockSize * Math.floor(Math.random()*rows);
    foodPosY = blockSize * Math.floor(Math.random()*cols);
}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY !=1){
        velocityX = 0;        
        velocityY = -1;
    }
    if(e.code == "ArrowDown" && velocityY !=-1){
        velocityX = 0;        
        velocityY = 1;
    }
    if(e.code == "ArrowRight" && velocityX !=-1){
        velocityX = 1;        
        velocityY = 0;
    }
    if(e.code == "ArrowLeft" && velocityX !=1){
        velocityX = -1;        
        velocityY = 0;
    }

    
}