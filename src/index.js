import Player from './JS-files/player';

import './CSS-files/global.css';
import './CSS-files/board.css';
import { gameLoop } from './JS-files/gameLoop';

const human = Player('human');

const computer = Player('computer');

gameLoop(human, computer);
