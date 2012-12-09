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
    addCharacterHoverListener();
    addLostLifeListener();
});
