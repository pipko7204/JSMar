
import {player1, player2, createPlayer} from './players.js'
import {generateLogs} from "./logs.js";
import {enemyAttack, playerAttack} from "./fight.js";
import {showResult} from "./AboutFight.js";


export const $arenas = document.querySelector('.arenas');
export const $formFight = document.querySelector('.control');



$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))

$formFight.addEventListener('submit', function (e) {
e.preventDefault();
    const enemy = enemyAttack()
    const player = playerAttack()




    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2.name, player1.name)
    } else {
        generateLogs('defence', player1.name, player2.name)
    }

    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1.name, player2.name)
    } else {
        generateLogs('defence', player2.name, player1.name)
    }

    showResult()
})

generateLogs('start', player1, player2)
