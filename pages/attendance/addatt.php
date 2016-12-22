<?php

if(isset($_POST)){
	$attid = trim($_POST['attid']);
	$attdate = $_POST['attdate'];
	$attpass = md5(trim($_POST['attpass']));

	include('../connect.php');

	$q1 = 'SELECT * FROM `employees` WHERE `empid` = "' . $attid . '" AND `emppass` = "' . $attpass . '"';
	$q1Exec = mysqli_query($conn, $q1);

	if($q1Exec && mysqli_num_rows($q1Exec)){
		$q2 = 'SELECT `attstring` FROM `attendance` WHERE `attdate` = "' . $attdate . '"';
		$q2Exec = mysqli_query($conn, $q2);

		if($q2Exec && mysqli_num_rows($q2Exec)){
			$r2 = mysqli_fetch_assoc($q2Exec);
			$attstring = $r2['attstring'];
			$attid .= '.';

			if($x=strpos($attstring, $attid)){
				if($attstring[$x-1] == '$' || $attstring[$x-1] == '.'){
					echo 'Attendance for this employee is already recorded today.';	
				}else{
					$attstring .= $attid;
					$q4 = 'UPDATE `attendance` SET `attstring` = "' . $attstring . '" WHERE `attdate` = "' . $attdate . '"';
					$q4Exec = mysqli_query($conn, $q4);

					if($q4Exec){
						echo 'Attendance successfully stored';
					}else{
						echo 'Something went wrong while storing the attendance. Please contact admin.';
					}
				}
			}else{
				$attstring .= $attid;
				$q4 = 'UPDATE `attendance` SET `attstring` = "' . $attstring . '" WHERE `attdate` = "' . $attdate . '"';
				$q4Exec = mysqli_query($conn, $q4);

				if($q4Exec){
					echo 'Attendance successfully stored';
				}else{
					echo 'Something went wrong while storing the attendance. Please contact admin.';
				}
			}
		}else{
			//Add fresh attendance
			$q3 = 'INSERT INTO `attendance` VALUES("", "' . $attdate . '", "$' . $attid . '.")';
			$q3Exec = mysqli_query($conn, $q3);

			if($q3Exec){
				echo 'Attendance successfully stored.';
			}else{
				echo 'Something went wrong while storing the attendance. Please contact admin.';
			}
		}
	}else{
		echo 'Error: Invalid Employee ID and Password combination. Try again.';
	}
}else{
	echo 'Error: POST not set';
}

?>