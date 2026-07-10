<?php
$c = file_get_contents("C:\\php\\php.ini");
$c = str_replace(';extension_dir = "ext"', 'extension_dir = "ext"', $c);
file_put_contents("C:\\php\\php.ini", $c);
