const express = require("express");
const app = express();
const port = 8081;
const database = require("./config/database.config");
const apiRoutersV1 = require("./api/v1/routers/index.router");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//cookie parser
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});
//parse application
app.use(bodyParser.json());

// Middleware để parse form-data
const upload = multer(); // multer không cần cấu hình đặc biệt nếu chỉ dùng để parse form-data
app.use(upload.none()); // parse form-data không có file upload

// parse application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//APIs
apiRoutersV1(app);

database.getConnection((error, connection) => {
  if (error) {
    console.error("Error connecting to database ", error);
    return;
  }
  console.log(
    "Connected to MySQL database",

    `host : ${database.config.connectionConfig.host} || port: ${database.config.connectionConfig.port}`
  );
  connection.release();
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
});
