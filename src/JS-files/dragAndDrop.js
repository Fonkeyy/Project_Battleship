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
    let shipName;
    let shipLength;

    for (let key in ships) {
        if (key === event.target.id) {
            shipName = key;
            shipLength = ships[key];
            break;
        }
    }
    const shipContainer = document.querySelector(`#${event.target.id}`);

    // * Append 1 cell for each length unit, give it id based on name + i and add event listener on 1st and last cell
    for (let i = 0; i < shipLength; i++) {
        const shipCell = document.createElement('div');
        shipCell.id = `${shipName}${i}`;
        shipCell.classList = 'shipCell'; // ?

        shipContainer.appendChild(shipCell);
    }

    // ! fix orientation data transfert
    // * Set container to draggable and orientation to vertical
    shipContainer.draggable = true;
    shipContainer.setAttribute('orientation', 'vertical');

    // * Attach drag and drop event listeners on container
    shipContainer.addEventListener('dragstart', dragStart);
    shipContainer.addEventListener('dragEnd', dragEnd);
}

function dragStart(event) {
    // * Store ship data to transfer
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.setData('length', event.target.childElementCount);
    event.dataTransfer.setData('orientation', event.target.orientation);
}

export function dragOver(event) {
    event.preventDefault();
}

export function dragEnter(event) {
    event.preventDefault();
}

// todo => Get the actual coords, get the ship length and direction (change on right click or shortcut)
// todo => calculate all the coords and place ship. Add css while dragging

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

    const shipChildren = Array.from(ship.children);
    console.log(shipChildren);

    console.log({ $grid });
    console.log({ boardId });
    console.log({ gameBoard });
    console.log({ ship });
    console.log({ shipLength });

    // gameBoard.placeShip([firstCell.row, firstCell.column], [lastCell.row, lastCell.column]);
}

function dragEnd(event) {
    // * Clear transfer data
    event.dataTransfer.clearData();
}

// todo => Implement calculate coords function

// todo => Implement switch orientation function
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
