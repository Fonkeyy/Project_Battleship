function Computer() {
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

    computer.randomAttack = (opponentBoard) => {
        const findAvailableMove = () => {
            const coord = computer.randomMove();
            const x = coord[0];
            const y = coord[1];

            let isCoordAvailable = !computer.moves.some((move) => move[0] === x && move[1] === y);
            return { coord, isCoordAvailable };
        };

        let { coord, isCoordAvailable } = findAvailableMove();

        while (!isCoordAvailable) {
            ({ coord, isCoordAvailable } = findAvailableMove());
        }

        opponentBoard.receiveAttack(coord);
        computer.moves.push(coord);

        return coord;
    };

    return computer;
}

function Player(name) {
    const player = {};
    player.name = name;
    player.moves = [];
    player.hitList = [];

    player.attack = ([x, y], boardAttacked) => {
        boardAttacked.receiveAttack([x, y]);
    };

    return player;
}

export { Computer, Player };
