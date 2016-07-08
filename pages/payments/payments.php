<?php

	if(isset($_GET)){
		$err = 0;
		$payName = htmlspecialchars($_GET['payName']);
		$payType = htmlspecialchars($_GET['payType']);
		$payDate = htmlspecialchars($_GET['payDate']);
		$payAmount = htmlspecialchars($_GET['payAmount']);

		if(strlen($payDate) == 10){
			if($payDate[2] == '/' && $payDate[5] == '/'){
				
				//connect to the database

				require_once('connect.php');

				$qStorePayText = 'INSERT INTO `payments` VALUES ("", "' . $payName . '", "' . $payType . '", "' . $payDate . '", "' . $payAmount . '")';

				$qStorePayExec = mysqli_query($conn, $qStorePayText);

				if($qStorePayExec){
					echo 'Payment schedule created successfully';
				}else{
					echo 'Error in creating payment schedule';
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