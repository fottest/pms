<?php

if(isset($_POST['process']))
{
    $url = "https://george-labbmiljo.github.io/pms/" . $_POST['inputDate'];
    header("Location: $url");  
    exit;
}
