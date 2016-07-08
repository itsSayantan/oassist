<?php

	if(isset($_GET)){
		$err = 0;
		$appName = htmlspecialchars($_GET['appName']);
		$appType = htmlspecialchars($_GET['appType']);
		$appTimeFrom = htmlspecialchars($_GET['appTimeFrom']);
		$appTimeTo = htmlspecialchars($_GET['appTimeTo']);
		$appTimeDate = htmlspecialchars($_GET['appTimeDate']);

		if(strlen($appTimeFrom) == 5 && strlen($appTimeTo) == 5 && strlen($appTimeDate) == 10){
			if($appTimeFrom[2] == ':' && $appTimeTo[2] == ':' && $appTimeDate[2] == '/' && $appTimeDate[5] == '/'){
				
				//connect to the database

				require_once('connect.php');

				$qStoreAppText = 'INSERT INTO `appointments` VALUES ("", "' . $appName . '", "' . $appType . '", "' . $appTimeFrom . '", "' . $appTimeTo . '", "' . $appTimeDate . '")';

				$qStoreAppExec = mysqli_query($conn, $qStoreAppText);

				if($qStoreAppExec){
					echo 'Appointment fixed successfully';
				}else{
					echo 'Error in fixing appointment';
				}

			}
			else{
				$err = 1;
			}
		}else{
			$err = 1;
		}

		if($err == 1){
			echo '<h4>Error</h4><p>Time should be in hh:mm format</p><p>Date should be in dd/mm/yyyy format</p>';
		}

	}else{
		echo "GET NOT SET";
	}

?>