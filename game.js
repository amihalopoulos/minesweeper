function Game(size) {
  this.size = size
  this.gameOver = false
  this.board = placeBombs(this.size)
  this.objectBoard = this.splitBoardIntoRows()
}
Game.prototype = {
  constructor: Game,
  render: function() {
    var string = "<table id='board'>"
    if (this.gameOver === false) {
      for (var x=0; x<this.objectBoard.length; x++){
        string += "<tr class='row'>"
        for (var y=0; y<this.objectBoard[x].length;y++){
          string += "<td class='cell "
          if (this.objectBoard[x][y]["status"] === "unclicked"){
            string += "unclicked' id ='" + x + '' + y + "'>"
          } else if (this.objectBoard[x][y]["status"] === "clicked") {
            string += "clicked' id ='" + x + '' + y + "'>" + this.getSurroundingBombCount([x,y])
          } else if (this.objectBoard[x][y]["status"] === "flagged"){
            string += "flagged' id ='" + x + '' + y + "'>"
          }
          string += "</td>"
        };
        string += "</tr>"
      };
    } else {
      for (var x=0; x<this.objectBoard.length; x++){
        string += "<tr class='row'>"
        for (var y=0; y<this.objectBoard[x].length;y++){
          string += "<td class='cell "
          if (this.objectBoard[x][y]["bomb"]){
            string += "bomb' id ='" + x + '' + y + "'>"
          } else if (this.objectBoard[x][y]["status"] === "clicked" || this.objectBoard[x][y]["status"] === "unclicked") {
            string += "clicked' id ='" + x + '' + y + "'>" + this.getSurroundingBombCount([x,y])
          } else if (this.objectBoard[x][y]["status"] === "flagged"){
            string += "flagged' id ='" + x + '' + y + "'>"
          }
          string += "</td>"
        };
        string += "</tr>"
      };
    };
    string += "</table>"
    return string
  },
  click: function(cell) {
    x = cell[0]
    y = cell[1]
    var self = this
    this.objectBoard[x][y]["status"] = "clicked"
    if (this.objectBoard[x][y]["bomb"]) {
      this.gameOver = true
      //show all bombs, alert, refresh
    } else if (self.getSurroundingBombCount(cell) === 0){
      console.log(this.getNeighbors(cell))
      this.getNeighbors(cell).forEach(function(n) {self.click(n)})
    };
  },
  flag: function(cell) {
    x = cell[0]
    y = cell[1]
    this.objectBoard[x][y]["status"] = "flagged"
  },
  getSurroundingBombCount: function(cell) {
    var board = this.objectBoard
    var x = parseInt(cell[0])
    var y = parseInt(cell[1])
    var count = 0
    if (this.inBounds(x+1, y) && board[x+1][y]["bomb"]) {
      count+=1
    }
    if (this.inBounds(x+1, y-1) && board[x+1][y-1]["bomb"]) {
      count+=1
    }
    if (this.inBounds(x+1, y+1) && board[x+1][y+1]["bomb"]) {
      count+=1
    }
    if (this.inBounds(x, y+1) && board[x][y+1]["bomb"]) {
      count+=1
    }
    if (this.inBounds(x, y-1) && board[x][y-1]["bomb"]) {
      count+=1
    }
    if (this.inBounds(x-1, y) && board[x-1][y]["bomb"]) {
      count+=1
    }
    if (this.inBounds(x-1, y+1) && board[x-1][y+1]["bomb"]) {
      count+=1
    }
    if (this.inBounds(x-1, y-1) && board[x-1][y-1]["bomb"]) {
      count+=1
    }
    return count
  },
  inBounds: function(x,y) {
    if (x < Math.sqrt(this.size) && x >= 0 && y < Math.sqrt(this.size) && y >= 0) {
      return true
    } else {return false}
  },
  getNeighbors: function(index) {
    var x = parseInt(index[0])
    var y = parseInt(index[1])
    var directions = [[1,0], [1,1], [0,1], [-1,1], [-1, 0], [-1,-1], [0, -1], [1,-1]]
    var neighbors = []
    for (var i = 0; i < directions.length; i++) {
      var neighborX = x + directions[i][0]
      var neighborY = y +directions[i][1]
      if (this.inBounds(neighborX, neighborY) && !this.objectBoard[neighborX][neighborY]["bomb"] && this.objectBoard[neighborX][neighborY]["status"] === "unclicked"){
        neighbors.push([neighborX, neighborY])
      }
    };
    return neighbors
  },
  splitBoardIntoRows: function() {
    var nestArray = []
    var hashBoard = hashify(this.board)
    while (hashBoard.length > 0) {
      row = hashBoard.splice(0,Math.sqrt(this.size))
      nestArray.push(row)
    }
    return nestArray
  }
}

var placeBombs = function(num) {
  var boardWithBombs = Array.apply(null, new Array(num)).map(Number.prototype.valueOf, 0);
  for (var i = 0; i < Math.floor(num/3); i++) {
    var bombLocation = Math.floor((Math.random() * num))
      boardWithBombs[bombLocation] = 1
  };
  return boardWithBombs.join('')
}

var hashify = function(board) {
  var containerArray = []
  for (var i = 0; i < board.length; i++) {
    if (board[i] == 1) {
      var cell = {status: "unclicked", bomb: true}
      containerArray.push(cell)
    } else {
      var cell = {status: "unclicked", bomb: false}
      containerArray.push(cell)
    }
  };
  return containerArray
}