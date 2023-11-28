import {
    changeOrientation,
    dragDrop,
    dragEnd,
    dragEnter,
    dragLeave,
    dragOver,
    dragStart,
} from './dragAndDrop';
import { ComputerGameLoop } from './gameLoop';
import { gameBoardList, GameBoard } from './gameBoardFactory';
import { shipsData } from './helpers';

const homeAnimation = () => {
    const startContainer = document.querySelector('#start-container');
    const h1 = document.querySelector('h1');
    setTimeout(() => {
        h1.style.display = 'none';
        startContainer.style.display = 'none';
    }, 0);
};

// // const handleStartGameBtn = () => {
// //     if (StartGameBtn.dataset.gameStarted === 'true') {
// //         handleRestartGame();
// //     } else {
// //         const inputPlayer1 = document.querySelector('#input-player-1').value || 'Player 1';
// //         const inputPlayer2 = document.querySelector('#input-player-2').value || 'Player 2';

// //         // * Create gameBoard objects with players name as parameters
// //         const gameBoardPlayer1 = GameBoardInputPlayer1, inputPlayer2);
// //         const gameBoardPlayer2 = GameBoardInputPlayer2, inputPlayer1);

// //         // * Create $Boards with gameBoard objects as parameters
// //         const $boardPlayer1 = renderBoard(gameBoardPlayer1);
// //         const $boardPlayer2 = renderBoard(gameBoardPlayer2);

// //         // * Set up interface, close dialog, change start btn value and its dataset.gameStarted to true
// //         homeAnimation();
// //         renderInterface(gameBoardPlayer1, gameBoardPlayer2, $boardPlayer1, $boardPlayer2);
// //         displayShipsList();
// //         addDragAndDropEventsListener(gameBoardPlayer1);
// //         StartGameBtn.value = 'Restart';
// //         StartGameBtn.dataset.gameStarted = 'true';
// //     }
// // };

const handleStartComputerBtn = () => {
    const inputPlayer1 = document.querySelector('#input-player-1').value || 'Player 1';
    const inputPlayer2 = 'computer';

    // * Create gameBoard objects with players name as parameters
    const gameBoardPlayer1 = GameBoard(inputPlayer1, inputPlayer2);
    const computerBoard = GameBoard(inputPlayer2, inputPlayer1);

    // * Create $Boards with gameBoard objects as parameters
    const $boardPlayer1 = renderBoard(gameBoardPlayer1);
    const $boardComputer = renderBoard(computerBoard);

    // * Set up interface, close dialog, change start btn value and its dataset.gameStarted to true
    homeAnimation();
    renderInterface(gameBoardPlayer1, computerBoard, $boardPlayer1, $boardComputer);
    displayShipsList();
    addDragAndDropEventsListener(gameBoardPlayer1);

    computerBoard.randomPlaceFleet();
};

const handleRestartGame = () => {
    // * Clear DOM
    const mainContent = document.querySelector('#main-content');
    mainContent.remove();
    // * Clear matrices
    gameBoardList.forEach((gameBoard) => gameBoard.reset());
    // * Restart game
    handleStartComputerBtn();
};

// * Create DOM gameBoard from gameBoard object
const renderBoard = (gameBoard) => {
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
};

const addDragAndDropEventsListener = (gameBoard) => {
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
};

const removeDragAndDropEventsListener = (gameBoard) => {
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
};

const displayShipsList = () => {
    // * Create ship Objects => names + length
    const ships = shipsData;
    // * Create and append ships-list-container
    const mainContent = document.querySelector('#main-content');

    const shipsListContainer = document.createElement('div');
    shipsListContainer.id = 'ships-list-container';
    mainContent.appendChild(shipsListContainer);

    for (let ship of ships) {
        const shipContainer = document.createElement('div');
        const shipLabel = document.createElement('div');
        const shipSvg = document.createElement('div');

        shipContainer.classList.add('ship-item');
        shipLabel.textContent = ship.name;
        shipSvg.id = 'ship-svg';
        shipSvg.classList.add('ship-svg');
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

    // * Create btn to randomly place ships
    const randomPlacementBtn = document.createElement('button');
    randomPlacementBtn.id = 'random-place-btn';
    randomPlacementBtn.addEventListener('click', handleRandomPlacementBtn);
    shipsListContainer.appendChild(randomPlacementBtn);
};

const handleRandomPlacementBtn = () => {
    const boardPlayer1 = gameBoardList[0];
    const boardPlayer2 = gameBoardList[1];
    const $boardPlayer1 = document.getElementById(boardPlayer1.id);
    const $boardPlayer2 = document.getElementById(boardPlayer2.id);

    // * Randomly place ships + update board
    boardPlayer1.randomPlaceFleet();
    updateBoard(boardPlayer1, $boardPlayer1);

    // * Remove ShipsList so the board is centered
    const shipsListContainer = document.querySelector('#ships-list-container');
    shipsListContainer.remove();

    // * Launch gameLoop
    if (boardPlayer2.id === 'computer') {
        setTimeout(() => {
            alert('Game start, attack enemy!');
        }, 300);
        ComputerGameLoop(boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2);
    }
};

const renderInterface = (boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2) => {
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
    const inputPlayer1 = document.querySelector('#input-player-1').value || 'Player 1';
    // // inputPlayer2 = document.querySelector('#input-player-2').value || boardPlayer2.id;
    const inputPlayer2 = boardPlayer2.id;

    const player1Name = document.createElement('div');
    const player2Name = document.createElement('div');

    player1Name.classList.add('player-name');
    player2Name.classList.add('player-name');

    player1Name.textContent = inputPlayer1;
    player2Name.textContent = inputPlayer2;

    mainContent.appendChild($boardsContainer);
    $boardsContainer.append(player2Name, $boardPlayer2, player1Name, $boardPlayer1);

    updateGrids(boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2);
};

const clickCellHandler = (e) => {
    // * Store row index and column index from cell
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);

    // * Format and store it in a variable
    const eventValue = [x, y];

    // * Store parentId
    const parentId = e.target.parentElement.id;

    // * Create and object to send data
    const eventData = {
        parentId: parentId,
        eventValue: eventValue,
    };

    // * Dispatch formatted values through document so it can be listened and get from somewhere else
    const event = new CustomEvent('playerHasPlay', { detail: eventData });
    document.dispatchEvent(event);

    // * Once the cell is clicked, remove click event listener from it
    e.target.removeEventListener('click', clickCellHandler);
};

const updateGrids = (playerGameBoard, opponentGameBoard, $board, $opponentBoard) => {
    updateBoard(playerGameBoard, $board);
    updateOpponentBoard(opponentGameBoard, $opponentBoard);
};

const updateBoard = (playerGameBoard, $board) => {
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
            cell.classList.remove('hit');
            cell.classList.add('sunk');
        }
        if (board[rowIndex][columnIndex] === false) {
            cell.classList.remove('occupied', 'hit', 'sunk');
        }
    });
};

const updateOpponentBoard = (opponent, $opponentBoard) => {
    const opponentBoard = opponent.board;
    const opponentMatrix = opponent.matrix;

    // * Select all cells from the $board
    const $cells = $opponentBoard.querySelectorAll('.grid-cell');

    //* For each cell, check the value of the gameBoard matrix and add it the corresponding class, except 'occupied cells' from opponent board
    $cells.forEach((cell) => {
        const rowIndex = parseInt(cell.dataset.y, 10);
        const columnIndex = parseInt(cell.dataset.x, 10);

        if (opponentBoard[rowIndex][columnIndex] === 2) {
            cell.classList.add('hit');
        }
        if (opponentBoard[rowIndex][columnIndex] === 3) {
            cell.classList.remove('hit');
            // * Add delay so animation occurs on every sunk cells
            setTimeout(() => {
                cell.classList.add('sunk');
            }, 10);
        }
        if (opponentMatrix[rowIndex][columnIndex]) {
            cell.classList.add('miss');
        }
    });
};

export {
    homeAnimation,
    handleStartComputerBtn,
    handleRestartGame,
    renderBoard,
    addDragAndDropEventsListener,
    removeDragAndDropEventsListener,
    displayShipsList,
    renderInterface,
    clickCellHandler,
    updateGrids,
    updateBoard,
    updateOpponentBoard,
};
