$(document).ready(function() {
  game = new Game(81);
  $('#container').html(game.render())

  $('body').on('mousedown', '.cell', function(event) {
    switch (event.which) {
      case 1:
        game.click(this.id)
        break;
      case 3:
        game.flag(this.id)
        break;
    }
    if (game.checkForWin()){
      alert("YOU WIN!")
    }
    $('#container').html(game.render())
  });
});
