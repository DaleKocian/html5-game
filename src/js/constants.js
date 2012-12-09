var FPS = 30;
var PLAYER_UP = "player-up";
var PLAYER_DOWN = "player-down";
var PLAYER_LEFT = "player-left";
var PLAYER_RIGHT = "player-right";
var SCORE = 0;
var HEALTH = 10;
var STRAFE_MODE = false;
var SHIFT_UP = true;
var refreshIntervalId;
var enemies = [];
var playerBullets = [];
var canvasElement;
var canvas;
var CANVAS_WIDTH;
var CANVAS_HEIGHT;
var player = {
    color: "#00A",
    x: 635,
    y: 343.5,
    width: 38,
    height: 53,
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