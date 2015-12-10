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
		$return = array();
		if (file_exists("photos.txt")) {
			$return = file_get_contents("photos.txt");
			print $return;
		}
		else {
			foreach ($photos as $photo) {
				$image = file_get_contents("../".$photo['url'], FILE_USE_INCLUDE_PATH);
				$return[] = array(
					'title' => $photo['title'],
					'url' => "data:image/jpg;base64,".base64_encode($image)
				);
			}
			file_put_contents("photos.txt", json_encode($return));
			print json_encode($return);
		}
		break;

	case 'new':
		// não faz nada não é o foco do curso
		$postdata = file_get_contents("php://input");
		$postdata = json_decode($postdata, true);

		$file_type = preg_replace("/.+(\.\w{3,4})$/", "$1", $postdata['url']);
		$image = file_get_contents($postdata['url']);

		$photo = array(
			'title' => $postdata['title'],
			'url' => "data:image/{$file_type};base64,".base64_encode($image)
		);

		$photos = json_decode(file_get_contents("photos.txt"), true);
		$photos[] = $photo;
		file_put_contents("photos.txt", json_encode($photos));
		break;

	case 'clear':
		unlink("photos.txt");
		break;
	
	default:
		print json_encode(array('success' => "false"));
		break;
}
?>