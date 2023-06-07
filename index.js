const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;

let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise this game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","", "","","","","","",""];

    //UI par bhi empty karo
    boxes.forEach((box, index) =>{
            box.innerText="";
            boxes[index].style.pointerEvents ="all";

            //initialise property of boxes, that is Color
            box.classList = `box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

boxes.forEach((box, index) =>{
    box.addEventListener("click", () =>{
        handleClick(index);
    })
});

function checkGameOver(){

    let answer="";

    winningPosition.forEach((position) =>{
        
        //all three boxes should be non-empty and same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && gameGrid[position[0]]===gameGrid[position[1]] 
        && gameGrid[position[0]]===gameGrid[position[2]]){
        
            //winner found
            //check if winner is x
            if(gameGrid[position[0]]==="X"){
                answer = "X";
            } else{
                answer = "O";
            }
            
            //disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents="none";
            });

            //now we know X/O is a winner
            //mark them as grid
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //it means we have a winner
    if(answer!==""){
        //show winner
        gameInfo.innerText = `Winner Player - ${answer}`;

        newGameBtn.classList.add("active");

        return;
    }
    
    let fillCount=0;

    gameGrid.forEach((box) => {
        if(box!=""){
            fillCount++;
        }
    });

    //when there is no winner
    if(fillCount===9){
        //show TIED
        gameInfo.innerText = `Game Tied`;

        newGameBtn.classList.add("active");

        return;
    }
}

function handleClick(index){
    if(gameGrid[index]===""){
        //updating on UI
        boxes[index].innerText = currentPlayer;

        boxes[index].style.pointerEvents ="none";
        
        //update in grid
        gameGrid[index]=currentPlayer;

        //swap turn
        swapTurn();

        //check koi jeet toh nhi gaya
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    } else{
        currentPlayer="X";
    }

    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

//New game button, event listener
newGameBtn.addEventListener("click", initGame);