<?php

if(isset($_POST)){
	$empdispid = trim($_POST['empdispid']);

	include('../connect.php');

	$q = 'SELECT * FROM `employees` WHERE `empid` = "' . $empdispid . '"';
	$qExec = mysqli_query($conn, $q);

	if($qExec && mysqli_num_rows($qExec)){
		$r = mysqli_fetch_assoc($qExec);

		$resp = '<div class = "empdispdet">';
		$resp .= '<div><b>Employee ID: </b>' . $r['empid'] . '</div>';
		$resp .= '<div><b>Name: </b>' . $r['empname'] . '</div>';
		$resp .= '<div><b>PAN Number: </b>' . $r['emppan'] . '</div>';
		$resp .= '<div><b>Type: </b>' . $r['emptype'] . '</div>';
		$resp .= '<div><b>Date of joining: </b>' . $r['empdoj'] . '</div>';
		$resp .= '<div><b>Phone: </b>' . $r['empphn'] . '</div>';
		$resp .= '<div><b>Email: </b>' . $r['empemail'] . '</div>';
		$resp .= '<div><b>Address: </b>' . $r['empaddr'] . '</div>';
		$resp .= '</div>';

		echo $resp;
	}else{
		echo '<div class = "empdisperr">Error: No such Employee found</div>';
	}
}else{
	echo 'Error: POST not set';
}

?>