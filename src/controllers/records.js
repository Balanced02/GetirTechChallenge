import { connection } from "mongoose";
import { getHttpCode } from "../helpers/utils";

/**
* @description fetch records
* @param {object} req http request object
* @param {object} res http response object
* @param {object} res http response object
* @function fetchRecords

* @returns {object} response
*/

const fetchRecords = async (req, res) => {
  const { startDate, endDate, maxCount, minCount } = req.body;

  try {
    const collection = connection.db.collection("records");
    const projectPipeline = {
      $project: {
        _id: false,
        key: true,
        createdAt: true,
        totalCount: {
          $sum: "$counts",
        },
      },
    };

    const matchPipeline = {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
        totalCount: {
          $gte: minCount,
          $lte: maxCount,
        },
      },
    };

    const records = await collection
      .aggregate([projectPipeline, matchPipeline])
      .toArray();

    return res.status(200).json({
      code: getHttpCode(200),
      msg: "Success",
      records,
    });
  } catch (error) {
    return res.status(500).json({
      code: getHttpCode(500),
      msg: err?.message ?? "Unable to fetch records",
      records,
    });
  }
};

export default { fetchRecords }
