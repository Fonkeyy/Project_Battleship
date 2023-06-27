import Player from './JS-files/player';

import './CSS-files/global.css';
import './CSS-files/board.css';
import { computerGameBoard, gameLoop, playerGameBoard, setUpInterface } from './JS-files/gameLoop';

const human = Player('human');

const computer = Player('computer');

setUpInterface();
gameLoop(human, computer, playerGameBoard, computerGameBoard);
