<?php

if(isset($_POST)){
	$appname = htmlspecialchars(trim($_POST['appname']));
	$apptype = htmlspecialchars(trim($_POST['apptype']));
	$appdate = $_POST['appdate'];
	$apptimeh = $_POST['apptimeh'];
	$apptimem = $_POST['apptimem'];

	include('../connect.php');

	$qChkDateTime = 'SELECT * FROM `appointments` WHERE `appdate`="' . $appdate . '" AND `apptimeh` = "' . $apptimeh . '" AND `apptimem` = "' . $apptimem . '"';

	$qChkDateTimeExec = mysqli_query($conn, $qChkDateTime);

	if($qChkDateTimeExec && mysqli_num_rows($qChkDateTimeExec)){
		//Appointment cannot be set on the date-time combination
		echo 'Error: An Appointment already exists on the same date and time.';
	}else{
		$qStoreApp = 'INSERT INTO `appointments` VALUES("", "' . $appname . '", "' . $apptype . '", "' . $appdate . '", "' . $apptimeh . '", "' . $apptimem . '")';

		$qStoreAppExec = mysqli_query($conn, $qStoreApp);

		if($qStoreAppExec){
			$q = 'SELECT `appid` FROM `appointments` WHERE `appdate` = "' . $appdate . '" AND `apptimeh` = "' . $apptimeh . '" AND `apptimem` = "' . $apptimem . '"';
			$qExec = mysqli_query($conn, $q);

			if($qExec && mysqli_num_rows($qExec)){
				$r = mysqli_fetch_assoc($qExec);

				echo 'Appointment successfully stored. Appointment ID: ' . $r['appid'] . '. Note this for future correspondence.';
			}else{
				echo 'Error: Something went wrong while storing appointment information. Please contact admin.';	
			}
		}else{
			echo 'Error: Apoointment could not be stored.';
		}
	}

}else{
	echo 'Error: POST not set';
}

?>