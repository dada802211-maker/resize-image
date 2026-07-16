<?php
$imagick = new Imagick("input.jpg");
$imagick->resizeImage(800, 0, Imagick::FILTER_LANCZOS, 1);
$imagick->setImageFormat("webp");
$imagick->setImageCompressionQuality(80);
$imagick->writeImage("output.webp");
