export default function Player(name) {
    const player = {};
    player.name = name;
    player.moves = [];
    player.hitList = [];

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
        let nextY;
        let nextX;

        const getRandomInteger = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const isValidMove = (y, x) => {
            return y >= 1 && y <= 10 && x >= 1 && x <= 10;
        };

        const getRandomDirection = () => {
            const randomNumber = getRandomInteger(1, 4);
            switch (randomNumber) {
                case 1:
                    nextY = lastY;
                    nextX = lastX + 1;
                    break;

                case 2:
                    nextY = lastY;
                    nextX = lastX - 1;
                    break;

                case 3:
                    nextY = lastY + 1;
                    nextX = lastX;
                    break;

                case 4:
                    nextY = lastY - 1;
                    nextX = lastX;
                    break;
            }
        };

        if (!player.hitList.length) {
            console.log('hitList.length: 0');
            getRandomDirection();
        }

        console.log({ player });
        console.log(player.hitList);

        if (player.hitList.length) {
            console.log('HitList.length');

            const [befLastY, befLastX] = player.hitList[player.hitList.length - 2];

            console.log({ befLastY, befLastX });

            if (lastX === befLastX) {
                console.log('sameLastY');
                const randomNumber = getRandomInteger(1, 2);

                if (randomNumber === 1) {
                    nextY = lastY + 1;
                    nextX = lastX;
                } else {
                    nextY = lastY - 1;
                    nextX = lastX;
                }
            }

            if (lastY === befLastY) {
                console.log('sameLastX');

                const randomNumber = getRandomInteger(1, 2);

                if (randomNumber === 1) {
                    nextY = lastY;
                    nextX = lastX + 1;
                } else {
                    nextY = lastY;
                    nextX = lastX - 1;
                }
            }

            getRandomDirection();
        }
        if (isValidMove(nextY, nextX)) {
            console.log('isValidMove!');
            return [nextY, nextX];
        } else {
            console.log('return player.nextMove(lastMove)');
            return player.nextMove(lastMove);
        }
    };

    player.randomAttack = (opponentBoard) => {
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

        console.log(`randomAttack${coord}`);
        return coord;
    };

    player.nextAttack = (lastMove, opponentBoard) => {
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
        opponentBoard.receiveAttack(coord);
        player.moves.push(coord);

        console.log(`nextAttack${coord}`);
        return coord;
    };

    return player;
}
