// import { updateGrids } from './interfaceController';

// todo => Add commentary

// todo => finish implementing gameLoop and computer logic

// export function gameLoop(boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2) {
//     const player1 = boardPlayer2.opponent;
//     const player2 = boardPlayer1.opponent;
//     // * Set player1 as active player
//     player1.active = true;
//     player2.active = false;

//     // * Disable events listener on children of $boardPlayer1
//     $boardPlayer1.addEventListener(
//         'click',
//         (event) => {
//             event.stopPropagation();
//         },
//         true
//     );

//     function playTurn() {
//         if (boardPlayer1.checkWinner() || boardPlayer2.checkWinner()) {
//             $boardPlayer2.addEventListener(
//                 'click',
//                 (event) => {
//                     event.stopPropagation();
//                 },
//                 true
//             );
//         }
//         if (player1.active) {
//             document.addEventListener('playerHasPlay', handlePlayerHasPlay);
//         } else if (player2.active) {
//             setTimeout(() => {
//                 computerLogic(boardPlayer2, boardPlayer1);

//                 updateOpponentBoard(boardPlayer1.board, boardPlayer1.matrix, $boardPlayer1);

//                 if (boardPlayer1.checkWinner()) {
//                     // todo => add handleWin
//                     console.log('Player 2 wins!');
//                 }
//             }, 0);
//             player1.active = true;
//             player2.active = false;
//         }

//         // * Set up a callback to continue the game loop for the next turn
//         const clickCallback = () => {
//             $boardPlayer1.removeEventListener('click', clickCallback);
//             $boardPlayer2.removeEventListener('click', clickCallback);
//             setTimeout(playTurn, 0); // * Continue the game loop asynchronously
//         };

//         // * Set up event listener for the player's click
//         $boardPlayer1.addEventListener('click', clickCallback);
//         $boardPlayer2.addEventListener('click', clickCallback);
//     }

//     const handlePlayerHasPlay = (event) => {
//         const eventValue = event.detail;
//         boardPlayer2.receiveAttack(eventValue);
//         updateGrids(boardPlayer1, boardPlayer2,  $boardPlayer1, $boardPlayer2);
//         if (boardPlayer2.checkWinner()) {
//             // todo => add handleWin
//             console.log('Player 1 wins!');
//         }

//         if (!boardPlayer2.checkWinner()) {
//             player1.active = false;
//             player2.active = true;
//         }
//     };

//     // * Start the game loop by calling playTurn() for the first turn
//     playTurn();
// }

// todo => find a way to know the last move which has hit then nextAttack from this one
// let computerLogic = (computerBoard, playerBoard) => {
//     const computer = playerBoard.opponent;

//     console.log(computer);

//     if (computer.hitList.length) {
//         const lastHitCoord = computer.hitList[computer.hitList.length - 1];
//         const lastHitX = lastHitCoord[0];
//         const lastHitY = lastHitCoord[1];
//         console.log(computer.hitList);
//         console.log(lastHitCoord);

//         if (playerBoard.board[lastHitY - 1][lastHitX - 1] === 3) {
//             computer.randomAttack(playerBoard);
//         } else {
//             const possibleMoves = [];

//             // Check if it's possible to attack above the last hit
//             if (lastHitY - 1 >= 1 && playerBoard.board[lastHitY - 2][lastHitX - 1] === false) {
//                 possibleMoves.push([lastHitX, lastHitY - 1]);
//             }

//             // Check if it's possible to attack below the last hit
//             if (lastHitY + 1 <= 10 && playerBoard.board[lastHitY][lastHitX - 1] === false) {
//                 possibleMoves.push([lastHitX, lastHitY + 1]);
//             }

//             // Check if it's possible to attack to the left of the last hit
//             if (lastHitX - 1 >= 1 && playerBoard.board[lastHitY - 1][lastHitX - 2] === false) {
//                 possibleMoves.push([lastHitX - 1, lastHitY]);
//             }

//             // Check if it's possible to attack to the right of the last hit
//             if (lastHitX + 1 <= 10 && playerBoard.board[lastHitY - 1][lastHitX] === false) {
//                 possibleMoves.push([lastHitX + 1, lastHitY]);
//             }

//             console.log(possibleMoves);

//             if (possibleMoves.length > 0) {
//                 const randomIndex = Math.floor(Math.random() * possibleMoves.length);
//                 const [nextX, nextY] = possibleMoves[randomIndex];
//                 computer.attack([nextX, nextY], playerBoard);
//             } else {
//                 computer.randomAttack(playerBoard);
//             }
//         }
//     } else {
//         computer.randomAttack(playerBoard);
//     }
// };

// let computerLogic = (computerBoard, playerBoard) => {
//     const player = computerBoard.opponent;
//     const computer = playerBoard.opponent;

//     console.log(computer);
//     console.log(computer.hitList);

//     if (player.hitList.length) {
//         const lastHitCoord = player.hitList[player.hitList.length - 1];
//         console.log({ lastHitCoord });

//         const lastHitX = lastHitCoord[0];
//         console.log({ lastHitX });

//         const lastHitY = lastHitCoord[1];
//         console.log({ lastHitY });

//         if (playerBoard.board[lastHitX - 1][lastHitY - 1] === 3) {
//             computer.randomAttack(playerBoard);
//         } else {
//             computer.nextAttack(lastHitCoord, playerBoard);
//         }
//     } else {
//         computer.randomAttack(playerBoard);
//     }
// };

// let computerLogic = (computer, playerBoard) => {
//     if (computer.moves.length < 1) {
//         computer.randomAttack(playerBoard);
//     } else if (computer.moves.length > 0) {
//         const lastMoves = computer.moves.slice(-5);
//         console.log({ lastMoves });

//         let foundTarget = false;
//         console.log({ foundTarget });

//         for (let i = lastMoves.length - 1; i >= 0; i--) {
//             const element = lastMoves[i];
//             const x = element[1];
//             const y = element[0];

//             if (playerBoard.board[x - 1][y - 1] == 2) {
//                 foundTarget = true;
//                 computer.nextAttack(element, playerBoard);
//                 return;
//             }
//         }

//         if (!foundTarget) {
//             computer.randomAttack(playerBoard);
//         }
//     }
// };
