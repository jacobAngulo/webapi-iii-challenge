const express = require("express");

const postDb = require("../postDb");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await postDb.getById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.body.text && req.body.user_id) {
      const posted = await postDb.insert(req.body);
      res.status(201).json(posted);
    } else {
      res
        .status(403)
        .json({ message: "please fill out text field and select a user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating the posts"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (req.body.text && req.body.user_id) {
      const updated = await postDb.update(req.params.id, req.body);
      res.status(203).json(updated);
    } else {
      res.status(401).json({ message: "please submit with a name" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating the user"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await postDb.remove(req.params.id);
    if (deleted) {
      res.status(204).json(deleted);
    } else {
      res.status(404).json({ message: "user with that id does not exist" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the user"
    });
  }
});

module.exports = router;
