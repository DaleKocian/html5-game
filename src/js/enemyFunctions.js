function setEnemyStartingPoint(enemy) {
    var r = Math.floor(Math.random() * 4) + 1;
    enemy.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
    enemy.y = CANVAS_HEIGHT / 4 + Math.random() * CANVAS_HEIGHT / 2;
    switch (r) {
        case 1:
            enemy.y = 0;
            enemy.sprite = Sprite('enemy');
            break;
        case 2:
            enemy.x = 0;
            enemy.sprite = Sprite('enemy-right');
            break;
        case 3:
            enemy.x = CANVAS_WIDTH;
            enemy.sprite = Sprite('enemy-left');
            break;
        default:
            enemy.y = CANVAS_HEIGHT;
            enemy.sprite = Sprite('enemy-up');
            break
    }
    return enemy;
}

function Enemy(enemy) {
    enemy = enemy || {};

    enemy.active = true;
    enemy.age = Math.floor(Math.random() * 128);

    enemy.color = '#A2B';

    setEnemyStartingPoint(enemy);

    enemy.xVelocity = 0;
    enemy.yVelocity = 2;

    enemy.width = ENEMY_WIDTH;
    enemy.height = ENEMY_HEIGHT;

    enemy.inBounds = function () {
        return enemy.x >= 0 && enemy.x <= CANVAS_WIDTH &&
            enemy.y >= 0 && enemy.y <= CANVAS_HEIGHT;
    };
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
        Sound.play('explosion');

        this.active = false;
        // Extra Credit: Add an explosion graphic
    };

    return enemy;
}