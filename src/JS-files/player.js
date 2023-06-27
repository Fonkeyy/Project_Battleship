export default function Player(name) {
    const player = {};
    player.name = name;
    player.moves = [];

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
}
