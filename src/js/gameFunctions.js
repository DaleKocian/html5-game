function startGame() {
    setupVarsAndGameBar();
    setZombiesToCreateAndKill();
    setZombieSwarmCoefficient();
    resumeGame();
}
function resumeGame() {
    refreshIntervalId = setInterval(function () {
        update();
        draw();
    }, 1000 / FPS);
}

function addContinueButton() {
    var continueButton = $('<div/>').prop('id', 'continue-button').text('Continue Game');
    $('#start-screen').append(continueButton);
}

function pauseGame() {
    clearInterval(refreshIntervalId);
}

function resetGame() {
    clearInterval(refreshIntervalId);
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemies = [];
}

function saveGame() {
    localStorage.lives = lives;
    localStorage.score = score;
    localStorage.wave = currentWave;
}

function setSavedGameSettings() {
    lives = localStorage.lives;
    score = localStorage.score;
    currentWave = localStorage.wave;
}

function isStorageExistingAndNotFirstLevel() {
    return localStorage.lives && localStorage.score && localStorage.wave && (Number(localStorage.wave) > 1);
}

function updateWave() {
    $('#wave').find('span').text(++currentWave);
}

function updateScore() {
    $('#score').find('span').text(++score);
}

function reduceHealth() {
    if (health > 0) {
        $('#health').find('span').text(--health);
    }
}

function increaseHealth() {
    $('#health').find('span').text(++health);
}

function getWaveCount() {
    return WAVE_COUNT[currentWave-1];
}

function setZombiesToCreateAndKill() {
    zombiesToCreate = zombiesToKill = getWaveCount();
}

function setupVarsAndGameBar() {
    canvasElement = $('#canvasBg');
    canvas = canvasElement.get(0).getContext('2d');
    CANVAS_WIDTH = canvasElement.attr('width');
    CANVAS_HEIGHT = canvasElement.attr('height');
    updateMenu();
}
function updateMenu() {
    $('#lives').find('span').text(lives);
    $('#score').find('span').text(score);
    $('#health').find('span').text(health);
    $('#wave').find('span').text(currentWave);
}
function setZombieSwarmCoefficient() {
    zombieSwarmCoefficient = ZOMBIE_WAVE_SWARM_COEFFICIENT[currentWave-1];
}

function update() {
    if (keydown.space) {
        player.shoot();
    }

    if (keydown.shift) {
        strafeModeEnabled = !!shiftUp;
    }

    if (keyup.shift) {
        shiftUp = !strafeModeEnabled;
    }

    if (keydown.left) {
        player.x -= 5;
        if (player.prevSpriteName !== PLAYER_LEFT && !strafeModeEnabled) {
            player.setSprite(Sprite(PLAYER_LEFT)).setWidth(53).setHeight(38).setPreviousSpriteName(PLAYER_LEFT);
        }
    } else if (keydown.right) {
        player.x += 5;
        if (player.prevSpriteName !== PLAYER_RIGHT && !strafeModeEnabled) {
            player.setSprite(Sprite(PLAYER_RIGHT)).setWidth(53).setHeight(38).setPreviousSpriteName(PLAYER_RIGHT);
        }
    } else if (keydown.up) {
        player.y -= 5;
        if (player.prevSpriteName !== PLAYER_UP && !strafeModeEnabled) {
            player.setSprite(Sprite(PLAYER_UP)).setWidth(38).setHeight(53).setPreviousSpriteName(PLAYER_UP);
        }
    } else if (keydown.down) {
        player.y += 5;
        if (player.prevSpriteName !== PLAYER_DOWN && !strafeModeEnabled) {
            player.setSprite(Sprite(PLAYER_DOWN)).setWidth(38).setHeight(53).setPreviousSpriteName(PLAYER_DOWN);
        }
    }

    player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);
    player.y = player.y.clamp(20, CANVAS_HEIGHT - player.height);

    playerBullets.forEach(function (bullet) {
        bullet.update();
    });

    playerBullets = playerBullets.filter(function (bullet) {
        return bullet.active;
    });

    enemies.forEach(function (enemy) {
        enemy.update();
    });

    enemies = enemies.filter(function (enemy) {
        return enemy.active;
    });

    handleCollisions();

    if (Math.random() < zombieSwarmCoefficient && zombiesToCreate > 0) {
        enemies.push(Enemy());
        --zombiesToCreate;
    }
    if (zombiesToKill < 1) {
        pauseGame();
        updateWave();
        setZombiesToCreateAndKill();
        setZombieSwarmCoefficient();
        saveGame();
        resumeGame();
    }
}

function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    player.draw();
    if (score > 2 && health < 5) {       //TODO: change condition values
        med.draw();
    }

    playerBullets.forEach(function (bullet) {
        bullet.draw();
    });

    enemies.forEach(function (enemy) {
        enemy.draw();
    });
}
