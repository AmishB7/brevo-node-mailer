const emailServices = require("../../../services/v1/email");

module.exports = async (req, res) => {
    const response = await emailServices.sendEmail(req.body);
    res.status(200).json(response);
};