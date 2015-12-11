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
			foreach ($photos as $key => $photo) {
				$image = file_get_contents("../".$photo['url'], FILE_USE_INCLUDE_PATH);
				$return[] = array(
					'_id' => ($key+1),
					'title' => $photo['title'],
					'url' => "data:image/jpg;base64,".base64_encode($image)
				);
			}
			file_put_contents("photos.txt", json_encode($return));
			print json_encode($return);
		}
		break;

	case 'new':
		$photos = json_decode(file_get_contents("photos.txt"), true);
		$postdata = file_get_contents("php://input");
		$postdata = json_decode($postdata, true);
		$file_type = preg_replace("/.+(\.\w{3,4})$/", "$1", $postdata['url']);
		$image = file_get_contents($postdata['url']);

		$photo = array(
			'_id' => count($photos)+1,
			'title' => $postdata['title'],
			'url' => "data:image/{$file_type};base64,".base64_encode($image)
		);

		$photos[] = $photo;
		file_put_contents("photos.txt", json_encode($photos));
		break;

	case 'edit':
		$postdata = file_get_contents("php://input");
		$postdata = json_decode($postdata, true);
		
		$photos = json_decode(file_get_contents("photos.txt"), true);
		
		foreach ($photos as $key => $p) {
			if ($p['_id'] == $postdata['_id']) {
				$photo = array('_id' => $postdata['_id'], 'title' => $postdata['title']);
				
				if (preg_match("/.+(\.\w{3,4})$/", $postdata['url'])) {
					$file_type = preg_replace("/.+(\.\w{3,4})$/", "$1", $postdata['url']);
					$image = file_get_contents($postdata['url']);
					$photo['url'] = "data:image/{$file_type};base64,".base64_encode($image);
				}
				else {
					//$photo['url'] = $postdata['url']; // isso vai dar zica
				}

				$photos[$key] = $photo;
				file_put_contents("photos.txt", json_encode($photos));
				break;
			}
		}

		break;

	case 'delete':
		$postdata = json_decode(file_get_contents("php://input"));
		$photos = json_decode(file_get_contents("photos.txt"), true);
		$remain = array();
		foreach ($photos as $photo) {
			if ($photo['_id'] != $postdata->id) {
				$remain[] = $photo;
			}
		}
		file_put_contents("photos.txt", json_encode($remain));

		break;

	case 'get':
		$postdata = json_decode(file_get_contents("php://input"));
		$photos = json_decode(file_get_contents("photos.txt"), true);
		$chosen = array();
		foreach ($photos as $photo) {
			if ($photo['_id'] == $postdata->id) {
				$chosen = $photo;
				break;
			}
		}

		if (count($chosen)) {
			print json_encode($chosen);
		}
		else {
			header('HTTP/1.1 500 Internal Server Error');
		}

		break;

	case 'clear':
		if (file_exists("photos.txt")) {
			unlink("photos.txt");
		}
		break;
	
	default:
		print json_encode(array('success' => "false"));
		break;
}
?>