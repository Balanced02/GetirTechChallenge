import mongoose from "mongoose";
const { DB_URL, TEST_DB_URL, NODE_ENV } = process.env;

const config = {
  development: DB_URL,
  test: TEST_DB_URL,
};

const dbUrl = NODE_ENV === "test" ? config.test : config.development;

export default () =>
  mongoose.connect(
    dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Database connected")
  );
