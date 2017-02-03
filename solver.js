// Given a 9 by 9 board, solve using sudoku rules.


var Sudoku = function(initialBoard) {
  
  this.initialBoard = initialBoard;
  // Clone the entire initialBoard
  this.board = JSON.parse(JSON.stringify(this.initialBoard));

};

Sudoku.prototype.hasRowConflict = function(rowNum) {
  var used = {};

  for (var i = 0; i < 9; i++) {
    if (this.board[rowNum][i]) {
      if (used[this.board[rowNum][i]]) {
        return true;
      } else {
        used[this.board[rowNum][i]] = true;
      }
    }
  }

  return false;
};

Sudoku.prototype.hasColConflict = function(colNum) {
  var used = {};

  for (var i = 0; i < 9; i++) {
    if (this.board[i][colNum]) {
      if (used[this.board[i][colNum]]) {
        return true;
      } else {
        used[this.board[i][colNum]] = true;
      }
    }
  }

  return false;
};

Sudoku.prototype.hasBlockConflict = function(blockNum) {
  var used = {};

  var rowStart = Math.floor(blockNum / 3) * 3;
  var colStart = (blockNum % 3) * 3;

  // console.log('rowstart is', rowStart);
  // console.log('colStart is', colStart);

  for (var i = rowStart; i < rowStart + 3; i++) {
    for (var j = colStart; j < colStart + 3; j++) {
      if (this.board[i][j]) {
        if (used[this.board[i][j]]) {
          return true;
        } else {
          used[this.board[i][j]] = true;
        }
      }
    }
  }

  return false;
};

Sudoku.prototype.hasBoardConflict = function() {
  for (var i = 0; i < 9; i++) {
    if (this.hasRowConflict(i)) {
      return true;
    }
  }

  for (var i = 0; i < 9; i++) {
    if (this.hasColConflict(i)) {
      return true;
    }
  }

  for (var i = 0; i < 9; i++) {
    if (this.hasBlockConflict(i)) {
      return true;
    }
  }

  return false;
};

Sudoku.prototype.containsInitialValue = function(row, col) {
  if (this.initialBoard[row][col]) {
    return true;
  }
  return false;
};

Sudoku.prototype.updateCell = function(row, col, val) {
  if (this.initialBoard[row][col]) {
    console.error('Error: Attempted to update an initial board cell');
  } else {
    this.board[row][col] = val;
  }
};

Sudoku.prototype.resetCell = function(row, col) {
  if (this.initialBoard[row][col]) {
    console.error('Error: Attempted to reset an initial board cell');
  } else {
    this.board[row][col] = 0;  
  }  
};

Sudoku.prototype.resetBoard = function() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (this.board[i][j] !== this.initialBoard[i][j]) {
        this.board[i][j] = this.initialBoard[i][j];  
      }
    }
  }
};

// Sudoku.prototype.solve = function() {

//   var nums = [1,2,3,4,5,6,7,8,9];


//   nums.forEach(function(num) {
//     this.board
//   });



// };

//console.log(hasRowConflict(board, 0));
//console.log(hasColConflict(board, 0));
//console.log(hasBlockConflict(board, 0));
//console.log(hasBoardConflict(board));


var easyBoard = [

  [5, 1, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 4, 0, 0, 9, 0, 0, 1],
  [0, 9, 6, 0, 1, 0, 0, 8, 0],
  [0, 0, 8, 2, 0, 0, 4, 9, 5],
  [0, 5, 0, 9, 0, 0, 0, 0, 3],
  [9, 3, 0, 0, 0, 1, 8, 6, 0],
  [3, 0, 0, 0, 9, 0, 7, 0, 0],
  [0, 0, 9, 1, 5, 4, 2, 0, 0],
  [6, 2, 0, 7, 0, 8, 0, 5, 0]

];

var s = new Sudoku(easyBoard);

console.log(s.hasBoardConflict());
console.log(s.board);
console.log(s.containsInitialValue(8,8));

s.updateCell(8,8,9);
s.updateCell(7,8,9);
s.updateCell(0,8,9);

console.log(s.board);

s.resetBoard();

console.log(s.board)
