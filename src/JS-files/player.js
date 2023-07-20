function Computer() {
    const computer = {};
    computer.name = 'computer';
    computer.moves = [];
    computer.hitList = [];

    computer.attack = ([x, y], boardAttacked) => {
        boardAttacked.receiveAttack([x, y]);
        console.log('attack', [x, y]);
    };

    computer.randomMove = () => {
        const x = Math.ceil(Math.random() * 9);
        const y = Math.ceil(Math.random() * 9);

        return [x, y];
    };

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

        console.log('random', coord);

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
