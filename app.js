const express = require("express");
const messagesRoute = require("./routes/messages");

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));

app.use("/", messagesRoute);

app.listen(port, () => {
  console.log(`TMWSD is listening at http://localhost:${port}`);
});
