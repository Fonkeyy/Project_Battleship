export function create$Board(board) {
    const $board = document.createElement('div'),
        grid = document.createElement('div'),
        columnLabels = document.createElement('div'),
        rowLabels = document.createElement('div');

    $board.classList.add('board');
    grid.classList.add('grid');
    columnLabels.classList.add('column-label');
    rowLabels.classList.add('row-label');

    for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
        const columnLabelCell = document.createElement('div');
        columnLabelCell.classList.add('label-cell');
        columnLabelCell.textContent = String.fromCharCode(65 + columnIndex);
        columnLabels.appendChild(columnLabelCell);
    }

    for (let rowIndex = 0; rowIndex < board[0].length; rowIndex++) {
        const rowLabelCell = document.createElement('div');
        rowLabelCell.classList.add('label-cell');
        rowLabelCell.textContent = rowIndex + 1;
        rowLabels.appendChild(rowLabelCell);
    }

    $board.append(rowLabels, columnLabels);

    board.forEach((row, indexRow) => {
        row.forEach((cells, indexColumn) => {
            const cell = document.createElement('button');
            cell.classList.add('cell');
            cell.dataset.row = indexRow;
            cell.dataset.column = indexColumn;

            cell.hasEventListener = true;

            cell.addEventListener('click', clickCellHandler);

            grid.appendChild(cell);
        });
    });
    $board.appendChild(grid);
    return $board;
}

// todo => finish this function
export function clickCellHandler(e) {
    const x = parseInt(e.target.dataset.row);
    const y = parseInt(e.target.dataset.column);

    const eventValue = [y + 1, x + 1];

    const event = new CustomEvent('playerHasPlay', { detail: eventValue });
    document.dispatchEvent(event);
}

export function updateGrid(board, opponentBoard, playerMatrix, $board, $opponentBoard) {
    updateBoard(board, $board);
    updateOpponentBoard(opponentBoard, playerMatrix, $opponentBoard);
    // updateMatrix(playerMatrix, $opponentBoard);
}

export function updateBoard(board, $board) {
    const $cells = $board.querySelectorAll('.cell');

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

function updateOpponentBoard(opponentBoard, playerMatrix, $opponentBoard) {
    const $cells = $opponentBoard.querySelectorAll('.cell');

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

export function updateMatrix(matrix, $board) {
    const $cells = $board.querySelectorAll('.cell');

    $cells.forEach((cell) => {
        const rowIndex = parseInt(cell.dataset.row, 10);
        const columnIndex = parseInt(cell.dataset.column, 10);

        if (matrix[rowIndex][columnIndex]) {
            cell.classList.add('miss');
        }
    });
}
