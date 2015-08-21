
export default function getRandom(a=0, b=0) {
  //force integer values.
  a = ~~a;
  b = ~~b;
  
  if (a == b) return a; //same value
  if (b < a) [a,b] = [b,a]; //lower-higher
  
  
}