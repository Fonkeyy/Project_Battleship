const shipsData = [
    { name: 'patrolBoat', length: 2 },
    { name: 'destroyer', length: 3 },
    { name: 'submarine', length: 3 },
    { name: 'battleship', length: 4 },
    { name: 'carrier', length: 5 },
];

const getRandomCoords = () => {
    let x1 = Math.ceil(Math.random() * 9);
    let y1 = Math.ceil(Math.random() * 9);

    return [x1, y1];
};

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { shipsData, getRandomInteger, getRandomCoords };
