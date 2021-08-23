const gameStart = (()=> {
    let puzzleGrid = document.querySelector(".main-container");
    let puzzleInner = document.querySelector(".puzzle-container");
    let modal = document.querySelector(".modal");
    let startBtn = document.querySelector("#start");
    let buttons = document.querySelector(".buttons");
    let playerSelect = document.querySelector(".player-select");
    console.log(puzzleInner.childNodes);
    
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
            document.getElementById('block_0').textContent = "";
            document.getElementById('block_1').textContent = "";
            document.getElementById('block_2').textContent = "";
            document.getElementById('block_3').textContent = "";
            document.getElementById('block_4').textContent = "";
            document.getElementById('block_5').textContent = "";
            document.getElementById('block_6').textContent = "";
            document.getElementById('block_7').textContent = "";
            document.getElementById('block_8').textContent = "";
        });
    }
    return {startGameAI, startGamePlayer, resetGame};
})(); 
const startYourEngines = [gameStart.startGameAI(), gameStart.startGamePlayer()];
const gameRestart = gameStart.resetGame();

const gameBoardPlayer = (()=> {   
    const playerCheck = (name, symbol, turn) => {
        return {name, symbol, turn};
    };
    const player1 = playerCheck('player1', 'X', true);
    const player2 = playerCheck('player2', 'O', false); 
    const winnerCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8],
        [6,4,2],
        [8,4,0]
    ];
    let winner = null;
    let turns = 0;
    let gameBoard = new Array(9).fill(null);
    let winnerArray = new Array(2).fill(0).map(_x => Array(3).fill(null));
    const playerTurns = (()=> {
        
        const block = document.querySelectorAll('.block');
        block.forEach( block => {
            block.addEventListener('click', event => {
               //Player One Turn
               if (player1.turn == true && gameBoardPlayer.winner == null && event.target.textContent == '') {
                    const index = Number(event.target.id.substring(event.target.id.length-1));
                    gameBoard[index] = player1.symbol;
                    block.textContent = player1.symbol;
                    block.style.color = '#2de2e6';
                    block.style.fontSize = '150px';
                    player1.turn = false;
                    player2.turn = true;
                    console.log(gameBoard);
                    console.log(`player2.turn` + ` = ` + player2.turn);
               } else if (player2.turn == true && gameBoardPlayer.winner == null && event.target.textContent == '') {
                    const index = Number(event.target.id.substring(event.target.id.length-1));
                    gameBoard[index] = player2.symbol;
                    block.textContent = player2.symbol;
                    block.style.color = '#2de2e6';
                    block.style.fontSize = '150px';
                    player1.turn = true;
                    player2.turn = false;
                    console.log(gameBoard);
                    console.log(`player1.turn` + ` = ` + player1.turn);
               } else {
                   return;
               };
               winnerCheck();
            });
            return {block};
        })();
    });
    const winnerCheck = () => {
        //- given `winConditions` array, which is an array of arrays,
        //- find a sub-array in `winConditions` that meets this condition:
        //- every value in this sub-array represents a cell that contains playerSymbol
        //- if we find one, we have a win.
        //- if not, the game continues.
        let index = Number(event.target.id.substring(event.target.id.length-1));
        let element;
        if(player2.turn == false) {
            element = player2.symbol;
        } else {
            element = player1.symbol;
        }
        for(const [index, element] of winnerArray.entries());
        console.log(index, element);
        for (let i = 0; i < winnerArray.length; i++) {
            // Player2 Turn
            if (player1.turn == true) {
                winnerArray[1][0] = index; 
            } else {
            // Player1 Turn *First Move*
                winnerArray[0][0] = index;
            }
            // Player1 Turn *Second Move*
            if(player2.turn == true && winnerArray[1][0] == index) {
                winnerArray[0][1] = index;
            }
        }
        console.log(winnerArray);
        console.log(winnerCombos);
    };
    return {playerTurns};
})();

const gamePlayerStart = gameBoardPlayer.playerTurns();