function startGame() {
    setWave();
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

function Bullet(enemy) {
    enemy.active = true;
    determineBulletDirection(enemy, player.prevSpriteName);
    enemy.width = 3;
    enemy.height = 3;
    enemy.color = "#000";

    enemy.inBounds = function () {
        return enemy.x >= 0 && enemy.x <= CANVAS_WIDTH &&
            enemy.y >= 0 && enemy.y <= CANVAS_HEIGHT;
    };

    enemy.draw = function () {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    };

    enemy.update = function () {
        enemy.x += enemy.xVelocity;
        enemy.y += enemy.yVelocity;

        enemy.active = enemy.active && enemy.inBounds();
    };

    enemy.explode = function () {
        this.active = false;
        // Extra Credit: Add an explosion graphic
    };

    return enemy;
}

function determineBulletDirection(enemy, playerPosition) {
    if (playerPosition == PLAYER_UP) {
        enemy.xVelocity = 0;
        enemy.yVelocity = -enemy.speed;
    } else if (playerPosition == PLAYER_DOWN) {
        enemy.xVelocity = 0;
        enemy.yVelocity = enemy.speed;
    } else if (playerPosition == PLAYER_LEFT) {
        enemy.xVelocity = -enemy.speed;
        enemy.yVelocity = 0;
    } else if (playerPosition == PLAYER_RIGHT) {
        enemy.xVelocity = enemy.speed;
        enemy.yVelocity = 0;
    }
}

function setEnemyStartingPoint(enemy) {
    var r = Math.floor(Math.random() * 4) + 1;
    enemy.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
    enemy.y = CANVAS_HEIGHT / 4 + Math.random() * CANVAS_HEIGHT / 2;
    switch (r) {
        case 1:
            enemy.y = 0;
            break;
        case 2:
            enemy.x = 0;
            break;
        case 3:
            enemy.x = CANVAS_WIDTH;
            break;
        default:
            enemy.y = CANVAS_HEIGHT;
            break
    }
    return enemy;
}

function Enemy(enemy) {
    enemy = enemy || {};

    enemy.active = true;
    enemy.age = Math.floor(Math.random() * 128);

    enemy.color = "#A2B";

    setEnemyStartingPoint(enemy);

    enemy.xVelocity = 0;
    enemy.yVelocity = 2;

    enemy.width = 32;
    enemy.height = 75;

    enemy.inBounds = function () {
        return enemy.x >= 0 && enemy.x <= CANVAS_WIDTH &&
            enemy.y >= 0 && enemy.y <= CANVAS_HEIGHT;
    };

    enemy.sprite = Sprite("enemy");

    enemy.draw = function () {
        this.sprite.draw(canvas, this.x, this.y);
    };

    enemy.update = function () {
        if (enemy.x > player.x) {
            --enemy.x;
        } else if (enemy.x < player.x) {
            ++enemy.x;
        }
        if (enemy.y > player.y) {
            --enemy.y;
        } else if (enemy.y < player.y) {
            ++enemy.y;
        }

        enemy.xVelocity = 3 * Math.sin(enemy.age * Math.PI / 64);

        enemy.age++;

        enemy.active = enemy.active && enemy.inBounds();
    };

    enemy.explode = function () {
        Sound.play("explosion");

        this.active = false;
        // Extra Credit: Add an explosion graphic
    };

    return enemy;
}

function update() {
    if (keydown.space) {
        player.shoot();
    }

    if (keydown.shift) {
        STRAFE_MODE = !!SHIFT_UP;
    }

    if (keyup.shift) {
        SHIFT_UP = !STRAFE_MODE;
    }

    if (keydown.left) {
        player.x -= 5;
        if (player.prevSpriteName !== PLAYER_LEFT && !STRAFE_MODE) {
            player.setSprite(Sprite(PLAYER_LEFT)).setWidth(53).setHeight(38).setPreviousSpriteName(PLAYER_LEFT);
        }
    }

    if (keydown.right) {
        player.x += 5;
        if (player.prevSpriteName !== PLAYER_RIGHT && !STRAFE_MODE) {
            player.setSprite(Sprite(PLAYER_RIGHT)).setWidth(53).setHeight(38).setPreviousSpriteName(PLAYER_RIGHT);
        }
    }

    if (keydown.up) {
        player.y -= 5;
        if (player.prevSpriteName !== PLAYER_UP && !STRAFE_MODE) {
            player.setSprite(Sprite(PLAYER_UP)).setWidth(38).setHeight(53).setPreviousSpriteName(PLAYER_UP);
        }
    }

    if (keydown.down) {
        player.y += 5;
        if (player.prevSpriteName !== PLAYER_DOWN && !STRAFE_MODE) {
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

    if (Math.random() < 0.05) {
        enemies.push(Enemy());
    }
}

function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    player.draw();

    playerBullets.forEach(function (bullet) {
        bullet.draw();
    });

    enemies.forEach(function (enemy) {
        enemy.draw();
    });
}

function collides(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function handleCollisions() {
    playerBullets.forEach(function (bullet) {
        enemies.forEach(function (enemy) {
            if (collides(bullet, enemy)) {
                enemy.explode();
                bullet.active = false;
                updateScore();
            }
        });
    });

    enemies.forEach(function (enemy) {
        if (collides(enemy, player)) {
            enemy.explode();
            player.explode();
            reduceHealth();
            <!--end the game at 0 lives and show game over screen-->
            if (HEALTH == 0) {
                resetGame();
                $('#character-select-screen').hide();
                $('#game').hide();
                $('#gameOver').show();
            }
        }
    });
}