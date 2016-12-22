<?php

if(isset($_POST)){
	$empname = htmlspecialchars(trim($_POST['empname']));
	$emppan = $_POST['emppan'];
	$emptype = htmlspecialchars(trim($_POST['emptype']));
	$empdoj = $_POST['empdoj'];
	$empphn = $_POST['empphn'];
	$empemail = $_POST['empemail'];
	$empaddr = htmlspecialchars(trim($_POST['empaddr']));
	$emppass = md5(htmlspecialchars(trim($_POST['emppass'])));

	include('../connect.php');

	$q1 = 'SELECT `empid` FROM `employees` WHERE `emppan` = "' . $emppan . '"';
	$q1Exec = mysqli_query($conn, $q1);

	if($q1Exec && mysqli_num_rows($q1Exec)){
		echo 'Error: An employee already exists for the given PAN number. Please contact admin';
	}else{
		$q = 'INSERT INTO `employees` VALUES("", "' . $empname . '", "' . $emppan . '", "' . $emptype . '", "' . $empdoj . '", "' . $empphn . '", "' . $empemail . '", "' . $empaddr . '", "' . $emppass . '")';

		$qExec = mysqli_query($conn, $q);

		if($qExec){
			$q2 = 'SELECT `empid` FROM `employees` WHERE `emppan` = "' . $emppan . '"';
			$q2Exec = mysqli_query($conn,$q2);

			if($q2Exec && mysqli_num_rows($q2Exec)){
				$r2 = mysqli_fetch_assoc($q2Exec);

				echo 'Employee data successfully stored. The employee ID is: ' . $r2['empid'] . '. Note this for future correspondence.';
			}else{
				echo 'Error: Something went wrong while storing employee information. Please contact admin.';
			}
		}else{
			echo 'Error: Employee could not be added.';
		}
	}
}else{
	echo 'Error: POST not set';
}

?>