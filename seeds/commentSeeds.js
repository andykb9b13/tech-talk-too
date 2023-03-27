const { Comment } = require("../Models");

const seedData = [
  {
    comment_id: "1",
    post_id: "1",
    user_id: "2",
    comment_text:
      "This is such an important topic and I hope that people will wake up and take this more seriously!",
  },
  {
    comment_id: "2",
    post_id: "2",
    user_id: "1",
    comment_text:
      "I'm so excited about AI. I use it for everything these days. I was making dinner the other night and I forgot some ingredients so I asked chatGPT what was a good substitute. Life saver!",
  },
  {
    comment_id: "3",
    post_id: "2",
    user_id: "2",
    comment_text: "AI is the worst!! It's going to take all of our jobs!!",
  },
  {
    comment_id: "4",
    post_id: "2",
    user_id: "3",
    comment_text: "Lighten up! It's the future man!",
  },
  {
    comment_id: "5",
    post_id: "2",
    user_id: "2",
    comment_text:
      "Are you going to tell your kids that when you lose your job!",
  },
  {
    comment_id: "6",
    post_id: "1",
    user_id: "3",
    comment_text:
      "We all need to do our part to save the environment! Make sure that you send your used electronics to someone who will recycle them!",
  },
  {
    comment_id: "7",
    post_id: "3",
    user_id: "1",
    comment_text:
      "It's really cool to see all the new stuff that comes out every year. I can't wait to see what 2023 and 2024 bring.",
  },
  {
    comment_id: "8",
    post_id: "3",
    user_id: "2",
    comment_text: "I agree! So exciting.",
  },
];

const seedComments = () => Comment.bulkCreate(seedData);

module.exports = seedComments;
