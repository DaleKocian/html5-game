function Bullet(enemy) {
    enemy.active = true;
    determineBulletDirection(enemy, player.prevSpriteName);
    enemy.width = 3;
    enemy.height = 3;
    enemy.color = '#FFD700';

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
                --zombiesToKill;
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
            if (health < 1) {
                if (lives < 1) {
                    resetGame();
                    $('#game').hide();
                    $('#gameOver').show();
                } else {
                    reduceLives();
                }
            }
            --zombiesToKill;
        }
    });

    if (collides(player, med)) {
        increaseHealth();
    }
}