$(document).ready(function() {
  game = new Game(81);
  $('#container').html(game.render())

  $('body').on('mousedown', '.cell', function(event) {
    switch (event.which) {
      case 1:
        // press(this)
        game.click(this.id)
        $('#container').html(game.render())
        break;
      case 3:
        game.flag(this.id)
        $('#container').html(game.render())
        break;
    }
  });
});

var press = function(pressed) {
  if (game.objectBoard[pressed.id[0]][pressed.id[1]]["bomb"]){
    $(pressed).css("background-image", bombImage)
    alert("KABBOOOYYYYYAAAAA")
    location.reload();
  }
  else if (game.getSurroundingBombCount(pressed.id) == 0){
    addClickClass(pressed)
    var neighbors = game.getNeighbors(pressed.id)
    for (var i = 0; i < neighbors.length; i++) {
      var n = neighbors[i].join('')
      console.log(n)
      press(document.getElementById(n))
    };
  }
  else {
    addClickClass(pressed)
  }
}

var addBombClass = function(cell) {
  $(cell).removeClass("unclicked flagged")
  $(cell).addClass("bomb")
}

var addClickClass = function(cell) {
  $(cell).removeClass("unclicked flagged")
  $(cell).addClass("clicked")
  $(cell).css("background-color", "#bbb")
  $(cell).html(game.getSurroundingBombCount(cell.id))
}

var addFlagClass = function(cell){
  if ($(cell).hasClass('unclicked')) {
    $(cell).addClass("flagged")
  }
}
var flagImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyD6AtiHqeH_sAfNNvTr1xq4xtTPOY7AYa2YD7C3gFtK9fLf1C')"

var bombImage = "url('http://image.shutterstock.com/display_pic_with_logo/1222298/134991800/stock-vector-comic-book-bomb-explosion-vector-illustration-134991800.jpg')"


