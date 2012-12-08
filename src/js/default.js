window.addEventListener('load', init, false);
var canvasBg = document.getElementById('canvasBg');
var cntxtBg = canvasBg.getContext('2d');


function init() {
    cntxtBg.fillStyle = '#505050';
    cntxtBg.fillRect(20, 100, 600, 600);
}