const Player = (symbol) => {
    const getSymbol = () => {
        return symbol;
    }
    return {
        getSymbol,
    }
}

const gameboard = (() => {
    const board = Array(9).fill('');
    const playerX = Player('X');
    const playerO = Player('O');
    const xMoves = [];
    const oMoves = []; 
    let round = 1;
    let gameOver = false;

    const setSlot = (index, symbol) => {
        board[index] = symbol;
    };

    const getSlot = (index) => {
        return board[index];
    };

    const getGameOver = () => {
        return gameOver;
    };

    const playRound = (index) => {
        setSlot(index, getCurrentSymbol());
        getCurrentSymbol() === 'X' ? xMoves.push(index) : oMoves.push(index);
        checkWin();
        if (gameOver) {
            displayController.updateMsg(getCurrentSymbol());
            return;
        }
        if (round === 9) {
            gameOver = true;
            displayController.updateMsg('draw');
            return;
        }
        round++;
        displayController.updateMsg(getCurrentSymbol());
    };

    const getCurrentSymbol = () => {
        return (round % 2 === 1 ? playerX.getSymbol() : playerO.getSymbol());
    };

    const reset = () => {
        round = 1;
        gameOver = false;
        xMoves.length = 0;
        oMoves.length = 0;
        displayController.updateMsg(getCurrentSymbol());
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    };

    const checkWin = () => {
        const winStates = [
            [0, 1 ,2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        winStates.forEach(winState => {
            const xWins = winState.every(state => xMoves.includes(state));
            const oWins = winState.every(state => oMoves.includes(state));
            if (xWins || oWins) {
                gameOver = true;
            }
        });
    };

    return {
        getSlot,
        playRound,
        reset,
        getGameOver,
    };
})();

const displayController = (() => {
    const moveSlot = document.querySelectorAll('.moveSlot');
    const resetBtn = document.querySelector('#restart');
    const gameMsg = document.querySelector('#gameStatus');

    moveSlot.forEach(slot => {
        slot.addEventListener('click', () => {
            if (slot.textContent !== '' || gameboard.getGameOver()) {
                return;
            }
            gameboard.playRound(parseInt(slot.dataset.index));
            updateDisplay(slot.dataset.index);
        });
    });

    resetBtn.addEventListener('click', () => {
        gameboard.reset();
        moveSlot.forEach(slot => {
            updateDisplay(slot.dataset.index);
        });
    })

    const updateDisplay = ((index) => {
        moveSlot[index].textContent = gameboard.getSlot(index);
    });

    const updateMsg = ((player) => {
        if (player == 'draw') {
            gameMsg.textContent = 'The game is a draw!';
        }
        else if ((player == 'X' && gameboard.getGameOver()) || (player == 'O' && gameboard.getGameOver())) {
            gameMsg.textContent = `Player ${player} has won the game!`;
        }
        else if (player == 'X' || player == 'O') {
            gameMsg.textContent = `It's Player ${player}'s turn!`;
        }
    })

    return {
        updateMsg,
    };
})();

