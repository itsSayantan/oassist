<?php

if(isset($_POST)){
	$attdispid = htmlspecialchars(trim($_POST['attdispid']));
	$attdispdate = $_POST['attdispdate'];

	include('../connect.php');

	$q1 = 'SELECT * FROM `attendance` WHERE `attdate` = "' . $attdispdate . '"';
	$q1Exec = mysqli_query($conn, $q1);

	if($q1Exec && mysqli_num_rows($q1Exec)){
		$q2 = 'SELECT `empname` FROM `employees` WHERE `empid` = "' . $attdispid . '"';
		$q2Exec = mysqli_query($conn, $q2);

		if($q2Exec && mysqli_num_rows($q2Exec)){
			$r1 = mysqli_fetch_assoc($q1Exec);
			$r2 = mysqli_fetch_assoc($q2Exec);

			$attstring = $r1['attstring'];
			$empname = $r2['empname'];

			if($x = strpos($attstring, ($attdispid . '.'))){
				if(($attstring[$x-1] == '$') || (strpos($attstring, ('.' . $attdispid . '.')))){
					//Response text
					$resp = '<div class = "attdispdet">';
					$resp .= '<div><b>Employee ID: </b>' . $attdispid . '</div>';
					$resp .= '<div><b>Name: </b>' . $empname . '</div>';
					$resp .= '<div><b>Present: </b>Yes</div>';
					$resp .= '</div>';

					echo $resp;
				}else{
					//Response text
					$resp = '<div class = "attdispdet">';
					$resp .= '<div><b>Employee ID: </b>' . $attdispid . '</div>';
					$resp .= '<div><b>Name: </b>' . $empname . '</div>';
					$resp .= '<div><b>Present: </b>No</div>';
					$resp .= '</div>';

					echo $resp;
				}
			}else{
				//Response text
				$resp = '<div class = "attdispdet">';
				$resp .= '<div><b>Employee ID: </b>' . $attdispid . '</div>';
				$resp .= '<div><b>Name: </b>' . $empname . '</div>';
				$resp .= '<div><b>Present: </b>No</div>';
				$resp .= '</div>';

				echo $resp;
			}
		}else{
			echo '<div class = "empdisperr">Error: Entered Employee ID doesn\'t exist</div>';
		}
	}else{
		echo '<div class = "attdisperr">Error: There is no attendance record for this date.</div>';
	}
}else{
	echo 'Error: POST not set';
}

?>