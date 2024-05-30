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
    let gameboardObj = Gameboard();
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
    return {play, getCurrentPlayer}
}
const game = new Game();