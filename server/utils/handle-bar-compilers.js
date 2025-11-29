const fs = require("fs");
const path = require("path");
const HandleBars = require("handlebars");

HandleBars.registerHelper("GetLogo", () => {
  const imageUrl =
    "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU";

  return new HandleBars.SafeString(
    `<img src='${imageUrl}' alt='Logo' style='max-height: 40px; display: block' />`
  );
});

module.exports = async function (templateId, body = {}) {
  try {
    const filePath = path.join(__dirname, "../templates", templateId + ".hbs");
    const html = await fs.readFileSync(filePath, "utf-8");
    return HandleBars.compile(html)(body, {
      allowProtoPropertiesByDefault: true,
    });
  } catch (error) {
    console.error("Error loading template:", error.message);
    return "";
  }
};
