/**
 * You are given a positive integer n.

Continuously replace n with the sum of its prime factors.

    Note that if a prime factor divides n multiple times, it should be included in the sum as many times as it divides n.

Return the smallest value n will take on.

 

Example 1:

Input: n = 15
Output: 5
Explanation: Initially, n = 15.
15 = 3 * 5, so replace n with 3 + 5 = 8.
8 = 2 * 2 * 2, so replace n with 2 + 2 + 2 = 6.
6 = 2 * 3, so replace n with 2 + 3 = 5.
5 is the smallest value n will take on.

Example 2:

Input: n = 3
Output: 3
Explanation: Initially, n = 3.
3 is the smallest value n will take on.

 

Constraints:

    2 <= n <= 10^5

 * 
 * @param {number} n
 * @return {number}
 */

function smallestValue(n) {
    while (true) {
        let s = sumPrimeFactors(n);
        if (s === n) return n;
        n = s;
    }
}

function sumPrimeFactors(n) {
    let sum = 0;
    let d = 2;

    while (d * d <= n) {
        while (n % d === 0) {
            sum += d;
            n = Math.floor(n / d);
        }

        d++;
    }

    if (n > 1) sum += n;

    return sum;
}

// helper to check primality
function isPrime(n) {
    if (n < 2) return false;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
    return true;
}

// ================== TESTS ==================
const assert = require("assert");

// --- test cases from the problem statement ---
assert.strictEqual(smallestValue(15), 5, "15 -> 5");
assert.strictEqual(smallestValue(3), 3, "3 -> 3");

// --- additional useful cases ---
assert.strictEqual(smallestValue(2), 2, "2 -> 2 (prime)");
assert.strictEqual(
    smallestValue(4),
    4,
    "4 -> 4 (2+2=4, fixed point composite)"
);
assert.strictEqual(smallestValue(6), 5, "6 -> 2+3 = 5");
assert.strictEqual(smallestValue(8), 5, "8 -> 6 -> 5");
assert.strictEqual(smallestValue(12), 7, "12 -> 7");
assert.strictEqual(smallestValue(49), 5, "49 -> 14 -> 9 -> 6 -> 5");
assert.strictEqual(smallestValue(97), 97, "97 is prime, stays 97");
assert.strictEqual(smallestValue(100000), 7, "10^5 -> 35 -> 12 -> 7");

// --- invariants check for a range of numbers ---
for (let n = 2; n <= 2000; n++) {
    const out = smallestValue(n);
    // the output must be a fixed point: sumPrimeFactors(out) == out
    assert.strictEqual(
        sumPrimeFactors(out),
        out,
        `fixed point failed for ${n}`
    );
    // all fixed points must be primes, except 4
    if (out !== 4)
        assert.ok(
            isPrime(out),
            `result should be prime or 4 for ${n}, got ${out}`
        );
}

console.log("All tests passed!");
