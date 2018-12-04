const fs = require("fs");

const claims = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map(claim =>
    claim
      .replace(/[,x]/g, " ")
      .replace(/[#:@]/g, "")
      .split(" ")
  )
  .map(([id, _, x, y, w, h]) => ({
    id: parseInt(id),
    x: parseInt(x),
    y: parseInt(y),
    w: parseInt(w),
    h: parseInt(h)
  }));

const xMax = Math.max(...claims.map(({ x, w }) => x + w));
const yMax = Math.max(...claims.map(({ y, h }) => y + h));
const fabric = Array.from({ length: xMax }, () => new Array(yMax).fill(0));

claims.forEach(({ x, y, w, h }) => {
  for (let i = x; i < x + w; i++) {
    for (let j = y; j < y + h; j++) {
      fabric[i][j]++;
    }
  }
});

let count = 0;
for (let i = 0; i < xMax; i++) {
  for (let j = 0; j < yMax; j++) {
    if (fabric[i][j] > 1) {
      count++;
    }
  }
}

const answer1 = count;
console.log("Answer to Part 1 of Day 3: ", answer1);

let intactId;
for (let { id, x, y, w, h } of claims) {
  let intact = true;
  for (let i = x; i < x + w; i++) {
    for (let j = y; j < y + h; j++) {
      intact = intact && fabric[i][j] === 1;
      if (!intact) break;
    }
    if (!intact) break;
  }
  if (intact) {
    intactId = id;
    break;
  }
}

const answer2 = intactId;
console.log("Answer to Part 2 of Day 3: ", answer2);
