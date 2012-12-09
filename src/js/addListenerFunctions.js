function addStartScreenButtonListener() {
    $('#start-button').on('click', function () {
        $(this).closest('#start-screen').hide('slow');
        $('#character-select-screen').show('slow');
        setupVarsAndGameBar();
    });
    $('#continue-button').on('click', function () {
        saveGame();
        setSavedGameSettings();
        $(this).closest('#start-screen').hide('slow');
        $('#game').show('slow');
        setupVarsAndGameBar();
        setZombiesToCreateAndKill();
        startGame();
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
        setZombiesToCreateAndKill();
        startGame();
    });
}
function addPauseResumeButtonListener() {
    $('#resume-pause').toggle(function () {
        pauseGame();
        $(this).text('Resume');
    }, function () {
        startGame();
        $(this).text('Pause');
    });
}
function addPauseResumeKeyListener() {
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
}