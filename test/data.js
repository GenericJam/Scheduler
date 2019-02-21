const inputs = [
  [
    { startingDay: "2018-01-02T00:00:00.000Z", duration: 5 },
    { startingDay: "2018-01-09T00:00:00.000Z", duration: 3 },
    { startingDay: "2018-01-09T00:00:00.000Z", duration: 7 },
    { startingDay: "2018-01-15T00:00:00.000Z", duration: 6 }
  ],
  [
    { startingDay: "2018-01-03T00:00:00.000Z", duration: 5 },
    { startingDay: "2018-01-09T00:00:00.000Z", duration: 2 },
    { startingDay: "2018-01-11T00:00:00.000Z", duration: 6 },
    { startingDay: "2018-01-16T00:00:00.000Z", duration: 9 },
    { startingDay: "2018-01-24T00:00:00.000Z", duration: 5 }
  ],
  [
    { startingDay: "2018-01-03T00:00:00.000Z", duration: 8 },
    { startingDay: "2018-01-03T00:00:00.000Z", duration: 4 },
    { startingDay: "2018-01-07T00:00:00.000Z", duration: 4 },
    { startingDay: "2018-01-13T00:00:00.000Z", duration: 8 },
    { startingDay: "2018-01-13T00:00:00.000Z", duration: 4 },
    { startingDay: "2018-01-17T00:00:00.000Z", duration: 4 },
    { startingDay: "2018-01-09T00:00:00.000Z", duration: 7 },
    { startingDay: "2018-01-11T00:00:00.000Z", duration: 6 },
    { startingDay: "2018-01-16T00:00:00.000Z", duration: 9 },
    { startingDay: "2018-01-24T00:00:00.000Z", duration: 5 }
  ]
];

const results = [3, 4, 5];

const noConflictList = [
  { prev: null, periodIndex: 0, next: 1 },
  { prev: 0, periodIndex: 1, next: 3 },
  { prev: 0, periodIndex: 2, next: null },
  { prev: 1, periodIndex: 3, next: null }
];

const unorderedList = [
  { startingDay: "2018-01-24T00:00:00.000Z", duration: 5 },
  { startingDay: "2018-01-09T00:00:00.000Z", duration: 2 },
  { startingDay: "2018-01-11T00:00:00.000Z", duration: 6 },
  { startingDay: "2018-01-03T00:00:00.000Z", duration: 5 },
  { startingDay: "2018-01-16T00:00:00.000Z", duration: 9 }
];

const orderedList = [
  { startingDay: "2018-01-03T00:00:00.000Z", duration: 5 },
  { startingDay: "2018-01-09T00:00:00.000Z", duration: 2 },
  { startingDay: "2018-01-11T00:00:00.000Z", duration: 6 },
  { startingDay: "2018-01-16T00:00:00.000Z", duration: 9 },
  { startingDay: "2018-01-24T00:00:00.000Z", duration: 5 }
];

module.exports = {
  inputs,
  results,
  noConflictList,
  unorderedList,
  orderedList
};
