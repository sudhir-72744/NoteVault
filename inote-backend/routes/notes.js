const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Note.find({ user: req.user });

  res.json(notes);
});

router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    //----------------------------------------------------

    try {
      const { title, description, tag } = req.body;
      const updatednote = {};
      if (title) {
        updatednote.title = title;
      }
      if (description) {
        updatednote.description = description;
      }
      if (tag) {
        updatednote.tag = tag;
      }
      let note = await Note.findById(req.params.id);

      if (!note) {
        res.status(404).send("not found");
        return;
      }
      if (note.user.toString() !== req.user) {
        res.status(404).send("not allowed");
        return;
      }
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: updatednote },
        { new: true }
      );

      const savednote = await note.save();

      res.json(savednote);
    } catch (error) {
      console.error("Error saving note:", error);
      res.status(400).json({ error: "Unable to save note" });
    }
  }
);

router.delete(
  "/deletenote/:id",
  fetchuser,

  async (req, res) => {
    //----------------------------------------------------

    try {
      let note = await Note.findById(req.params.id);

      if (!note) {
        res.status(404).send("not found");
        return;
      }
      if (note.user.toString() !== req.user) {
        res.status(404).send("not allowed");
        return;
      }
      await Note.findByIdAndDelete(req.params.id);

      res.json({ sucess: "note has been deleted", note: note });
    } catch (error) {
      console.error("Error saving note:", error);
      res.status(400).json({ error: "Unable to save note" });
    }
  }
);

router.put(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a vaild title").isLength({ min: 1 }),
    body("description", "enter a vaild desc").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    //----------------------------------------------------

    try {
      const { title, description, tag } = req.body;

      const note = new Note({
        user: req.user,
        title,
        description,
        tag,
      });
      const savednote = await note.save();

      res.json(savednote);
    } catch (error) {
      console.error("Error saving note:", error);
      res.status(400).json({ error: "Unable to save note" });
    }
  }
);

module.exports = router;
