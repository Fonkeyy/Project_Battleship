// todo=> finish the drag and drop thing
import { gameBoardList } from './gameboardFactory';
import { updateBoard } from './interfaceController';

// ? => Make sure to use the center of the element instead of where the click happened while dragging

let isDragging = false; // *Flag to track dragging state
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
    const target = event.target;
    target.classList.remove('ship-svg');
    console.log(target);

    for (let i = 0; i < target.dataset.length; i++) {
        const shipCell = document.createElement('div');
        shipCell.classList.add('ship-cell');
        target.appendChild(shipCell);

        target.classList.add('ship-cells');
    }
    if (event.buttons === 1) {
        // * Check if the left mouse button is clicked
        isDragging = true;
        // * Store ship data to transfer
        event.dataTransfer.setData('text/plain', event.target.id);
        event.dataTransfer.setData('length', event.target.dataset.length);
        event.dataTransfer.setData('orientation', event.target.dataset.orientation);

        // * Add styles while dragging
        event.target.classList.add('dragging-ship');
    }

    // todo => See how to change orientation while dragging vertical ship
    const height = target.offsetHeight;

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

    const shipOrientation = event.dataTransfer.getData('orientation');

    // * Get target element + row and column number
    // const targetCell = event.target;
    const targetX = Number(event.target.dataset.x);
    const targetY = Number(event.target.dataset.y);

    // * Get/adjust coords according to orientation
    const lastCellX = Number(targetX) + (shipOrientation === 'vertical' ? 0 : Number(droppedShipLength - 1));
    const lastCellY =
        Number(targetY) + (shipOrientation === 'horizontal' ? 0 : Number(droppedShipLength - 1));

    const newShip = gameBoard.placeShip([targetX, targetY], [lastCellX, lastCellY]);

    if (newShip) {
        updateBoard(gameBoard, $grid.parentNode);
        droppedShip.parentElement.remove();
    }
}

export function dragEnd(event) {
    if (isDragging) {
        isDragging = false;
        // * Clear transfer data and CSS
        event.dataTransfer.clearData();
        event.target.classList.remove('dragging-ship');

        // * Get back to SVG style if not dropped
        while (event.target.hasChildNodes()) {
            event.target.firstChild.remove();
        }
        event.target.classList.add('ship-svg');
    }
}