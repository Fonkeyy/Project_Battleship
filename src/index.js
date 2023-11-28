import './CSS-files/global.css';
import './CSS-files/home.css';
import './CSS-files/main-content.css';

import { handleStartComputerBtn } from './JS-files/interfaceController';

document.title = 'Battleship';

// * Select DOM btns and store it in variables
const StartComputerBtn = document.querySelector('#start-computer-btn');
// // const StartGameBtn = document.querySelector('#start-game-btn');

// * Add events listener with handlers function.
StartComputerBtn.addEventListener('click', () => {
    handleStartComputerBtn();
});
// // StartGameBtn.addEventListener('click', () => {
// //     handleStartGameBtn();
// // });
