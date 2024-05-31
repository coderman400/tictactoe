function Gameboard() {
    //empty board
    let gameboard = [];
    let rows = 3;
    let cols = 3;
    for(i=0; i<rows; i++){
        gameboard[i] = [];
        for(j=0; j<cols; j++){
            gameboard[i][j] = '';
        }
    }

    const getBoard = () => gameboard;

    const setBoard = (row, col, value) => {
        gameboard[row][col] = value;
    }

    const resetBoard = () => {
        for(i=0; i<rows; i++){
            for(j=0; j<cols; j++){
                gameboard[i][j] = '';
            }
        }
    }

    return {getBoard, setBoard, resetBoard};
}

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;

    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol};
}

function Game() {
    let gameboardObj = new Gameboard();
    let gameboard = gameboardObj.getBoard();
    let player1 = Player('Player 1', 'X');
    let player2 = Player('Player 2', 'O');
    let currentPlayer = player1;
    
    const getCurrentPlayer = () => currentPlayer;

    const switchPlayer = () => {
        currentPlayer = (currentPlayer == player1 ? player2 : player1);
    }

    const printBoard = () => {
        for(i=0; i<3; i++){
            console.log(gameboard[i]);
        }
      };
    const play = (row, col) => {
        console.log(currentPlayer.getName() + ' plays');
        gameboardObj.setBoard(row, col, currentPlayer.getSymbol());

        //check rows and cols
        for(i=0; i<3; i++){
            if(gameboard[i][0]!='' && gameboard[i][0]==gameboard[i][1] && gameboard[i][1]==gameboard[i][2]){winGame(currentPlayer)}
            if(gameboard[0][i]!='' && gameboard[0][i]==gameboard[1][i] && gameboard[1][i]==gameboard[2][i]){winGame(currentPlayer)}
        }
        //check diagonals
        if(gameboard[0][0] == gameboard[1][1] && gameboard[1][1] == gameboard[2][2] && gameboard[0][0] != ''){winGame(currentPlayer)}
        if(gameboard[0][2] == gameboard[1][1] && gameboard[1][1] == gameboard[2][0] && gameboard[0][2] != ''){winGame(currentPlayer)}
        printBoard()
        switchPlayer()
    }

    const winGame = (player) => {
        console.log(player.getName() + ' WINS!!')
    }
    return {play, getCurrentPlayer, getBoard: gameboardObj.getBoard}
}

function displayController(){
    const board = document.querySelector('.board');
    let game = new Game();

    const newGame = () => {
        game = "";
        game = new Game();
        updateBoard();
    }
    const updateBoard = () =>{
        //clear board
        board.innerHTML='';
        let gameboard = game.getBoard();
        for(i=0;i<3; i++){
            for(j=0;j<3;j++){
                //create each box with required data and event listener
                let newDiv = document.createElement('button');
                newDiv.className = 'box';
                newDiv.textContent = gameboard[i][j];
                newDiv.dataset.row = i;
                newDiv.dataset.column = j;
                newDiv.addEventListener("click",clickBox);
                board.appendChild(newDiv);
                
            }
        }
    }

    const clickBox = (e) => {
        //get row and col value
        let row = e.target.dataset.row;
        let col = e.target.dataset.column;
        
        //only changeable once
        if(e.target.textContent){return}

        game.play(row,col);
        updateBoard();
    }

    const newGameBtn = document.querySelector("#new");
    newGameBtn.addEventListener("click", newGame)
    return{newGame}
}
disp = new displayController()
disp.newGame();