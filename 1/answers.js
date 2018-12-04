const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map(n => parseInt(n));

const answer1 = input.reduce((a, b) => a + b);

console.log("Answer to Part 1 of Day 1: ", answer1);

const frequencies = {};
let freq = 0;
let index = 0;
let answer2;
while (!answer2) {
  freq += input[index % input.length];
  if (frequencies[freq]) {
    answer2 = freq;
  } else {
    frequencies[freq] = 1;
    index++;
  }
}

console.log("Answer to Part 2 of Day 1: ", answer2);
