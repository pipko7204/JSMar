
const player1 = {
    name: 'Scorpion',
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ['121', '122'],
    attack: function () {
        console.log( this.name + 'Fight...' );
    }
}

const player2 = {
    name: 'Kitana',
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
    weapon: ['121', '122'],
    attack: function () {
        console.log( this.name + 'Fight...' );
    }
}

function createPlayer(player, name, hp) {
    const $player = document.createElement("div");
    $player.classList.add(`player`);

    const $progressBar = document.createElement('div').classList.add('progressBar');
    const $character = document.createElement('div').classList.add('character');

    console.log('###: C', C);
    
    $player.appendChild($progressBar);
    $player.appendChild($character);


}

createPlayer('player1', 'SCORPION', 50);
createPlayer('player2', 'SUB-ZERO', 80);