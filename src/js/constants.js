var FPS = 30;
var DALES_BIO = 'THE WARRIOR IS THE LOYAL SOLDIER, THE MAN THAT STANDS UP FOR WHAT IS RIGHT.' +
    'HE WARRIOR IS THE GUY THAT GETS THINGS DONE HIS OWN WAY. THE WARRIOR HAS NO TIME FOR CHILDISH GAMES, ' +
    'BUT HE DOESN\'T LET HIS PERSONAL LIFE GET IN THE WAY OF HIS MISSION. THE WARRIOR IS OFTEN A HERO IN THE ' +
    'MAKING ON THE VERGE OF DOING SOMETHING GREAT, A WARRIOR IS MISS UNDERSTOOD AT TIMES BUT HE ALWAYS PULLS THREW.'
var LEONS_BIO = 'The paladin calls upon his holy light to heal the wounds of himself and others.';
var TRIEST_BIO = 'The Warrior King was an Eternal Champion sword and sorcery character.';
var PLAYER_UP = 'player-up';
var PLAYER_DOWN = 'player-down';
var PLAYER_LEFT = 'player-left';
var PLAYER_RIGHT = 'player-right';
var MED = 'med';
var INITIAL_LIVES = 3;
var INITIAL_SCORE = 0;
var INITIAL_HEALTH = 1; //TODO:  change to 10
var INITIAL_WAVE = 1;
var ENEMY_WIDTH = 38;
var ENEMY_HEIGHT = 40;
var PLAYER_WIDTH = 38;
var PLAYER_HEIGHT = 53;
var PLAYER_START_X = 635;
var PLAYER_START_Y = 343.5;
var MED_WIDTH = 38;
var MED_HEIGHT = 53;
var MED_START_X = 300;
var MED_START_Y = 200;
var ZOMBIE_WAVE_SWARM_COEFFICIENT = [0.05, 0.08, 0.125];
var WAVE_COUNT = [50, 75, 125];
var CANVAS_WIDTH;
var CANVAS_HEIGHT;
var score = INITIAL_SCORE;
var health = INITIAL_HEALTH;
var lives = INITIAL_LIVES;
var currentWave = INITIAL_WAVE;
var strafeModeEnabled = false;
var shiftUp = true;
var refreshIntervalId;
var enemies = [];
var playerBullets = [];
var canvasElement;
var canvas;
var zombiesToCreate;
var zombiesToKill;
var zombieSwarmCoefficient = ZOMBIE_WAVE_SWARM_COEFFICIENT[0];
var player = {
    color: '#00A',
    x: PLAYER_START_X,
    y: PLAYER_START_Y,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    prevSpriteName: null,
    sprite: null,
    draw: function () {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    },
    setWidth: function (width) {
        this.width = width;
        return this;
    },
    setHeight: function (height) {
        this.height = height;
        return this;
    },
    setPreviousSpriteName: function (name) {
        this.prevSpriteName = name;
        return this;
    },
    setSprite: function (sprite) {
        this.sprite = sprite;
        return this;
    }
};

var med = {
    x: MED_START_X,
    y: MED_START_Y,
    width: MED_WIDTH,
    height: MED_HEIGHT,
    prevSpriteName: null,
    sprite: null,
    draw: function () {
        canvas.fillStyle = this.backgroundImage;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    },
    setWidth: function (width) {
        this.width = width;
        return this;
    },
    setHeight: function (height) {
        this.height = height;
        return this;
    },
    setPreviousSpriteName: function (name) {
        this.prevSpriteName = name;
        return this;
    },
    setSprite: function (sprite) {
        this.sprite = sprite;
        return this;
    }
};

var debug = function() {
    console.log('FPS: ' + FPS);
    console.log('INITIAL_LIVES: ' + INITIAL_LIVES);
    console.log('INITIAL_SCORE: ' + INITIAL_SCORE);
    console.log('INITIAL_HEALTH: ' + INITIAL_SCORE);
    console.log('CANVAS_WIDTH: ' + CANVAS_WIDTH);
    console.log('CANVAS_HEIGHT: ' + CANVAS_HEIGHT);
    console.log('score: ' + score);
    console.log('health: ' + health);
    console.log('lives: ' + lives);
    console.log('currentWave: ' + currentWave);
    console.log('refreshIntervalId:');
    console.log(refreshIntervalId);
    console.log(enemies);
    console.log(playerBullets);
    console.log('zombiesToCreate: ' + zombiesToCreate);
    console.log('zombiesToKill: ' + zombiesToKill);
    console.log('zombieSwarmCoefficient: ' + zombieSwarmCoefficient);
}
