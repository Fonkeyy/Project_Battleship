// todo => Add event listener on play vs computer btn
import '../CSS-files/global.css';
import '../CSS-files/home.css';
import '../CSS-files/main-content.css';

import {
    changeOrientation,
    dragDrop,
    dragEnd,
    dragEnter,
    dragLeave,
    dragOver,
    dragStart,
} from './dragAndDrop';

// todo => Improve animation
export const homeAnimation = () => {
    const startContainer = document.querySelector('#start-container');
    const h1 = document.querySelector('h1');
    setTimeout(() => {
        h1.style.display = 'none';
    }, 0);
    startContainer.classList.add('translate-Y');
    setTimeout(() => {
        startContainer.style.display = 'none';
    }, 0);
};

// * Create DOM gameBoard from gameBoard object
export function renderBoard(gameBoard) {
    // * Create variable to store gameBoard object 'player' matrix
    const board = gameBoard.board,
        // * Create div elements to display matrix in the DOM
        $board = document.createElement('div'),
        $grid = document.createElement('div'),
        columnLabels = document.createElement('div'),
        rowLabels = document.createElement('div');

    // * Add ID + classes to DOM elements
    $board.classList.add('board');
    $grid.classList.add('grid');
    $grid.id = gameBoard.id;
    columnLabels.classList.add('column-label');
    rowLabels.classList.add('row-label');

    // * Create column labels with letters as value
    for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
        const columnLabelCell = document.createElement('div');
        columnLabelCell.classList.add('label-cell');
        columnLabelCell.textContent = String.fromCharCode(65 + columnIndex);
        columnLabels.appendChild(columnLabelCell);
    }
    // * Create row labels with number as value
    for (let rowIndex = 0; rowIndex < board[0].length; rowIndex++) {
        const rowLabelCell = document.createElement('div');
        rowLabelCell.classList.add('label-cell');
        rowLabelCell.textContent = rowIndex + 1;
        rowLabels.appendChild(rowLabelCell);
    }
    // * Append column and row labels to $board
    $board.append(rowLabels, columnLabels);

    // * For each cell in gameBoard matrix, create 1 cell in the DOM, add it class, dataset row index/ column index + ID
    board.forEach((row, indexRow) => {
        row.forEach((cells, indexColumn) => {
            const cell = document.createElement('button');
            cell.classList.add('grid-cell');
            cell.dataset.x = indexColumn;
            cell.dataset.y = indexRow;
            cell.id = `${indexColumn}${indexRow}`;

            cell.addEventListener('click', clickCellHandler);

            // * Append cell to $grid
            $grid.appendChild(cell);
        });
    });
    // * Add gameBoard ID as dataset to $grid
    $grid.dataset.boardId = gameBoard.id;

    // * Append $grid to $board and return $board
    $board.appendChild($grid);
    return $board;
}

export function addDragAndDropEventsListener(gameBoard) {
    const boardId = gameBoard.id;
    const board = document.getElementById(boardId);

    const cells = board.querySelectorAll('.grid-cell');

    cells.forEach((cell) => {
        // * Add drag n Drop events listener
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('dragenter', dragEnter);
        cell.addEventListener('dragleave', dragLeave);
        cell.addEventListener('drop', dragDrop);
    });
}

export function removeDragAndDropEventsListener(gameBoard) {
    const boardId = gameBoard.id;
    const board = document.getElementById(boardId);

    const cells = board.querySelectorAll('.grid-cell');

    cells.forEach((cell) => {
        // * Add drag n Drop events listener
        cell.removeEventListener('dragover', dragOver);
        cell.removeEventListener('dragenter', dragEnter);
        cell.removeEventListener('dragleave', dragLeave);
        cell.removeEventListener('drop', dragDrop);
    });
}

export function displayShipsList() {
    // * Create ship Objects => names + length
    const ships = [{ name: 'carrier', length: 5 }];
    // const ships = [
    //     { name: 'patrolBoat', length: 2 },
    //     { name: 'destroyer', length: 3 },
    //     { name: 'submarine', length: 3 },
    //     { name: 'battleship', length: 4 },
    //     { name: 'carrier', length: 5 },
    // ];
    // * Create and append ships-list-container
    const mainContent = document.querySelector('#main-content');

    const shipsListContainer = document.createElement('div');
    shipsListContainer.id = 'ships-list-container';
    mainContent.appendChild(shipsListContainer);

    for (let ship of ships) {
        const shipContainer = document.createElement('div');
        const shipLabel = document.createElement('div');
        const shipSvg = document.createElement('div');

        shipContainer.classList.add('ship-item-svg');

        shipSvg.id = 'ship-svg';
        shipSvg.classList.add('ship-svg');

        shipLabel.textContent = ship.name;

        shipSvg.id = ship.name;
        shipSvg.dataset.length = ship.length;

        // * Set container to draggable and orientation to vertical
        shipSvg.draggable = true;
        shipSvg.dataset.orientation = 'horizontal';

        // * Attach drag and drop event listeners on container
        shipSvg.addEventListener('dragstart', dragStart);
        shipSvg.addEventListener('dragend', dragEnd);
        shipSvg.addEventListener('dblclick', changeOrientation);

        shipContainer.append(shipSvg, shipLabel);
        shipsListContainer.appendChild(shipContainer);
    }
}

export function renderInterface(boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2) {
    // * Select main
    const main = document.querySelector('main');

    // * Create main content container
    const mainContent = document.createElement('div');
    mainContent.id = 'main-content';
    main.appendChild(mainContent);

    // * Add it $boardContainer
    const $boardsContainer = document.createElement('div');
    $boardsContainer.id = 'boards-container';

    // * Store players name input and add it to $boardContainer
    const inputPlayer1 = document.querySelector('#input-player-1').value || 'Player 1',
        inputPlayer2 = document.querySelector('#input-player-2').value || 'Player 2';

    const player1Name = document.createElement('div'),
        player2Name = document.createElement('div');

    player1Name.classList.add('player-name');
    player2Name.classList.add('player-name');

    player1Name.textContent = inputPlayer1;
    player2Name.textContent = inputPlayer2;

    mainContent.appendChild($boardsContainer);

    $boardsContainer.append(player2Name, $boardPlayer2, player1Name, $boardPlayer1);

    updateGrids(boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2);
}

export function clickCellHandler(e) {
    // * Store row index and column index from cell
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);

    // * Add 1 to x and y (0 index), format it and store it in a variable
    const eventValue = [y, x];

    // * Dispatch formatted values through document so it can be listened and get from somewhere else
    const event = new CustomEvent('playerHasPlay', { detail: eventValue });
    document.dispatchEvent(event);

    // * Once the cell is clicked, remove click event listener from it
    e.target.removeEventListener('click', clickCellHandler);
}

export function updateGrids(playerGameBoard, opponentGameBoard, $board, $opponentBoard) {
    // * Store gameBoards matrix to variables
    const opponentMatrix = opponentGameBoard.matrix,
        opponentBoard = opponentGameBoard.board;

    updateBoard(playerGameBoard, $board);
    updateOpponentBoard(opponentBoard, opponentMatrix, $opponentBoard);
}

export function updateBoard(playerGameBoard, $board) {
    const board = playerGameBoard.board;
    // * Select all cells from the $board
    const $cells = $board.querySelectorAll('.grid-cell');
    //* For each cell, check the value of the gameBoard matrix and add it the corresponding class, except 'miss matrix"
    $cells.forEach((cell) => {
        const rowIndex = parseInt(cell.dataset.y, 10);
        const columnIndex = parseInt(cell.dataset.x, 10);

        if (board[rowIndex][columnIndex] === 1) {
            cell.classList.add('occupied');
        }
        if (board[rowIndex][columnIndex] === 2) {
            cell.classList.add('hit');
        }
        if (board[rowIndex][columnIndex] === 3) {
            cell.classList.add('sunk');
        }
        if (board[rowIndex][columnIndex] === false) {
            cell.classList.remove('occupied', 'hit', 'sunk');
        }
    });
}

export function updateOpponentBoard(opponentBoard, opponentMatrix, $opponentBoard) {
    console.log({ opponentBoard });
    console.log({ opponentMatrix });
    console.log($opponentBoard);
    // * Select all cells from the $board
    const $cells = $opponentBoard.querySelectorAll('.cell');

    //* For each cell, check the value of the gameBoard matrix and add it the corresponding class, except 'occupied cells' from opponent board
    $cells.forEach((cell) => {
        const rowIndex = parseInt(cell.dataset.y, 10);
        const columnIndex = parseInt(cell.dataset.x, 10);

        if (opponentBoard[rowIndex][columnIndex] === 2) {
            console.log('hit');
            cell.classList.add('hit');
        }
        if (opponentBoard[rowIndex][columnIndex] === 3) {
            console.log('sunk');

            cell.classList.add('sunk');
        }
        if (opponentMatrix[rowIndex][columnIndex]) {
            console.log('miss');
            cell.classList.add('miss');
        }
    });
}
