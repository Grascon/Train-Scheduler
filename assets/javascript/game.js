$(document).ready(function(){
	var config = {
    		apiKey: "AIzaSyCEPpF674cZD4U_ok3-HvlVda5dio5MCKk",
    		authDomain: "train-scheduler-86cd0.firebaseapp.com",
    		databaseURL: "https://train-scheduler-86cd0.firebaseio.com",
    		projectId: "train-scheduler-86cd0",
    		storageBucket: "train-scheduler-86cd0.appspot.com",
    		messagingSenderId: "906113247257"
  		};
  	
  	firebase.initializeApp(config);
	
	var database = firebase.database();
});