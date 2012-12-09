$(function () {
    if(isStorageExistingAndNotFirstLevel()) {
        addContinueButton();
    } else {
        saveGame();
    }
    addStartScreenButtonListener();
    addCharacterSelectListener();
    addPauseResumeButtonListener();
    addPauseResumeKeyListener();
    addPlayAgainListener();
    $('#charcterTable').find('img').on('hover', function () {
        $('.arrow').removeClass('arrow');
        $(this).parent().addClass('arrow');
        var id = $(this).prop('id');
        if (id === 'dale') {
            $('#playerInfo').text(DALES_BIO);
        } else if (id === 'triest') {
            $('#playerInfo').text(TRIEST_BIO);
        } else {
            $('#playerInfo').text(LEONS_BIO);
        }
    });
});
