$(function () {
    if (localStorage.wave && Number(localStorage.wave) > 1) {
        var continueButton = $('<div/>').prop('id', 'continue-button').text('Continue Game');
        $('#start-screen').append(continueButton);
    } else {
        localStorage.lives = lives;
        localStorage.score = score;
        localStorage.wave = currentWave;
    }
    $('#start-button').on('click', function () {
        $(this).parent().hide("slow");
        $('#character-select-screen').show("slow");
        setupVarsAndGameBar();
    });
    $('#continue-button').on('click', function () {
        lives = localStorage.lives;
        score = localStorage.score;
        currentWave = localStorage.wave;
        $(this).parent().hide("slow");
        $('#game').show("slow");
        setupVarsAndGameBar();
        setZombiesToKill();
        startGame();
    });

    $('#dale, #triest').on('click', function () {
        var id = $(this).prop('id');
        switch (id) {
            case 'dale':
                console.log('You selected Dale!');
                break;
            case 'triest':
                console.log('You selected Triest!');
                break;
        }
        $('#character-select-screen').hide('slow');
        $('#game').show('slow');
        setZombiesToKill();
        startGame();
    });
    $('#resume-pause').toggle(function () {
        pauseGame();
        $(this).text('Resume');
    }, function () {
        startGame();
        $(this).text('Pause');
    });
    $('body').keypress(function () {
        if (keydown.p) {
            var $el = $('#resume-pause');
            if ($el.text() === 'Resume') {
                startGame();
                $el.text('Pause');
            } else {
                pauseGame();
                $el.text('Resume');
            }
        }
    });
});