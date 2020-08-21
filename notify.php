<?php
date_default_timezone_set('America/Los_Angeles');
$currentDate = date("YmdH");
$fileName    = "data/Test_". $currentDate .".csv";

if(file_exists($fileName))
{
    $date       = $currentDate;
    $server     = "DEVELOPMENT";
    $status     = "OK";
    $type       = "Regular";
    $requestUrl = "https://hook.integromat.com/lpzfj2npx1mqy6yck0nzv9j9isjepd1b";
    $url        = "https://fottest.github.io/pms/88f8adf2530eba177361d604a43acf6d32bb2d10/".$currentDate."/index.html";

    $data = array();
    $errors = array();
    $errCount = 0;

    // Extract csv content
    $data = csvExtractor($fileName);

    foreach($data as $key => $value)
    {
        if($value['success'] == 'false' && $value['URL'] !== 'null')
        {
            array_push($errors, (object)[
                "label"      => $value['label'],
                "error_code" => $value['responseCode'],
                "url"        => $value['URL']
            ]);
        };
    }
    
    $errCount = count($errors);
    if($errCount  > 0)
    {
        $status = "NOT OK";
    }

    // Prepare data
    $formData = array(
        'date'      => $date,
        'url'       => $url, 
        'status'    => $status,
        'server'    => $server,
        'type'      => $type,
        'err_count' => $errCount,
        'errors'    => $errors
    );

    sendData($formData, $requestUrl);

}

/*
|--------------------------------------------------------------------------
| sendData
|--------------------------------------------------------------------------
|
| Description   : This function will send post request
|               : to integromat 
| Parameters    : $data, $rURL
| Return Value  : status
| References    :
|--------------------------------------------------------------------------
*/
function sendData($data, $rURL)
{
    $str = http_build_query($data);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $rURL);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $str);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $output = curl_exec($ch);
    curl_close($ch);

    echo $output;
}

/*
|--------------------------------------------------------------------------
| csvExtractor
|--------------------------------------------------------------------------
|
| Description   : This function will extract content
|               : of the csv file
| Parameters    : $file
| Return Value  : data array
| References    :
|--------------------------------------------------------------------------
*/
function csvExtractor($file)
{
    $csv = array_map('str_getcsv', file($file));
    array_walk($csv, function(&$a) use ($csv) {
      $a = array_combine($csv[0], $a);
    });
    array_shift($csv);

    return $csv;
}
