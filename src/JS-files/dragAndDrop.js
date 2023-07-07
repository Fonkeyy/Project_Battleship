// todo=> finish the drag and drop thing
import '../CSS-files/ships.css';
import { gameBoardList } from './gameboardFactory';

export function create$Ship() {
    // * Create ship Objects => names + length
    const ships = [
        { name: 'carrier', length: 5 },
        { name: 'battleship', length: 4 },
        { name: 'destroyer', length: 3 },
        { name: 'submarine', length: 3 },
        { name: 'patrolBoat', length: 2 },
    ];

    // * Store ships list container reference in a variable
    const shipsListContainer = document.querySelector('#ships-list-container');

    // * Create 1 container for each ship object
    for (let ship of ships) {
        const shipContainer = document.createElement('div');
        const shipLabel = document.createElement('div');
        const shipCells = document.createElement('div');

        for (let i = 0; i < ship.length; i++) {
            const shipCell = document.createElement('div');
            shipCell.id = `${ship.name}${i}`;
            shipCell.classList.add('ship-cell');
            shipCells.appendChild(shipCell);
        }
        shipContainer.classList.add('ship-item');

        shipLabel.textContent = ship.name;

        shipCells.id = ship.name;
        shipCells.dataset.length = ship.length;
        shipCells.classList.add('ship-cells');

        // * Set container to draggable and orientation to vertical
        shipCells.draggable = true;
        shipCells.dataset.orientation = 'horizontal';

        // * Attach drag and drop event listeners on container
        shipCells.addEventListener('dragstart', dragStart);
        shipCells.addEventListener('dragend', dragEnd);

        shipContainer.append(shipLabel, shipCells);
        shipsListContainer.appendChild(shipContainer);
    }
}

// ? => Make sure to use the center of the element instead of where the click happened while dragging

let isDragging = false; // *Flag to track dragging state

function dragStart(event) {
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

// todo => Get the actual coords, get the ship length and direction (change on right click or shortcut)
// todo => calculate all the coords and place ship.

export function drop(event) {
    event.preventDefault();

    // * Get the$grid parent element of cells which have the drop event listener
    const $grid = event.target.parentNode;
    // * Get the corresponding gameBoard id from dataset
    const boardId = $grid.dataset.boardId;
    // * Filter through gameBoardList to get the gameBoard with the corresponding id
    const gameBoard = gameBoardList.filter((board) => board.id == boardId);

    // * Get data from dropped ship
    const shipId = event.dataTransfer.getData('text/plain');
    const ship = document.getElementById(shipId);
    const shipLength = event.dataTransfer.getData('length');

    const shipOrientation = event.dataTransfer.getData('orientation');

    // * Get target element + row and column number
    const targetCell = event.target;
    const targetRow = event.target.dataset.row;
    const targetColumn = event.target.dataset.column;

    console.log(shipOrientation);
    console.log(targetCell);
    console.log({ targetRow });
    console.log({ targetColumn });

    // // const shipChildren = Array.from(ship.children);
    // // console.log(shipChildren);

    console.log({ $grid });
    console.log({ boardId });
    console.log({ gameBoard });
    console.log({ shipId });
    console.log({ ship });
    console.log({ shipLength });

    // gameBoard.placeShip([firstCell.row, firstCell.column], [lastCell.row, lastCell.column]);
}

function dragEnd(event) {
    if (isDragging) {
        isDragging = false;
        // * Clear transfer data and CSS
        event.dataTransfer.clearData();
        event.target.classList.remove('dragging-ship');
    }
}

// todo => Implement calculate coords function

// Event listeners for enter key

// ! 1st thing to do
// todo => Finish Implementing switch orientation function
// function switchOrientation(event) {
//     // const shipOrientation = event.dataTransfer.getData('orientation');
//     const shipOrientation = event.dataset.orientation;
//     console.log('orientation');

//     if (shipOrientation === 'horizontal') {
//         // Effectuer la rotation verticale
//         event.target.orientation = 'vertical';
//         // Appliquer les transformations CSS appropriées pour la rotation
//         event.target.style.transform = 'rotate(90deg)';
//     } else {
//         // Effectuer la rotation horizontale
//         event.target.orientation = 'horizontal';
//         // Appliquer les transformations CSS appropriées pour la rotation
//         event.target.style.transform = 'rotate(0deg)';
//     }

//     event.dataTransfer.setData('orientation', event.target.orientation);
// }
