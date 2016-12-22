<?php

/* Show all appointments of current date */

if(isset($_POST)){
	$cd = $_POST['cd'];
	$ch = $_POST['ch'];
	$cm = $_POST['cm'];

	include('../connect.php');

	$qChk = 'SELECT `appid` FROM `appointments`';

	$qChkExec = mysqli_query($conn, $qChk);

	if($qChkExec){
		if($n = mysqli_num_rows($qChkExec)){

			//Response text
			$resp = '';

			for ($i=1; $i <= $n; $i++) {
				$q = 'SELECT * FROM `appointments` WHERE `appdate` = "' . $cd . '" AND `appid` = ' . $i;

				if(mysqli_num_rows($qExec = mysqli_query($conn, $q))){
					$r1 = mysqli_fetch_assoc($qExec);
					$cdate = $r1['appdate'];
					$chour = $r1['apptimeh'];
					$cmin = $r1['apptimem'];

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

			if(!strlen($resp)){
				//No Upcoming Appointmnets present: code 3
				echo '3';	
			}else{
				echo $resp;
			}
		}else{
			//No Appointmnets present: Code 1
			echo '1';
		}
	}else{
		//Error: Could not fetch upcoming appointments: Code 2
		echo '2';
	}
}else{
	echo 'Error: POST not set';
}

?>