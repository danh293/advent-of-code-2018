const fs = require("fs");

const polymer = fs.readFileSync("./input.txt", "utf8").trim();

const willReact = (unit1, unit2) =>
  unit1 !== unit2 && unit1.toUpperCase() === unit2.toUpperCase();

const reactPolymer = p =>
  p
    .split("")
    .reduce((chain, currentUnit) =>
      chain[chain.length - 1] === undefined
        ? currentUnit
        : willReact(currentUnit, chain[chain.length - 1])
        ? chain.substring(0, chain.length - 1)
        : chain + currentUnit
    );

const answer1 = reactPolymer(polymer).length;
console.log("Answer to Part 1 of Day 5: ", answer1);

const uniqueUnits = polymer
  .toLowerCase()
  .split("")
  .filter((unit, index, polymer) => polymer.indexOf(unit) === index);

const postReactionLengths = uniqueUnits.map(
  unit =>
    reactPolymer(
      polymer.replace(new RegExp(`[${unit}${unit.toUpperCase()}]`, "g"), "")
    ).length
);

const answer2 = Math.min(...postReactionLengths);
console.log("Answer to Part 2 of Day 5: ", answer2);
