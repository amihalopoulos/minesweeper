function Game(x,y) {
  this.size = x * y;
  this.x = x;
  this.y = y;
  this.gameOver = false;
  this.objectBoard = this.newGame();
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
            string += "unclicked' id ='" + x + ' ' + y + "'>"
          } else if (this.objectBoard[x][y]["status"] === "clicked") {
            string += "clicked' id ='" + x + ' ' + y + "'>"
            if (this.getSurroundingBombCount([x,y]) !== 0) {
              string += this.getSurroundingBombCount([x,y])
            }
          } else if (this.objectBoard[x][y]["status"] === "flagged"){
            string += "flagged' id ='" + x + ' ' + y + "'>"
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
          if (this.objectBoard[x][y]["bomb"] && this.objectBoard[x][y]["status"] === "flagged"){
            string += "bomb' id ='" + x + '' + y + "'><div class='container'></div>"
          } else if (this.objectBoard[x][y]["bomb"]){
            string += "bomb' id ='" + x + '' + y + "'>"
          }else if (this.objectBoard[x][y]["status"] === "clicked" || this.objectBoard[x][y]["status"] === "unclicked") {
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
    // console.log(cell)
    var x = parseInt(cell[0])
    var y = parseInt(cell[1])
        // console.log("x:" + x + "   y:" + y)
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
    var x = parseInt(cell[0])
    var y = parseInt(cell[1])
    if (this.objectBoard[x][y]["status"] !== "flagged") {
      this.objectBoard[x][y]["status"] = "flagged"
    } else {
      this.objectBoard[x][y]["status"] = "unclicked"
    };
  },
  getSurroundingBombCount: function(cell) {
    var x = parseInt(cell[0])
    var y = parseInt(cell[1])
    // console.log("surrBombX-Y: x:" + cell[0] + "     y:"+ cell[1] )
    var self = this
    var count = 0
    var directions = [[1,0], [1,1], [0,1], [-1,1], [-1, 0], [-1,-1], [0, -1], [1,-1]]
    directions.forEach(function(d){
      if (self.inBounds(x+d[0], y+d[1]) && self.objectBoard[x+d[0]][y+d[1]]["bomb"]) {
        count+=1
      }
    })
    return count
  },
  inBounds: function(x,y) {
    // console.log("x: bound" + this.x + "   point: " + x)
    console.log("is y inbounds? : " + y + "    " + this.y)
    if (x < this.y && x >= 0 && y < this.x && y >= 0) {
      return true
    } else {return false}
  },
  getNeighbors: function(cell) {
    var x = parseInt(cell[0])
    var y = parseInt(cell[1])
    var self = this
    var directions = [[1,0], [1,1], [0,1], [-1,1], [-1, 0], [-1,-1], [0, -1], [1,-1]]
    var neighbors = []
    directions.forEach(function(d) {
      var nX = x + d[0]
      var nY = y + d[1]
    console.log("x: " + nX + "  , y: " + nY)
      console.log(self.inBounds(nX, nY))
      if (self.inBounds(nX, nY) && !self.objectBoard[nX][nY]["bomb"] && self.objectBoard[nX][nY]["status"] === "unclicked"){
        neighbors.push([nX, nY])
      }
    })
    return neighbors
  },
  allBombsFlagged: function() {
    var self = this
    var bombs = []
    var flags = []
    for (var x = 0; x < self.objectBoard.length; x++) {
      for (var y = 0; y < self.objectBoard[x].length; y++) {
        if (self.objectBoard[x][y]["bomb"]) {
          bombs.push([x,y])
        };
        if (self.objectBoard[x][y]["status"] === "flagged") {
          flags.push([x,y])
        };
      };

    };
    return bombs.equals(flags)
  },
  allNotBombsClicked: function() {
    var self = this
    var notBombs = []
    var clicked = []
    for (var x = 0; x < self.objectBoard.length; x++) {
      for (var y = 0; y < self.objectBoard[x].length; y++) {
        if (!self.objectBoard[x][y]["bomb"]) {
          notBombs.push([x,y])
        };
        if (self.objectBoard[x][y]["status"] === "clicked") {
          clicked.push([x,y])
        };
      };

    };
    return notBombs.equals(clicked)
  },
  checkForWin: function() {
    if (this.allBombsFlagged() && this.allNotBombsClicked()) {
      this.gameOver = true
      return true
    };
  },
  newGame: function() {
    var locations = placeBombs(this.size)
    var board = splitBoardIntoRows(locations, this.x)
    this.objectBoard = board
    this.gameOver = false
    return board
  }
}

var placeBombs = function(num) {
  var numBombs;
  if (num < 100) {
    numBombs = 10
  } else if (num < 300){
    numBombs = 40
  } else {
    numBombs = 99
  }
  var boardWithBombs = Array.apply(null, new Array(num - numBombs)).map(Number.prototype.valueOf, 0);
  for (var i = 0; i < numBombs; i++) {
    boardWithBombs.push(1)
  };
  shuffle(boardWithBombs)
  return boardWithBombs.join('')
}


var splitBoardIntoRows = function(board, x) {
    var nestArray = []
    var hashBoard = hashify(board)
    while (hashBoard.length > 0) {
      row = hashBoard.splice(0,x)
      nestArray.push(row)
    }
    return nestArray
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

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

Array.prototype.equals = function (array) {
    if (!array)
        return false;

    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            return false;
        }
    }
    return true;
}

// var convertToNum = function(cell){
//   if (cell.length < 3) {
//     return cell
//   } else if (cell.length < 4){
//     if (parseInt(cell[0]) < 10) {
//       return [cell[0], cell[1] + cell[2]]
//     } else {
//       return [cell[0] + cell[1], cell[2]]
//     }
//   } else {
//     return [cell[0]+cell[1], cell[2]+cell[3]]
//   }
// }