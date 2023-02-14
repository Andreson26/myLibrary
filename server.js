if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require("express");
const mongoose = require('mongoose');
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: "true",
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to mongoose"));

app.use("/", indexRouter)

app.listen(PORT, () => console.log(`server connect on port ${PORT}`));
