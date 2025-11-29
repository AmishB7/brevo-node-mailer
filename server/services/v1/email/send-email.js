const jwt = require("jsonwebtoken");

const mailer = require("../../../utils/mailer.js");

const handlebarsCompiler = require("../../../utils/handle-bar-compilers.js");

const { User } = require("../../../models");

module.exports = async (createObj) => {
  const user = await User.create({
    email: createObj.email,
    username: createObj.username,
    isEmailVerified: false,
  });

  if (!user) {
    throw new Error("Failed to create user", 500);
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  await user.update({ emailVerificationToken: token });

  try {
    const htmlContent = await handlebarsCompiler("verifyEmail", {
      email: user.email,
      username: user.username,
      token,
    });

    await mailer({
      subject: "Verify Your Email",
      bodyContent: htmlContent,
      receivers: [{ email: user.email, name: user.username }],
    });
  } catch (emailErr) {
    console.error(
      "Brevo email error:",
      emailErr?.response?.body || emailErr.message || emailErr
    );
  }

  return { message: "Email sent successfully" }, user;
};
