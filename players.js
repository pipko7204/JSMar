import {getRandom} from './utils.js'
import {createElement} from "./utils.js";

export const player1 = {
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

export const player2 = {
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
export function changeHP(HP) {
    this.hp -= getRandom(HP)

    if (this.hp <= 0) {
        this.hp = 0
    }
}

export function elHP() {
    return document.querySelector('.player'+this.player + ' .life');
}

export function renderHP() {
    const playerLife = this.elHP()
    playerLife.style.width = this.hp + '%';
}

export function createPlayer(playerObj) {

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