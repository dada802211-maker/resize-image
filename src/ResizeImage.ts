import sharp from "sharp";

async function resizeImage() {
  await sharp("input.jpg")
    .resize({
      width: 800, // 横幅指定（縦は自動）
    })
    .toFormat("webp", { quality: 80 }) // WebPに変換
    .toFile("output.webp");

  console.log("変換完了");
}

resizeImage();
