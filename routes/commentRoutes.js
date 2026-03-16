import Comment from "../models/Comment.js";
import express from "express";
import {resolveUser} from "../middlewares/resolveUser.js";
import { resolveRole } from "../middlewares/resolveRole.js";

const router = express.Router();

router.delete("/delete/:id", resolveUser, async (req, res) => {

  try {
console.log("deleteing....")
    const deleted = await Comment.findByIdAndDelete(req.params.id);
console.log("deleted")
    if (!deleted) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({
      message: "Comment deleted",
      deleted
    });

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Couldn't delete comment" });

  }

});

// ADD COMMENT
router.post("/add/:id", resolveUser, async (req, res) => {
  try {

    const comment = await Comment.create({
      userId: req.user._id,
      shayariId: req.params.id,
      text: req.body.text
    });

   await comment.populate("userId","name profile")
    res.status(201).json({
      message: "Commented Successfully",
      comment
    });

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Comment unsuccessful" });

  }
});


// GET COMMENTS OF SHAYARI
router.get("/:id", resolveUser, async (req, res) => {
  try {

    const comments = await Comment.find({
      shayariId: req.params.id
    }).populate("userId", "name profile");

    res.status(200).json(comments);

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "unsuccessful" });

  }
});


export default router;