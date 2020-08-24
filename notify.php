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
    $url        = "https://fottest.github.io/pms/88f8adf2530eba177361d604a43acf6d32bb2d10/".$currentDate."/";

    $data     = array();
    $errors   = array();
    $warnings = array();
    $errCount = 0;
    $warnCount = 0;

    // Extract csv content
    $data = csvExtractor($fileName);

    // Check errors
    $errors = getError($data);    
    $errCount = count($errors);
    if($errCount  > 0)
    {
        $status = "NOT OK";
    }

    // Check warning
    $warnings = getWarning($data);
    $warnCount = count($warnings);

    // Prepare data
    $formData = array(
        'date'          => $date,
        'url'           => $url, 
        'status'        => $status,
        'server'        => $server,
        'type'          => $type,
        'error_count'   => $errCount,
        'errors'        => $errors,
        'warning_count' => $warnCount,
        'warnings'      => $warnings,
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

/*
|--------------------------------------------------------------------------
| getError
|--------------------------------------------------------------------------
|
| Description   : This function will get all
|               : request error
| Parameters    : $data
| Return Value  : error array
| References    :
|--------------------------------------------------------------------------
*/
function getError($data)
{
    $errors = array();

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
    return $errors;
}

/*
|--------------------------------------------------------------------------
| getWarning
|--------------------------------------------------------------------------
|
| Description   : This function will get all
|               : request warning that goes beyond time limit
| Parameters    : $data
| Return Value  : warning array
| References    :
|--------------------------------------------------------------------------
*/

function getWarning($data)
{
    $warnings = array();

    foreach($data as $key => $value)
    {
        if($value['label'] == "Test Archive"         && $value['elapsed'] > 150 
        || $value['label'] == "Test Comment"         && $value['elapsed'] > 450
        || $value['label'] == "Test Complete Task"   && $value['elapsed'] > 3000
        || $value['label'] == "Test Create Task"     && $value['elapsed'] > 5000
        || $value['label'] == "Test Edit Task"       && $value['elapsed'] > 2000
        || $value['label'] == "Test Login Board"     && $value['elapsed'] > 10000
        || $value['label'] == "Test Login Employee"  && $value['elapsed'] > 700
        || $value['label'] == "Test Logout Board"    && $value['elapsed'] > 200
        || $value['label'] == "Test Logout Employee" && $value['elapsed'] > 200)
        {
            array_push($warnings, (object)[
                "label"      => $value['label'],
                "elapsed"    => $value['elapsed'],
            ]);
        }
    }

    return $warnings;
}