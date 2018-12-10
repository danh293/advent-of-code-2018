const fs = require("fs");

const stars = fs
  .readFileSync("./input.txt", "utf8")
  .trim()
  .split("\n")
  .map(line =>
    /position=<\s?(-?\d*), (-?\s?\d*)> velocity=<\s?(-?\d*), (-?\s?\d*)>/
      .exec(line)
      .slice(1, 5)
  )
  .map(([x, y, vx, vy]) => ({
    position: [parseInt(x), parseInt(y)],
    velocity: [parseInt(vx), parseInt(vy)]
  }));

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

const updatePosition = (star, direction = 1) => {
  const { position, velocity } = star;
  star.position = [
    position[0] + velocity[0] * direction,
    position[1] + velocity[1] * direction
  ];
};

const getPositions = stars => stars.map(({ position }) => position);

let time = -1,
  prevXMin = -Infinity,
  xMin = -Infinity;
while (xMin >= prevXMin) {
  stars.forEach(star => updatePosition(star));
  prevXMin = xMin;
  xMin = Math.min(...unzip(getPositions(stars))[0]);
  time++;
}
stars.forEach(star => updatePosition(star, (direction = -1)));

const positions = getPositions(stars);
const yMin = Math.min(...unzip(positions)[1]);
const [xMax, yMax] = unzip(positions).map(list => Math.max(...list));

let text = "\n";
for (let j = yMin; j <= yMax; j++) {
  for (let i = xMin; i <= xMax; i++) {
    positions.some(([x, y]) => x === i && y === j)
      ? (text += "#")
      : (text += " ");
  }
  text += "\n";
}

const answer1 = text;
console.log("Answer to Part 1 of Day 10: ", answer1);

const answer2 = time;
console.log("Answer to Part 2 of Day 10: ", answer2);
