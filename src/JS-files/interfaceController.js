import CreateGameBoard from './gameboardFactory';

const playerGameBoard = CreateGameBoard();
const $playerBoard = create$Board(playerGameBoard.board);

function create$Board(board) {
    const $board = document.createElement('div'),
        grid = document.createElement('div'),
        columnLabels = document.createElement('div'),
        rowLabels = document.createElement('div');

    $board.id = 'board';
    grid.id = 'grid';
    columnLabels.classList = 'column-label';
    rowLabels.classList = 'row-label';

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

            grid.appendChild(cell);
        });
    });
    $board.appendChild(grid);
    return $board;
}

// function create$Board(board) {
//     const $board = document.createElement('div');
//     $board.classList = 'board';

//     // Create the top row for column labels
//     const columnsLabels = document.createElement('div');
//     columnsLabels.classList.add('row', 'labels');

//     const emptyLabelCell = document.createElement('div');
//     emptyLabelCell.classList.add('label');
//     columnsLabels.appendChild(emptyLabelCell);

//     for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
//         const labelCell = document.createElement('div');
//         labelCell.classList.add('label');
//         labelCell.textContent = String.fromCharCode(65 + columnIndex); // Convert ASCII code to character
//         columnsLabels.appendChild(labelCell);
//     }

//     $board.appendChild(columnsLabels);

//     // Create the grid cells
//     board.forEach((row, indexRow) => {
//         const rowElement = document.createElement('div');
//         rowElement.classList.add('row');

//         const rowLabelCell = document.createElement('div');
//         rowLabelCell.classList.add('cell', 'label');
//         rowLabelCell.textContent = indexRow + 1; // Add 1 to convert index to 1-based numbering
//         rowElement.appendChild(rowLabelCell);

//         row.forEach((cell, indexColumn) => {
//             const cellElement = document.createElement('button');
//             cellElement.classList.add('cell');
//             cellElement.dataset.row = indexRow;
//             cellElement.dataset.column = indexColumn;
//             rowElement.appendChild(cellElement);
//         });

//         $board.appendChild(rowElement);
//     });

//     return $board;
// }

export function setUpInterface() {
    playerGameBoard.placeShip([1, 1], [1, 5]);
    playerGameBoard.placeShip([3, 4], [7, 4]);
    playerGameBoard.placeShip([10, 9], [10, 10]);

    const main = document.createElement('main');
    document.body.appendChild(main);

    main.appendChild($playerBoard);
    updateBoard(playerGameBoard.board, $playerBoard);
}

function updateBoard(board, $board) {
    const $cells = $board.querySelectorAll('.cell');

    $cells.forEach((cell) => {
        const rowIndex = parseInt(cell.dataset.row, 10);
        const columnIndex = parseInt(cell.dataset.column, 10);

        if (board[rowIndex][columnIndex]) {
            cell.classList.add('occupied');
        }
        if (board[rowIndex][columnIndex] === undefined) {
            cell.classList.add('sunk');
        }
    });
}

// function updateMatrix(matrix) {
//     matrix.forEach((row) => {
//         row.forEach((cell) => {
//             if (cell) {
//                 cell.classList = 'occupied';
//             }
//         });
//     });

// }

export function interfaceController() {}

// * Helper function
// const $ = (element) => {
//     return document.querySelector(element);
// };
