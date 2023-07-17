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

const getRandomInteger = (number) => {
    return Math.ceil(Math.random() * number);
};

export { shipsData, getRandomInteger, getRandomCoords };
