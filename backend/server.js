const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ 手动设置 CORS 响应头，解决跨域问题
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // 允许所有来源访问
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // 允许的请求方法
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// 配置文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const DATA_PATH = {
  food: path.join(__dirname, "data_food.json"),
  spots: path.join(__dirname, "data_spots.json"),
};

// 读取数据
const readData = (type) => {
  const filePath = DATA_PATH[type];
  if (!fs.existsSync(filePath)) return []; // 如果文件不存在，返回空数组

  const data = fs.readFileSync(filePath, "utf-8");

  try {
    return JSON.parse(data || "[]"); // 处理空文件
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return []; // 如果 JSON 格式错误，返回空数组
  }
};

// 写入数据
const writeData = (type, data) => {
  const filePath = DATA_PATH[type];
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// 获取内容
app.get("/api/food", (req, res) => {
  const data = readData("food");
  if (Array.isArray(data)) {
    res.json(data);
  } else {
    res.json([]); // 如果不是数组，返回空数组
  }
});

// 上传内容
app.post("/api/spots", upload.single("image"), (req, res) => {
  const { title } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

  const data = readData("spots");
  const newItem = { title, image: imageUrl };
  data.push(newItem);
  writeData("spots", data);

  res.json(newItem); // ✅ 只返回新上传的数据
});

app.post("/api/food", upload.single("image"), (req, res) => {
  const { title } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

  const data = readData("food");
  const newItem = { title, image: imageUrl };
  data.push(newItem);
  writeData("food", data);

  res.json(newItem); // ✅ 只返回新上传的数据
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
