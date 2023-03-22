const User = require("./User");
const Post = require("./Post");
const Profile = requre("./Profile");
const Comment = require("./Comment");

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
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_d",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Comment,
  Post,
};
