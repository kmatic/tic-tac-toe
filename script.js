const Player = () => {

}

const gameBoard = (() => {
    const board = ['x', 'o', 'x', 'o', 'o', 'o', 'x', 'x', 'x'];
    return {
        board,
    };
})();

const displayController = (() => {
    const render = () => {
        const moveSlot = document.querySelectorAll('.moveSlot');
        moveSlot.forEach(function(element, index) {
            element.textContent = gameBoard.board[index];
        });
    };
    return {
        render,
    };
})();

displayController.render();
