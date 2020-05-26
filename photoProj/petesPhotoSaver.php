<?php

$data = json_decode(file_get_contents("php://input"));

var_dump($data);

if (isset($data)){
	$content = explode(',', $data->data)[1];
	$file = fopen($data->fileName, "wb");
	fwrite($file, base64_decode($content));
	fclose($file);
}

