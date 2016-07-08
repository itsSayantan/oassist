<?php

	if(isset($_GET)){

		require_once('connect.php');

		$qRemEmpChkText = 'SELECT * FROM `employees` WHERE `eid` = "' . $_GET['eid'] . '"';

		if(($qRemEmpChkExec = mysqli_query($conn, $qRemEmpChkText))){
			if(!mysqli_num_rows($qRemEmpChkExec)){
				echo 'Invalid Input';
			}
			else{
				$row = mysqli_fetch_assoc($qRemEmpChkExec);

				if($_GET['pass'] == $row['password']){
					$qRemEmpText = 'UPDATE `employees` SET `present` = "No" WHERE `eid` = "' . $_GET['eid'] . '"';

					if(mysqli_query($conn, $qRemEmpText)){
						echo 'Employee successfully Removed';
					}else{
						echo 'Employee could not be removed';
					}
				}
				else{
					echo 'Passwords do not match';
				}
			}
		}else{
			echo 'Something went wrong';
		}

	}else{
		echo 'GET NOT SET';
	}

?>