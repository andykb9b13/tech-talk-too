// checks if user is signed in. redirects to login page if not logged in
const withAuth = (req, res, next) => {
  console.log("In the withAuth and here is sessionData", req.session);
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
