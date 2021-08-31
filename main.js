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
    const showAlert = (message, className)=> {
        const div = document.createElement('div');
        div.className = `${className}`;
        div.appendChild(document.createTextNode(message));
        const form = document.getElementById("player-form");
        const label = document.getElementById("form-label");
        form.insertBefore(div, label);
        // Vanish
        setTimeout(()=> document.querySelector('.validate').remove(), 5000);
    }
    const startGamePlayer = ()=> {
        //For Whatever reason the game cannot run without this
        const form = document.getElementById("player-form");
        function handleForm(event) { event.preventDefault(); } 
        form.addEventListener('submit', handleForm);

        let playerBtn = document.querySelector("#playerBtn");
        playerBtn.addEventListener("click", ()=> {
            playerSelect.classList.remove("invisible");
            player1 = playerName(document.getElementById('player1').value);
            player2 = playerName(document.getElementById('player2').value);
        });
        form.addEventListener("submit",()=> {
            let playerOneInput = document.getElementById("player1").value;
            let playerTwoInput = document.getElementById("player2").value;
            console.log(playerTwoInput);
            console.log(playerOneInput);
            
            if(playerOneInput == "" || playerTwoInput == "") {
                showAlert('Please fill in all fields', 'validate');
            } else {
                console.log("Start!");
                modal.classList.add("invisible");
                puzzleGrid.classList.remove("invisible");
            };
        });
    };
    return {startGameAI, startGamePlayer};
})(); 
const startYourEngines = [gameStart.startGameAI(), gameStart.startGamePlayer()];
// Start Two Player Mode
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
    let gameBoard = [];
    // Stores winner input
    let winnerArray = [];
    // Player1 and Player2 turns
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
                    let myMediaQuery = window.matchMedia('(max-width: 768px)');
                    if (myMediaQuery.matches) {
                        block.style.fontSize = '100px';
                    }
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
                    let myMediaQuery = window.matchMedia('(max-width: 768px)');
                    if (myMediaQuery.matches) {
                        block.style.fontSize = '100px';
                    }
               } else {
                   return;
               };
               winnerCheck();
            });
        });
        return {block};
    })();
    const winnerCheck = () => {
        // Create arrays for both player that will be compared to winnerCombos
        let player1Results = [];
        let player2Results = [];
            for (let i = 0; i < gameBoard.length; i++) {
            const e = gameBoard[i];
            if (e === player1.symbol) {
                player1Results = player1Results.concat(i);
            } else if (e === player2.symbol) {
                player2Results = player2Results.concat(i);
            }
        }
        console.log(player1Results);
        console.log(player2Results);
        // Iterate each index
        // Test if every number in player1Results and player2Results 
        // has the first index of their array is greater than -1
        // If true winnerArray stores the truthy value of combo
        // combo takes winnerCombos and makes a seperate array out of each subarray
        for(let [index, combo] of winnerCombos.entries()) {
            if (combo.every((num)=> player1Results.indexOf(num) > -1)) {
                winner = '1';
                winnerArray = combo;
                console.log(combo);
            } else if (combo.every(num => player2Results.indexOf(num) > -1)) {
                winner = '2';
                winnerArray = combo;
                console.log(combo);
            } else if (winner == null && winner == undefined && turns == 9) {
                winner = 'tie';
                winnerArray = combo;
                console.log(combo);
            };
        };
        // Display the Winner
        if(winner === '1') {
            console.log(winner);
            alert('Player1 Wins!');
        } else if (winner === '2') {
            console.log(winner);
            alert('Player2 Wins!');
        } else if (winner == 'tie') {
            console.log(winner);
            alert('Tie!');
        } else {
            return winnerArray;
        }
    };
    // Reset The Game
    resetGameBoard = ()=> {
        winner = null;
        winnerArray = [];
        player1.turn = true;
        player2.turn = false;
        turns = 0;
        gameBoard.splice(0, gameBoard.length);
        console.log(`resetGameBoard Fired`);
        console.log(gameBoard, winner, player1.turn, player2.turn, turns);
    };
    console.log(gameBoard, winner, player1.turn, player2.turn, turns);   
    return {playerTurns, winnerCheck, resetGameBoard};
})();
// Handles Events unrelated to starting the game
const eventHandler = (()=> {
    let puzzleGrid = document.querySelector(".main-container");
    let modal = document.querySelector(".modal");
    let blocks = document.querySelectorAll('.block');
    let resetBtn = document.querySelector("#reset");
    console.log(blocks);
    winnerDisplay = ()=> {

    }
    gameRestart = ()=> {
        console.log(`reset`);
        gameBoardPlayer.resetGameBoard();
        modal.classList.remove("invisible");
        puzzleGrid.classList.add("invisible");
        blocks.forEach( (blocks) => {
            blocks.textContent = "";
        });
    };
    resetBtn.addEventListener('click', gameRestart);
})();