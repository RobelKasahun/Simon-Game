let machineClickedButtons = [];
let playerClickedButtons = [];
let gameLevel = 1;
let result;
let intervalId;
let playerButtonClicksCounter = 0;

// start the game when the power button clicked
$('.fa-power-off').on('click', function () {
    $('.heading').text(`Level ${gameLevel}`);

    // allow the machine to randomly click buttons
    intervalId = setInterval(function () {
        // select random Simon box
        let randomNumber = Math.floor(Math.random() * 4) + 1;
        let className = `.button${randomNumber}`;

        // add the randomly clicked button to an array
        machineClickedButtons.push(className);

        // apply transform and opacity on randomly clicked button
        $(className).css('transform', `scale(${1.2})`).css('opacity', 1);

        // play sound when randomly button clicked
        playSound(className);

        // wait for 800 milliseconds and apply transform and opacity on the randomly clicked button
        setTimeout(function () {
            $(className).css('transform', `scale(${1})`).css('opacity', 0.3);
        }, 800);

    }, 5000);

    $('.btn').on('click', function () {
        let playerButtonClassName = `.${this.classList[1]}`;
        // push the clicked button in the array
        playerClickedButtons.push(playerButtonClassName);
        // play sound when button clicked
        playSound(playerButtonClassName);

        ++playerButtonClicksCounter;

        // if the length of buttons clicked by player and machine is the same
        // playerClickedButtons.length === machineClickedButtons.length
        if ((playerClickedButtons.length === machineClickedButtons.length)) {
            // check for equality
            result = (playerClickedButtons.toString() === machineClickedButtons.toString());
            // check the answer
            checkAnswer(result);
        } else {
            // checkAnswer(false);
        }
    });
});

function checkAnswer(result) {
    if (result) {
        ++gameLevel;
        $('.heading').text(`Level ${gameLevel}`);
        playerClickedButtons = [];
        playerButtonClicksCounter = 0;
    } else {
        $('.heading').text(`🤣 You lost baby!!! 🤣`);
        playSound('game-over-baby');
        clearInterval(intervalId);

        $('#refresh').css('visibility', 'visible');
        $('.fa-power-off').css('visibility', 'hidden');

        $('#refresh').on('click', function () {
            location.reload(); // refresh the window
            $('#refresh').css('visibility', 'hidden');
            $('.fa-power-off').css('visibility', 'visible');
        });
        machineClickedButtons = [];
        playerClickedButtons = [];
        playerButtonClicksCounter = 0;
    }
}


function playSound(className) {
    let sound = undefined;
    switch (className) {
        case '.button1':
            sound = new Audio('./sounds/green.mp3');
            sound.play();
            break;

        case '.button2':
            sound = new Audio('./sounds/red.mp3');
            sound.play();
            break;

        case '.button3':
            sound = new Audio('./sounds/yellow.mp3');
            sound.play();
            break;

        case '.button4':
            sound = new Audio('./sounds/blue.mp3');
            sound.play();
            break;

        case 'game-over-baby':
            sound = new Audio('./sounds/deez-nuts.mp3');
            sound.play();
            break;
    }
}