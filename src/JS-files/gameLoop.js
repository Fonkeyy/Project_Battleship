import { handleRestartGame } from '../index';
import { getRandomInteger } from './helpers';
import { updateGrids, updateOpponentBoard } from './interfaceController';

// todo => Add commentary

const ComputerGameLoop = (boardPlayer1, computer, $boardPlayer1, $computer) => {
    const player1 = computer.opponentName;
    const player2 = boardPlayer1.opponentName;

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
        if (boardPlayer1.checkWinner() || computer.checkWinner()) {
            $computer.addEventListener(
                'click',
                (event) => {
                    alert('Winner');
                    event.stopPropagation();
                },
                true
            );
        }
        if (player1.active) {
            document.addEventListener('playerHasPlay', handlePlayerHasPlay);
        } else if (player2.active) {
            setTimeout(() => {
                computerLogic(computer, boardPlayer1);
                updateOpponentBoard(boardPlayer1.board, boardPlayer1.matrix, $boardPlayer1);

                if (boardPlayer1.checkWinner()) {
                    handlePlayerWin('Computer');
                }
            }, 300);
            player1.active = true;
            player2.active = false;
        }

        // * Set up a callback to continue the game loop for the next turn
        const clickCallback = () => {
            $boardPlayer1.removeEventListener('click', clickCallback);
            $computer.removeEventListener('click', clickCallback);
            setTimeout(playTurn, 0); // * Continue the game loop asynchronously
        };

        // * Set up event listener for the player's click
        $boardPlayer1.addEventListener('click', clickCallback);
        $computer.addEventListener('click', clickCallback);
    }

    const handlePlayerHasPlay = (event) => {
        const eventValue = event.detail.eventValue;
        computer.receiveAttack(eventValue);
        updateGrids(boardPlayer1, computer, $boardPlayer1, $computer);
        if (computer.checkWinner()) {
            handlePlayerWin(boardPlayer1.id);
        }

        if (!computer.checkWinner()) {
            player1.active = false;
            player2.active = true;
        }
    };

    // * Start the game loop by calling playTurn() for the first turn
    playTurn();
};

const handlePlayerWin = (winnerName) => {
    alert(`${winnerName} has won!`);

    const replayBtn = document.createElement('button');
    replayBtn.id = 'replay-btn';
    replayBtn.classList.add('start-btn');
    replayBtn.textContent = 'Replay';

    replayBtn.addEventListener('click', handleRestartGame);
    const main = document.querySelector('#main-content');
    main.appendChild(replayBtn);
};

// * Initialize list of possible moves.
let possibleMoves = [];

const computerLogic = (computerBoard, playerBoard) => {
    const computer = playerBoard.opponentName;

    if (computer.hitList.length) {
        const lastHit = computer.hitList[computer.hitList.length - 1];
        const lastHitX = lastHit[0];
        const lastHitY = lastHit[1];

        if (playerBoard.board[lastHitY][lastHitX] === 3) {
            possibleMoves = [];
            computer.randomAttack(playerBoard);
            return;
        } else {
            if (possibleMoves.length === 0) {
                // * Check if it's possible to attack above the last hit
                if (
                    lastHitY - 1 >= 0 &&
                    (playerBoard.board[lastHitY - 1][lastHitX] === false ||
                        playerBoard.board[lastHitY - 1][lastHitX] === 1)
                ) {
                    possibleMoves.push([lastHitX, lastHitY - 1]);
                }

                // * Check if it's possible to attack below the last hit
                if (
                    lastHitY + 1 <= 9 &&
                    (playerBoard.board[lastHitY + 1][lastHitX] === false ||
                        playerBoard.board[lastHitY + 1][lastHitX] === 1)
                ) {
                    possibleMoves.push([lastHitX, lastHitY + 1]);
                }

                // * Check if it's possible to attack to the left of the last hit
                if (
                    lastHitX - 1 >= 0 &&
                    (playerBoard.board[lastHitY][lastHitX - 1] === false ||
                        playerBoard.board[lastHitY][lastHitX - 1] === 1)
                ) {
                    possibleMoves.push([lastHitX - 1, lastHitY]);
                }

                // * Check if it's possible to attack to the right of the last hit
                if (
                    lastHitX + 1 <= 9 &&
                    (playerBoard.board[lastHitY][lastHitX + 1] === false ||
                        playerBoard.board[lastHitY][lastHitX + 1] === 1)
                ) {
                    possibleMoves.push([lastHitX + 1, lastHitY]);
                }
            }
            // * If possible moves
            if (possibleMoves.length > 0) {
                // const randomIndex = Math.floor(Math.random() * possibleMoves.length);
                // * Randomly choose one and attack opponent board with it
                const randomIndex = getRandomInteger(possibleMoves.length - 1);
                const [nextX, nextY] = possibleMoves[randomIndex];
                computer.attack([nextX, nextY], playerBoard);
                // * Remove used move from possible moves
                possibleMoves.splice(randomIndex, 1);
            } else {
                computer.randomAttack(playerBoard);
            }
        }
    } else {
        computer.randomAttack(playerBoard);
    }
};

export { ComputerGameLoop, computerLogic };

// todo => Finish implement 2 players mode
// // export function gameLoop(boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2) {
// //     const player1 = boardPlayer2.opponentName;
// //     const player2 = boardPlayer1.opponentName;

// //     // * Set player1 as active player
// //     player1.active = true;
// //     player2.active = false;

// //     // * Disable events listener on children of $boardPlayer1
// //     $boardPlayer1.addEventListener(
// //         'click',
// //         (event) => {
// //             event.stopPropagation();
// //         },
// //         true
// //     );

// //     function playTurn() {
// //         if (boardPlayer1.checkWinner() || boardPlayer2.checkWinner()) {
// //             $boardPlayer2.addEventListener(
// //                 'click',
// //                 (event) => {
// //                     alert('Winner');
// //                     event.stopPropagation();
// //                 },
// //                 true
// //             );
// //         }
// //         if (player1.active) {
// //             console.log('player1 active');
// //             document.addEventListener('playerHasPlay', handlePlayerHasPlay);
// //         } else if (player2.active) {
// //             console.log('player2 active');
// //             setTimeout(() => {
// //                 updateOpponentBoard(boardPlayer1.board, boardPlayer1.matrix, $boardPlayer1);

// //                 if (boardPlayer1.checkWinner()) {
// //                     // todo => add handleWin => restart btn
// //                     alert('Player 2 wins');

// //                     console.log('Player 2 wins!');
// //                 }
// //             }, 0);
// //             player1.active = true;
// //             player2.active = false;
// //         }

// //         // * Set up a callback to continue the game loop for the next turn
// //         const clickCallback = () => {
// //             $boardPlayer1.removeEventListener('click', clickCallback);
// //             $boardPlayer2.removeEventListener('click', clickCallback);
// //             setTimeout(playTurn, 0); // * Continue the game loop asynchronously
// //         };

// //         // * Set up event listener for the player's click
// //         $boardPlayer1.addEventListener('click', clickCallback);
// //         $boardPlayer2.addEventListener('click', clickCallback);
// //     }

// //     const handlePlayerHasPlay = (event) => {
// //         const parentId = event.detail.parentId;
// //         const eventValue = event.detail.eventValue;

// //         const gameBoard = gameBoardList.filter((gameBoard) => gameBoard.id === parentId)[0];

// //         gameBoard.receiveAttack(eventValue);

// //         if (gameBoard == boardPlayer2) {
// //             updateGrids(boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2);
// //         }
// //         if (gameBoard == boardPlayer1) {
// //             updateGrids(boardPlayer2, boardPlayer1, $boardPlayer2, $boardPlayer1);
// //         }

// //         if (boardPlayer2.checkWinner()) {
// //             // todo => add handleWin => restart btn
// //             alert('Player 1 wins');
// //             console.log('Player 1 wins!');
// //         }

// //         if (!boardPlayer2.checkWinner()) {
// //             player1.active = false;
// //             player2.active = true;
// //         }
// //     };
// //     // // const handlePlayerHasPlay = (event) => {
// //     // //     const eventValue = event.detail;
// //     // //     boardPlayer2.receiveAttack(eventValue);
// //     // //     updateGrids(boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2);
// //     // //     if (boardPlayer2.checkWinner()) {
// //     // //         // todo => add handleWin => restart btn
// //     // //         alert('Player 1 wins');
// //     // //         console.log('Player 1 wins!');
// //     // //     }

// //     // //     if (!boardPlayer2.checkWinner()) {
// //     // //         player1.active = false;
// //     // //         player2.active = true;
// //     // //     }
// //     // // };

// //     // * Start the game loop by calling playTurn() for the first turn
// //     playTurn();
// // }
