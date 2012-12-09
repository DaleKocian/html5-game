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
    });
});
