<?php
$src = imagecreatefromjpeg("input.jpg");

$width = imagesx($src);
$height = imagesy($src);

// 新しいサイズ
$newWidth = 800;
$newHeight = intval($height * ($newWidth / $width));

$dst = imagecreatetruecolor($newWidth, $newHeight);

// リサイズ
imagecopyresampled($dst, $src, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

// 保存（品質80）
imagejpeg($dst, "output.jpg", 80);

imagedestroy($src);
imagedestroy($dst);

echo "完了";
