/*

OAssist - Office Assistant

Author: Sayamtan Ghosh (http://github.com/itsSayantan)

OAssist is made for M/S. S.A. Construction as a part of the summer internship from 1st July 2016 to 30th July 2016

*/

$(document).ready(function(){

	// declaring global variables

	//apointments section global

	var appName,appType,appTimeFrom,appTimeTo,appTimeDate,addAppFeed,clearAppInt,appId,removeAppFeed;

	//payments section global

	var payName,payType,payDate,payAmount,addPayFeed,clearPayInt,payId,removePayFeed;

	//employee section global

	var empDisContainer;

	//set initial tabIndex and rightsec index

	var ti = 0;
	var rsi = 0;

	//set initial tab
	changeTab(ti);
	//set initial right section
	changeZIndex(rsi);
	//Refresh appointments
	refApp();

	$("#lmi0").click(function(){
		//change the index and the color of the tab
		ti = 0;
		changeTab(ti);
		//change the rightsec index and the z-index of the right section
		rsi = 0;
		changeZIndex(rsi);
		//Refresh appointments
		refApp();
	});

	$("#lmi1").click(function(){
		//change the index and the color of the tab
		ti = 1;
		changeTab(ti);
		//change the rightsec index and the z-index of the right section
		rsi = 1;
		changeZIndex(rsi);
		//Refresh Payments
		refPay();
	});

	$("#lmi2").click(function(){
		//change the index and the color of the tab
		ti = 2;
		changeTab(ti);
		//change the rightsec index and the z-index of the right section
		rsi = 2;
		changeZIndex(rsi);
	});



	// Appointments section

	$("#addAppBut").click(function(){

		//check all input fields
		checkInpApp();
	});

	$("#removeAppBut").click(function(){
		
		removeAppFeed = document.getElementById("removeAppFeed");
		appId = document.getElementById("appId");

		//check all input fields
		if(appId.value == ""){
			removeAppFeed.innerHTML = "All Fields are Mandatory";
		}else{

			//remove the data
			removeApp();
		}
	});

	function checkInpApp(){
		console.log("checkInpApp");

		addAppFeed = document.getElementById("addAppFeed");
		appName = document.getElementById("appName").value;
		appType = document.getElementById("appType").value;
		appTimeFrom = document.getElementById("appTimeFrom").value;
		appTimeTo = document.getElementById("appTimeTo").value;
		appTimeDate = document.getElementById("appTimeDate").value;

		if(appName == "" || appType == "" || appTimeFrom == "" || appTimeTo == "" || appTimeDate == ""){
			addAppFeed.innerHTML = "All Fields are Mandatory";
		}else{
			addAppFeed.innerHTML = "Storing the data";
			
			//store the data
			storeApp();
		}
	}

	function storeApp(){
		console.log("storeApp");

		var xmlhttp;
		if (window.XMLHttpRequest){
			xmlhttp=new XMLHttpRequest();
		}

		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
		    	document.getElementById("addAppFeed").innerHTML=xmlhttp.responseText;
		    }
		}
		
		xmlhttp.open("GET","../oassist/pages/appointments/appointments.php?appName="+appName+"&appType="+appType+"&appTimeFrom="+appTimeFrom+"&appTimeTo="+appTimeTo+"&appTimeDate="+appTimeDate,true);
		xmlhttp.send();

		//reset the input fields and update the appointments feed
		clearAppInt = setInterval(updateApp, 2000);
	}

	function removeApp(){
		console.log("removeApp");

		var xmlhttp;
		if (window.XMLHttpRequest){
			xmlhttp=new XMLHttpRequest();
		}

		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
		    	document.getElementById("removeAppFeed").innerHTML=xmlhttp.responseText;
		    }
		}
		
		xmlhttp.open("GET","../oassist/pages/appointments/remapp.php?aid="+appId.value,true);
		xmlhttp.send();

		//reset the input fields and update the appointments feed
		clearAppInt = setInterval(updateApp, 2000);	
	}

	function updateApp(){
		console.log("updateApp");

		//resetting the input fields of the add appointments form

		document.getElementById("appName").value = "";
		document.getElementById("appType").value = "";
		document.getElementById("appTimeFrom").value = "";
		document.getElementById("appTimeTo").value = "";
		document.getElementById("appTimeDate").value = "";
		document.getElementById("addAppFeed").innerHTML = "All Fields are Mandatory";

		document.getElementById("appId").value = "";
		document.getElementById("removeAppFeed").innerHTML = "All Fields are Mandatory";

		clearInterval(clearAppInt);

		// Refresh the Appointments
		refApp();
	}

	function refApp(){
		console.log("refApp");

		var xmlhttp;
		if (window.XMLHttpRequest){
			xmlhttp=new XMLHttpRequest();
		}

		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
		    	document.getElementById("rsibody0").innerHTML=xmlhttp.responseText;
		    }
		}
		
		xmlhttp.open("GET","../oassist/pages/appointments/appref.php",true);
		xmlhttp.send();
	}

	// Appointments section ends

	// Payments section

	$("#addPayBut").click(function(){

		//check all input fields
		checkInpPay();
	});

	$("#removePayBut").click(function(){
		
		removePayFeed = document.getElementById("removePayFeed");
		payId = document.getElementById("payId");

		//check all input fields
		if(payId.value == ""){
			removePayFeed.innerHTML = "All Fields are Mandatory";
		}else{

			//remove the data
			removePay();
		}
	});

	function checkInpPay(){
		console.log("checkInpPay");

		addPayFeed = document.getElementById("addPayFeed");
		payName = document.getElementById("payName").value;
		payType = document.getElementById("payType").value;
		payDate = document.getElementById("payDate").value;
		payAmount = document.getElementById("payAmount").value;

		if(payName == "" || payType == "" || payDate == "" || payAmount == ""){
			addPayFeed.innerHTML = "All Fields are Mandatory";
		}else{
			addPayFeed.innerHTML = "Storing the data";
			
			//store the data
			storePay();
		}
	}

	function storePay(){
		console.log("storePay");

		var xmlhttp;
		if (window.XMLHttpRequest){
			xmlhttp=new XMLHttpRequest();
		}

		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
		    	document.getElementById("addPayFeed").innerHTML=xmlhttp.responseText;
		    }
		}
		
		xmlhttp.open("GET","../oassist/pages/payments/payments.php?payName="+payName+"&payType="+payType+"&payDate="+payDate+"&payAmount="+payAmount,true);
		xmlhttp.send();

		//reset the input fields and update the appointments feed
		clearPayInt = setInterval(updatePay, 2000);
	}

	function removePay(){
		console.log("removePay");

		var xmlhttp;
		if (window.XMLHttpRequest){
			xmlhttp=new XMLHttpRequest();
		}

		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
		    	document.getElementById("removePayFeed").innerHTML=xmlhttp.responseText;
		    }
		}
		
		xmlhttp.open("GET","../oassist/pages/payments/rempay.php?pid="+payId.value,true);
		xmlhttp.send();

		//reset the input fields and update the appointments feed
		clearPayInt = setInterval(updatePay, 2000);	
	}

	function updatePay(){
		console.log("updatePay");

		//resetting the input fields of the add appointments form

		document.getElementById("payName").value = "";
		document.getElementById("payType").value = "";
		document.getElementById("payDate").value = "";
		document.getElementById("payAmount").value = "";
		document.getElementById("addPayFeed").innerHTML = "All Fields are Mandatory";

		document.getElementById("payId").value = "";
		document.getElementById("removePayFeed").innerHTML = "All Fields are Mandatory";

		clearInterval(clearPayInt);

		// Refresh the Appointments
		refPay();
	}

	function refPay(){
		console.log("refPay");

		var xmlhttp;
		if (window.XMLHttpRequest){
			xmlhttp=new XMLHttpRequest();
		}

		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
		    	document.getElementById("rsibody1").innerHTML=xmlhttp.responseText;
		    }
		}
		
		xmlhttp.open("GET","../oassist/pages/payments/payref.php",true);
		xmlhttp.send();
	}

	// Payments section ends

	// Employees section

	$("#addEmpBut").click(function(){

		//check all input fields
		checkInpEmp();
	});

	$("#removeEmpBut").click(function(){
		
		removeEmpFeed = document.getElementById("removeEmpFeed");
		empId = document.getElementById("empId");

		//check all input fields
		if(empId.value == ""){
			removeEmpFeed.innerHTML = "All Fields are Mandatory";
		}else{

			//remove the data
			removeEmp();
		}
	});

	$("#empSearchBut").click(function(){
		
		empSearch = document.getElementById("empSearch");
		empDisContainer = document.getElementById("empDisContainer");

		//check all input fields
		if(empSearch.value == ""){
			empDisContainer.innerHTML = "<div class = 'rsicard2'>Type an Employee id and then search</div>";
		}else{
			//remove the data
			refEmp();
		}
	});

	function checkInpEmp(){
		console.log("checkInpEmp");

		addEmpFeed = document.getElementById("addEmpFeed");
		empName = document.getElementById("empName").value;
		empType = document.getElementById("empType").value;
		empDoj = document.getElementById("empDoj").value;
		empPh = document.getElementById("empPh").value;
		empEmail = document.getElementById("empEmail").value;
		empAdd = document.getElementById("empAdd").value;
		empPass = document.getElementById("empPass").value;
		empRPass = document.getElementById("empRPass").value;

		if(empName == "" || empType == "" || empDoj == "" || empPh == "" || empEmail == "" || empAdd == "" || empPass == "" || empRPass == ""){
			addEmpFeed.innerHTML = "All Fields are Mandatory";
		}else{
			addEmpFeed.innerHTML = "Storing the data";
			
			//store the data
			storeEmp();
		}
	}

	function storeEmp(){
		console.log("storeEmp");

		var xmlhttp;
		if (window.XMLHttpRequest){
			xmlhttp=new XMLHttpRequest();
		}

		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
		    	document.getElementById("addEmpFeed").innerHTML=xmlhttp.responseText;
		    }
		}
		
		xmlhttp.open("GET","../oassist/pages/employees/employees.php?empName="+empName+"&empType="+empType+"&empDoj="+empDoj+"&empPh="+empPh+"&empEmail="+empEmail+"&empAdd="+empAdd+"&empPass="+empPass+"&empRPass="+empRPass,true);
		xmlhttp.send();
	}

	function removeEmp(){
		console.log("removeEmp");

		var pass = document.getElementById("removeEmpPass").value;

		var xmlhttp;
		if (window.XMLHttpRequest){
			xmlhttp=new XMLHttpRequest();
		}

		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
		    	document.getElementById("removeEmpFeed").innerHTML=xmlhttp.responseText;
		    }
		}
		
		xmlhttp.open("GET","../oassist/pages/employees/rememp.php?eid="+empId.value+"&pass="+pass,true);
		xmlhttp.send();
	}

	function updateEmp(){
		console.log("updateEmp");

		document.getElementById("empName").value = "";
		document.getElementById("empType").value = "";
		document.getElementById("empDoj").value = "";
		document.getElementById("empPh").value = "";
		document.getElementById("empEmail").value = "";
		document.getElementById("empAdd").value = "";
		document.getElementById("empPass").value = "";
		document.getElementById("empRPass").value = "";
		document.getElementById("addEmpFeed").innerHTML = "All Fields are Mandatory";

		document.getElementById("empId").value = "";
		document.getElementById("removeEmpFeed").innerHTML = "All Fields are Mandatory";
	}

	function refEmp(){
		console.log("refEmp");

		empDisContainer.innerHTML = "<div class = 'loadingContainer'><div class = 'loading'>Loading...</div></div>";

		var xmlhttp;
		if (window.XMLHttpRequest){
			xmlhttp=new XMLHttpRequest();
		}

		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
		    	document.getElementById("empDisContainer").innerHTML=xmlhttp.responseText;
		    }
		}
		
		xmlhttp.open("GET","../oassist/pages/employees/empref.php?eid="+empSearch.value,true);
		xmlhttp.send();
	}

	// Employees section ends

	//------------------------------------------------------------------------------------------------------------------------------------

	// other functions region

	// function to change the color of the tab

	function changeTab(tabIndex){
		for (var i = 0; i < 3; i++) {
			if(i != tabIndex){
				var lmitext = "lmi"+i;

				var lmi = document.getElementById(lmitext);

				lmi.style.background = "#676767";
				lmi.style.color = "#FFFFFF";
				lmi.style.borderRight = "1px solid #888999";
			}else{
				var lmiText = "lmi"+i;

				var lmi = document.getElementById(lmiText);

				lmi.style.background = "#E5E5E5";
				lmi.style.color = "#000000";
				lmi.style.borderRight = "1px solid #E5E5E5";
			}
		};
	}

	// function to change the z-index of the right section content

	function changeZIndex(rightSecIndex){
		for (var i = 0; i < 3; i++) {
			if(i != rightSecIndex){
				var rightSecText = "rsi"+i;

				var rightSec = document.getElementById(rightSecText);

				rightSec.style.zIndex = "0";
			}


			var rightSecText = "rsi"+rightSecIndex;

			var rightSec = document.getElementById(rightSecText);

			rightSec.style.zIndex = "3";			
		};
	}
	
});