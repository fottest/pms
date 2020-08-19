<?php
date_default_timezone_set('America/Los_Angeles');
$currentDate = date("YmdH");
$fileName    = "data/Test_". $currentDate .".csv";

if(file_exists($fileName))
{
    $date       = $currentDate;
    $server     = "RDP-1";
    $status     = "OK";
    $type       = "Regular";
    $requestUrl = "https://hook.integromat.com/54u8xjckpokitid88ss5xm6qczu71506";
    $url        = "https://george-labbmiljo.github.io/pms/88f8adf2530eba177361d604a43acf6d32bb2d10/".$currentDate."/index.html";

    $formData = array(
        'date'   => $date,
        'url'    => $url, 
        'status' => $status,
        'server' => $server,
        'type'  => $type
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
