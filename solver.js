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


//console.log(hasRowConflict(board, 0));
console.log(hasColConflict(board, 0));