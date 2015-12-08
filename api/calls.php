<?php
header('Content-Type: application/json');

$action = $_GET['action'];

$photos = array(
	array('title' => "Leão", 'url' => "images/lion.jpg"),
	array('title' => "Urso", 'url' => "images/bear.jpg"),
	array('title' => "Gorila", 'url' => "images/gorilla.jpg"),
	array('title' => "Águia", 'url' => "images/eagle.jpg"),
);

switch ($action) {
	case 'photos':
		print json_encode($photos);
		break;
	
	default:
		print json_encode(array('success' => "false"));
		break;
}
?>