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
    SCORE++;
    $('#score').text("Score: " + SCORE);
}
function reduceHealth() {
    if (HEALTH > 0) {
        HEALTH--;
    }
    $('#health').text("Health: " + HEALTH)
}