/**
 * Leetcode 3027. Find the Number of Ways to Place People II

 * You are given a 2D array points of size n x 2 representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].

We define the right direction as positive x-axis (increasing x-coordinate) and the left direction as negative x-axis (decreasing x-coordinate). Similarly, we define the up direction as positive y-axis (increasing y-coordinate) and the down direction as negative y-axis (decreasing y-coordinate)

You have to place n people, including Alice and Bob, at these points such that there is exactly one person at every point. Alice wants to be alone with Bob, so Alice will build a rectangular fence with Alice's position as the upper left corner and Bob's position as the lower right corner of the fence (Note that the fence might not enclose any area, i.e. it can be a line). If any person other than Alice and Bob is either inside the fence or on the fence, Alice will be sad.

Return the number of pairs of points where you can place Alice and Bob, such that Alice does not become sad on building the fence.

Note that Alice can only build a fence with Alice's position as the upper left corner, and Bob's position as the lower right corner. For example, Alice cannot build either of the fences in the picture below with four corners (1, 1), (1, 3), (3, 1), and (3, 3), because:

    With Alice at (3, 3) and Bob at (1, 1), Alice's position is not the upper left corner and Bob's position is not the lower right corner of the fence.
    With Alice at (1, 3) and Bob at (1, 1), Bob's position is not the lower right corner of the fence.
Example 1:

Input: points = [[1,1],[2,2],[3,3]]
Output: 0
Explanation: There is no way to place Alice and Bob such that Alice can build a fence with Alice's position as the upper left corner and Bob's position as the lower right corner. Hence we return 0. 

Example 2:

Input: points = [[6,2],[4,4],[2,6]]
Output: 2
Explanation: There are two ways to place Alice and Bob such that Alice will not be sad:
- Place Alice at (4, 4) and Bob at (6, 2).
- Place Alice at (2, 6) and Bob at (4, 4).
You cannot place Alice at (2, 6) and Bob at (6, 2) because the person at (4, 4) will be inside the fence.

Example 3:

Input: points = [[3,1],[1,3],[1,1]]
Output: 2
Explanation: There are two ways to place Alice and Bob such that Alice will not be sad:
- Place Alice at (1, 1) and Bob at (3, 1).
- Place Alice at (1, 3) and Bob at (1, 1).
You cannot place Alice at (1, 3) and Bob at (3, 1) because the person at (1, 1) will be on the fence.
Note that it does not matter if the fence encloses any area, the first and second fences in the image are valid.

Constraints:

    2 <= n <= 1000
    points[i].length == 2
    -109 <= points[i][0], points[i][1] <= 109
    All points[i] are distinct.

 * 
 * @param {number[][]} points
 * @return {number}
 */
var numberOfPairs = function (points) {
    const n = points.length;
    let pairs = 0;

    for (let i = 0; i < n; i++) {
        const [xA, yA] = points[i];

        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            const [xB, yB] = points[j];

            if (!(xA <= xB && yA >= yB)) continue;

            let ok = true;

            for (let k = 0; k < n; k++) {
                if (i === k || j === k) continue;
                const [xK, yK] = points[k];

                if (xA <= xK && xK <= xB && yK <= yA && yK >= yB) {
                    ok = false;
                    break;
                }

                if (ok) pairs++;
            }
        }
    }

    return pairs;
};

// --- Teste ---
const tests = [
    {
        points: [
            [6, 2],
            [4, 4],
            [2, 6],
        ],
        expected: 2,
    },
    {
        points: [
            [3, 1],
            [1, 3],
            [1, 1],
        ],
        expected: 2,
    },
];

tests.forEach((t, i) => {
    const result = numberOfPairs(t.points);
    console.log(
        `Test ${i + 1}: rezultat = ${result}, așteptat = ${t.expected}`
    );
});

/**
 * 
 * Varianta cu prefix 2D
 
@param {number[][]} points
@return {number}
 
var numberOfPairs = function(points) {
  const n = points.length;

  const xs = [...new Set(points.map(p => p[0]))].sort((a,b) => a-b);
  const ys = [...new Set(points.map(p => p[1]))].sort((a,b) => a-b);
  const xId = new Map(xs.map((v,i) => [v, i+1]));
  const yId = new Map(ys.map((v,i) => [v, i+1]));
  const P = points.map(([x,y]) => [xId.get(x), yId.get(y)]);

  const X = xs.length, Y = ys.length;

  const grid = Array.from({length: X+1}, () => new Array(Y+1).fill(0));
  for (const [cx, cy] of P) grid[cx][cy] = 1;

  const pref = Array.from({length: X+1}, () => new Array(Y+1).fill(0));
  for (let i = 1; i <= X; i++) {
    for (let j = 1; j <= Y; j++) {
      pref[i][j] = grid[i][j] 
                 + pref[i-1][j] 
                 + pref[i][j-1] 
                 - pref[i-1][j-1];
    }
  }

  const rectSum = (x1, y1, x2, y2) => {
    if (x1 > x2 || y1 > y2) return 0;
    return pref[x2][y2] 
         - pref[x1-1][y2] 
         - pref[x2][y1-1] 
         + pref[x1-1][y1-1];
  };

  let ans = 0;
  for (let i = 0; i < n; i++) {
    const [xa, ya] = P[i];
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const [xb, yb] = P[j];
      if (xa <= xb && ya >= yb) {
        const total = rectSum(xa, yb, xb, ya);
        if (total === 2) ans++;
      }
    }
  }

  return ans;
};

 * 
 */
