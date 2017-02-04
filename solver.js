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

Sudoku.prototype.solve = function() {

  var blockNum;
  var totalCells = this.board.length * this.board[0].length;  
  var row = 0;
  var col = 0;
  var context = this;

  var solution;
  var solutionFound = false;

  
  var solver = function(currentCell) {

    // this doesn't seem to improve performance    
    // if (solutionFound) {
    //   return;
    // }
    
    if (currentCell === 81) {      
      solution = JSON.parse(JSON.stringify(context.board));
      solutionFound = true;      
      return;
    };

    row = Math.floor(currentCell / 9);
    col = Math.floor(currentCell % 9);

    if (context.containsInitialValue(row, col)) {

      solver(currentCell + 1);

    } else {

      for (var num = 1; num <= 9; num++) {

        if (solutionFound) {
          return;
        }

        row = Math.floor(currentCell / 9);
        col = Math.floor(currentCell % 9);        
        
        context.updateCell(row, col, num);

        blockNum = Math.floor(row / 3) * 3 + Math.floor(col / 3);

        if (context.hasRowConflict(row) || context.hasColConflict(col) || context.hasBlockConflict(blockNum)) {

          context.resetCell(row, col);

        } else {

          solver(currentCell + 1);

        }
      }     
    }
  };    

  solver(0);
  return solution;

};

//console.log(hasRowConflict(board, 0));
//console.log(hasColConflict(board, 0));
//console.log(hasBlockConflict(board, 0));
// console.log(hasBoardConflict(board));

// Do Not Edit
// var easyBoard = [

//   [5, 1, 0, 0, 0, 0, 0, 0, 0],
//   [2, 0, 4, 0, 0, 9, 0, 0, 1],
//   [0, 9, 6, 0, 1, 0, 0, 8, 0],
//   [0, 0, 8, 2, 0, 0, 4, 9, 5],
//   [0, 5, 0, 9, 0, 0, 0, 0, 3],
//   [9, 3, 0, 0, 0, 1, 8, 6, 0],
//   [3, 0, 0, 0, 9, 0, 7, 0, 0],
//   [0, 0, 9, 1, 5, 4, 2, 0, 0],
//   [6, 2, 0, 7, 0, 8, 0, 5, 0]

// ];

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

//console.log(s.hasBoardConflict());
console.log(s.board);
// console.log(s.containsInitialValue(8,8));

// s.updateCell(8,8,9);
// s.updateCell(7,8,9);
// s.updateCell(0,8,9);
// console.log(s.hasBoardConflict());
// console.log(s.board);

// s.resetBoard();

// console.log(s.board)

s.solve();

// performance testing
// for (var i = 0; i < 10000; i++) {
//   s.resetBoard();
//   s.solve();
// };

console.log(s.board);

// The first version solves and resets this easy puzzle 1000 times in 1.1 seconds
// Revision. Changed the forEach to a for loop for easy breaking when solution found.
//    This finishes 1000 solve iterations in 0.2 seconds.
//    10,000,000 solves in 4.6 seconds
// Update; previous revision was incorrect. Bugs found. Changing to for loop only 
//    reduced time from 1.1 to 1.0 seconds for 1000 iterations. 10000 iterations is 8.5sec