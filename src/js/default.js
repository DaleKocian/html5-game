$(function() {
    canvasElement = $('#canvasBg');
    canvas = canvasElement.get(0).getContext("2d");
    CANVAS_WIDTH = canvasElement.attr('width');
    CANVAS_HEIGHT = canvasElement.attr('height');
    $('#start-button').on('click', function () {
        $(this).parent().hide("slow");
        $('#character-select-screen').show("slow");
    });
    $('#dale, #triest').on('click', function () {
        var id = $(this).prop('id');
        switch (id) {
            case 'dale':
                console.log('You selected Dale!');
                break;
            case 'triest':
                console.log('You selected Triest!');
                break;
        }
        $('#character-select-screen').hide('slow');
        $('#game').show('slow');
        startGame()
    });
});