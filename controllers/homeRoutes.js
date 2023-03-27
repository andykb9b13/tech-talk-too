const router = require("express").Router();
const withAuth = require("../utils/auth");
// const Post = require("../Models");
// const User = require("../Models");
const { Comment, Post, User } = require("../Models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();
    const blogs = postData.map((b) => b.get({ plain: true }));
    const sessionData = {
      isLoggedIn: req.session.loggedIn,
      username: req.session.username,
    };
    console.log("This is the sessionData", sessionData);
    res.render("homepage", { blogs, sessionData });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, (req, res) => {
  try {
    res.render("dashboard");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Post.findByPk(req.params.id, {
      // where: { post_id: req.params.id },
      include: [{ model: Comment }, { model: User }],
    });
    const sessionData = {
      isLoggedIn: req.session.loggedIn,
      username: req.session.username,
    };
    console.log("sessionData", sessionData);
    const blog = blogData.get({ plain: true });
    res.render("blogPost", { blog, sessionData });
    // res.status(200).json(blog);
  } catch (err) {
    console.log(err);
    c;
    res.status(500).json(err);
  }
});

module.exports = router;
