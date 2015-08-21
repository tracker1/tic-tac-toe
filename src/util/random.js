import crypto from 'crypto';

export default function getRandom(a=0, b=0) {
  //force integer values.
  a = ~~a;
  b = ~~b;
  
  if (a < 0) throw new Error('Values must be positive numbers.')
  if (a == b) return a; //same value
  if (b < a) [a,b] = [b,a]; //lower-higher  
  
  var random = parseInt(crypto.randomBytes(7).toString('hex'), 16);
  if (random < 0) random = random * -1; //make it positive if negative value
   
  //get random value against range
  return (random % (b - a + 1)) + a;
}