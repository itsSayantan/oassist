<?php

	if(isset($_GET)){

		require_once('connect.php');

		$qRemPayChkText = 'SELECT * FROM `payments` WHERE `pid` = "' . $_GET['pid'] . '"';

		if(($qRemPayChkExec = mysqli_query($conn, $qRemPayChkText))){
			if(!mysqli_num_rows($qRemPayChkExec)){
				echo 'Invalid Input';
			}
			else{
				$qRemPayText = 'DELETE FROM `payments` WHERE `pid` = "' . $_GET['pid'] . '"';

				if(mysqli_query($conn, $qRemPayText)){
					echo 'Payment schedule successfully Removed';
				}else{
					echo 'Payment schedule could not be removed';
				}
			}
		}else{
			echo 'Something went wrong';
		}

	}else{
		echo 'GET NOT SET';
	}

?>