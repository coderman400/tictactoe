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

    //set value of board 
    const setBoard = (row, col, value) => {
        gameboard[row][col] = value;
    }
    return {getBoard, setBoard};
}

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    const setName = (n) => {name = n}
    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol, setName};
}

function Game() {
    let gameboardObj = new Gameboard();
    let gameboard = gameboardObj.getBoard();
    let player1 = new Player('Player 1', 'X');
    let player2 = new Player('Player 2', 'O');
    let currentPlayer = player1;

    const setName = (p1, p2) => {
        if(p1==''){p1 = "Player1";}
        if(p2==''){p2 = "Player2";}
        player1.setName(p1);
        player2.setName(p2);
    }
    
    const getCurrentPlayer = () => currentPlayer;

    const switchPlayer = () => {
        currentPlayer = (currentPlayer == player1 ? player2 : player1);
    }

    const printBoard = () => {
        for(i=0; i<3; i++){
            console.log(gameboard[i]);
        }
      };
    
    //play a round
    const play = (row, col) => {
        console.log(currentPlayer.getName() + ' plays');
        gameboardObj.setBoard(row, col, currentPlayer.getSymbol());

        //check rows and cols
        for(i=0; i<3; i++){
            if(gameboard[i][0]!='' && gameboard[i][0]==gameboard[i][1] && gameboard[i][1]==gameboard[i][2]){return 1}
            if(gameboard[0][i]!='' && gameboard[0][i]==gameboard[1][i] && gameboard[1][i]==gameboard[2][i]){return 1}
        }
        //check diagonals
        if(gameboard[0][0] == gameboard[1][1] && gameboard[1][1] == gameboard[2][2] && gameboard[0][0] != ''){return 1}
        if(gameboard[0][2] == gameboard[1][1] && gameboard[1][1] == gameboard[2][0] && gameboard[0][2] != ''){return 1}
        drawFlag = 1;
        for(i=0; i<3; i++){
            for(j=0; j<3; j++){
                if(!gameboard[i][j]){drawFlag = 0}
            }
        }
        if(drawFlag){return 2}
        printBoard()
        switchPlayer()
    }

    return {play, getCurrentPlayer, getBoard: gameboardObj.getBoard, setName}
}

function displayController(){
    let board = document.querySelector('.board');
    let game = new Game();
    const msgBox = document.querySelector('.msg');
    let state = 0;
    //var for flipping player symbols in newGame()
    let k = 1;

    const newGame = () => {
        game = "";
        game = new Game();
        state = 0;
        //switch player symbols at each newgame
        k = (k==1 ? 0 : 1);
        if(k==1){
            game.setName(player1.value, player2.value);
        }else{
            game.setName(player2.value, player1.value);
        }

        updateBoard();

    }

    const updateName = () => {
        switch(state){
            case 0:
                msgBox.textContent = `${game.getCurrentPlayer().getName()}'s turn`;
                console.log('UPDATED');
                break;
            case 1:
                msgBox.textContent = `${game.getCurrentPlayer().getName()} WINS!`;
                break;
            case 2:
                msgBox.textContent = `ITS A DRAW`
                break;
            default:
                msgBox.textContent = `${game.getCurrentPlayer().getName()}'s turn`;
                console.log('UPDATED');
                break;
        }
        
    }

    const updateBoard = () =>{
        board = document.querySelector('.board')
        //clear board
        board.innerHTML='';
        let gameboard = game.getBoard();

        updateName();

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

    //freeze board on win
    const freezeBoard = () => {
        var new_element = board.cloneNode(true);
        board.parentNode.replaceChild(new_element, board);
    }
 
    const clickBox = (e) => {
        //get row and col value
        let row = e.target.dataset.row;
        let col = e.target.dataset.column;
        
        //only changeable once
        if(e.target.textContent){return}

        state = game.play(row,col);
        if(state == 1){
            updateBoard();
            freezeBoard();
        }else{
            updateBoard();
        }
    }

    //dom objects related to name changing
    const changeNameBtn = document.querySelector('#name-change')
    const changeNameDialog = document.querySelector('#name');
    const confirmBtn = document.querySelector('#confirmBtn');
    const player1 = document.querySelector('#player1');
    const player2 = document.querySelector('#player2');

    //button to open name change dialog
    changeNameBtn.addEventListener("click", ()=>{
        changeNameDialog.showModal();
    })

    //button to give new names to game object
    confirmBtn.addEventListener('click', (event)=>{
        event.preventDefault();
        game.setName(player1.value, player2.value)
        changeNameDialog.close()
        updateName()
    })

    //button to call new game function
    const newGameBtn = document.querySelector("#new");
    newGameBtn.addEventListener("click", newGame)
    return{newGame}
}
disp = new displayController()
disp.newGame();