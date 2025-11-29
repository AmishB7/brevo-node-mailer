const { User } = require("../../../models");

module.exports = async (userId) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
    attributes: ["id", "isEmailVerified", "emailVerificationToken"],
  });
  if (!user) {
    throw new Error("Invalid or expired token", 400);
  }

  await user.update({ isEmailVerified: true, emailVerificationToken: null });
  return user;
};
