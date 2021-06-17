import {player1, player2} from "./players.js";
import {generateLogs} from "./logs.js";
import {$formFight} from "./main.js";
import {createElement} from "./utils.js";
import {$arenas} from "./main.js";

export function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        for (let item of $formFight){
            item.disabled = true;
        }
        $arenas.appendChild(createReloadButton())
    }

    if(player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name))
        generateLogs('end', player2, player1)
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name))
        generateLogs('end', player1, player2)
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins())
        generateLogs('draw')
    }
}

export function playerWins(name) {
    const $loseTitle = createElement('div', 'loseTitle');


    if(name) {
        $loseTitle.innerText = name + ' wins';
    } else {
        $loseTitle.innerText ='draw';
    }

    return $loseTitle
}


export function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $RestartButton = createElement('button', 'button');
    $RestartButton.innerText = 'Restart';
    $reloadWrap.appendChild($RestartButton);

    $reloadWrap.addEventListener('click', function () {
        window.location.reload()
    })

    return $reloadWrap;
}