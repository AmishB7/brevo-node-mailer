const brevo = require("@getbrevo/brevo");

module.exports = async ({ subject, bodyContent, receivers }) => {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const sendSmtpEmail = {
      subject,
      htmlContent: bodyContent,
      sender: { email: "contact@amishb.com.np", name: "AMISH" },
      replyTo: { email: "contact@amishb.com.np", name: "AMISH" },
      to: receivers.map((r) => ({ email: r.email, name: r.name || "" })),
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error(
      "Brevo email error:",
      JSON.stringify(error.response?.body || error, null, 2)
    );
  }
};
