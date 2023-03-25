const { Post } = require("../Models");

const seedData = [
  {
    post_id: "1",
    user_id: "1",
    post_title: "Eliminating Waste in Technology ",
    post_content:
      "This is a blog post about how much waste is produced by tech. There is a lot of it. We need to be using more recycled products if possible so we don't pollute our environment.",
  },
  {
    post_id: "2",
    user_id: "2",
    post_title: "AI And Me",
    post_content:
      "AI is the wave of the future. It's crazy how far things have come in just the last few years. There a benefits and drawbacks depending on which way you look at it.",
  },
];

const seedPosts = () => Post.bulkCreate(seedData);

module.exports = seedPosts;
