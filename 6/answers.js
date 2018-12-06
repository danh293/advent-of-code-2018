const fs = require("fs");

const coords = fs
  .readFileSync("./input.txt", "utf8")
  .trim()
  .split("\n")
  .map(coord => coord.split(", "))
  .map(([x, y]) => [parseInt(x), parseInt(y)]);

const unzip = array => {
  const arrays = [];
  for (let i = 0; i < array[0].length; i++) {
    const a = [];
    for (let j = 0; j < array.length; j++) {
      a.push(array[j][i]);
    }
    arrays.push(a);
  }
  return arrays;
};

const count = (element, array) =>
  array.reduce(
    (count, current) => (current === element ? count + 1 : count),
    0
  );

const [xMax, yMax] = unzip(coords).map(list => Math.max(...list));
const points = [];
for (let i = 0; i <= xMax; i++) {
  for (let j = 0; j <= yMax; j++) {
    points.push([i, j]);
  }
}

const dist = ([a1, b1], [a2, b2]) => Math.abs(a1 - a2) + Math.abs(b1 - b2);

const areas = points.reduce((areas, [i, j]) => {
  const distances = coords.map(coord => dist(coord, [i, j]));
  const minDistance = Math.min(...distances);
  const numPointsWithMinDistance = count(minDistance, distances);

  if (numPointsWithMinDistance === 1) {
    const c = coords[distances.indexOf(minDistance)];
    areas[c] ? areas[c].area++ : (areas[c] = { area: 1 });
    if (i === 0 || i === xMax || j === 0 || j === yMax)
      areas[c].hasInfiniteArea = true;
  }
  return areas;
}, {});

const answer1 = Math.max(
  ...Object.values(areas).map(({ hasInfiniteArea, area }) =>
    !hasInfiniteArea ? area : -Infinity
  )
);

console.log("Answer to Part 1 of Day 6: ", answer1);

const pointsWithinLimit = points.reduce(
  (count, point) =>
    coords.reduce((sum, coord) => sum + dist(coord, point), 0) < 10000
      ? count + 1
      : count,
  0
);

const answer2 = pointsWithinLimit;
console.log("Answer to Part 2 of Day 6: ", answer2);
