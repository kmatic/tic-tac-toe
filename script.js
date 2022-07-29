const Player = (symbol) => {
    const getSymbol = () => {
        return symbol;
    }
    return {
        getSymbol,
    }
}

const gameboard = (() => {
    const board = ['x', 'o', 'x', 'o', 'o', 'o', 'x', 'x', 'x'];
    const playerX = Player('X');
    const playerO = Player('O'); 
    const setSlot = (index, symbol) => {
        board[index] = symbol;
    }
    const getSlot = (index) => {
        return board[index];
    }
    return {
        setSlot,
        getSlot,
    };
})();

const displayController = (() => {
    const moveSlot = document.querySelectorAll('.moveSlot');
    // const render = () => {
    //     moveSlot.forEach(function(element, index) {
    //         element.textContent = gameboard.board[index];
    //     });
    // };
    return {

    };
})();

