import { useState } from "react";

type ResizedImages = {
  thumb?: string;
  list?: string;
  detail?: string;
};

export default function App() {
  const [images, setImages] = useState<ResizedImages>({});

  // 画像リサイズ関数
  const resizeImage = (file: File, maxWidth: number): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        const scale = maxWidth / img.width;
        const width = maxWidth;
        const height = img.height * scale;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        // WebPに変換（軽量）
        const dataUrl = canvas.toDataURL("image/webp", 0.8);
        resolve(dataUrl);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const thumb = await resizeImage(file, 300);
    const list = await resizeImage(file, 600);
    const detail = await resizeImage(file, 1200);

    setImages({ thumb, list, detail });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>画像アップロード</h2>
      <input type="file" accept="image/*" onChange={handleChange} />

      <h3>サムネイル（300px）</h3>
      {images.thumb && <img src={images.thumb} />}

      <h3>一覧（600px）</h3>
      {images.list && <img src={images.list} />}

      <h3>詳細（1200px）</h3>
      {images.detail && <img src={images.detail} />}
    </div>
  );
}
