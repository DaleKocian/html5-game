

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
                PLAYER_UP = 'dale-up';
                PLAYER_DOWN = 'dale-down';
                PLAYER_LEFT = 'dale-left';
                PLAYER_RIGHT = 'dale-right';
                player.setSprite(Sprite(PLAYER_UP));
                break;
            case 'triest':
                console.log('You selected Triest!');
                PLAYER_UP = 'triest-up';
                PLAYER_DOWN = 'triest-down';
                PLAYER_LEFT = 'triest-left';
                PLAYER_RIGHT = 'triest-right';
                player.setSprite(Sprite(PLAYER_UP));
                break;
            case 'leon':
                console.log('You selected Leon!');
                PLAYER_UP = 'leon-up';
                PLAYER_DOWN = 'leon-down';
                PLAYER_LEFT = 'leon-left';
                PLAYER_RIGHT = 'leon-right';
                player.setSprite(Sprite(PLAYER_UP));
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
        var $playerInfo = $('#playerInfo');
        if(id === 'dale') {
            $playerInfo.html('Name: Dale Kocian<br/>' +
                'CodeName: Cash<br/>' +
                'Years of Service: 2 <br/>' +
                'Story: ' + DALES_BIO);
        } else if(id === 'triest') {
            $playerInfo.html('Name: Triest Montel Smart<br/>' +
                'CodeName: Lil\' Trigga<br/>' +
                'Years of Service: 2 <br/>' +
                'Story: ' + TRIEST_BIO);
        } else {
            $playerInfo.html('Name: Leon Knights<br/>' +
                'CodeName: <br/>' +
                'Years of Service: 3 <br/>' +
                'Story: ' + LEONS_BIO);
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
