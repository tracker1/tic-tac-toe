/*

TODO: related to logic for board state validation...

Board information as a string will be a 9 character string 
with one of three characters:
  (space) - open
  x - player 1
  o - player 2

The positions will be in the following designations
  nw, n, ne
  w,  c, e
  sw, s, se
  
The string representation will be in US-en reading order, 
left to right, top to bottom
  nw n ne w c e sw s se

There will be no spaces, and only " ", "x" and "o" used.

Validation will always be against a previous instance, 
where only a single character is allowed to change from 
space.  And o is only allowed if there are more x's.

A state of won will be set if one of the 8 matches are a 
single value.

  nw, n, ne
  w, c, e
  sw, s, se
  nw, w, sw
  n, c, e
  ne, e, se
  nw, c, se
  ne, c, sw
  
Server should maintain track of the "last board" value, 
as well as "computer player" logic - which will be outside
this module.
*/