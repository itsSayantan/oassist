<?php

	require_once('connect.php');

	$qRefAppText = 'SELECT * FROM `appointments`';

	$qRefAppExec = mysqli_query($conn, $qRefAppText);

	if($qRefAppExec){
		$n = mysqli_num_rows($qRefAppExec);
		if(!$n){
			$resp =  '<div class = "noApp">';
			$resp .= '<div class = "noAppText">No Appointments</div>';
			$resp .= '</div>';

			echo $resp;	
		}
		else{

			$resp = '';

			for ($i=1; $i <= $n; $i++) {
				$qRowText = 'SELECT * FROM `appointments` WHERE `aid` = "' . $i . '"';

				if(($qRowExec = mysqli_query($conn, $qRowText))){
					$row = mysqli_fetch_assoc($qRefAppExec);

					$resp .= '<div class = "rsicard0">';
					$resp .= '<div><b>Appointment ID:</b> ' . $row['aid'] . '</div>';
					$resp .= '<div><b>Name:</b> ' . $row['name'] . '</div>';
					$resp .= '<div><b>Type:</b> ' . $row['type'] . '</div>';
					$resp .= '<div><b>Date:</b> ' . $row['date'] . '</div>';
					$resp .= '<div><b>From:</b> ' . $row['from'] . '</div>';
					$resp .= '<div><b>To:</b> ' . $row['to'] . '</div>';
					$resp .= '</div>';
				}else{
					continue;
				}
			}

			echo $resp;
		}
	}else{
		echo 'Error';		
	}

?>