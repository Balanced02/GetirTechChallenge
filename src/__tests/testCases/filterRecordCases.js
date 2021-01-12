const filterRecordCases = [
  {
    body: {
      startDate: "2016-01-01",
      endDate: "2016-10-01",
      minCount: 10,
      maxCount: 50,
    },
    result: {
      code: 0,
      statement: "It should fetch data",
      msg: "Success",
      status: 200,
    },
  },
  {
    body: {
      startDate: "2015-07a",
      endDate: "2017-05-25",
      minCount: 2500,
      maxCount: 3000,
    },
    result: {
      statement: "It should throw error if startDate format is wrong",
      status: 422,
      code: 1,
      errors: [
        {
          message: "startDate must be a be of YYYY-MM-DD format",
          path: "startDate",
        },
      ],
    },
  },
  {
    body: {
      startDate: "2015-07",
      endDate: "2017-05-25a",
      minCount: 2500,
      maxCount: 3000,
    },
    result: {
      statement: "It should throw error if endDate format is wrong",
      status: 422,
      code: 1,
      errors: [
        {
          message: "endDate must be a be of YYYY-MM-DD format",
          path: "endDate",
        },
      ],
    },
  },
  {
    body: {
      startDate: "2017-05-25",
      minCount: 2500,
      maxCount: 3000,
    },
    result: {
      statement: "It should return throw error if endDate is not passed",
      status: 422,
      code: 1,
      errors: [
        {
          message: "endDate is required",
          path: "endDate",
        },
      ],
    },
  },
  {
    body: {
      startDate: "2015-07-14",
      endDate: "2017-05-25",
      minCount: 2500,
      maxCount: "3000",
    },
    result: {
      statement: "It should return throw error if maxCount is not a number",
      status: 422,
      code: 1,
      errors: [
        {
          message: "maxCount must be numeric",
          path: "maxCount",
        },
      ],
    },
  },
  {
    body: {
      startDate: "2016-01-26",
      endDate: "2017-05-25",
      minCount: "2500",
      maxCount: 3000,
    },
    result: {
      statement: "It should return throw error if minCount is not a number",
      status: 422,
      code: 1,
      errors: [
        {
          message: "minCount must be numeric",
          path: "minCount",
        },
      ],
    },
  },
  {
    body: {
      startDate: "2016-01-26",
      minCount: "2500",
      maxCount: 3000,
    },
    result: {
      statement: "It should return throw multiple errors if minCount is not a number and endDate is not passed",
      status: 422,
      code: 1,
      multiple: true,
      errors: [
        {
          message: "endDate is required",
          path: "endDate",
        },
        {
          message: "minCount must be numeric",
          path: "minCount",
        },
      ],
    },
  },
];

export default filterRecordCases;
