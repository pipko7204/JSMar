
const player1 = {
    name: 'Scorpion',
    hp: '60%',
    img: "fighters/scorpion.gif",
    weapon: ['121', '122'],
    attack: function () {
        console.log( this.name + 'Fight...' );
    }
}

const player2 = {
    name: 'Subzero',
    hp: '80%',
    img: "fighters/subzero.gif",
    weapon: ['121', '122'],
    attack: function () {
        console.log( this.name + 'Fight...' );
    }
}

function createPlayer(player, number) {
    const $root = document.querySelector('.root');
    const $player = document.createElement("div");
    $player.classList.add(`${number}`);
    $root.appendChild($player)
    console.log('###: $player', $player);

    const $progressBar = document.createElement('div');
    $progressBar.classList.add('progressBar');

    const $life= document.createElement('div');
    $life.classList.add('life');
    const $name= document.createElement('div');
    $name.classList.add('name');

    const $character = document.createElement('div');
    $character.classList.add('character')

    const $img = document.createElement('img')


    console.log($progressBar);
    console.log($character);

    $player.appendChild($progressBar);
    $player.appendChild($character);

    $progressBar.appendChild($life)
    $progressBar.appendChild($name)
    $character.appendChild($img)

    $life.style.width = player.hp
    $name.innerText = player.name
    $img.src = player['img']

}

createPlayer(player1, 'player1');
createPlayer(player2, 'player2');