export default function Player(name) {
    const player = {};
    player.name = name;
    player.moves = [];
    player.active = false;

    player.attack = ([x, y], boardAttacked) => {
        boardAttacked.receiveAttack([x, y]);
    };

    player.randomMove = () => {
        const x = Math.ceil(Math.random() * 10);
        const y = Math.ceil(Math.random() * 10);

        return [x, y];
    };

    player.nextMove = () => {
        const lastY = player.moves.slice(-1);
        const lastX = player.moves.slice(-1);

        let y;
        let x;

        const randomNumber = Math.floor(Math.random() * 4);
        switch (randomNumber) {
            case '0':
                if (lastX + 1 <= 10) {
                    y = lastY;
                    x = lastX + 1;
                } else {
                    player.nextMove();
                }

                break;
            case '1':
                if (lastX - 1 >= 1) {
                    y = lastY;
                    x = lastX - 1;
                } else {
                    player.nextMove();
                }
                break;

            case '2':
                if (lastY + 1 <= 10) {
                    y = lastY + 1;
                    x = lastX;
                } else {
                    player.nextMove();
                }
                break;

            case '3':
                if (lastY - 1 >= 1) {
                    y = lastY - 1;
                    x = lastX;
                } else {
                    player.nextMove();
                }
                break;
        }

        return [x, y];
    };

    // todo => check if the move has already been done before attacking
    player.randomAttack = (opponentBoard) => {
        const coord = player.randomMove();

        player.moves.forEach((move) => {
            console.log(move);
            if (move == coord) {
                player.randomAttack();
            }
        });
        player.moves.push(coord);

        opponentBoard.receiveAttack(coord);
        return coord;
    };

    return player;
}
