const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  note_title: {
    type: String,
    required: [true, "note title is required"],
  },
  note_content: {
    type: String,
    required: [true, "note content is required"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
   /*  required: true, */
  },
});

module.exports = mongoose.model("notes", noteSchema);
