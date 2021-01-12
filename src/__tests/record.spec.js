import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import connectDB from "../config";
import filterRecordCases from "./testCases/filterRecordCases";

const { expect } = chai;

chai.use(chaiHttp);

before(async () => {
  await connectDB();
});

describe("It should handle all routes", () => {
  it("it should return 404 for routes not found", () => {
    chai
      .request(app)
      .get("/not-found")
      .end((_, res) => {
        const { status, body } = res;
        expect(status).to.be.equal(404);
        expect(body.code).to.be.equal(1);
        expect(body.error).to.be.equal("Route not found");
        expect(body.msg).to.be.equal("Route not found");
      });
  });

  it("returns the home page successfully", () => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        const {
          status,
          body: { message },
        } = res;
        expect(status).to.be.equal(200);
        expect(message).to.be.equal("Getir Tech Challenge api");
      });
  });
});

describe("Fetch records", () => {
  Promise.all(
    filterRecordCases.map((record) => {
      it(record.result.statement, async () => {
        chai
          .request(app)
          .post("/api/v1/records")
          .send(record.body)
          .end((_, res) => {
            const {
              status,
              body: { code, message, errors, records },
            } = res;
            expect(status).to.be.equal(record.result.status);
            expect(code).to.be.equal(record.result.code);
            if (record.result.errors) {
              if (record.result.multiple) {
                record.result.errors.map((err, i) =>
                  expect(errors[i].message).to.be.equal(err.message)
                );
              } else {
                expect(errors[0].message).to.be.equal(
                  record.result.errors[0].message
                );
                expect(errors[0].path).to.be.equal(
                  record.result.errors[0].path
                );
              }
            } else {
              expect(records).to.exist;
            }
          });
      });
    })
  );
});
