// gameStart Factory Function
// Make sure every important bit of code is inside the factory
const gameStart = (()=> {
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
const startYourEngines = [gameStart.startGameAI(), gameStart.startGamePlayer()];
const gameRestart = gameStart.resetGame();

const gameBoardPlayer = (()=> {
    const friendshipEnded = (name, symbol, computer, turn) => {
        return {name, symbol, computer, turn};
    };
    const player1 = friendshipEnded('player1', 'X', false, true);
    const player2 = friendshipEnded('player2', 'O', false, false);
    let gameArray = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ];
    let winnerArray = [];
    let winner = null;
    let turns = 0;
    let board = [];
    const playerTurns = (()=> {
        let block = document.querySelectorAll('.block');
        block.forEach( block => {
            block.addEventListener('click', (event)=> {
               //Player One Turn
               if(player1.turn == true && winner == null && event.target.textContent == '') {
                    board[event.target.id] = player1.symbol;
                    block.textContent = player1.symbol;
                    block.style.color = '#2de2e6';
                    player1.turn = false;
                    player2.turn = true;
                    console.log(board);
                    console.log(player1);
                    console.log(player2);
               } else {
                   board[event.target.id] = player2.symbol;
                   block.textContent = player2.symbol;
                   block.style.color = '#2de2e6';
                   player1.turn = true;
                   player2.turn = false;
                   console.log(board);
                   console.log(player2);
               };
            });
        });
    });
    return {playerTurns};
})();
const gamePlayerStart = gameBoardPlayer.playerTurns();