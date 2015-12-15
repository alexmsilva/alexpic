<?php

$photos = array(
	array('title' => "Leão", 'url' => "images/lion.jpg"),
	array('title' => "Urso", 'url' => "images/bear.jpg"),
	array('title' => "Gorila", 'url' => "images/gorilla.jpg"),
	array('title' => "Águia", 'url' => "images/eagle.jpg"),
);

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
	case 'DELETE':
		if (isset($_GET['id'])) {
			$photos = json_decode(file_get_contents("photos.txt"), true);
			$remain = array();
			foreach ($photos as $photo) {
				if ($photo['_id'] != $_GET['id']) {
					$remain[] = $photo;
				}
			}
			file_put_contents("photos.txt", json_encode($remain));
		}
		break;

	case 'POST':
		$postdata = json_decode(file_get_contents("php://input"), true);
		if (preg_match("/.+(\.\w{3,4})$/", $postdata['url'])) {
			$file_type = preg_replace("/.+(\.\w{3,4})$/", "$1", $postdata['url']);
			$image = file_get_contents($postdata['url']);
			$postdata['url'] = "data:image/jpg;base64,".base64_encode($image);
		}

		$data = json_decode(file_get_contents("photos.txt"), true);
		foreach ($data as $key => $photo) {
			if ($photo['_id'] == $postdata['_id']) {
				$data[$key] = $postdata;
				file_put_contents("photos.txt", json_encode($data));
				break;
			}
		}

		break;

	case 'PUT':
		$postdata = json_decode(file_get_contents("php://input"), true);
		
		$file_type = preg_replace("/.+(\.\w{3,4})$/", "$1", $postdata['url']);
		$image = file_get_contents($postdata['url']);
		$postdata['url'] = "data:image/jpg;base64,".base64_encode($image);

		$postdata['_id'] = md5($postdata['url'].date("Y-m-d H:i:s"));

		$data = json_decode(file_get_contents("photos.txt"), true);
		$data[] = $postdata;

		file_put_contents("photos.txt", json_encode($data));
		break;
	
	default:
		header('Content-Type: application/json');

		$data = file_get_contents("photos.txt");
		if (isset($_GET['id'])) {
			$photos = json_decode($data, true);
			foreach ($photos as $photo) {
				if ($photo['_id'] == $_GET['id']) {
					print json_encode($photo);
					break;
				}
			}
		}
		else {
			if ($data === FALSE) {
				foreach ($photos as $key => $photo) {
					$image = file_get_contents("../".$photo['url']);
					$data[] = array(
						'_id' => md5($photo['url'].date("Y-m-d H:i:s")),
						'title' => $photo['title'],
						'url' => "data:image/jpg;base64,".base64_encode($image)
					);
				}
				$data = json_encode($data);
				file_put_contents("photos.txt", $data);
			}
			print $data;
		}
		break;
} // end switch

?>