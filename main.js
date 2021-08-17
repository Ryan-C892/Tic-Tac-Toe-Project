// gameBoard Factory Function
// Make sure every important bit of code is inside the factory
const gameBoard = (()=> {
    let puzzleGrid = document.querySelector(".main-container");
    let modal = document.querySelector(".modal");
    let startBtn = document.querySelector("#start");
    let buttons = document.querySelector(".buttons");
    let playerSelect = document.querySelector(".player-select");
    const playerName = (name) => {
        return {name};
    };
    let player1;
    let player2;
    let resetBtn = document.querySelector("#reset");
    const startGameAI = ()=> {
        startBtn.addEventListener("click", ()=> {
            buttons.classList.remove("invisible");
        });
        let computerBtn = document.querySelector("#computerBtn");
        computerBtn.addEventListener("click", ()=> {
            modal.classList.add("invisible");
            puzzleGrid.classList.remove("invisible");
        });        
    }
    const startGamePlayer = ()=> {
        const form = document.getElementById("player-select");
        function handleForm(event) { event.preventDefault(); } 
        form.addEventListener('submit', handleForm);
        let playerBtn = document.querySelector("#playerBtn");
        let submit = document.querySelector("#submit");
        playerBtn.addEventListener("click", ()=> {
            playerSelect.classList.remove("invisible");
            player1 = playerName(document.getElementById('player1').value);
            player2 = playerName(document.getElementById('player2').value);
        });
        submit.addEventListener("click",()=> {
            console.log("Start!");
            modal.classList.add("invisible");
            puzzleGrid.classList.remove("invisible");
        });
    }
    const resetGame = ()=> {
        resetBtn.addEventListener("click", ()=> {
            console.log("reset");
            modal.classList.remove("invisible");
            puzzleGrid.classList.add("invisible");
        });
    }
    return {startGameAI, startGamePlayer, resetGame};
})(); 
const gameStart = [gameBoard.startGameAI(), gameBoard.startGamePlayer()];
const gameRestart = gameBoard.resetGame();
//gameBoard.startGameAI();
//gameBoard.startGamePlayer();
//gameBoard.resetGame();