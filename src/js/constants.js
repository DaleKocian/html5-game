var FPS = 30;
var PLAYER_UP = "player-up";
var PLAYER_DOWN = "player-down";
var PLAYER_LEFT = "player-left";
var PLAYER_RIGHT = "player-right";
var MED = "med";
var INTITIAL_LIVES = 3;
var INTITIAL_SCORE = 0;
var INTITIAL_HEALTH = 1;
var INTITIAL_WAVE = 1;
var score = INTITIAL_SCORE;
var health = INTITIAL_HEALTH;   //TODO:  change to 10
var lives = INTITIAL_LIVES;
var currentWave = INTITIAL_WAVE;
var strafeModeEnabled = false;
var shiftUp = true;
var refreshIntervalId;
var enemies = [];
var playerBullets = [];
var canvasElement;
var canvas;
var CANVAS_WIDTH;
var CANVAS_HEIGHT;
var ENEMY_WIDTH = 32;
var ENEMY_HEIGHT = 75;
var PLAYER_WIDTH = 38;
var PLAYER_HEIGHT = 53;
var PLAYER_START_X = 635;
var PLAYER_START_Y = 343.5;
var WAVE_1_COUNT = 1;
var WAVE_2_COUNT = 75;
var WAVE_3_COUNT = 125;
var enemiesToCreate;
var player = {
    color: "#00A",
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
    x: 300,
    y: 200,
    width: 38,
    height: 53,
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