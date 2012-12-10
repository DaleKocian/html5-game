var FPS = 30;
var DALES_BIO = 'Dale aka "THE WARRIOR" is the loyal soldier, the man that stands up for what is right. ' +
    'He is the guy that gets things done his own way. He has no time for childish games, ' +
    'and he doesn\'t let his personal life get in the way of his mission.';
var CREDITS = 'This game was brought to your by SADC<br/>Developers:<br/>Dale Kocian<br/>Triest Smart<br/>Leon Knights<div style="margin-top: 50px">Thank You For Playing</div>';
var LEONS_BIO = 'Hailing from UIW, and previously stationed at Fort Central Mkt, he welcomes any challenge.  He was recruited by leader of the revolution against Zombie Rebels, ' +
    'Cool Breeze, who refuses to accept anything less than victory.';
var TRIEST_BIO = 'Raised in a military family, Triest is well prepared to fight against' +
    ' the zombie infidels who have threatened the United States. He was recruited from Arkansas by Cool Breeze to assist in' +
    ' the offensive strike to rid the United States of these vile zombies.';
var PLAYER_UP = 'player-up';
var PLAYER_DOWN = 'player-down';
var PLAYER_LEFT = 'player-left';
var PLAYER_RIGHT = 'player-right';
var MED = 'med';
var MILLISECONDS_PER_SECOND = 1000;
var NUM_SECONDS_TO_SHOW_CREDITS = 42;
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
var WAVE_COUNT = [5, 10, 20];
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
var healthEnabled = false;
var player = {
    color:'#00A',
    x:PLAYER_START_X,
    y:PLAYER_START_Y,
    width:PLAYER_WIDTH,
    height:PLAYER_HEIGHT,
    prevSpriteName:null,
    sprite:null,
    draw:function () {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    },
    setWidth:function (width) {
        this.width = width;
        return this;
    },
    setHeight:function (height) {
        this.height = height;
        return this;
    },
    setPreviousSpriteName:function (name) {
        this.prevSpriteName = name;
        return this;
    },
    setSprite:function (sprite) {
        this.sprite = sprite;
        return this;
    }
};

var med = {
    x:(Math.floor(Math.random()*1200)),
    y: (Math.floor(Math.random()*600)),
    width: MED_WIDTH,
    height: MED_HEIGHT,
    prevSpriteName: null,
    sprite: null,
    draw: function () {
        canvas.fillStyle = this.backgroundImage;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    },
    setWidth:function (width) {
        this.width = width;
        return this;
    },
    setHeight:function (height) {
        this.height = height;
        return this;
    },
    setX:function (x) {
        this.x = x;
        return this;
    },
    setY:function (y) {
        this.y = y;
        return this;
    },
    setPreviousSpriteName:function (name) {
        this.prevSpriteName = name;
        return this;
    },
    setSprite:function (sprite) {
        this.sprite = sprite;
        return this;
    }
};

var debug = function () {
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
};
