const express = require("express");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const commentRoute = require("./routes/comment")
const multer = require("multer");
const path = require("path");
const sitemapRouter = require("./routes/sitemapRouter");

//to enable Cross Origin Api call
var cors = require('cors');


dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));


const port = process.env.PORT || 5000;


app.get("/status",(req, res)=>{
  res.json("Server Start");
})

app.use("/", sitemapRouter);


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

// to upload the file
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// Routes Mapping
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/comments", commentRoute);

app.listen(port, () => {
  console.log("Backend is running.");
});
