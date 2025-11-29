// * Import Module Dependencies
const express = require("express");
require("dotenv").config({ path: "./.env" });

const errorHandler = require("errorhandler");

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/api", require("./routes/v1"));

if (process.env.NODE_ENV !== "production") {
  app.use(errorHandler());
}

app.use((err, _req, res, next) => {
  if (!err) {
    next();
    return;
  }

  return res
    .status(err?.statusCode || err?.status || 500)
    .json({ message: err?.message || "Something Went Wrong" });
});

app.listen(app.get("port"), () => {
  console.log(`listening on *:${app.get("port")} in ${app.get("env")} mode`);
});
