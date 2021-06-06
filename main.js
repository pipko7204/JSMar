
const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button')

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: "fighters/scorpion.gif",
    weapon: ['121', '122'],
    attack: function () {
        console.log( this.name + 'Fight...' );
    }
}

const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: "fighters/subzero.gif",
    weapon: ['121', '122'],
    attack: function () {
        console.log( this.name + 'Fight...' );
    }
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

function changeHP(player) {
    const $playerLife = document.querySelector('.player'+player.player + ' .life');
    player.hp -= Math.ceil(Math.random()* 20 );
    $playerLife.style.width = player.hp + '%';
    console.log('###: player.hp', player.hp);
    if (player.hp < 0) {
        if (player == player1) {
            $arenas.appendChild(playerWin(player2.name))
        } else if (player == player2) {
            $arenas.appendChild(playerWin(player1.name))
        }

        player.hp = 0
        $playerLife.style.width = '0%'

        $randomButton.disabled = true;
    }
    console.log('###: player.hp', player.hp);
}

function playerWin(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' win';

    return $loseTitle
}

$randomButton.addEventListener('click', function () {
    console.log('###: click Random');

    changeHP(player1);
    changeHP(player2);


})

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))
