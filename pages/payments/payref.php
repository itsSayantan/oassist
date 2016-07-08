<?php

	require_once('connect.php');

	$qRefPayText = 'SELECT * FROM `payments`';

	$qRefPayExec = mysqli_query($conn, $qRefPayText);

	if($qRefPayExec){
		$n = mysqli_num_rows($qRefPayExec);
		if(!$n){
			$resp =  '<div class = "noPay">';
			$resp .= '<div class = "noPayText">No Payments</div>';
			$resp .= '</div>';

			echo $resp;	
		}
		else{

			$resp = '';

			for ($i=1; $i <= $n; $i++) {
				$qRowText = 'SELECT * FROM `payments` WHERE `pid` = "' . $i . '"';

				if(($qRowExec = mysqli_query($conn, $qRowText))){
					$row = mysqli_fetch_assoc($qRefPayExec);

					$resp .= '<div class = "rsicard1">';
					$resp .= '<div><b>Payment ID:</b> ' . $row['pid'] . '</div>';
					$resp .= '<div><b>Name:</b> ' . $row['name'] . '</div>';
					$resp .= '<div><b>Type:</b> ' . $row['type'] . '</div>';
					$resp .= '<div><b>Date:</b> ' . $row['date'] . '</div>';
					$resp .= '<div><b>Amount:</b> ' . $row['amount'] . '</div>';
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