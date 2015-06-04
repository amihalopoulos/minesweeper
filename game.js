function Game(size) {
  this.size = size
  this.board = placeBombs(this.size)
  this.objectBoard = this.splitBoardIntoRows()
}

Game.prototype.splitBoardIntoRows = function() {
  var nestArray = []
  var hashBoard = hashify(this.board)
  while (hashBoard.length > 0) {
    row = hashBoard.splice(0,Math.sqrt(this.size))
    nestArray.push(row)
  }
  return nestArray
}


var placeBombs = function(num) {
  var boardWithBombs = new Array(num).join('0').split('')
  for (var i = 0; i < Math.floor(num/3); i++) {
    var bombLocation = Math.floor((Math.random() * num))
      boardWithBombs[bombLocation] = "1"
  };
  return boardWithBombs.join('')
}

var hashify = function(board) {
  var containerArray = []
  for (var i = 0; i < board.length; i++) {
    if (board[i] === "1") {
      var cell = {status: "unclicked", bomb: true}
      containerArray.push(cell)
    } else {
      var cell = {status: "unclicked", bomb: false}
      containerArray.push(cell)
    }
  };
  return containerArray
}