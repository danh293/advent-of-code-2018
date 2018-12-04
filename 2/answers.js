const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

let twos = 0;
let threes = 0;
input.forEach(id => {
  const uniqueChars = [...new Set(id.split(""))];

  const counts = [];
  uniqueChars.forEach(c => counts.push(id.match(new RegExp(c, "g")).length));

  if (counts.includes(2)) {
    twos++;
  }
  if (counts.includes(3)) {
    threes++;
  }
});

const answer1 = twos * threes;
console.log("Answer to Part 1 of Day 2: ", answer1);

const offByOne = (s, t) => {
  if (s.length !== t.length) {
    return false;
  }

  const sChars = s.split("");
  const tChars = t.split("");

  let mismatch = false;
  for (let i = 0; i < s.length; i++) {
    if (sChars[i] !== tChars[i]) {
      if (mismatch) {
        return false;
      }
      mismatch = true;
    }
  }

  return true;
};

let id1;
let id2;
for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    if (offByOne(input[i], input[j])) {
      id1 = input[i];
      id2 = input[j];
      break;
    }
  }
  if (id1) {
    break;
  }
}

const answer2 = id1.split("").filter(c => id2.includes(c)).join("");

console.log("Answer to Part 2 of Day 2: ", answer2);
