const sequelize = require("../config/connection");

const userSeeds = require("./userSeeds");
const postSeeds = require("./postSeeds");
const commentSeeds = require("./commentSeeds");
// const goalSeedData = require("./goalData");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await userSeeds();

  await postSeeds();

  await commentSeeds();

  process.exit(0);
};

seedDatabase();
