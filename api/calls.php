<?php
//header('Content-Type: application/json');

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

	case 'new':
		// não faz nada não é o foco do curso
		$postdata = file_get_contents("php://input");
		$postdata = json_decode($postdata, true);

		$file_type = preg_replace("/.+(\.\w{3,4})$/", "$1", $postdata['url']);
		$image = file_get_contents($postdata['url']);

		$photo = array(
			'title' => $postdata['title'],
			'url' => "data:image/{$file_type};base64,".base64_encode($image);
		);

		print(json_encode($photo));
		break;
	
	default:
		print json_encode(array('success' => "false"));
		break;
}
?>