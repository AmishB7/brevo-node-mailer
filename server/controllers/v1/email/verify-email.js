const verifyEmailService = require("../../../services/v1/email");

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await verifyEmailService.verifyEmail(decoded.id);

    res.redirect(`${process.env.FRONTEND_URL}/login?verified=true`);
  } catch (err) {
    next(err);
  }
};
