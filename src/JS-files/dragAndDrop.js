// todo=> finish the drag and drop thing

import { gameBoardList } from './gameboardFactory';

export function create$Ship(event) {
    // * Create ships Object, reference ships names and lengths
    const ships = {
        carrier: 5,
        battleship: 4,
        destroyer: 3,
        submarine: 3,
        patrolBoat: 2,
    };

    // * Get ship container name and length from the event.target
    const ship = ships.key === event.target.id,
        shipName = ship.key,
        shipLength = ship.value,
        shipContainer = document.querySelector(`#${event.target.id}`);

    // * Append 1 cell for each length unit, give it id based on name + i and add event listener on 1st and last cell
    for (let i = 1; i < shipLength; i++) {
        const shipCell = document.createElement('div');
        shipCell.id = `${shipName}${i}`;
        shipCell.classList = 'shipCell';
        shipContainer.appendChild(shipCell);

        if (i == 1 || i == shipLength) {
            shipCell.addEventListener('dragStart', dragStart);
        }
    }

    // * Set container to draggable and orientation to vertical
    shipContainer.draggable = true;
    shipContainer.dataset.orientation = 'vertical';

    // * Add drag and drop event listeners on container
    shipContainer.addEventListener('dragstart', dragStart);
    shipContainer.addEventListener('dragover', dragOver);
    shipContainer.addEventListener('drop', drop);
    shipContainer.addEventListener('dragEnd', dragEnd);
}

function dragStart(event) {
    const ship = event.target;
    const shipCells = ship.querySelectorAll('.shipCell'); // ! dont return anything
    console.log(shipCells);

    // * Store ship data to transfer
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.setData('shipCells', JSON.stringify(Array.from(shipCells).map((cell) => cell.id)));
    event.dataTransfer.setData('orientation', event.target.orientation);
}

export function dragOver(event) {
    event.preventDefault();
}

export function dragEnter(event) {
    event.preventDefault();
}

export function drop(event) {
    event.preventDefault();

    // * Get the grid parent element of cells which have the drop event listener
    const $grid = event.target.parentNode;
    // * Get the corresponding gameBoard id from dataset
    const boardId = $grid.dataset.boardId;
    // * Filter through gameBoardList to get the gameBoard with the good id
    const gameBoard = gameBoardList.filter((board) => (board.id = boardId));

    // Récupérer les informations du bateau
    const shipId = event.dataTransfer.getData('text/plain'),
        shipCells = JSON.parse(event.dataTransfer.getData('shipCells')); // ! dont return anything

    console.log(shipId);
    console.log(shipCells);
    //  shipOrientation = event.dataTransfer.getData('orientation'),
    // targetCaseId = event.target.id,
    // targetCaseRow = targetCaseId.row,
    // targetCaseColumn = targetCaseId.column;

    // todo => See how to get data from starting and ending cell
    const firstCell = shipCells.filter((cell) => cell.id == `${shipId}${1}`);

    // todo => see how to get id of last cell (possible with sending length)
    const lastCell = shipCells.filter((cell) => cell.id == `${shipId}${1}`);

    gameBoard.placeShip([firstCell.row, firstCell.column], [lastCell.row, lastCell.column]);
}

function dragEnd(event) {
    // Nettoyer les données de transfert
    event.dataTransfer.clearData();
}

// function switchOrientation(event) {
//     const shipOrientation = event.dataTransfer.getData('orientation');

//     if (shipOrientation === 'horizontale') {
//         // Effectuer la rotation verticale
//         orientationActuelle = 'verticale';
//         // Appliquer les transformations CSS appropriées pour la rotation
//         event.target.style.transform = 'rotate(90deg)';
//     } else {
//         // Effectuer la rotation horizontale
//         orientationActuelle = 'horizontale';
//         // Appliquer les transformations CSS appropriées pour la rotation
//         event.target.style.transform = 'rotate(0deg)';
//     }

//     event.dataTransfer.setData('orientation', orientationActuelle);
// }
