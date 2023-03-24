const { User } = require("../Models");

const seedData = [
  {
    user_id: "1",
    username: "tonyT",
    email: "tony@tony.com",
    password: "12345",
  },
  {
    user_id: "2",
    username: "maryM",
    email: "mary@mary.com",
    password: "12345",
  },
];

const seedUsers = () => User.bulkCreate(seedData);

module.exports = seedUsers;
