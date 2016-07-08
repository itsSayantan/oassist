<?php

	if(isset($_GET)){

		require_once('connect.php');

		$qRemAppChkText = 'SELECT * FROM `appointments` WHERE `aid` = "' . $_GET['aid'] . '"';

		if(($qRemAppChkExec = mysqli_query($conn, $qRemAppChkText))){
			if(!mysqli_num_rows($qRemAppChkExec)){
				echo 'Invalid Input';
			}
			else{
				$qRemAppText = 'DELETE FROM `appointments` WHERE `aid` = "' . $_GET['aid'] . '"';

				if(mysqli_query($conn, $qRemAppText)){
					echo 'Appointment successfully Removed';
				}else{
					echo 'Appointment could not be removed';
				}
			}
		}else{
			echo 'Something went wrong';
		}

	}else{
		echo 'GET NOT SET';
	}

?>