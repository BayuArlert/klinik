<?php
$descriptorspec = [
    0 => ['pipe', 'r'],
    1 => ['pipe', 'w'],
    2 => ['pipe', 'w'],
];

$process = proc_open('php vendor/bin/phpstan analyse --no-ansi --no-progress', $descriptorspec, $pipes, __DIR__);

if (is_resource($process)) {
    fclose($pipes[0]);
    $stdout = stream_get_contents($pipes[1]);
    $stderr = stream_get_contents($pipes[2]);
    fclose($pipes[1]);
    fclose($pipes[2]);
    $return = proc_close($process);
    
    echo "Exit code: $return\n";
    echo "STDOUT:\n$stdout\n";
    echo "STDERR:\n$stderr\n";
} else {
    echo "Failed to open process\n";
}
