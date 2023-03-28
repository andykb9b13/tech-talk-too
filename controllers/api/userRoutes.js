const router = require("express").Router();
const User = require("../../Models/User");
const Post = require("../../Models/Post");
const withAuth = require("../../utils/auth");
const Comment = require("../../Models/Comment");
// This is the api/user route

// Returns all users
router.get("/", withAuth, async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new user
router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    console.log("This is newUser", newUser);

    req.session.save(() => {
      req.session.user_id = newUser.user_id;
      req.session.username = newUser.username;
      req.session.email = newUser.email;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// logs in a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.user_id;
      req.session.username = user.username;
      req.session.email = user.email;
      req.session.loggedIn = true;

      res.json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// logs out a user
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// creates a new blog post
router.post("/blog", async (req, res) => {
  try {
    const response = await Post.create({
      user_id: req.session.user_id,
      post_topic: req.body.post_topic,
      post_title: req.body.post_title,
      post_content: req.body.post_content,
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets all of the posts
router.get("/blog", async (req, res) => {
  try {
    const postData = await Post.findAll();
    const blogs = postData.map((b) => b.get({ plain: true }));
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// finds a specific post
router.get("/blog/:id", async (req, res) => {
  try {
    const blog = await Post.findOne({
      where: {
        post_id: req.params.id,
      },
    });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edits a post
router.put("/blog/:id", async (req, res) => {
  try {
    const editedPost = await Post.update(req.body, {
      where: {
        post_id: req.params.id,
      },
    });
    res.status(200).json(editedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// deletes a post
router.delete("/blog/:id", async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        post_id: req.params.id,
      },
    });
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets a comment by a particular id
router.get("/comment/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [{ model: User }],
      where: {
        post_id: req.params.id,
      },
    });
    const comments = commentData.map((c) => c.get({ plain: true }));
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets all the comments
router.get("/comment", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// creates a new comment
router.post("/comment", withAuth, async (req, res) => {
  try {
    const response = await Comment.create({
      post_id: req.body.post_id,
      user_id: req.session.user_id,
      comment_text: req.body.comment_text,
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
