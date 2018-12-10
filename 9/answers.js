const fs = require("fs");

const [, numPlayers, numMarbles] = /(\d+).*?(\d+)/.exec(
  fs.readFileSync("./input.txt", "utf8").trim()
);

const remove = node => {
  node.right.left = node.left;
  node.left.right = node.right;
};

const insertAfter = (node, value) => {
  const newNode = { value, left: node, right: node.right };
  node.right.left = newNode;
  node.right = newNode;
  return newNode;
};

const calculateHighScore = (numPlayers, numMarbles) => {
  if (numMarbles < 23) return 0;

  const ZERO = { value: 0 };
  ZERO.left = ZERO;
  ZERO.right = ZERO;
  insertAfter(ZERO, 1);
  insertAfter(ZERO, 2);

  let currentPlayer = 3,
    currentMarble = ZERO.right;

  const scores = {};
  for (let i = 3; i <= numMarbles; i++) {
    if (i % 23 === 0) {
      let toDelete = currentMarble;
      for (let j = 0; j < 7; j++) {
        toDelete = toDelete.left;
      }
      remove(toDelete);
      currentMarble = toDelete.right;
      scores[currentPlayer] = (scores[currentPlayer] || 0) + i + toDelete.value;
    } else {
      const left = currentMarble.right;
      currentMarble = insertAfter(left, i);
    }
    currentPlayer = (currentPlayer % numPlayers) + 1;
  }
  return Math.max(...Object.values(scores));
};

const answer1 = calculateHighScore(numPlayers, numMarbles);
console.log("Answer to Part 1 of Day 9: ", answer1);

const answer2 = calculateHighScore(numPlayers, numMarbles * 100);
console.log("Answer to Part 2 of Day 9: ", answer2);
