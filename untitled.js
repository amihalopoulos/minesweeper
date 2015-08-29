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

Game.prototype.render = function() {
  var string = "<table id='board'>"
  for (var x=0; x<this.objectBoard.length; x++){
    string += "<tr class='row'>"
    for (var y=0; y<this.objectBoard[x].length;y++){
      string += "<td class='cell "
      if (this.objectBoard[x][y]["status"] === "unclicked"){
        string += "unclicked' "
      } else if (this.objectBoard[x][y]["status"] === "clicked") {
        string += "clicked' "
      } else if (this.objectBoard[x][y]["status"] === "flagged"){
        string += "flagged' "
      }
      string += "id ='" + x + '' + y + "'></td>"
    };
    string += "</tr>"
  };
  string += "</table>"
  return string
}

Game.prototype.click = function(cell){
  x = cell[0]
  y = cell[1]
  console.log(x + ' / ' + y)
  this.objectBoard[x][y]["status"] = "clicked"
  return this.objectBoard[x][y]["bomb"]
  //if true, return array of all bomb cells
  //else, count the amount of bombs surrounding that area
}

Game.prototype.flag = function(cell){
  x = cell[0]
  y = cell[1]
  if (this.objectBoard[x][y]["status"] !== "clicked"){
    this.objectBoard[x][y]["status"] = "flagged"
  }
}

Game.prototype.getBombCells = function() {}

Game.prototype.getSurroundingBombCount = function(cell) {
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
  if (count === 0){
    //recursively click surrounding boxes
    return count
  } else {
    return count
  }
}

Game.prototype.inBounds = function(x,y) {
  if (x < Math.sqrt(this.size) && x >= 0 && y < Math.sqrt(this.size) && y >= 0) {
    return true
  } else {return false}
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

var parseCellId = function(id) {
  var x = parseInt(id[0])
  var y = parseInt(id[1])
  return [x,y]
}

Game.prototype.getNeighbors = function(index) {
  var x = parseInt(index[0])
  var y = parseInt(index[1])
  var directions = [[1,0], [1,1], [0,1], [-1,1], [-1, 0], [-1,-1], [0, -1], [1,-1]]
  var neighbors = []
  for (var i = 0; i < directions.length; i++) {
    if (this.inBounds(x + directions[i][0], y +directions[i][1])){
      neighbors.push(directions[i])
    }
  };
  return neighbors
}

Game.prototype.clickNeighbors = function(cell, neighbors){
  for (var i = 0; i < neighbors.length; i++) {
    this.click([parseInt(cell[0]) + parseInt(neighbors[i][0]), parseInt(cell[1]) + parseInt(neighbors[i][1])])
    console.log("yolo")
  };
}