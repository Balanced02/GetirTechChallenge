import { Router } from "express";
import recordsController from "../controllers/records";
import { validateBody } from "../helpers/validateBody";
import filterRecordValidator from "../validators/filterRecordValidator";

const router = Router();

router.post(
  "/records",
  validateBody(filterRecordValidator),
  recordsController.fetchRecords
);

export default router;
