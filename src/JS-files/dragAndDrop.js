import { ComputerGameLoop } from './gameLoop';
import { gameBoardList } from './gameBoardFactory';
import { updateBoard } from './interfaceController';
import Ship from './shipsFactory';

const changeOrientation = (event) => {
    const target = event.target;
    if (target.dataset.orientation === 'horizontal') {
        target.dataset.orientation = 'vertical';
        target.classList.add('rotate90deg');
    } else {
        target.dataset.orientation = 'horizontal';
        target.classList.remove('rotate90deg');
    }
};

const dragStart = (event) => {
    // * Get dragged ship and remove SVG from it
    const target = event.target;
    target.classList.remove('ship-svg');

    // * Add it 1 cell per length unit

    for (let i = 0; i < target.dataset.length; i++) {
        const shipCell = document.createElement('div');
        shipCell.classList.add('ship-cell');
        target.appendChild(shipCell);
        target.classList.add('ship-cells');
    }

    // * Store ship data to transfer
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.setData('length', event.target.dataset.length);
    event.dataTransfer.setData('orientation', event.target.dataset.orientation);

    // * Get target height
    const height = target.offsetHeight;

    if (target.dataset.orientation === 'horizontal') {
        target.classList.remove('vertical');
        event.dataTransfer.setDragImage(target, 0, height / 2); // * Place the cursor in the height middle
    } else {
        target.classList.add('vertical');
        event.dataTransfer.setDragImage(target, 0, height / 2);
    }
};

const dragOver = (event) => {
    event.preventDefault();
};

const dragEnter = (event) => {
    event.preventDefault();
    event.target.classList.add('drag-over');
};

const dragLeave = (event) => {
    event.preventDefault();
    event.target.classList.remove('drag-over');
};

const dragDrop = (event) => {
    event.preventDefault();

    // * Get the$grid where the drop happened
    const $grid = event.target.parentNode;
    const boardId = $grid.dataset.boardId;
    const gameBoard = gameBoardList.find((board) => board.id === boardId);

    // * Get data from dragged ship
    const droppedShipId = event.dataTransfer.getData('text/plain');
    const droppedShip = document.getElementById(droppedShipId);
    const droppedShipLength = event.dataTransfer.getData('length');
    const droppedShipOrientation = event.dataTransfer.getData('orientation');

    // * Get target element + row and column number
    const targetX = Number(event.target.dataset.x);
    const targetY = Number(event.target.dataset.y);

    // * Get/adjust coords according to orientation
    const lastCellX =
        Number(targetX) + (droppedShipOrientation === 'vertical' ? 0 : Number(droppedShipLength - 1));
    const lastCellY =
        Number(targetY) + (droppedShipOrientation === 'horizontal' ? 0 : Number(droppedShipLength - 1));

    const newShip = new Ship([targetX, targetY], [lastCellX, lastCellY]);
    const placedShip = newShip.placeShip(gameBoard);
    const randomPlacementBtn = document.querySelector('#random-place-btn');

    if (placedShip) {
        droppedShip.parentElement.remove();
        event.target.classList.remove('drag-over');
        updateBoard(gameBoard, $grid.parentNode);
        if (randomPlacementBtn) randomPlacementBtn.remove();
    } else {
        return;
    }

    const shipsList = document.querySelector('#ships-list-container');
    const boardPlayer1 = gameBoardList[0];
    const boardPlayer2 = gameBoardList[1];

    const $boardPlayer1 = document.getElementById(boardPlayer1.id);
    const $boardPlayer2 = document.getElementById(boardPlayer2.id);
    if (!shipsList.hasChildNodes()) {
        shipsList.remove();
        alert('Game start, attack enemy!');

        if (boardPlayer2.id === 'computer') {
            ComputerGameLoop(boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2);
        }
        // // gameLoop(boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2);
    }
};

const dragEnd = (event) => {
    // * Clear transfer data and CSS
    event.dataTransfer.clearData();
    event.target.classList.remove('dragging-ship');

    // * Remove dragging image
    while (event.target.hasChildNodes()) {
        event.target.firstChild.remove();
    }
    // * Add svg instead of dragging image
    event.target.classList.add('ship-svg');
};

export { changeOrientation, dragStart, dragOver, dragEnter, dragLeave, dragDrop, dragEnd };
