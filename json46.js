'use strict';

// Pig Game 

// we can even add modifiable class name inside the query selector;
// we modify the content of the specified class

let state = 0;
let score0 = 0;
let score1 = 0;
let current0 = 0;
let current1 = 0;
let die;
let playing = true;

// function for setting the content of the score
function modifyContent(className, content) {
    document.querySelector(`.${className}`).textContent = `${content}`;
}

// function for toggle the player layout
function toggle(player) {
    let element = document.querySelector(`.${player}`);
    if (player == 'window-main-left') {
        element.classList.add('left-toggle');
        let ele = document.querySelector('.window-main-right');
        ele.classList.remove('right-toggle');
    }
    else {
        element.classList.add('right-toggle');
        let ele = document.querySelector('.window-main-left');
        ele.classList.remove('left-toggle');
    }
}

// function for hidding the dice
function hideDice() {
    let btnDice = document.querySelector('.btn-dice');
    let diceImge = document.querySelector('.dice');
    btnDice.classList.add('boxShadow');
    diceImge.classList.add('hidden');
}

// function for displaying the dice
function displayDice() {
    let btnDice = document.querySelector('.btn-dice');
    let diceImge = document.querySelector('.dice');
    btnDice.classList.remove('boxShadow');
    diceImge.classList.remove('hidden');
}

toggle('window-main-left');
// toggle('window-main-right');

document.querySelector('.btn-roll-dice').addEventListener('click', function () {
    if (playing) {

        // 1. Gennerating random number
        const dice = Math.ceil(6 * Math.random());
        die = dice;
        console.log(dice);

        // 2. Display dice
        let image = document.querySelector('.dice');
        image.src = `image/dice${dice}.png`;
        displayDice();

        // 3. Check for rolled 1: if true , switch player
        if (dice == 1) {
            if (state == 0) {
                // player0
                current0 = 0;
                modifyContent('current-score-left', current0);
                toggle('window-main-right');
                // we can use toggle method
                // element.classList.toggle('classname');
                // it used to toggle the class between the players;
                state = 1;
            }
            else if (state == 1) {
                // player1
                current1 = 0
                modifyContent('current-score-right', current1);
                toggle('window-main-left');
                state = 0;
            }
        }
        else {
            if (state == 0) {
                current0 += dice;
                modifyContent('current-score-left', current0);
            }
            else if (state == 1) {
                current1 += dice;
                modifyContent('current-score-right', current1);
            }
        }
    }
    // checked the above functionality is working fine
});

// hold button event listen
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (playing) {
        hideDice();
        if (state == 0 ) {
            score0 += current0;
            current0 = 0;
            modifyContent('current-score-left', 0);
            modifyContent('main-score-left', score0);
            toggle('window-main-right');
            state = 1;

        }
        else if (state == 1 ) {
            score1 += current1;
            current1 = 0;
            modifyContent('current-score-right', 0);
            modifyContent('main-score-right', score1);
            toggle('window-main-left');
            state = 0;
        }
        
        if(score0 >= 20){
            console.log('bug');
            document.querySelector('.window-main-left').classList.add('background');
            playing = false;
        }
        if(score1 >= 20){
            console.log('bug');
            document.querySelector('.window-main-right').classList.add('background');
            playing = false;
        }
    }
});

// new game button
document.querySelector('.btn-new-game').addEventListener('click', function () {
    state = 0;
    score0 = 0;
    score1 = 0;
    current0 = 0;
    current1 = 0;
    playing = true;
    toggle('window-main-left');
    hideDice();
    modifyContent('current-score-left', 0);
    modifyContent('current-score-right', 0);
    modifyContent('main-score-left', 0);
    modifyContent('main-score-right', 0);
    document.querySelector('.window-main-left').classList.remove('background');
    document.querySelector('.window-main-right').classList.remove('background');
});

// if found any bug check that it arises in the if statemnt  or not by adding an additional condititon with && die != 1