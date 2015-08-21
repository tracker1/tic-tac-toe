/*
TODO: will fill this in with the player logic...

First game, player will be human.
After that loser starts.
If a tie, the player that started goes second in the next game.

First mover:
  50:50 center : corner (random)
    center:
      other player takes corner
        take opposing corner
      other player takes side
        take adjacent corner
    corner:
      other player takes center
        take opposite corner
      other player takes other position
        take center

Second mover:
  If center open
    take it
      center wrapped in two corners
        take random side

Post-opening moves
  Check each direction
    If block needed, block
    If win possible, take it
  Take Best Adjacent
    If adjacent cell will give 2 potential winning moves, use it
    If adjacent cell open for possible win, use it
    Randomly pick adjacent cell (ending will be tie).
*/

import clone from 'safe-clone-deep';
import rnd from '../util/random';

import {x,o,positions,opts,nw,n,ne,w,c,e,sw,s,se} from '../board/consts';

export function play(board) {
  //no mutations, will return new/updated board
  board = clone(board);
  
  let me = board.nextPlayer;
  let enemy = me == x ? y : x;
  let play = board.plays + 1;
  
  return openingX(board, me, play)
    || openingY(board, me, play)
    || takeBlock(board,me, enemy)
    || takeWin(board,me,enemy)
    || takeBestAdjacent(board,me,enemy)
    ;
}


// First Mover - early game logic
function openingX(board,me,play) {
  /*  First mover:
        50:50 center : corner (random)
          center:
            other player takes corner
              take opposing corner
            other player takes side
              take adjacent corner
          corner:
            other player takes center
              take opposite corner
            other player takes other position
              take center
  */
  if (me != x) return null; //not player 1
  if (play > 3) return null; //not in opening moves

  //first move
  if (play == 1) {
    //take center? (even odds)
    if (rnd(0,1)) {
      //center
      board.c = x;
      return board;
    }

    //take random corner
    switch(rnd(0,3)) {
      case 0:
        board.nw = x;
        return board;
      case 1:
        board.ne = x;
        return board;
      case 2:
        board.sw = x;
        return board;
      case 3:
        board.se = x;
        return board;
    }
  }
  
  //third move - have center
  if (board.c == x) {
    switch(true) { //truthy match agaist competetor taking a spot.
      //check corners for other player
      case board.nw:
        board.se = x;
        return board;
      case board.ne:
        board.sw = x;
        return board;
      case board.sw:
        board.ne = x;
        return board;
      case board.se:
        board.nw = x;
        return board;

      //check sides for other player
      case board.n:
        if (rnd(0,1)) board.nw = x;
        else board.ne = x;
        return board;
      case board.w:
        if (rnd(0,1)) board.nw = x;
        else board.sw = x;
        return board;
      case board.e:
        if (rnd(0,1)) board.ne = x;
        else board.se = x;
        return board;
      case board.s:
        if (rnd(0,1)) board.sw = x;
        else board.se = x;
        return board;
    }
  }

  //have corner
  
  //if center is open, take it
  if (!board.c) {
    board.c = me;
    return board;
  }
  
  //take opposite corner
  switch (true) {
      case board.nw:
        board.se = x;
        return board;
      case board.ne:
        board.sw = x;
        return board;
      case board.sw:
        board.ne = x;
        return board;
      case board.se:
        board.nw = x;
        return board;
  }
  
  //sanity check, should never happen
  throw new Error("Invalid state");
}


// Second Mover - Early Game Logic
function openingY(board,me,play) {
  /*  Second mover:
        If center open
          take it
            center wrapped in two corners?
              take random side
  */
  if (me != y) return null; //not player 1
  if (play > 4) return null; //not in opening moves
  
  //center is open, take it (first player 2 move)
  if (!board.c) {
    board.c = y;
    return board;
  }
  
  //wrapped in corners
  if ((board.nw == x && board.se == x) || (board.ne == x || board.se == x)) {
    switch(rnd(0,3)) {
      case 0:
        board.n = y;
        return board;
      case 1:
        board.w = y;
        return board;
      case 2:
        board.e = y;
        return board;
      case 3:
        board.s = y;
        return board;
    }
  }
  
  //not in opening state for second player - fall through
  return null;
}


function takeBlock(board,me,enemy) {
  var block = getWinOption(board, enemy, me);
  if (!block) return null; //no block needed
  
  board[block] = ne;
  return board;
}

function takeWin(board,me,enemy) {
  var win = getWinOption(board, me, enemy);
  if (!win) return null; //no win available
  
  board[win] = me;
  return board;
}

function takeBestAdjacent(board,me,enemy) {
  //TODO: for each open position, get possible win scenarios.
}

//get options where 2 positions are taken, and the third is open
function getWinOption(board, p /*player*/, e /*enemy*/) {
  return opts
    .filter(row => {
      //filter options by win scenarios
      
      //enemy in position
      if (row.some(o => board[o] == e)) return false;
      
      //have two posts
      return row.filter( o => board[o] == p).length == 2
    })
    .map(row => {
      //map elitible row to the position not taken
      return row.filter(o => !board[0])[0];
    })
    [0] /* first win scenario */ 
    || null; //no win scenarios
}