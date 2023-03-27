const router = require("express").Router();
const withAuth = require("../utils/auth");
// const Post = require("../Models");
// const User = require("../Models");
const { Comment, Post, User } = require("../Models");

router.get("/", async (req, res) => {
  console.log("In the / route");
  try {
    const postData = await Post.findAll();
    const blogs = postData.map((b) => b.get({ plain: true }));
    console.log("This is the blogs data", blogs);
    res.render("homepage", { blogs });
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
    console.log("This is blogData from id route", blogData);
    const blog = blogData.get({ plain: true });
    res.render("blogPost", { blog });
    // res.status(200).json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
