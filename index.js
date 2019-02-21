const { inputs } = require("./test/data.js");

main(inputs[0]);

// Launcher
function main(input) {
  const longestChain = getLongestChain(input);
  const productionCycle = {
    productionCycle: longestChain.length
  };
  // console.log(longestChain);
  console.log(productionCycle);
}

// This gets the longest overall chain for the most production cycles
function getLongestChain(input) {
  // Sort to find conflicts
  startSorted = input.sort(startSort);

  const noConflicts = getNoConflicts(startSorted);
  const noConflictChains = noConflicts.map(link => {
    const chain = [link.periodIndex];
    return getChain(link, noConflicts, chain);
  });

  let longestChainIndexes = [];
  noConflictChains.forEach(chain => {
    longestChainIndexes =
      longestChainIndexes.length > chain.length ? longestChainIndexes : chain;
  });

  const longestChain = longestChainIndexes.map(index => startSorted[index]);

  return longestChain;
}

// This puts a non conflicting chain together from each index (link)
function getChain(link, noConflicts, chain) {
  const linkIndex = noConflicts.indexOf(link);
  if (linkIndex === noConflicts.length) {
    return chain;
  }
  // Get previous links to chain from this position
  chain = getPrevChain(link, noConflicts, chain);
  // Get next links to chain from this position
  chain = getNextChain(link, noConflicts, chain);
  return chain;
}

// Go backward in the chain of no conflicts
function getPrevChain(link, noConflicts, chain) {
  for (let i = noConflicts.indexOf(link); i >= 0; i--) {
    if (link.prev === i) {
      return getPrevChain(noConflicts[i], noConflicts, [link.prev, ...chain]);
    }
  }
  return chain;
}

// Go forward in chain of no conflicts
function getNextChain(link, noConflicts, chain) {
  for (let i = noConflicts.indexOf(link); i < noConflicts.length; i++) {
    if (link.next === i) {
      return getNextChain(noConflicts[i], noConflicts, [...chain, link.next]);
    }
  }
  return chain;
}

// Gets a list of object indexes which have the next and previous non conflicting period
function getNoConflicts(sorted) {
  return sorted.map(period => {
    // Each element has nearest element before and after with no conflict. Then chain no conflicts together for longest chain
    return {
      prev: getPrevNoConflict(sorted, period),
      periodIndex: sorted.indexOf(period),
      next: getNextNoConflict(sorted, period)
    };
  });
}

// Finds the previous period that has no conflict with the current period
function getPrevNoConflict(sorted, period) {
  let index = sorted.indexOf(period);
  // Don't go past beginning of array
  if (index === 0) {
    return null;
  }
  // Iterate from current position
  for (let i = index; i > 0; i--) {
    if (!checkConflict(sorted[i - 1], period)) {
      return i - 1;
    }
  }
  return null;
}

// Finds the next period that has no conflict with the current period
function getNextNoConflict(sorted, period) {
  let index = sorted.indexOf(period);
  // Don't go past end of array
  if (index === sorted.length) {
    return null;
  }
  // Iterate from current position
  for (let i = index; i < sorted.length - 1; i++) {
    if (!checkConflict(period, sorted[i + 1])) {
      return i + 1;
    }
  }
  return null;
}

// Sorts by the start time
function startSort(a, b) {
  // If day is the same prefer smaller duration first
  if (a.startingDay === b.startingDay) {
    return a.duration > b.duration ? 1 : -1;
  }
  return a.startingDay > b.startingDay ? 1 : -1;
}

// This determines if there is a conflict between the end date of period and the starting date of candidatePeriod
function checkConflict(period1, period2) {
  // Assign day to endingDate
  const endingDate1 = getEndDate(period1);
  const startDate1 = new Date(period1.startingDay);

  const endingDate2 = getEndDate(period2);
  const startDate2 = new Date(period2.startingDay);
  // This conflicts
  if (startDate2.getTime() < endingDate1.getTime()) {
    if (
      endingDate2.getTime() >= endingDate1.getTime() ||
      startDate2.getTime() >= startDate1.getTime()
    ) {
      return true;
    }
  }
  // This conflicts
  if (startDate1.getTime() < endingDate2.getTime()) {
    if (
      endingDate1.getTime() >= endingDate2.getTime() ||
      startDate1.getTime() >= startDate2.getTime()
    ) {
      return true;
    }
  }
  // No conflict
  return false;
}

// Given a period which has a start date and days, the end date is given back
function getEndDate(period) {
  const date = new Date(period.startingDay);
  date.setDate(date.getDate() + period.duration);
  return date;
}

module.exports = {
  getLongestChain,
  getNoConflicts,
  checkConflict,
  getEndDate,
  startSort
};
