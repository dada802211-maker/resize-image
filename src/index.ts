import express from "express";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const app = express();

// アップロード一時保存
const upload = multer({ dest: "tmp/" });

// 保存先
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// API
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    const filename = Date.now() + ".webp";
    const outputPath = path.join(uploadDir, filename);

    // リサイズ + WebP変換
    await sharp(file.path)
      .resize({ width: 800 })
      .toFormat("webp", { quality: 80 })
      .toFile(outputPath);

    // tmp削除
    fs.unlinkSync(file.path);

    res.json({
      url: `http://localhost:3000/uploads/${filename}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "アップロード失敗" });
  }
});

// 静的公開
app.use("/uploads", express.static("uploads"));

app.listen(3000, () => console.log("Server started"));
