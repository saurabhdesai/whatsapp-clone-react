import { MessageSharp } from "@mui/icons-material";
import express from "express";
// import mongoose from "mongoose";
import mongoose from "mongoose";
import messagecontents from "./dbmessages.js";
// const message = require("./dbmessages");
import Pusher from "pusher";
import cors from "cors";
const app = express();

const port = process.env.PORT || 9000;
const pusher = new Pusher({
  appId: "1357070",
  key: "0b4d5c0108a84ff63c3b",
  secret: "bac031dbd98712fba539",
  cluster: "ap2",
  useTLS: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("db connected");
  const msgcollection = db.collection("messagecontents");
  const changeStram = msgcollection.watch();
  changeStram.on("change", (change) => {
    console.log(change);
    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("error in trigerring");
    }
  });
});

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
const connection_url =
  "mongodb+srv://admin:admin@cluster0.bldpp.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  //   useCreateIndex: true,
  //   useNewUrlParse: true,
  //   useUnifiedTopology: true,
});
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/messages/new", (req, res) => {
  const dbmessages = req.body;
  // console.log(dbmessages);
  messagecontents.create(dbmessages, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/messages/get", (req, res) => {
  messagecontents.find((err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.listen(port, () => console.log(`listeningn on localhost:${port}`));
