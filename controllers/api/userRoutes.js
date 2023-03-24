const router = require("express").Router();
const User = require("../../Models/User");
const Post = require("../../Models/Post");
const Profile = require("../../Models/Profile");
const withAuth = require("../../utils/auth");

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
      name: req.body.name,
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
      user_id: 1,
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

module.exports = router;
