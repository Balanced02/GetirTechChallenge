import chai from "chai";
import { getHttpCode, formatErrors } from "../../helpers/utils";

const { expect } = chai;

describe("It should format status code to getir formats", () => {
  it("it should return 0 for success responses", () => {
    expect(getHttpCode(200)).to.equal(0);
  });
  it("it should return 1 for error responses", () => {
    expect(getHttpCode(500)).to.equal(1);
  });
});

describe("It should format validation errors", () => {
  let validationError = [
    {
      message: "endDate is required",
      path: ["endDate"],
      type: "any.required",
    },
    {
      message: "minCount is required",
      path: ["minCount"],
      type: "any.required",
      context: { label: "minCount", key: "minCount" },
    },
  ];
  it("it should extract message and path from validation error object", () => {
    let newErrors = formatErrors(validationError);
    newErrors.map((err, i) => {
      expect(err.message).to.equal(validationError[i].message);
      expect(err.path).to.equal(validationError[i].path[0]);
      expect(err.type).not.to.exist
    });
  });
});
