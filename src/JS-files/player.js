export default function Player(name) {
    const player = {};
    player.name = name;
    player.moves = [];
    player.hitMoves = [];

    player.attack = ([x, y], boardAttacked) => {
        boardAttacked.receiveAttack([x, y]);
    };

    player.randomMove = () => {
        const x = Math.ceil(Math.random() * 10);
        const y = Math.ceil(Math.random() * 10);

        return [x, y];
    };

    player.nextMove = (lastMove) => {
        let [lastY, lastX] = lastMove;
        let y;
        let x;

        const randomNumber = (number) => {
            return Math.ceil(Math.random() * number);
        };

        const random4 = () => {
            switch (randomNumber(4)) {
                case 1:
                    if (lastX + 1 <= 10) {
                        y = lastY;
                        x = lastX + 1;

                        return [y, x];
                    } else {
                        return player.nextMove(lastMove);
                    }

                case 2:
                    if (lastX - 1 >= 1) {
                        y = lastY;
                        x = lastX - 1;

                        return [y, x];
                    } else {
                        return player.nextMove(lastMove);
                    }

                case 3:
                    if (lastY + 1 <= 10) {
                        y = lastY + 1;
                        x = lastX;

                        return [y, x];
                    } else {
                        return player.nextMove(lastMove);
                    }

                case 4:
                    if (lastY - 1 >= 1) {
                        y = lastY - 1;
                        x = lastX;

                        return [y, x];
                    } else {
                        return player.nextMove(lastMove);
                    }
            }
        };

        if (player.moves.length <= 1) {
            random4();
        }

        if (player.moves.length > 2) {
            let [befLastY, befLastX] = player.moves[player.moves.length - 2];

            if (lastX === befLastX) {
                console.log('sameLastY');
                let randomNumber2 = randomNumber(2);

                if (randomNumber2 === 1) {
                    if (lastY + 1 <= 10) {
                        y = lastY + 1;
                        x = lastX;

                        return [y, x];
                    } else {
                        return player.nextMove(lastMove);
                    }
                }
                if (randomNumber2 === 2) {
                    if (lastY - 1 >= 1) {
                        y = lastY - 1;
                        x = lastX;

                        return [y, x];
                    } else {
                        return player.nextMove(lastMove);
                    }
                }
            }

            if (lastY === befLastY) {
                console.log('sameLastX');

                let randomNumber2 = randomNumber(2);

                if (randomNumber2 === 1) {
                    if (lastX + 1 <= 10) {
                        y = lastY;
                        x = lastX + 1;

                        return [y, x];
                    } else {
                        return player.nextMove(lastMove);
                    }
                }
                if (randomNumber2 === 2) {
                    if (lastX - 1 >= 1) {
                        y = lastY;
                        x = lastX - 1;

                        return [y, x];
                    } else {
                        return player.nextMove(lastMove);
                    }
                }
            }
            random4();
        }

        // todo => infinite loop // need to check if the next move has already been played
        console.log([x, y]);
        let coordMatch = player.moves.some((move) => move[0] === x && move[1] === y);
        console.log(!coordMatch);

        if (!coordMatch) {
            return [x, y];
        }
    };

    player.randomAttack = (opponentBoard) => {
        console.log('randomAttack');
        let coord = player.randomMove();
        let x = coord[0];
        let y = coord[1];

        let coordMatch = player.moves.some((move) => move[0] === x && move[1] === y);

        while (coordMatch) {
            coord = player.randomMove();
            x = coord[0];
            y = coord[1];
            coordMatch = player.moves.some((move) => move[0] === x && move[1] === y);
        }

        opponentBoard.receiveAttack(coord);
        player.moves.push(coord);

        return coord;
    };

    player.nextAttack = (lastMove, opponentBoard) => {
        console.log('nextAttack');
        let coord = player.nextMove(lastMove);
        let x = coord[0];
        let y = coord[1];

        let coordMatch = player.moves.some((move) => move[0] === x && move[1] === y);

        while (coordMatch) {
            coord = player.nextMove(lastMove);
            x = coord[0];
            y = coord[1];
            coordMatch = player.moves.some((move) => move[0] === x && move[1] === y);
        }
        console.log(coord);
        opponentBoard.receiveAttack(coord);
        player.moves.push(coord);
        // player.hitMoves.push(coord);

        return coord;
    };

    return player;
}
