const chai = require("chai");
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
    console.log(noConList);
    console.log(noConflictList);
    chai.expect(noConflictList).to.deep.equal(noConList);
  });
});

describe("checkConflict()", function() {
  it("should return true if there is an overlap of two periods and false if no overlap", function() {
    chai.expect(
      checkConflict(
        { startingDay: "2018-01-03T00:00:00.000Z", duration: 8 },
        { startingDay: "2018-01-03T00:00:00.000Z", duration: 4 }
      )
    ).to.be.true;
    chai.expect(
      checkConflict(
        { startingDay: "2018-01-02T00:00:00.000Z", duration: 8 },
        { startingDay: "2018-01-03T00:00:00.000Z", duration: 4 }
      )
    ).to.be.true;
    chai.expect(
      checkConflict(
        { startingDay: "2018-01-02T00:00:00.000Z", duration: 8 },
        { startingDay: "2018-01-01T00:00:00.000Z", duration: 4 }
      )
    ).to.be.true;
    chai.expect(
      checkConflict(
        { startingDay: "2018-01-06T00:00:00.000Z", duration: 8 },
        { startingDay: "2018-01-05T00:00:00.000Z", duration: 2 }
      )
    ).to.be.true;

    chai.expect(
      checkConflict(
        { startingDay: "2018-01-02T00:00:00.000Z", duration: 1 },
        { startingDay: "2018-01-03T00:00:00.000Z", duration: 4 }
      )
    ).to.be.false;
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
