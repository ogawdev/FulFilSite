require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./model/userSchema");

const app = express();

require("./model/userSchema");
// Database configuration
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("DB connected =>", process.env.MONGO_URL);
});

const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.TOKEN, {
  polling: true,
});

bot.on("message", async (msg) => {
  if (msg.from.id == process.env.USER_ID) {
    let xl = require("excel4node");
    let wb = new xl.Workbook();
    const ws = wb.addWorksheet("Sheet 1");

    ws.cell(1, 1).string("№");
    ws.cell(1, 2).string("FISh");
    ws.cell(1, 3).string("Telefon");

    const userList = await User.find();

    for (let i = 0; i < userList.length; i++) {
      ws.cell(i + 2, 1).number(i + 1);
      ws.cell(i + 2, 2).string(`${userList[i].name}`);
      ws.cell(i + 2, 3).string(`${userList[i].phone}`);
    }

    ws.column(1).setWidth(5);
    ws.column(2).setWidth(40);
    ws.column(3).setWidth(30);

    wb.write("Excel.xlsx", async function (err, stats) {
      if (err) {
        bot.sendMessage(process.env.USER_ID, "Xatolik yuz berdi");
      } else {
        let file_path = path.join(__dirname, "Excel.xlsx");
        await bot.sendDocument(process.env.USER_ID, (document = file_path));
      }
    });
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  try {
    const { name, phone } = req.body;

    await User.create({
      name,
      phone,
    });

    res.render("songi");
  } catch (err) {
    res.render("404", {
      err,
    });
    console.log(err + "");
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log("listening on port " + process.env.PORT)
);
