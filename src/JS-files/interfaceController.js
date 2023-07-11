// todo => Check if functions are not broken because of small changes in parameters
// todo => Add event listener on play vs computer btn

import {
    changeOrientation,
    dragDrop,
    dragEnd,
    dragEnter,
    dragLeave,
    dragOver,
    dragStart,
} from './dragAndDrop2';

export const homeAnimation = () => {
    const startContainer = document.querySelector('#start-container');
    const h1 = document.querySelector('h1');

    h1.classList.add('translate-Y');
    setTimeout(() => {
        h1.style.display = 'none';
    }, 1000);

    startContainer.classList.add('translate-Y');
    setTimeout(() => {
        startContainer.style.display = 'none';
    }, 1000);
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

            // * Add drag n Drop events listener
            cell.addEventListener('dragover', dragOver);
            cell.addEventListener('dragenter', dragEnter);
            cell.addEventListener('dragleave', dragLeave);
            cell.addEventListener('drop', dragDrop);

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

export function displayShipsList() {
    // * Create ship Objects => names + length
    const ships = [
        { name: 'patrolBoat', length: 2 },
        { name: 'battleship', length: 4 },
        { name: 'destroyer', length: 3 },
        { name: 'submarine', length: 3 },
        { name: 'carrier', length: 5 },
    ];
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
    const x = parseInt(e.target.dataset.row);
    const y = parseInt(e.target.dataset.column);

    // * Add 1 to x and y (0 index), format it and store it in a variable
    const eventValue = [y + 1, x + 1];

    // * Dispatch formatted values through document so it can be listened and get from somewhere else
    const event = new CustomEvent('playerHasPlay', { detail: eventValue });
    document.dispatchEvent(event);

    // * Once the cell is clicked, remove click event listener from it
    e.target.removeEventListener('click', clickCellHandler);
}

export function updateGrids(playerGameBoard, opponentGameBoard, $board, $opponentBoard) {
    // * Store gameBoards matrix to variables
    const playerMatrix = playerGameBoard.matrix,
        opponentBoard = opponentGameBoard.board;

    updateBoard(playerGameBoard, $board);
    updateOpponentBoard(opponentBoard, playerMatrix, $opponentBoard);
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
    });
}

export function updateOpponentBoard(opponentBoard, playerMatrix, $opponentBoard) {
    // * Select all cells from the $board
    const $cells = $opponentBoard.querySelectorAll('.cell');

    //* For each cell, check the value of the gameBoard matrix and add it the corresponding class, except 'occupied cells' from opponent board
    $cells.forEach((cell) => {
        const rowIndex = parseInt(cell.dataset.row, 10);
        const columnIndex = parseInt(cell.dataset.column, 10);

        if (opponentBoard[rowIndex][columnIndex] === 2) {
            cell.classList.add('hit');
        }
        if (opponentBoard[rowIndex][columnIndex] === 3) {
            cell.classList.add('sunk');
        }
        if (playerMatrix[rowIndex][columnIndex]) {
            cell.classList.add('miss');
        }
    });
}
