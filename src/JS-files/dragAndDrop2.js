// todo=> finish the drag and drop thing
import '../CSS-files/ships.css';
import { gameBoardList } from './gameboardFactory';
import { updateBoard } from './interfaceController';

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
        const $ship = document.createElement('div');

        for (let i = 0; i < ship.length; i++) {
            const shipCell = document.createElement('div');
            shipCell.id = `${ship.name}${i}`;
            shipCell.classList.add('ship-cell');
            $ship.appendChild(shipCell);
        }
        shipContainer.classList.add('ship-item');

        shipLabel.textContent = ship.name;

        $ship.id = ship.name;
        $ship.dataset.length = ship.length;
        $ship.classList.add('ship-cells');

        // * Set container to draggable and orientation to vertical
        $ship.draggable = true;
        $ship.dataset.orientation = 'horizontal';

        // * Attach drag and drop event listeners on container
        $ship.addEventListener('dragstart', dragStart);
        $ship.addEventListener('dragend', dragEnd);

        shipContainer.append(shipLabel, $ship);
        shipsListContainer.appendChild(shipContainer);
    }
}

// ? => Make sure to use the center of the element instead of where the click happened while dragging

let isDragging = false; // *Flag to track dragging state

function dragStart(event) {
    if (event.buttons === 1) {
        // * Check if the left mouse button is clicked
        isDragging = true;
        console.log(isDragging);
        // * Store ship data to transfer
        event.dataTransfer.setData('text/plain', event.target.id);
        event.dataTransfer.setData('length', event.target.dataset.length);
        event.dataTransfer.setData('orientation', event.target.dataset.orientation);

        // * Add styles while dragging
        event.target.classList.add('dragging-ship');
    }
}

// export function dragOver(event) {
//     event.preventDefault();
//     // * Activate function to switch orientation
//     // window.addEventListener('contextmenu', (event) => {
//     //     console.log(event.button);
//     // });

//     // Access the mouse button clicked
//     const mouseButton = event.dataTransfer.getData('mouseButton');

//     // Determine which mouse button is clicked
//     if (mouseButton === 1) {
//         console.log('Left mouse button clicked');
//         // Handle left mouse button behavior
//     } else if (mouseButton === 2) {
//         console.log('Right mouse button clicked');
//         // Switch the orientation when the right mouse button is clicked
//         if (event.type === 'contextmenu') {
//             switchOrientation(event);
//         }
//     }
// }

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

// todo => Implement change orientation (add btn next to shipCells to change orientation )

export function dragDrop(event) {
    event.preventDefault();

    // * Get the$grid parent element of cells which have the drop event listener
    const $grid = event.target.parentNode;
    // * Get the corresponding gameBoard id from dataset
    const boardId = $grid.dataset.boardId;
    // * Filter through gameBoardList to get the gameBoard with the corresponding id
    const gameBoard = gameBoardList.filter((board) => board.id == boardId)[0];

    // * Get data from dragged ship
    const shipId = event.dataTransfer.getData('text/plain');
    const ship = document.getElementById(shipId);
    const shipLength = event.dataTransfer.getData('length');
    console.log(Number(shipLength));

    const shipOrientation = event.dataTransfer.getData('orientation');

    // * Get target element + row and column number
    // const targetCell = event.target;
    const targetX = Number(event.target.dataset.x);
    const targetY = Number(event.target.dataset.y);

    // * Get/adjust coords according to orientation
    const lastCellX = Number(targetX) + (shipOrientation === 'vertical' ? 0 : Number(shipLength - 1));
    const lastCellY = Number(targetY) + (shipOrientation === 'horizontal' ? 0 : Number(shipLength - 1));

    // console.log(shipOrientation);
    // console.log(targetCell);
    // console.log({ targetX });
    // console.log({ targetY });

    // console.log({ lastCellX });
    // console.log({ lastCellY });

    // console.log({ $grid });
    // console.log({ boardId });
    // console.log({ gameBoard });
    // console.log({ shipId });
    // console.log({ ship });
    // console.log({ shipLength });

    const newShip = gameBoard.placeShip([targetX, targetY], [lastCellX, lastCellY]);

    if (newShip) {
        updateBoard(gameBoard, $grid.parentNode);
        ship.parentElement.remove();
    }
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
document.addEventListener('keydown', function (event) {
    console.log(event);
    console.log(event.key);
    if (event.key === 'Enter' && isDragging) {
        // Prevent the default behavior
        event.preventDefault();
        // Switch the orientation
        const ship = document.getElementById(event.dataTransfer.getData('text/plain'));
        switchOrientation(ship);
    }
});

// ! 1st thing to do
// todo => Finish Implementing switch orientation function
function switchOrientation(event) {
    // const shipOrientation = event.dataTransfer.getData('orientation');
    const shipOrientation = event.dataset.orientation;
    console.log('orientation');

    if (shipOrientation === 'horizontal') {
        // Effectuer la rotation verticale
        event.target.orientation = 'vertical';
        // Appliquer les transformations CSS appropriées pour la rotation
        event.target.style.transform = 'rotate(90deg)';
    } else {
        // Effectuer la rotation horizontale
        event.target.orientation = 'horizontal';
        // Appliquer les transformations CSS appropriées pour la rotation
        event.target.style.transform = 'rotate(0deg)';
    }

    event.dataTransfer.setData('orientation', event.target.orientation);
}
