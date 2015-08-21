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
  If adjacent cell will give 2 potential winning moves, use it
  If adjacent cell open for possible win, use it
  Randomly pick adjacent cell (ending will be tie).
*/
