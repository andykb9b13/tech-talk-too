const router = require("express").Router();
const User = require("../../Models/User");
const Post = require("../../Models/Post");
const withAuth = require("../../utils/auth");
const Comment = require("../../Models/Comment");
// This is the api/user route

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
      req.session.email = newUser.email;
      req.session.loggedIn = true;

      res.json(newUser);
    });
    // res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
      req.session.email = user.email;
      req.session.loggedIn = true;

      res.json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

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

router.get("/blog", async (req, res) => {
  try {
    console.log("In the get blogs route");
    const postData = await Post.findAll();
    const blogs = postData.map((b) => b.get({ plain: true }));
    // res.status(200).json(blogData);
    console.log("Getting blogs", blogs);

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/comment/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
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

router.get("/comment", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/comment", async (req, res) => {
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

router.get("/test/:id", async (req, res) => {
  try {
    const response = await User.findOne({
      include: Post,
      where: {
        user_id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
