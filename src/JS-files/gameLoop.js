import { updateGrid, updateOpponentBoard } from './interfaceController';

export function setUpInterface(boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2) {
    boardPlayer1.placeShip([1, 1], [1, 5]);
    boardPlayer1.placeShip([3, 4], [5, 4]);
    boardPlayer1.placeShip([10, 9], [10, 10]);

    boardPlayer2.placeShip([1, 1], [1, 1]);
    boardPlayer2.placeShip([8, 6], [8, 10]);
    boardPlayer2.placeShip([2, 4], [6, 4]);

    const main = document.createElement('main');
    document.body.appendChild(main);

    main.append($boardPlayer2, $boardPlayer1);

    updateGrid(boardPlayer1.board, boardPlayer2.board, boardPlayer1.matrix, $boardPlayer1, $boardPlayer2);
}

export function gameLoop(player1, player2, boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2) {
    // * Set player1 as active player
    player1.active = true;
    player2.active = false;

    // * Disable events listener on children of $boardPlayer1
    $boardPlayer1.addEventListener(
        'click',
        (event) => {
            event.stopPropagation();
        },
        true
    );

    function playTurn() {
        if (boardPlayer1.checkWinner() || boardPlayer2.checkWinner()) {
            $boardPlayer2.addEventListener(
                'click',
                (event) => {
                    event.stopPropagation();
                },
                true
            );
        }
        if (player1.active) {
            document.addEventListener('playerHasPlay', handlePlayerHasPlay);
        } else if (player2.active) {
            setTimeout(() => {
                computerLogic(player2, boardPlayer1);

                updateOpponentBoard(boardPlayer1.board, boardPlayer1.matrix, $boardPlayer1);

                if (boardPlayer1.checkWinner()) {
                    // todo => add handleWin
                    console.log('Player 2 wins!');
                }
            }, 0);
            player1.active = true;
            player2.active = false;
        }

        // * Set up a callback to continue the game loop for the next turn
        const clickCallback = () => {
            $boardPlayer1.removeEventListener('click', clickCallback);
            $boardPlayer2.removeEventListener('click', clickCallback);
            setTimeout(playTurn, 0); // * Continue the game loop asynchronously
        };

        // * Set up event listener for the player's click
        $boardPlayer1.addEventListener('click', clickCallback);
        $boardPlayer2.addEventListener('click', clickCallback);
    }

    const handlePlayerHasPlay = (event) => {
        const eventValue = event.detail;
        boardPlayer2.receiveAttack(eventValue);
        updateGrid(boardPlayer1.board, boardPlayer2.board, boardPlayer2.matrix, $boardPlayer1, $boardPlayer2);
        if (boardPlayer2.checkWinner()) {
            // todo => add handleWin
            console.log('Player 1 wins!');
        }

        if (!boardPlayer2.checkWinner()) {
            player1.active = false;
            player2.active = true;
        }
    };

    // * Start the game loop by calling playTurn() for the first turn
    playTurn();
}

// todo => fix nextAttack when lastMove hit
let computerLogic = (computer, playerBoard) => {
    if (computer.moves.length < 1) {
        computer.randomAttack(playerBoard);
    } else if (computer.moves.length > 0) {
        const lastMoves = computer.moves.slice(-5);
        console.log({ lastMoves });

        let foundTarget = false;
        console.log({ foundTarget });

        for (let i = lastMoves.length - 1; i >= 0; i--) {
            const element = lastMoves[i];
            const x = element[1];
            const y = element[0];
            // console.log(element);
            // console.log(element[0]);
            // console.log(element[1]);

            // console.log(playerBoard.board[x - 1][y - 1] == 2);
            if (playerBoard.board[x - 1][y - 1] == 2) {
                foundTarget = true;
                computer.nextAttack(element, playerBoard);
                break;
            }
        }

        if (!foundTarget) {
            computer.randomAttack(playerBoard);
        }
    }
};

// let computerLogic = (computer, playerBoard) => {
//     if (computer.moves.length < 1) {
//         computer.randomAttack(playerBoard);
//     } else if (computer.moves.length > 0) {
//         const lastMoves = computer.moves.slice(-5);

//         let foundTarget = false;

//         lastMoves.forEach((element) => {
//             const x = element[0];
//             const y = element[1];

//             console.log(playerBoard.board[x][y] == 2);
//             if (playerBoard.board[x][y] == 2) {
//                 computer.nextAttack(element, playerBoard);
//                 foundTarget = true;
//             }
//         });
//         if (!foundTarget) {
//             const lastMove = computer.moves[computer.moves.length - 1];
//             const x = lastMove[0];
//             const y = lastMove[1];
//             computer.nextAttack([x, y], playerBoard);
//         }
//     }
// };

// let computerLogic = (computer, playerBoard) => {
//     if (computer.moves.length < 1) {
//         computer.randomAttack(playerBoard);
//     } else if (computer.moves.length > 0) {
//         const lastCoord = computer.moves.slice(-1)[0];
//         const lastX = lastCoord[0];
//         const lastY = lastCoord[1];

//         if (playerBoard.board[lastY - 1][lastX - 1] === 2) {
//             computer.nextAttack(playerBoard);
//         } else {
//             computer.randomAttack(playerBoard);
//         }
//     }
// };
