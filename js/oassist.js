/*

File: oassist.js
Author: Sayantan Ghosh
Description: Main Javascript file for OAssist

*/

$(document).ready(function(){
	
	/* Global Declarations */

	var domain = "http://localhost/oassist/pages/";

	var activetab = 0;
	var navitem = $(".navitem");
	var mainsec = document.querySelector(".mainsec");

	/* Setting appointments tab by default */

	navitem[0].style.background = "#DADEE5";
	navitem[0].style.color = "#000000";

	/* Refreshing Appointments feed by default */
	refApp();

	/* Handling navitem click events */

	navitem[0].onclick = function(){
		mainsec.style.left = "0";
		if(activetab!=0){
			navitem[activetab].style.background = "#111222";
			navitem[activetab].style.color = "#FFFFFF";
			activetab = 0;	
		}
		navitem[0].style.background = "#DADEE5";
		navitem[0].style.color = "#000000";
		refApp();
	};

	navitem[1].onclick = function(){
		mainsec.style.left = "-100%";
		navitem[activetab].style.background = "#111222";
		navitem[activetab].style.color = "#FFFFFF";
		navitem[1].style.background = "#DADEE5";
		navitem[1].style.color = "#000000";
		activetab = 1;
	};

	navitem[2].onclick = function(){
		mainsec.style.left = "-200%";
		navitem[activetab].style.background = "#111222";
		navitem[activetab].style.color = "#FFFFFF";
		navitem[2].style.background = "#DADEE5";
		navitem[2].style.color = "#000000";
		activetab = 2;
	};

	navitem[3].onclick = function(){
		mainsec.style.left = "-300%";
		navitem[activetab].style.background = "#111222";
		navitem[activetab].style.color = "#FFFFFF";
		navitem[3].style.background = "#DADEE5";
		navitem[3].style.color = "#000000";
		activetab = 3;
	};

	/* About section is opened when navlogo is clicked */

	$("#navlogo").click(function(){
		mainsec.style.left = "-300%";
		navitem[activetab].style.background = "#111222";
		navitem[activetab].style.color = "#FFFFFF";
		navitem[3].style.background = "#DADEE5";
		navitem[3].style.color = "#000000";
		activetab = 3;	
	});

	/* Form validation */

	/* Search appointment form */

	$("#appdispbutton").click(function(){
		var appdispiddate = document.getElementById("appdispiddate").value;
		var opt;

		document.querySelector(".appdispres").innerHTML = "<div class = 'appdispref'>Refreshing Appointments...</div>";

		if(!appdispiddate.length){
			document.querySelector(".appdispres").innerHTML = "<div class = 'appdispno'>Error: Enter an Appointment ID to search.</div>";			
		}else{
			if(validateDate(appdispiddate)){
				opt = 1;	
			}else{
				opt = 2;
			}


			var xmlhttp;
			if (window.XMLHttpRequest){
				xmlhttp=new XMLHttpRequest();
			}

			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					var resp = xmlhttp.responseText;

					if(resp == 1){
						document.querySelector(".appdispres").innerHTML = "<div class = 'appdispno'>Error: No Appointments found.</div>";
					}else if(resp == 2){
						document.querySelector(".appdispres").innerHTML = "<div class = 'appdispno'>Error: Invalid Appointment ID.</div>";
					}else if(resp == 3){
						document.querySelector(".appdispres").innerHTML = "<div class = 'appdispno'>Error: Invalid Date.</div>";
					}else{
						document.querySelector(".appdispres").innerHTML = resp;
					}

					document.getElementById("appdispiddate").value = "";
				}
			}
			xmlhttp.open("POST",domain+"appointments/searchapp.php",true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("appdispiddate="+appdispiddate+"&opt="+opt);
		}
	});

	/* Search appointment form ends */

	/* Add Appointment form */

	$("#appbutton").click(function(){

		// Open the overlay
		openOverlay("Add Appointment", "Validating form... Please wait.", 0);

		var appname = document.getElementById("appname").value;
		var apptype = document.getElementById("apptype").value;
		var appdate = document.getElementById("appdate").value;
		var apptime = document.getElementById("apptime").value;

		if(appname.length == 0 || apptype.length == 0 || appdate.length == 0 || apptime.length == 0){
			editOverlay("Add Appointment", "Error: All fields are mandatory.", 1);	
		}else{
			//Validate date
			if(validateDate(appdate)){
				//Validate time
				if(validateTime(apptime)){
					//Check if date is not a past date
					if(dateNotPast(appdate)){

						//Appointment can be set on any time on the current or future date

						editOverlay("Add Appointment", "Validation successfull. Storing data.", 0);
						//Send the validated data to server

						//extract hour and minute value from apptime
						var apptimeh = apptime[0]+apptime[1];
						var apptimem = apptime[3]+apptime[4];

						var xmlhttp;
						if (window.XMLHttpRequest){
						 	xmlhttp=new XMLHttpRequest();
						}

						xmlhttp.onreadystatechange=function(){
						  	if(xmlhttp.readyState==4 && xmlhttp.status==200){
						  		editOverlay('Add Appointment', xmlhttp.responseText, 1);							    	
						    }
						}
						xmlhttp.open("POST",domain+"appointments/addapp.php",true);
						xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
						xmlhttp.send("appname="+appname+"&apptype="+apptype+"&appdate="+appdate+"&apptimeh="+apptimeh+"&apptimem="+apptimem);
					}else{
						editOverlay("Add Appointment", "Error: Invalid date! Make sure to put a valid current or future date according to the English calender.", 1);	
					}
				}else{
					editOverlay("Add Appointment", "Error: Invalid Time.", 1);
				}	
			}else{
				editOverlay("Add Appointment", "Error: Invalid Date.", 1);
			}
			//Vaalidate time
		}
	});

	/* Add appointment form ends */

	/* Search attendance form */

	$("#attdispbutton").click(function(){
		var attdispid = document.getElementById("attdispid").value;
		var attdispdate = document.getElementById("attdispdate").value;

		document.querySelector(".attdispres").innerHTML = "<div class = 'attdispsrch'>Searching...</div>";

		if(!attdispid.length || !attdispdate.length){
			document.querySelector(".attdispres").innerHTML = "<div class = 'attdisperr'>Error: All fields are mandatory.</div>";
		}else{
			if(validateDate(attdispdate)){
				//Send the validated data to server

				var xmlhttp;
				if (window.XMLHttpRequest){
					xmlhttp=new XMLHttpRequest();
				}

				xmlhttp.onreadystatechange=function(){
					if(xmlhttp.readyState==4 && xmlhttp.status==200){
						var resp = xmlhttp.responseText;
						document.querySelector(".attdispres").innerHTML = resp;
						document.getElementById("attdispid").value = "";
						document.getElementById("attdispdate").value = "";
					}
				}
				xmlhttp.open("POST",domain+"attendance/searchatt.php",true);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send("attdispid="+attdispid+"&attdispdate="+attdispdate);
			}else{
				document.querySelector(".attdispres").innerHTML = "<div class = 'attdisperr'>Error: Invalid date.</div>";
			}
		}
	});

	/* Search attendance form ends */

	/* Add attendance form */

	$("#attbutton").click(function(){
		var attid = document.getElementById("attid").value;
		var attdate = document.getElementById("attdate").value;
		var attpass = document.getElementById("attpass").value;

		openOverlay("Add Attendance", "Validating form... Please wait.", 0);

		if(!attid.length || !attdate.length || !attpass.length){
			openOverlay("Add Attendance", "Error: All fields are mandatory.", 1);			
		}else{
			if(validateDate(attdate)){
				var d = new Date();
				var y = d.getFullYear();
				var m = d.getMonth()+1;
				var date = d.getDate();

				var cd = date+"/"+m+"/"+y;

				if(date<10){
					cd = "0"+cd;
				}
				if(m<10){
					var x = cd.substr(0, cd.indexOf("/"));
					cd = x+"/0"+m+"/"+y;
				}

				if(attdate == cd){
					//Attendance can only be set for the current date

					editOverlay("Add Attendance", "Validation successfull. Storing data.", 0);
					//Send the validated data to server

					var xmlhttp;
					if (window.XMLHttpRequest){
						xmlhttp=new XMLHttpRequest();
					}

					xmlhttp.onreadystatechange=function(){
						if(xmlhttp.readyState==4 && xmlhttp.status==200){
							editOverlay('Add Attendance', xmlhttp.responseText, 1);							    	
						}
					}
					xmlhttp.open("POST",domain+"attendance/addatt.php",true);
					xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xmlhttp.send("attid="+attid+"&attdate="+attdate+"&attpass="+attpass);
				}else{
					editOverlay("Add Attendance", "Error: Attendance can only be set for the current date.", 1);
				}

			}else{
				document.querySelector(".attdispres").innerHTML = "<div class = 'attdisperr'>Invalid Date.</div>";
			}
		}
	});

	/* Add attendance form ends */

	/* Search Employee form */

	$("#empdispbutton").click(function(){
		var empdispid = document.getElementById("empdispid").value;

		document.querySelector(".empdispres").innerHTML = "<div class = 'empdispsrch'>Searching...</div>";

		if(!empdispid.length){
			document.querySelector(".empdispres").innerHTML = "<div class = 'empdisperr'>Error: Enter an Employee ID to search.</div>";			
		}else{
			//Send the validated data to server


			var xmlhttp;
			if (window.XMLHttpRequest){
				xmlhttp=new XMLHttpRequest();
			}

			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					var resp = xmlhttp.responseText;
					document.querySelector(".empdispres").innerHTML = resp;
					document.getElementById("empdispid").value = "";
				}
			}
			xmlhttp.open("POST",domain+"employees/searchemp.php",true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("empdispid="+empdispid);
		}
	});

	/* Search Employee form*/

	/* Add Employee form */

	$("#empbutton").click(function(){

		openOverlay("Add Employee", "Validating form... Please wait.", 0);

		var empname = document.getElementById("empname").value;
		var emppan = document.getElementById("emppan").value;
		var emptype = document.getElementById("emptype").value;
		var empdoj = document.getElementById("empdoj").value;
		var empphn = document.getElementById("empphn").value;
		var empemail = document.getElementById("empemail").value;
		var empaddr = document.getElementById("empaddr").value;
		var emppass = document.getElementById("emppass").value;
		var emprpass = document.getElementById("emprpass").value;

		if(!empname.length || !emppan.length || !emptype.length || !empdoj.length || !empphn.length || !empemail.length || !empaddr.length || !emppass.length || !emprpass.length){
			editOverlay("Add Employee", "Error: All fields are mandatory.", 1);
		}else{
			if(emppass == emprpass){
				if(validatePAN(emppan)){
					if(validateDate(empdoj)){
						var d = new Date();
						var y = d.getFullYear();
						var m = d.getMonth()+1;
						var date = d.getDate();

						var cd = date+"/"+m+"/"+y;

						if(date<10){
							cd = "0"+cd;
						}
						if(m<10){
							var x = cd.substr(0, cd.indexOf("/"));
							cd = x+"/0"+m+"/"+y;
						}

						if(cd == empdoj){
							if(validateEmail(empemail)){
								editOverlay("Add Employee", "Validation successfull. Storing data.", 0);
								//Send the validated data to server

								var xmlhttp;
								if (window.XMLHttpRequest){
									xmlhttp=new XMLHttpRequest();
								}

								xmlhttp.onreadystatechange=function(){
									if(xmlhttp.readyState==4 && xmlhttp.status==200){
										editOverlay('Add Appointment', xmlhttp.responseText, 1);							    	
									}
								}
								xmlhttp.open("POST",domain+"employees/addemp.php",true);
								xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
								xmlhttp.send("empname="+empname+"&emppan="+emppan+"&emptype="+emptype+"&empdoj="+empdoj+"&empphn="+empphn+"&empemail="+empemail+"&empaddr="+empaddr+"&emppass="+emppass);
							}else{
								editOverlay("Add Employee", "Error: Invalid Email.", 1);	
							}
						}else{
							editOverlay("Add Employee", "Error: Invalid Date of Joining.", 1);
						}
					}else{
						editOverlay("Add Employee", "Error: Invalid Date of Joining.", 1);
					}
				}else{
					editOverlay("Add Employee", "Error: Invalid PAN number.", 1);	
				}
			}else{
				editOverlay("Add Employee", "Error: Password and Repeat Password should be the same.", 1);
			}
		}
	});

	/* Add Employee form ends */

	/* Form validation ends */

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Refresh functions */

	function refApp(){
		document.getElementById("appname").value = "";
		document.getElementById("apptype").value = "";
		document.getElementById("appdate").value = "";
		document.getElementById("apptime").value = "";

		document.querySelector(".appdispres").innerHTML = "<div class = 'appdispref'>Refreshing Appointments...</div>";

		var d = new Date();

		var cd = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
		var ch = d.getHours();
		var cm = d.getMinutes();

		if(d.getDate() < 10){
			cd = "0"+cd;
		}

		if((d.getMonth()+1) < 10){
			cd = cd = d.getDate()+"/0"+(d.getMonth()+1)+"/"+d.getFullYear();
		}

		var xmlhttp;

		if (window.XMLHttpRequest){
			xmlhttp=new XMLHttpRequest();
		}

		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				var resp = xmlhttp.responseText;

				if(resp == 1){
					document.querySelector(".appdispres").innerHTML = "<div class = 'appdispno'>There are no pending appointments.</div>";
				}else if(resp == 2){
					document.querySelector(".appdispres").innerHTML = "<div class = 'appdispno'>Error: Could not fetch upcoming appointments.</div>";
				}else if(resp == 3){
					document.querySelector(".appdispres").innerHTML = "<div class = 'appdispno'>There are no pending appointments for today.</div>";
				}else{
					document.querySelector(".appdispres").innerHTML = resp;
				}
			}
		}
		xmlhttp.open("POST",domain+"appointments/refapp.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("cd="+cd+"&ch="+ch+"&cm="+cm);
	}

	function refAtt(){
		document.getElementById("attid").value = "";
		document.getElementById("attdate").value = "";
		document.getElementById("attpass").value = "";
	}

	function refEmp(){
		document.getElementById("empname").value = "";
		document.getElementById("emppan").value = "";
		document.getElementById("emptype").value = "";
		document.getElementById("empdoj").value = "";
		document.getElementById("empphn").value = "";
		document.getElementById("empemail").value = "";
		document.getElementById("empaddr").value = "";
		document.getElementById("emppass").value = "";
		document.getElementById("emprpass").value = "";
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Miscellaneous functions */

	function openOverlay(head,disp,opt){
		var overlay = document.getElementById("overlay");
		var oinhead = document.querySelector(".oinhead");
		var oindisp = document.querySelector(".oindisp");
		var oinfoot = document.getElementById("oinfoot");

		oinhead.innerHTML = head;
		oindisp.innerHTML = disp;

		if(opt){
			oinfoot.style.display = "block";
		}else{
			oinfoot.style.display = "none";
		}

		overlay.style.display = "block";
	}

	function editOverlay(head,disp,opt){
		var overlay = document.getElementById("overlay");
		var oinhead = document.querySelector(".oinhead");
		var oindisp = document.querySelector(".oindisp");
		var oinfoot = document.getElementById("oinfoot");

		oinhead.innerHTML = head;
		oindisp.innerHTML = disp;

		if(opt){
			oinfoot.style.display = "block";
		}else{
			oinfoot.style.display = "none";
		}		
	}

	document.getElementById("overlayclose").onclick = function(){
		var overlay = document.getElementById("overlay");
		var oinhead = document.querySelector(".oinhead");
		var oindisp = document.querySelector(".oindisp");		
	
		oinhead.innerHTML = "";
		oindisp.innerHTML = "";

		overlay.style.display = "none";

		//Refresh the appointment feed if the appointment tab is active
		if(!activetab){
			refApp();
		}else if(activetab == 1){
			refAtt();
		}else if(activetab == 2){
			refEmp();
		}
	};

	function validateDate(date){
		return(date.match(/^\d{2}\/\d{2}\/\d{4}$/g));
	}

	function validateTime(time){
		return(time.match(/^\d{2}:\d{2}$/g));
	}

	function validatePAN(pan){
		return(pan.match(/^[A-Z]{5}\d{4}[A-Z]{1}$/g));
	}

	function validateEmail(email){
		return(/^\w+([\.-]?\w+)*@\w+([\.]?\w+)(\.\w{2,3})+$/g);
	}

	function dateNotPast(date){
		var d = parseInt(date[0]+date[1]);
		var m = parseInt(date[3]+date[4]);
		var y = parseInt(date[6]+date[7]+date[8]+date[9]);

		if(m>12){
			return 0;
		}else{
			if(m==2){
				if(y%4==0){
					if(d>29)
						return 0;
					else
						return 1;
				}else{
					if(d>28)
						return 0;
					else
						return 1;
				}
			}
		}

		var currDate = new Date();
		if(y < currDate.getFullYear()){
			return 0;
		}else if(y > currDate.getFullYear()){
			return 1;
		}else{
			if((currDate.getMonth()+1) > m){
				return 0;
			}else{
				if(currDate.getDate() > d){
					return 0;
				}else{
					return 1;
				}	
			}
		}
	}

});