$(document).ready(function() {
  $('#beginner').on('click', function(event){
    game = new Game(9,9);
    restart()
  })
  $('#intermediate').on('click', function(event){
    game = new Game(16,16);
    restart()
  })
  $('#expert').on('click', function(event){
    game = new Game(30,16);
    restart()
  })

  $('body').on('mousedown', '.cell', function(event) {
    switch (event.which) {
      case 1:
        game.click(this.id.split(' '))
        break;
      case 3:
        game.flag(this.id.split(' '))
        break;
    }
    if (game.checkForWin()){
      alert("YOU WIN! Time: " + $('#clock').text())
    }

    $('#container').html(game.render())
  });


  $('#refresh').click(function(event){
    game.newGame()
    $('#container').html(game.render())
    reset()
  })

});

// var clock = function(){
  var sec = 0;
  function pad ( val ) { return val > 9 ? val : "0" + val; }
  function reset () { sec = 0 }
  $('.button').on("click", setInterval(function(){
      $("#seconds").html(pad(++sec%60));
      $("#minutes").html(pad(parseInt(sec/60,10)));
  }, 1000));


// }

var restart = function(){
  $('#container').html(game.render())
  reset()
}