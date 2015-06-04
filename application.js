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
              $(this).css("background-image", bombImage)
            } else {
              addClickClass(this)
              $(this).css("background-color", "#bbb")
            }
            break;
        case 3:
            addFlagClass(this)
            game.flag(this.id)
            $(this).css("background-image", flagImage)
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
var flagImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyD6AtiHqeH_sAfNNvTr1xq4xtTPOY7AYa2YD7C3gFtK9fLf1C')"

var bombImage = "url('http://image.shutterstock.com/display_pic_with_logo/1222298/134991800/stock-vector-comic-book-bomb-explosion-vector-illustration-134991800.jpg')"


