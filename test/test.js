const chai = require("chai");
const shuffle = require("./shuffle.js");

const {
  getLongestChain,
  getNoConflicts,
  checkConflict,
  getEndDate,
  startSort
} = require("../index.js");
const {
  inputs,
  results,
  noConflictList,
  unorderedList,
  orderedList
} = require("./data.js");

describe("getLongestChain()", function() {
  it("should find the longest chain of non overlapping periods", function() {
    // Test these predetermined inputs
    inputs.forEach(input => {
      const longestChain = getLongestChain(input);
      const expResult = results[inputs.indexOf(input)];
      chai.expect(longestChain.length).to.be.equal(expResult);
    });
  });
});

describe("getNoConflicts()", function() {
  it("should get list of indexes with their nearest non conflicting neighbours", function() {
    // inputs[0] needs to be a sorted list
    const noConList = getNoConflicts(inputs[0]);
    chai.expect(noConflictList).to.deep.equal(noConList);
  });
});

describe("checkConflict()", function() {
  it("should return true if there is two periods with same start and different durations", function() {
    chai.expect(
      checkConflict(
        { startingDay: "2018-01-03T00:00:00.000Z", duration: 8 },
        { startingDay: "2018-01-03T00:00:00.000Z", duration: 4 }
      )
    ).to.be.true;
  });
  it("should return true if there is an overlap of two periods", function() {
    chai.expect(
      checkConflict(
        { startingDay: "2018-01-02T00:00:00.000Z", duration: 8 },
        { startingDay: "2018-01-03T00:00:00.000Z", duration: 4 }
      )
    ).to.be.true;
  });
  it("should return true if there is an overlap of two periods", function() {
    chai.expect(
      checkConflict(
        { startingDay: "2018-01-02T00:00:00.000Z", duration: 8 },
        { startingDay: "2018-01-01T00:00:00.000Z", duration: 4 }
      )
    ).to.be.true;
  });
  it("should return true if there is an overlap of two periods", function() {
    chai.expect(
      checkConflict(
        { startingDay: "2018-01-06T00:00:00.000Z", duration: 8 },
        { startingDay: "2018-01-05T00:00:00.000Z", duration: 2 }
      )
    ).to.be.true;
  });
  it("should return true if there is an overlap of two periods", function() {
    chai.expect(
      checkConflict(
        { startingDay: "2018-01-05T00:00:00.000Z", duration: 2 },
        { startingDay: "2018-01-05T00:00:00.000Z", duration: 2 }
      )
    ).to.be.true;
  });
  it("should return false if no overlap", function() {
    chai.expect(
      checkConflict(
        { startingDay: "2018-01-02T00:00:00.000Z", duration: 1 },
        { startingDay: "2018-01-03T00:00:00.000Z", duration: 4 }
      )
    ).to.be.false;
  });
  it("should return false if no overlap", function() {
    chai.expect(
      checkConflict(
        { startingDay: "2018-01-04T00:00:00.000Z", duration: 1 },
        { startingDay: "2018-01-03T00:00:00.000Z", duration: 1 }
      )
    ).to.be.false;
  });
});

describe("getEndDate()", function() {
  it("should give end date when it receives a start date and duration", function() {
    chai
      .expect(
        getEndDate({ startingDay: "2018-01-04T00:00:00.000Z", duration: 1 })
      )
      .to.deep.equal(new Date("2018-01-05T00:00:00.000Z"));
  });
});

describe("startSort()", function() {
  it("evaluation function to give a list of periods which are ordered by start date when given unordered list", function() {
    chai.expect(unorderedList.sort(startSort)).to.deep.equal(orderedList);
  });
});

describe("getLongestChain()", function() {
  // let currOffset = 0;
  // This number can be as high as 5000 without blowing up
  let dataSize = 5000;
  let wobble = 100;
  let baseDuration = 5;

  console.log("Generating optimal data");
  // Generate some interesting data
  const cleanData = [...Array(dataSize).keys()].map((i, ikey) => {
    let currDate = new Date();
    let duration = baseDuration;
    let currOffset = currDate.getDate() + i * baseDuration;
    let startingDay = new Date(
      currDate.getFullYear(),
      currDate.getMonth(),
      currOffset
    );

    return { startingDay, duration };
  });
  console.log("Generating garbage data");
  const randomGarbage = [...Array(dataSize - wobble - baseDuration).keys()].map(
    (i, ikey) => {
      let currDate = new Date();
      let duration = baseDuration + Math.floor(Math.random() * wobble);
      let startingDay = new Date(
        currDate.getFullYear(),
        currDate.getMonth(),
        currDate.getDate() + i
      );

      return { startingDay, duration };
    }
  );
  const mixed = shuffle([...cleanData, ...randomGarbage]);
  console.log("Finding longest optimal chain");
  const longestCleanChain = getLongestChain(cleanData);
  console.log("Finding longest mixed chain");
  const longestChain = getLongestChain(mixed);
  console.log("Comparing mixed and optimal chains to ensure equality");
  describe(`should find the longest optimal chain of non overlapping periods using generated optimal and non-optimal data`, () => {
    for (let i = 0; i < longestCleanChain.length; i++) {
      const clean = longestCleanChain[i];
      const mixed = longestChain[i];
      it(`should find that clean: ${JSON.stringify(
        clean
      )} equals mixed: ${JSON.stringify(mixed)}`, () => {
        chai.expect(clean).to.deep.equal(mixed);
      });
    }
  });
});
