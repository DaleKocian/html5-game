function addStartScreenButtonListener() {
    $('#start-button').on('click', function () {
        saveGame();
        $(this).closest('#start-screen').hide('slow');
        $('#character-select-screen').show('slow');
    });
    $('#continue-button').on('click', function () {
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
        startGame()
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
        if (keydown.p) {
            var $el = $('#resume-pause');
            if ($el.text() === 'Resume') {
                resumeGame();
                $el.text('Pause');
            } else {
                pauseGame();
                $el.text('Resume');
            }
        }
    });
}