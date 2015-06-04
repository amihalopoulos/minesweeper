$(document).ready(function() {
  game = new Game(9);
  // console.log(game.objectBoard)
  $('#container').html(game.render())
  $('.cell').click(function(){

  })

  $('.cell').mousedown(function(event) {
    switch (event.which) {
        case 1:
            if (game.click(this.id)){
              alert("its a bomb!")
            } else {
              addClickClass(this)
            }
            // $('#container').html(game.render())
            break;
        case 3:
            addFlagClass(this)
            game.flag(this.id)
            // $('#container').html(game.render())
            break;
    }
});
})

var addBombClass = function(cell) {
  $(cell).removeClass("unclicked flagged")
  $(cell).addClass("bomb")
}

var addClickClass = function(cell) {
  $(cell).removeClass("unclicked flagged")
  $(cell).addClass("clicked")
}

var addFlagClass = function(cell){
  if ($(cell).hasClass('unclicked')) {
    $(cell).addClass("flagged")
  }
}