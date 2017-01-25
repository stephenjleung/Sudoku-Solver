// Given a 9 by 9 board, solve using sudoku rules.

var board = [

  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],

];

var hasRowConflict = function(board, rowNum) {
  var used = {};

  for (var i = 0; i < 9; i++) {
    if (board[rowNum][i]) {
      if (used[board[rowNum][i]]) {
        return true;
      } else {
        used[board[rowNum][i]] = true;
      }
    }
  }

  return false;
};

var hasColConflict = function(board, colNum) {
  var used = {};

  for (var i = 0; i < 9; i++) {
    if (board[i][colNum]) {
      if (used[board[i][colNum]]) {
        return true;
      } else {
        used[board[i][colNum]] = true;
      }
    }
  }

  return false;
};

var hasBlockConflict = function(board, blockNum) {
  var used = {};

  var rowStart = Math.floor(blockNum / 3) * 3;
  var colStart = (blockNum % 3) * 3;

  // console.log('rowstart is', rowStart);
  // console.log('colStart is', colStart);

  for (var i = rowStart; i < rowStart + 3; i++) {
    for (var j = colStart; j < colStart + 3; j++) {
      if (board[i][j]) {
        if (used[board[i][j]]) {
          return true;
        } else {
          used[board[i][j]] = true;
        }
      }
    }
  }

  return false;
};


//console.log(hasRowConflict(board, 0));
//console.log(hasColConflict(board, 0));
console.log(hasBlockConflict(board, 0));