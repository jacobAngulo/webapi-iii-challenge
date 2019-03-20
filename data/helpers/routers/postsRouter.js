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

// router.get("/user/:id/", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const posts = await postDb.get();
//     const userPosts = posts.filter(post => post.user_id === parseInt(id, 10));
//     res.status(200).json(userPosts);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Error retrieving the posts"
//     });
//   }
// });

module.exports = router;
