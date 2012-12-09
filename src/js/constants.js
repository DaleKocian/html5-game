var FPS = 30;
var PLAYER_UP = "player-up";
var PLAYER_DOWN = "player-down";
var PLAYER_LEFT = "player-left";
var PLAYER_RIGHT = "player-right";
var SCORE = 0;
var HEALTH = 1;   //TODO:  change to 10
var LIVES = 3;
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
var currentWave = 1;
var WAVE_1_COUNT = 50;
var WAVE_2_COUNT = 75;
var WAVE_3_COUNT = 125;
var enemiesToCreate;
var player = {
    color:"#00A",
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