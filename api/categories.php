<?php
$categories = array(
	array('_id'=>1, 'name'=>"Animais"),
	array('_id'=>2, 'name'=>"Bolas"),
	array('_id'=>3, 'name'=>"Carros"),
	array('_id'=>4, 'name'=>"Motos"),
	array('_id'=>5, 'name'=>"Pontes")
);
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "GET") {
	header('Content-Type: application/json');
	print json_encode($categories);
}
?>