<?php
header("Content-Type: application/json");

if (!isset($_FILES['image'])) {
  echo json_encode(["error" => "ファイルなし"]);
  exit;
}

$file = $_FILES['image']['tmp_name'];

$src = imagecreatefromstring(file_get_contents($file));

$width = imagesx($src);
$height = imagesy($src);

// サイズ変更
$newWidth = 800;
$newHeight = intval($height * ($newWidth / $width));

$dst = imagecreatetruecolor($newWidth, $newHeight);
imagecopyresampled($dst, $src, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

// 保存
$filename = time() . ".jpg";
$path = "uploads/" . $filename;

imagejpeg($dst, $path, 80);

imagedestroy($src);
imagedestroy($dst);

echo json_encode([
  "url" => "http://localhost/your-project/uploads/" . $filename
]);
