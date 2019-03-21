const express = require("express");

const userDb = require("../userDb");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await userDb.get();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the users"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userDb.getById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "user with that id does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the user"
    });
  }
});

router.get("/:id/posts", async (req, res) => {
  try {
    const posts = await userDb.getUserPosts(req.params.id);
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "invalid id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the user's posts"
    });
  }
});

router.post("/", capitalize, async (req, res) => {
  try {
    if (req.body.name !== "") {
      const newUser = await userDb.insert(req.body);
      res.status(201).json(newUser);
    } else {
      res.status(401).json({ message: "please submit with a name" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding the user"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (req.body.name !== "") {
      const updated = await userDb.update(req.params.id, req.body);
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
    const deleted = await userDb.remove(req.params.id);
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

function capitalize(req, res, next) {
  req.body.name = req.body.name
    .toLowerCase()
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
  console.log(req.body.name);
  next();
}

module.exports = router;
