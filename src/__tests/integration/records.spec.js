import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import connectDB from "../../config";
import filterRecordCases from "../testCases/filterRecordCases";

const { expect } = chai;

chai.use(chaiHttp);

before("connect", async () => {
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
  it("should fetch data for successful payloads", async () => {
    return chai
      .request(app)
      .post("/api/v1/records")
      .send({
        startDate: "2016-01-01",
        endDate: "2016-10-01",
        minCount: 10,
        maxCount: 50,
      })
      .then((res) => {
        const {
          status,
          body: { code, msg, records },
        } = res;
        expect(status).to.be.equal(200);
        expect(code).to.be.equal(0);
        expect(msg).to.be.equal("Success");
        expect(records).to.exist;
      });
  });
  Promise.all(
    filterRecordCases.map((record, i) => {
      it(record.result.statement, async () => {
        chai
          .request(app)
          .post("/api/v1/records")
          .send(record.body)
          .end((_, res) => {
            const {
              status,
              body: { code, errors},
            } = res;
            console.log("record.result.errors", i);
            expect(status).to.be.equal(record.result.status);
            expect(code).to.be.equal(record.result.code);
            if (record.result.multiple) {
              record.result.errors.map((err, i) =>
                expect(errors[i].message).to.be.equal(err.message)
              );
            } else {
              expect(errors[0].message).to.be.equal(
                record.result.errors[0].message
              );
              expect(errors[0].path).to.be.equal(record.result.errors[0].path);
            }
          });
      });
    })
  );
});
