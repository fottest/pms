<?php
date_default_timezone_set('America/Los_Angeles');
$currentDate = date("Ymd");
$fileName    = "Test_". $currentDate .".csv";

if(file_exists($fileName))
{
    $server     = "RDP-1";
    $title      = "Performance Test Result - ". $currentDate;
    $url        = "pms-performance.local";
    $requestUrl = "https://hook.integromat.com/hwtsd7lac21ft7bxu4r51apyi1xy282k";

    $formData = array(
        'server' => $server,
        'title'  => $title,
        'url'    => $url 
    );

    $str = http_build_query($formData);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $requestUrl);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $str);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $output = curl_exec($ch);
    curl_close($ch);

    echo $output;
}
