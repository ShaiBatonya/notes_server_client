const router = require("express").Router();
const auth = require('../middleware/auth');
const {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
} = require(`../controllers/notes.controller`);

router.post("/add", add);
router.get("/all", getAll);
router.get("/get_by_id/:id", getById);
router.put("/update_by_id/:id", updateById);
router.delete("/delete_by_id/:id", deleteById);

module.exports = router;
