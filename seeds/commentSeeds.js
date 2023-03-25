const { Comment } = require("../Models");

const seedData = [
  {
    comment_id: "1",
    user_id: "1",
    post_id: "2",
    comment_text: "AI is the greatest! I love this post! ",
  },
  {
    comment_id: "2",
    user_id: "2",
    post_id: "1",
    comment_text:
      "This is such an important topic and I hope that people will wake up and take this more seriously!",
  },
  {
    comment_id: "3",
    user_id: "2",
    post_id: "2",
    comment_text: "AI is the worst!! It's going to take all of our jobs!!",
  },
];

const seedComments = () => Comment.bulkCreate(seedData);

module.exports = seedComments;
