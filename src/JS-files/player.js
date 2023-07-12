export function Computer() {
    const computer = {};
    computer.name = 'computer';
    computer.moves = [];
    computer.hitList = [];

    computer.attack = ([x, y], boardAttacked) => {
        boardAttacked.receiveAttack([x, y]);
    };

    computer.randomMove = () => {
        const x = Math.ceil(Math.random() * 9);
        const y = Math.ceil(Math.random() * 9);

        return [x, y];
    };

    // // computer.isAlreadyPlayed = (move) => {
    // //     console.log(computer.moves.some((playedMove) => move === playedMove));
    // //     return computer.moves.some((playedMove) => move === playedMove) ? true : false;
    // // };

    // computer.nextMove = () => {
    //     const lastMove = computer.moves[computer.moves.length - 1]
    //     const [lastMoveX, lastMoveY] = lastMove;

    //     const lastHit = computer.hitList[computer.hitList.length - 1]
    //     const [lastHitX, lastHitY] = lastHit

    //     let nextY;
    //     let nextX;

    //     const getRandomInteger = (min, max) => {
    //         return Math.floor(Math.random() * (max - min + 1)) + min;
    //     };

    //     const isValidMove = (y, x) => {
    //         return y >= 1 && y <= 10 && x >= 1 && x <= 10;
    //     };

    //     const getRandomDirection = () => {
    //         const randomNumber = getRandomInteger(1, 4);
    //         switch (randomNumber) {
    //             case 1:
    //                 nextY = lastY;
    //                 nextX = lastX + 1;
    //                 break;

    //             case 2:
    //                 nextY = lastY;
    //                 nextX = lastX - 1;
    //                 break;

    //             case 3:
    //                 nextY = lastY + 1;
    //                 nextX = lastX;
    //                 break;

    //             case 4:
    //                 nextY = lastY - 1;
    //                 nextX = lastX;
    //                 break;
    //         }
    //     };

    //     if (!computer.hitList.length) {
    //         console.log('hitList.length: 0');
    //         getRandomDirection();
    //     }

    //     console.log({ computer });
    //     console.log(computer.hitList);

    //     if (computer.hitList.length) {
    //         console.log('HitList.length');

    //         const [befLastY, befLastX] = computer.hitList[computer.hitList.length - 2];

    //         console.log({ befLastY, befLastX });

    //         if (lastX === befLastX) {
    //             console.log('sameLastY');
    //             const randomNumber = getRandomInteger(1, 2);

    //             if (randomNumber === 1) {
    //                 nextY = lastY + 1;
    //                 nextX = lastX;
    //             } else {
    //                 nextY = lastY - 1;
    //                 nextX = lastX;
    //             }
    //         }

    //         if (lastY === befLastY) {
    //             console.log('sameLastX');

    //             const randomNumber = getRandomInteger(1, 2);

    //             if (randomNumber === 1) {
    //                 nextY = lastY;
    //                 nextX = lastX + 1;
    //             } else {
    //                 nextY = lastY;
    //                 nextX = lastX - 1;
    //             }
    //         }

    //         getRandomDirection();
    //     }
    //     if (isValidMove(nextY, nextX)) {
    //         console.log('isValidMove!');
    //         return [nextY, nextX];
    //     } else {
    //         console.log('return computer.nextMove()');
    //         return computer.nextMove();
    //     }
    // };

    computer.randomAttack = (opponentBoard) => {
        let coord = computer.randomMove();
        let x = coord[0];
        let y = coord[1];

        let coordMatch = computer.moves.some((move) => move[0] === x && move[1] === y);

        while (coordMatch) {
            coord = computer.randomMove();
            x = coord[0];
            y = coord[1];
            coordMatch = computer.moves.some((move) => move[0] === x && move[1] === y);
        }

        opponentBoard.receiveAttack(coord);
        computer.moves.push(coord);

        console.log(`randomAttack: ${coord}`);
        return coord;
    };

    // computer.nextAttack = (lastMove, opponentBoard) => {
    //     let coord = computer.nextMove(lastMove);
    //     let x = coord[0];
    //     let y = coord[1];

    //     let coordMatch = computer.moves.some((move) => move[0] === x && move[1] === y);

    //     while (coordMatch) {
    //         coord = computer.nextMove(lastMove);
    //         x = coord[0];
    //         y = coord[1];
    //         coordMatch = computer.moves.some((move) => move[0] === x && move[1] === y);
    //     }
    //     opponentBoard.receiveAttack(coord);
    //     computer.moves.push(coord);

    //     console.log(`nextAttack${coord}`);
    //     return coord;
    // };

    return computer;
}

export default function Player(name) {
    const player = {};
    player.name = name;
    player.moves = [];
    player.hitList = [];

    player.attack = ([x, y], boardAttacked) => {
        boardAttacked.receiveAttack([x, y]);
    };

    return player;
}
