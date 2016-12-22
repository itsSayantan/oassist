<?php

if(isset($_POST)){
	$appdispiddate = $_POST['appdispiddate'];
	$opt = $_POST['opt'];

	include('../connect.php');

	if($opt == 1){
		$q = 'SELECT * FROM `appointments`';
		$qExec = mysqli_query($conn, $q);

		if($qExec && ($n = mysqli_num_rows($qExec))){

			//Response Text
			$resp = '';
			//counter
			$count = 0;

			for ($i=1; $i <= $n; $i++) { 
				$q1 = 'SELECT * FROM `appointments` WHERE `appid` = "' . $i . '"';
				$q1Exec = mysqli_query($conn, $q1);

				if($q1Exec && mysqli_num_rows($q1Exec)){
					$r1 = mysqli_fetch_assoc($qExec);

					if(strcmp($appdispiddate, $r1['appdate'])){
						continue;
					}else{
						$count++;
					}

					$resp .= '<div class = "appdispeach">';
					$resp .= '<div><b>Appointment ID: </b>' . $r1['appid'] . '</div>';
					$resp .= '<div><b>Name: </b>' . $r1['appname'] . '</div>';
					$resp .= '<div><b>Type: </b>' . $r1['apptype'] . '</div>';
					$resp .= '<div><b>Date: </b>' . $r1['appdate'] . '</div>';
					$resp .= '<div><b>Time: </b>' . $r1['apptimeh'] . ':' . $r1['apptimem'] .  '</div>';
					//Close response
					$resp .= '</div>';
				}
			}

			if(!$count){
				//Error: No appointment found for this date: Code 3
				echo '3';
			}else{
				$count = 0;
				echo $resp;
			}
		}else{
			//Error: No Appointments found: Code 1
			echo '1';
		}
	}else{
		$q = 'SELECT * FROM `appointments` WHERE `appid` = "' . $appdispiddate . '"';
		$qExec = mysqli_query($conn, $q);

		if($qExec && mysqli_num_rows($qExec)){

			$r1 = mysqli_fetch_assoc($qExec);

			$resp = '<div class = "appdispeach">';
			$resp .= '<div><b>Appointment ID: </b>' . $r1['appid'] . '</div>';
			$resp .= '<div><b>Name: </b>' . $r1['appname'] . '</div>';
			$resp .= '<div><b>Type: </b>' . $r1['apptype'] . '</div>';
			$resp .= '<div><b>Date: </b>' . $r1['appdate'] . '</div>';
			$resp .= '<div><b>Time: </b>' . $r1['apptimeh'] . ':' . $r1['apptimem'] .  '</div>';

			echo $resp;
		}else{
			//Errpr: No such Appointment found: Code 2
			echo '2';
		}
	}
}else{
	echo 'Error: POST not set';
}

?>