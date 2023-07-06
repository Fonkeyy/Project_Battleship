import { dragEnter, dragOver, drop } from './dragAndDrop';

// todo => Check if functions are not broken because of small changes in parameters

// * Create DOM gameBoard from gameBoard object
export function create$Board(gameBoard) {
    // * Create variable to store gameBoard object 'player' matrix
    const board = gameBoard.board,
        // * Create div elements to display matrix in the DOM
        $board = document.createElement('div'),
        $grid = document.createElement('div'),
        columnLabels = document.createElement('div'),
        rowLabels = document.createElement('div');
    // * Add classes to DOM elements
    $board.classList.add('board');
    $grid.classList.add('grid');
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

    // * For each cell in gameBoard matrix, create 1 cell in the dom, add it class, dataset row index/ column index + ID
    board.forEach((row, indexRow) => {
        row.forEach((cells, indexColumn) => {
            const cell = document.createElement('button');
            cell.classList.add('grid-cell');
            cell.dataset.row = indexRow;
            cell.dataset.column = indexColumn;
            cell.id = `${indexColumn}${indexRow}`;

            // * Add event listener for click + drag n drop
            cell.addEventListener('click', clickCellHandler);
            cell.addEventListener('dragenter', dragEnter);
            cell.addEventListener('dragover', dragOver);
            // cell.addEventListener('drop', childDrop);
            cell.addEventListener('drop', drop);

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

export function updateGrid(playerGameBoard, opponentGameBoard, $board, $opponentBoard) {
    // * Store gameBoards matrix to variables
    const playerMatrix = playerGameBoard.matrix,
        opponentBoard = opponentGameBoard.board;

    updateBoard(playerGameBoard, $board);
    updateOpponentBoard(opponentBoard, playerMatrix, $opponentBoard);
}

export function updateBoard(playerGameBoard, $board) {
    const board = playerGameBoard.board;
    // * Select all cells from the $board
    const $cells = $board.querySelectorAll('.cell');

    //* For each cell, check the value of the gameBoard matrix and add it the corresponding class, except 'miss matrix"
    $cells.forEach((cell) => {
        const rowIndex = parseInt(cell.dataset.row, 10);
        const columnIndex = parseInt(cell.dataset.column, 10);

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
