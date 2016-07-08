<?php

	if(isset($_GET)){

		$eid = $_GET['eid'];

		require_once('connect.php');

		$qRefEmpText = 'SELECT * FROM `employees` WHERE `eid` = "' . $eid . '"';

		$qRefEmpExec = mysqli_query($conn, $qRefEmpText);

		if($qRefEmpExec){
			$n = mysqli_num_rows($qRefEmpExec);

			$resp = '';

			if(!$n){
				$resp =  '<div class = "noEmp">';
				$resp .= '<div class = "noEmpText">No such employee present</div>';
				$resp .= '</div>';

				echo $resp;	
			}
			else{

				$row = mysqli_fetch_assoc($qRefEmpExec);

				$resp .= '<div class = "rsicard2">';
				$resp .= '<div><b>Employee ID:</b> ' . $row['eid'] . '</div>';
				$resp .= '<div><b>Name:</b> ' . $row['name'] . '</div>';
				$resp .= '<div><b>Type:</b> ' . $row['type'] . '</div>';
				$resp .= '<div><b>Date of joining:</b> ' . $row['doj'] . '</div>';
				$resp .= '<div><b>Phone:</b> ' . $row['phone'] . '</div>';
				$resp .= '<div><b>Email:</b> ' . $row['email'] . '</div>';
				$resp .= '<div><b>Address:</b> ' . $row['address'] . '</div>';
				$resp .= '<div><b>Working:</b> ' . $row['present'] . '</div>';
				$resp .= '</div>';
				echo $resp;
			}
		}else{
			echo 'Error';		
		}
	}else{
		echo 'GET NOT SET';
	}
?>