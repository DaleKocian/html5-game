function startGame() {
    refreshIntervalId = setInterval(function () {
        update();
        draw();
    }, 1000 / FPS);
}
function pauseGame() {
    clearInterval(refreshIntervalId);
}

function resetGame() {
    clearInterval(refreshIntervalId);
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function updateScore() {
    $('#score span').text(++SCORE);
}
function reduceHealth() {
    if (HEALTH > 0) {
        $('#health span').text(--HEALTH);
    }
}
function setupVarsAndGameBar() {
    canvasElement = $('#canvasBg');
    canvas = canvasElement.get(0).getContext("2d");
    CANVAS_WIDTH = canvasElement.attr('width');
    CANVAS_HEIGHT = canvasElement.attr('height');
    $('#lives span').text(LIVES);
    $('#score span').text(SCORE);
    $('#health span').text(HEALTH);
}