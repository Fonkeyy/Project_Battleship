export default function Player(name) {
    const player = {};
    player.name = name;
    player.moves = [];
    player.active = false;

    player.attack = ([x, y], boardAttacked) => {
        boardAttacked.receiveAttack([x, y]);
    };

    // player.switchPlayerTurn = () => {
    //     player.active = player.active === true ? false : true;
    // };

    player.randomMove = () => {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        player.moves.push(x, y);
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

    player.randomAttack = (opponentBoard) => {
        const coord = player.randomMove();
        // console.log(coord);
        opponentBoard.receiveAttack(coord);
        return coord;
    };

    return player;
}
