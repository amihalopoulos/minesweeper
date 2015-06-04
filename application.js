$(document).ready(function() {
  game = new Game(9);
  console.log(game.board)
  console.log(game.objectBoard)
  $('#container').html(game.render())
})