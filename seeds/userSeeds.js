const { User } = require("../Models");

const seedData = [
  {
    user_id: "1",
    username: "techHead234",
    email: "tony@tony.com",
    password: "12345",
  },
  {
    user_id: "2",
    username: "maryMaryQuiteContrary",
    email: "mary@mary.com",
    password: "12345",
  },
  {
    user_id: "3",
    username: "remmy436",
    email: "remmy@remmy.com",
    password: "12345",
  },
];

const seedUsers = () => User.bulkCreate(seedData);

module.exports = seedUsers;
