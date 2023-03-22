const User = require("./User");
const Post = require("./Post");
const Profile = requre("./Profile");

User.hasOne(Profile, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Profile.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Post.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Profile, Post };
