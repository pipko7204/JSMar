
import {getRandom, createElement} from "./utils";
import {HIT, ATTACK, LOGS} from "./constants";
import Player from "./Player";


const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');
const date = new Date()

const player1 = new Player({
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: "fighters/scorpion.gif",
    rootSelector: 'arenas',
})

const player2 = new Player({
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: "fighters/subzero.gif",
    rootSelector: 'arenas',
});

function playerWins(name) {
    const $loseTitle = createElement('div', 'loseTitle');


    if(name) {
        $loseTitle.innerText = name + ' wins';
    } else {
        $loseTitle.innerText ='draw';
    }

    return $loseTitle
}



function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $RestartButton = createElement('button', 'button');
    $RestartButton.innerText = 'Restart';
    $reloadWrap.appendChild($RestartButton);

    $reloadWrap.addEventListener('click', function () {
        window.location.reload()
    })

    return $reloadWrap;
}

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function playerAttack() {
    const attack = {};

    for (let item of $formFight){
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value])
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }

    return attack;
}

function showResult() {
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

function generateLogs(type, player1, player2) {
let text = ` `;
let el = ` `;

    switch (type) {
        case 'start':
            text = LOGS['start'].replace('[time]',`${date.getHours()}:${date.getMinutes()}` ).replace('[player1]', player1.name).replace('[player2]', player2.name)
            break
        case 'end':
            text = `${date.getHours()}:${date.getMinutes()} ${LOGS['end'][getRandom(3)].replace(`[playerWins]`, player1.name).replace(`[playerLose]`, player2.name)}`
            break
        case 'hit':
            text =`${date.getHours()}:${date.getMinutes()} ${LOGS['hit'][getRandom(17)].replace(`[playerDefence]`, player1.name).replace(`[playerKick]`, player2.name)}`
            break
        case 'defence':
            text = `${date.getHours()}:${date.getMinutes()} ${LOGS['defence'][getRandom(6)].replace(`[playerDefence]`, player1.name).replace(`[playerKick]`, player2.name)}`
            break
        case 'draw':
            text = `${date.getHours()}:${date.getMinutes()} ${LOGS['draw']}`
            break
    }
    el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);

}

$formFight.addEventListener('submit', function (e) {
e.preventDefault();
    const enemy = enemyAttack()
    const player = playerAttack()

    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1)
    } else {
        generateLogs('defence', player1, player2)
    }

    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2)
    } else {
        generateLogs('defence', player2, player1)
    }

    showResult()
})


const init = () => {
    player1.createPlayer()
    player2.createPlayer()
    generateLogs('start', player1, player2)
}

init()
