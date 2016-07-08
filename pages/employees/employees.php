<?php

	if(isset($_GET)){
		$err = 0;
		$empName = htmlspecialchars($_GET['empName']);
		$empType = htmlspecialchars($_GET['empType']);
		$empDoj = htmlspecialchars($_GET['empDoj']);
		$empPh = htmlspecialchars($_GET['empPh']);
		$empEmail = htmlspecialchars($_GET['empEmail']);
		$empAdd = htmlspecialchars($_GET['empAdd']);
		$empPass = htmlspecialchars($_GET['empPass']);
		$empRPass = htmlspecialchars($_GET['empRPass']);

		if(strlen($empDoj) == 10){
			if($empDoj[2] == '/' && $empDoj[5] == '/'){
				
				if($empPass == $empRPass){
					//connect to the database

					require_once('connect.php');

					$qChkMobText = 'SELECT * FROM `employees` WHERE `phone` = "' . $empPh . '"';

					if(($qChkMobExec =  mysqli_query($conn, $qChkMobText))){
						if(!mysqli_num_rows($qChkMobExec)){
							$qStoreEmpText = 'INSERT INTO `employees` VALUES ("", "' . $empName . '", "' . $empType . '", "' . $empDoj . '", "' . $empPh . '", "' . $empEmail . '", "' . $empAdd . '", "' . $empPass . '", "Yes")';

							$qStoreEmpExec = mysqli_query($conn, $qStoreEmpText);

							if($qStoreEmpExec){

								$qGetEidText = 'SELECT * FROM `employees` WHERE `phone` = "' . $empPh . '"';

								if(($qGetEidExec = mysqli_query($conn, $qGetEidText))){
									if(mysqli_num_rows($qGetEidExec)){
										$row = mysqli_fetch_assoc($qGetEidExec);

										echo 'Employee added successfully!<p>Employee ID: <b>' . $row['eid'] . '</b></p>';
									}else{
										echo 'Error: Finding Mobile';
									}
								}
							}else{
								echo 'Error in adding employee';
							}
						}else{
							echo 'There is an employee with the entered mobile number. Two employees cannot have the same mobile number';
						}
					}else{
						echo 'Error: MQ';
					}
				}else{
					echo 'Password and Repeat Password should be same';
				}
			}
			else{
				$err = 1;
			}
		}else{
			$err = 1;
		}

		if($err == 1){
			echo '<h4>Error</h4><p>Date should be in dd/mm/yyyy format</p>';
		}

	}else{
		echo "GET NOT SET";
	}

?>