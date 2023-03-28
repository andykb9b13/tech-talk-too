const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Comment, Post, User } = require("../Models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
    });
    const blogs = postData.map((b) => b.get({ plain: true }));
    const sessionData = {
      isLoggedIn: req.session.loggedIn,
      username: req.session.username,
    };
    res.render("homepage", { blogs, sessionData });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
      where: {
        user_id: req.session.user_id,
      },
    });
    const blogs = postData.map((b) => b.get({ plain: true }));
    const sessionData = {
      isLoggedIn: req.session.loggedIn,
      username: req.session.username,
    };
    console.log("This is the sessionData.username", sessionData.username);
    console.log("This is the blogs", blogs);
    res.render("dashboard", { blogs, sessionData });
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
      include: [
        {
          model: Comment,
          include: {
            model: User,
          },
        },
        { model: User },
      ],
    });
    const sessionData = {
      isLoggedIn: req.session.loggedIn,
      username: req.session.username,
    };
    const blog = blogData.get({ plain: true });
    console.log("This is blog", blog);
    res.render("blogPost", { blog, sessionData });
    // res.status(200).json(blog);
  } catch (err) {
    console.log(err);
    c;
    res.status(500).json(err);
  }
});

module.exports = router;
