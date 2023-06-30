import { updateGrid, updateOpponentBoard } from './interfaceController';

export function setUpInterface(boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2) {
    boardPlayer1.placeShip([1, 1], [1, 5]);
    // boardPlayer1.placeShip([3, 4], [5, 4]);
    // boardPlayer1.placeShip([10, 9], [10, 10]);

    boardPlayer2.placeShip([1, 1], [1, 1]);
    // boardPlayer2.placeShip([8, 6], [8, 10]);
    // boardPlayer2.placeShip([2, 4], [6, 4]);

    const main = document.createElement('main');
    document.body.appendChild(main);

    main.append($boardPlayer2, $boardPlayer1);

    updateGrid(boardPlayer1.board, boardPlayer2.board, boardPlayer1.matrix, $boardPlayer1, $boardPlayer2);
}

export function gameLoop(player1, player2, boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2) {
    // * Set player1 as active player
    player1.active = true;

    // * Disable events listener on children of $boardPlayer1
    $boardPlayer1.addEventListener(
        'click',
        (event) => {
            event.stopPropagation();
        },
        true
    );

    function playTurn() {
        if (player1.active) {
            document.addEventListener('playerHasPlay', (event) => {
                const eventValue = event.detail;
                boardPlayer2.receiveAttack(eventValue);
                updateGrid(
                    boardPlayer1.board,
                    boardPlayer2.board,
                    boardPlayer2.matrix,
                    $boardPlayer1,
                    $boardPlayer2
                );
                player1.active = false;
                player2.active = true;
            });

            if (boardPlayer1.checkWinner()) {
                console.log('Player 1 wins!');
                return;
            }
        } else if (player2.active) {
            setTimeout(() => {
                computerLogic(player2, boardPlayer1);

                updateOpponentBoard(boardPlayer1.board, boardPlayer1.matrix, $boardPlayer1);

                if (boardPlayer2.checkWinner()) {
                    console.log('Player 2 wins!');
                }
            }, 0);
            player1.active = true;
            player2.active = false;
        }

        // todo => check the need of event listener
        // Set up a callback to continue the game loop for the next turn
        const clickCallback = () => {
            // $boardPlayer1.removeEventListener('click', clickCallback);
            $boardPlayer2.removeEventListener('click', clickCallback);
            setTimeout(playTurn, 0); // Continue the game loop asynchronously
        };

        // Set up event listener for the player's click
        // $boardPlayer1.addEventListener('click', clickCallback);
        $boardPlayer2.addEventListener('click', clickCallback);
    }

    // Start the game loop by calling playTurn() for the first turn
    playTurn();
}

let computerLogic = (computer, playerBoard) => {
    computer.randomAttack(playerBoard);
    console.log(computer.moves);
};
