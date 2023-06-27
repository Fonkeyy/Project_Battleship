import createShip from './shipsFactory';

export default function CreateGameBoard() {
    const gameBoard = {};

    gameBoard.createBoard = () => {
        let board = [];

        for (let i = 0; i < 10; i++) {
            board[i] = new Array(10).fill(false);
        }
        return board;
    };

    gameBoard.createMatrix = () => {
        let matrix = [];

        for (let i = 0; i < 10; i++) {
            matrix[i] = new Array(10).fill(false);
        }
        return matrix;
    };

    gameBoard.shipLength = ([coordX1, coordY1], [coordX2, coordY2]) => {
        let length = 0;
        if (coordX1 == coordX2) {
            length = coordY2 - coordY1 + 1;
        } else {
            length = coordX2 - coordX1 + 1;
        }
        return length;
    };

    gameBoard.board = gameBoard.createBoard();
    gameBoard.matrix = gameBoard.createMatrix();
    gameBoard.shipsList = [];
    gameBoard.sunkList = [];

    gameBoard.placeShip = ([coordX1, coordY1], [coordX2, coordY2]) => {
        const length = gameBoard.shipLength([coordX1, coordY1], [coordX2, coordY2]);
        const ship = createShip(length);

        if (coordY1 == coordY2) {
            gameBoard.board[coordY1 - 1][coordX1 - 1] = true;
            // ship.coord.push([coordX1 - 1, coordY1 - 1]);
            for (let i = 0; i < length; i++) {
                gameBoard.board[coordY1 - 1][coordX1 - 1 + i] = true;
                ship.coord.push([coordX1 - 1 + i, coordY1 - 1]);
            }
        } else {
            gameBoard.board[coordY1 - 1][coordX1 - 1] = true;
            for (let i = 0; i < length; i++) {
                gameBoard.board[coordY1 - 1 + i][coordX1 - 1] = true;
                ship.coord.push([coordX1 - 1, coordY1 - 1 + i]);
            }
        }
        gameBoard.shipsList.push(ship);
    };

    gameBoard.isOccupied = ([coordX1, coordY1]) => {
        return gameBoard.board[coordY1 - 1][coordX1 - 1] === true;
    };

    gameBoard.receiveAttack = ([coordX, coordY]) => {
        if (gameBoard.board[coordY - 1][coordX - 1] === true) {
            const ship = gameBoard.shipsList.find((ship) => {
                return ship.coord.some(([x, y]) => x === coordX - 1 && y === coordY - 1);
            });
            ship.hit();
            if (ship.isSunk()) {
                gameBoard.sunkList.push(ship);
                gameBoard.checkWinner();
            }
        } else {
            if (!gameBoard.matrix[coordY - 1][coordX - 1]) {
                gameBoard.matrix[coordY - 1][coordX - 1] = true;
            }
        }
    };

    gameBoard.checkWinner = () => {
        return gameBoard.shipsList.length === gameBoard.sunkList.length ? true : false;
    };

    return gameBoard;
}

// const correspondences =  {
//     a: 1,
//     b: 2,
//     c: 3,
//     d:4,
//     e:5,
//     f:6,
//     g:7,
//     h:8,
//     i:9,
//     j:10,
// };
