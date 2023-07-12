import { gameLoop } from './gameLoop';
import { gameBoardList } from './gameboardFactory';
import { updateBoard } from './interfaceController';

// ? => Make sure to use the center of the element instead of where the click happened while dragging

export function changeOrientation(event) {
    if (event.target.dataset.orientation === 'horizontal') {
        event.target.dataset.orientation = 'vertical';
        event.target.classList.add('rotate90deg');
    } else {
        event.target.dataset.orientation = 'horizontal';
        event.target.classList.remove('rotate90deg');
    }
}

export function dragStart(event) {
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

    // * Add styles while dragging
    event.target.classList.add('dragging-ship');

    // todo => See how to change orientation while dragging vertical ship
    const height = target.offsetHeight;
    // console.log(height)

    if (target.dataset.orientation === 'horizontal') {
        target.classList.remove('rotate90deg');
        event.dataTransfer.setDragImage(target, 0, height / 2);
    } else {
        target.classList.add('rotate90deg');

        event.dataTransfer.setDragImage(target, 0, height / 2);
    }
}

export function dragOver(event) {
    event.preventDefault();
}

export function dragEnter(event) {
    event.preventDefault();
    event.target.classList.add('drag-over');
}

export function dragLeave(event) {
    event.preventDefault();
    event.target.classList.remove('drag-over');
}

export function dragDrop(event) {
    event.preventDefault();

    // * Get the$grid parent element of cells which have the drop event listener
    const $grid = event.target.parentNode;
    // * Get the corresponding gameBoard id from dataset
    const boardId = $grid.dataset.boardId;
    // * Filter through gameBoardList to get the gameBoard with the corresponding id
    const gameBoard = gameBoardList.filter((board) => board.id == boardId)[0];

    // * Get data from dragged ship
    const droppedShipId = event.dataTransfer.getData('text/plain');
    const droppedShip = document.getElementById(droppedShipId);
    const droppedShipLength = event.dataTransfer.getData('length');

    const droppedShipOrientation = event.dataTransfer.getData('orientation');

    // * Get target element + row and column number
    // const targetCell = event.target;
    const targetX = Number(event.target.dataset.x);
    const targetY = Number(event.target.dataset.y);

    // * Get/adjust coords according to orientation
    const lastCellX =
        Number(targetX) + (droppedShipOrientation === 'vertical' ? 0 : Number(droppedShipLength - 1));
    const lastCellY =
        Number(targetY) + (droppedShipOrientation === 'horizontal' ? 0 : Number(droppedShipLength - 1));

    const newShip = gameBoard.placeShip([targetX, targetY], [lastCellX, lastCellY]);

    if (newShip) {
        console.log('board updated');
        updateBoard(gameBoard, $grid.parentNode);
        droppedShip.parentElement.remove();
    }

    const shipsList = document.querySelector('#ships-list-container');
    const boardPlayer1 = gameBoardList[0];
    const boardPlayer2 = gameBoardList[1];

    const $boardPlayer1 = document.getElementById(boardPlayer1.id);
    const $boardPlayer2 = document.getElementById(boardPlayer2.id);

    if (!shipsList.hasChildNodes()) {
        alert('Game start, attack enemy!');
        gameLoop(boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2);
    }
}

export function dragEnd(event) {
    // * Clear transfer data and CSS
    event.dataTransfer.clearData();
    event.target.classList.remove('dragging-ship');

    // * Get back to SVG style if not dropped
    while (event.target.hasChildNodes()) {
        event.target.firstChild.remove();
    }
    event.target.classList.add('ship-svg');
}
