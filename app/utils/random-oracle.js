// Generates a function which returns a random element of xs, where the same
// input value always returns the same element.

export default function(xs) {
  let memo = {};
  return function(i) {
    if (!(i in memo)) {
      memo[i] = Math.floor(Math.random() * xs.length);
    }
    return xs[memo[i]];
  };
}
