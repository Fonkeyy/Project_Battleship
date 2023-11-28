class Player {
    constructor(name) {
        this.name = name;
        this.moves = [];
        this.hitList = [];
    }

    attack = ([x, y], boardAttacked) => {
        boardAttacked.receiveAttack([x, y]);
    };
}
class Computer extends Player {
    constructor() {
        super();
        this.name = 'computer';
    }

    randomMove = () => {
        const x = Math.ceil(Math.random() * 9);
        const y = Math.ceil(Math.random() * 9);

        return [x, y];
    };

    randomAttack = (opponentBoard) => {
        const findAvailableMove = () => {
            const coord = this.randomMove();
            const x = coord[0];
            const y = coord[1];

            let isCoordAvailable = !this.moves.some((move) => move[0] === x && move[1] === y);
            return { coord, isCoordAvailable };
        };

        let { coord, isCoordAvailable } = findAvailableMove();

        while (!isCoordAvailable) {
            ({ coord, isCoordAvailable } = findAvailableMove());
        }

        opponentBoard.receiveAttack(coord);
        this.moves.push(coord);

        return coord;
    };
}

export { Computer, Player };
