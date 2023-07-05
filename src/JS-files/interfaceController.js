import { dragEnter, dragOver, drop } from './dragAndDrop';

export function create$Board(gameBoard) {
    const board = gameBoard.board,
        $board = document.createElement('div'),
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
            cell.id = `${indexColumn}${indexRow}`;

            cell.addEventListener('click', clickCellHandler);
            cell.addEventListener('dragenter', dragEnter);
            cell.addEventListener('dragover', dragOver);
            cell.addEventListener('drop', drop);

            grid.appendChild(cell);
        });
    });
    grid.dataset.boardId = gameBoard.id;
    $board.appendChild(grid);
    return $board;
}

export function clickCellHandler(e) {
    const x = parseInt(e.target.dataset.row);
    const y = parseInt(e.target.dataset.column);

    const eventValue = [y + 1, x + 1];

    const event = new CustomEvent('playerHasPlay', { detail: eventValue });
    document.dispatchEvent(event);

    e.target.removeEventListener('click', clickCellHandler);
}

export function updateGrid(board, opponentBoard, playerMatrix, $board, $opponentBoard) {
    updateBoard(board, $board);
    updateOpponentBoard(opponentBoard, playerMatrix, $opponentBoard);
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

export function updateOpponentBoard(opponentBoard, playerMatrix, $opponentBoard) {
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

// todo => Implement drag and drop for ships
