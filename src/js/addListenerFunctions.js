function addStartScreenButtonListener() {
    $('#start-button').on('click', function () {
        $('#titleScreenMusic').get(0).pause();
        saveGame();
        $(this).closest('#start-screen').hide('slow');
        $('#character-select-screen').show('slow');
    });
    $('#continue-button').on('click', function () {
        $('#titleScreenMusic').get(0).pause();
        setSavedGameSettings();
        $(this).closest('#start-screen').hide('slow');
        $('#game').show('slow');
        startGame()
    });
}
function addCharacterSelectListener() {
    $('#dale, #triest, #leon').on('click', function () {
        var id = $(this).prop('id');
        switch (id) {
            case 'dale':
                console.log('You selected Dale!');
                break;
            case 'triest':
                console.log('You selected Triest!');
                break;
            case 'leon':
                console.log('You selected Leon!');
                break;
        }
        $('#character-select-screen').hide('slow');
        $('#game').show('slow');
        startGame();
    });
}
function addCharacterHoverListener() {
    $('#characterTable').find('img').on('hover', function () {
        $('.arrow').removeClass('arrow');
        $(this).parent().addClass('arrow');
        var id = $(this).prop('id');
        if(id === 'dale') {
            $('#playerInfo').text(DALES_BIO);
        } else if(id === 'triest') {
            $('#playerInfo').text(TRIEST_BIO);
        } else {
            $('#playerInfo').text(LEONS_BIO);
        }
    });
}
function addPauseResumeButtonListener() {
    $('#resume-pause').toggle(function () {
        pauseGame();
        $(this).text('Resume');
    }, function () {
        resumeGame();
        $(this).text('Pause');
    });
}
function addPauseResumeKeyListener() {
    $('body').keypress(function () {
        if(keydown.p) {
            var $el = $('#resume-pause');
            if($el.text() === 'Resume') {
                resumeGame();
                $el.text('Pause');
            } else {
                pauseGame();
                $el.text('Resume');
            }
        }
    });
}
function addPlayAgainListener() {
    $('#play-again').on('click', function () {
        $(this).closest('#gameOver').hide('slow');
        $('#game').show('slow');
        //        score = INITIAL_SCORE;
        health = INITIAL_HEALTH;
        lives = INITIAL_LIVES;
        setZombiesToCreateAndKill();
        updateMenu();
        resumeGame();
        debug();
    });
}
