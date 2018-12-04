const fs = require("fs");

const logs = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map(log => log.split("] "))
  .map(([dateString, log]) => ({
    date: new Date(dateString.replace("[", "")),
    minute: new Date(dateString.replace("[", "")).getMinutes(),
    guard: log.includes("Guard") ? /#(\d*)/g.exec(log)[1] : undefined,
    asleep: log.includes("asleep"),
    awake: log.includes("wakes")
  }))
  .sort((a, b) => a.date - b.date);

const guardDetails = {};
let currentGuard, currentMin;
for (let { minute, guard, asleep, awake } of logs) {
  if (guard) {
    currentGuard = guard;
    if (!guardDetails[guard]) {
      guardDetails[guard] = { minutes: new Array(60).fill(0), total: 0 };
    }
  }
  else if (asleep) currentMin = minute;
  else if (awake) {
    for (let i = currentMin; i < minute; i++) {
      guardDetails[currentGuard].minutes[i]++;
    }
    guardDetails[currentGuard].total += minute - currentMin;
  }
}

let longestSleepTime = 0, longestSleepingGuard, modalMinute1;
for (let id in guardDetails) {
  if (guardDetails[id].total > longestSleepTime) {
    longestSleepTime = guardDetails[id].total;
    longestSleepingGuard = id;
    modalMinute1 = guardDetails[id].minutes.indexOf(Math.max(...guardDetails[id].minutes))
  }
}

const answer1 = longestSleepingGuard * modalMinute1;
console.log("Answer to Part 1 of Day 4: ", answer1);

let mostConsistentGuard, modalMinute2, modalMinuteValue = 0;
for (let id in guardDetails) {
  const modalValue = Math.max(...guardDetails[id].minutes);
  if (modalValue > modalMinuteValue) {
    modalMinuteValue = modalValue;
    mostConsistentGuard = id;
    modalMinute2 = guardDetails[id].minutes.indexOf(modalValue)
  }
}

const answer2 = mostConsistentGuard * modalMinute2;
console.log("Answer to Part 2 of Day 4: ", answer2);
