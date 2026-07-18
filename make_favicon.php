<?php
$src_path = __DIR__ . '/public/logo.png';
$dest_path = __DIR__ . '/public/favicon.png';

$src_img = imagecreatefrompng($src_path);
if (!$src_img) {
    die("Error loading image.\n");
}

$w = imagesx($src_img);
$h = imagesy($src_img);
$min = min($w, $h);

$src_sq = imagecreatetruecolor($min, $min);
imagecopyresampled($src_sq, $src_img, 0, 0, ($w-$min)/2, ($h-$min)/2, $min, $min, $min, $min);

$new_img = imagecreatetruecolor($min, $min);
imagesavealpha($new_img, true);
$trans = imagecolorallocatealpha($new_img, 0, 0, 0, 127);
imagefill($new_img, 0, 0, $trans);

for ($x = 0; $x < $min; $x++) {
    for ($y = 0; $y < $min; $y++) {
        $dx = $x - ($min/2) + 0.5;
        $dy = $y - ($min/2) + 0.5;
        if (($dx*$dx + $dy*$dy) <= ($min/2 * $min/2)) {
            $color = imagecolorat($src_sq, $x, $y);
            imagesetpixel($new_img, $x, $y, $color);
        }
    }
}

imagepng($new_img, $dest_path);
echo "Favicon generated successfully.\n";
