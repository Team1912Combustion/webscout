<?php
print_r($_POST);

function load_data() {
	$d = "";
	$fp = fopen("matches.json","r");
	if(flock($fp,LOCK_EX)) {
		if(filesize("matches.json") > 0) {
			$content = fread($fp,filesize("matches.json"));
			$d = json_decode($content,true);
		}
		flock($fp,LOCK_UN);
		fclose($fp);

	} else {
		print("Failed to lock file.");
		http_response_code(500);
		fclose($fp);
	}
	return $d;
}


function save($data) {
	$json_str = json_encode($data);
	$fp = fopen("matches.json","w");
	if(flock($fp,LOCK_EX)) {
		fwrite($fp,$json_str);
		flock($fp,LOCK_UN);
		fclose($fp);
	} else {
		http_response_code(502);
		print("Failed to lock on write.");
		fclose($fp);

	}
}

$data = load_data();
$match_name = $_GET["match"];
if($match_name != NULL) {
	if(!array_key_exists($match_name,$data)) {
		print("Adding match: " . $match_name);
		$match = json_encode($_POST);
		$data[$match_name] = $match;
		save($data);
	}	
}

?>
