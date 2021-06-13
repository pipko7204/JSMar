
const $arenas = document.querySelector('.arenas');
//const $randomButton = document.querySelector('.button')

const $formFight = document.querySelector('.control')

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: "fighters/scorpion.gif",
    weapon: ['121', '122'],
    attack: function () {
        console.log( this.name + 'Fight...' );
    },
    changeHP,
    elHP,
    renderHP,
}

const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: "fighters/subzero.gif",
    weapon: ['121', '122'],
    attack: function () {
        console.log( this.name + 'Fight...' );
    },
    changeHP,
    elHP,
    renderHP,
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className)
    }


    return $tag;
}

function createPlayer(playerObj) {

    const $player = createElement('div', 'player' + playerObj.player)
    const $progressbar = createElement('div', 'progressbar')
    const $character = createElement('div', 'character')
    const $life = createElement('div', 'life')
    const $name = createElement('div', 'name')
    const $img = createElement('img')

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.append($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player
}

function changeHP(HP) {
    this.hp -= getRandom(HP)

    if (this.hp <= 0) {
        this.hp = 0
    }
}

function elHP() {
    return document.querySelector('.player'+this.player + ' .life');
}

function renderHP() {
    const playerLife = this.elHP()
    playerLife.style.width = this.hp + '%';
}

function playerWins(name) {
    const $loseTitle = createElement('div', 'loseTitle');


    if(name) {
        $loseTitle.innerText = name + ' wins';
    } else {
        $loseTitle.innerText ='draw';
    }

    return $loseTitle
}

function getRandom(num) {
    return Math.ceil(Math.random() * num)
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

/*
$randomButton.addEventListener('click', function () {
    console.log('###: click Random');

    player1.changeHP(getRandom(20));
    player2.changeHP(getRandom(20));

    player1.renderHP()
    player2.renderHP()

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        $arenas.appendChild(createReloadButton())
    }

    if(player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name))
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name))
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins())
    }


})
*/

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))

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
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name))
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins())
    }
}



$formFight.addEventListener('submit', function (e) {
e.preventDefault();
    const enemy = enemyAttack()
    const player = playerAttack()

    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
    }

    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        player2.renderHP();
    }

    showResult()
})
