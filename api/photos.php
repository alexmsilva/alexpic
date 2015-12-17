<?php

$photos = array(
	array('title'=>"Leão",'url'=>"images/lion.jpg",'category'=>"1",'description'=>"O Leão é uma espécie de mamífero carnívoro do gênero Panthera e da família Felidae."),
	array('title'=>"Harley Davidson",'url'=>"images/harley-davidson.jpg",'category'=>"4",'description'=>"Sportster é uma família de motocicletas custom da fabricante Harley-Davidson dos Estados Unidos."),
	array('title'=>"Urso",'url'=>"images/bear.jpg",'category'=>"1",'description'=>"Os Ursídeos constituem uma família mamíferos plantígrados, da ordem dos carnívoros, geralmente de grande porte."),
	array('title'=>"Futebol Americano",'url'=>"images/football.jpg",'category'=>"2",'description'=>"A bola de futebol americano é um equipamento desportivo utilizado nas competições de futebol americano."),
	array('title'=>"Gorila",'url'=>"images/gorilla.jpg",'category'=>"1",'description'=>"Os gorilas são mamíferos primatas pertencentes ao género Gorilla, endémicos das florestas tropicais do centro da África."),
	array('title'=>"Millau",'url'=>"images/millau.jpg",'category'=>"5",'description'=>"Millau é uma grande ponte suspensa por cabos que facilita a travessia do vale do rio Tarn, no sudoeste da França."),
	array('title'=>"Ferrari",'url'=>"images/ferrari.jpg",'category'=>"3",'description'=>"Direto da mente do Designer Sasha Selipanov, chega um inédito concept car do que poderá ser o futuro Ferrari 612 GTO."),
	array('title'=>"Jabulani",'url'=>"images/soccer.jpg",'category'=>"2",'description'=>"Jabulani é a bola de futebol que foi utilizada na Copa do Mundo FIFA de 2010, realizada na África do Sul."),
	array('title'=>"Águia",'url'=>"images/eagle.jpg",'category'=>"1",'description'=>"Águia é o nome comum dado a algumas aves de rapina geralmente de grande porte, carnívoras, e de grande acuidade visual."),
	array('title'=>"Golden Gate",'url'=>"images/golden-gate.jpg",'category'=>"5",'description'=>"A ponte é o principal cartão postal da cidade de São Francisco, uma das mais conhecidas construções dos Estados Unidos."),
	array('title'=>"Porsche Boxter",'url'=>"images/porsche.jpg",'category'=>"3",'description'=>"O Boxster é um modelo roadster de motor central produzido pela Porsche desde 1996.")
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

	case 'PUT':
		$postdata = json_decode(file_get_contents("php://input"), true);
		/*if (preg_match("/.+(\.\w{3,4})$/", $postdata['url'])) {
			$file_type = preg_replace("/.+(\.\w{3,4})$/", "$1", $postdata['url']);
			$image = file_get_contents($postdata['url']);
			$postdata['url'] = "data:image/jpg;base64,".base64_encode($image);
		}*/

		$data = json_decode(file_get_contents("photos.txt"), true);
		foreach ($data as $key => $photo) {
			if ($photo['_id'] == $postdata['_id']) {
				$data[$key] = $postdata;
				file_put_contents("photos.txt", json_encode($data));
				break;
			}
		}

		break;

	case 'POST':
		$postdata = json_decode(file_get_contents("php://input"), true);
		
		/*$file_type = preg_replace("/.+(\.\w{3,4})$/", "$1", $postdata['url']);
		$image = file_get_contents($postdata['url']);
		$postdata['url'] = "data:image/jpg;base64,".base64_encode($image);*/

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
						'category' => $photo['category'],
						'description' => $photo['description'],
						//'url' => "data:image/jpg;base64,".base64_encode($image)
						'url' => $photo['url']
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