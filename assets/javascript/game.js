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

  var name = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";
	
	var database = firebase.database();

  $("#submit").on("click", function(){
    event.preventDefault();
    
    name = $("#input-name").val().trim();
    destination = $("#destination-name").val().trim();
    firstTrain = $("#first-train-time").val().trim();
    frequency = $("#frequency").val().trim();

    if (name == ''){
      alert("Please enter the information needed to add a Train. Thank you");
      $("#input-name").val("");
    $("#destination-name").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");

      return false;
    }
    if (destination == ''){
      alert("Please enter the information needed to add a Train. Thank you");
      $("#input-name").val("");
    $("#destination-name").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");

      return false;
    }
    if (firstTrain == ''){
      alert("Please enter the information needed to add a Train. Thank you");
      $("#input-name").val("");
    $("#destination-name").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");

      return false;
    }
    if (frequency == ''){
      alert("Please enter the information needed to add a Train. Thank you");
      $("#input-name").val("");
    $("#destination-name").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");

      return false;
    }

    var newTrain = {
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
    }

    console.log(newTrain);
    
    database.ref().push(newTrain);

    $("#input-name").val("");
    $("#destination-name").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
  });

  database.ref().on("child_added", function(ChildSnapshot){
    var child = ChildSnapshot.val();
    var trainName = child.name;
    var trainDestination = child.destination;
    var timeFirstTrain = child.firstTrain;
    var trainFrequency = child.frequency;
    
    //getting time of first train (should return in long number format)
    var convertedTime = moment(timeFirstTrain, 'HH:mm');
    console.log("Converted Time: " + convertedTime);
    
    //first train time in actual hour:minute format
    var firstTrainCoverted = moment(convertedTime).format('HH:mm');
    console.log("First Train Time: " + firstTrainCoverted);

    //difference between current time and first arrival
    var timeDifference = moment().diff(moment(convertedTime), 'minutes');
    console.log(timeDifference);

    //will provide the minutes left when dividing time difference by train frequency
    //this number will be used later to determine minutes left until next train arrives
    var timeRemaining = timeDifference % trainFrequency;
    console.log("Left over time: " + timeRemaining);

    //to get minutes away, subtract from train frequency the minutes left over when dividing time difference
    //from first train arrival and current time
    var minutesAway = trainFrequency - timeRemaining;
    console.log("Minutes Away: " + minutesAway);

    //adding minutes away to current time to determine next arrival
    var nextArrival = moment().add(minutesAway, 'minutes');
   
    //adding to html
    $("#trains").append(
      "<tr><td id='name-display'>" + trainName + "</td>" +
      "<td id='destination-display'>" + trainDestination + "</td>" +
      "<td id= 'frequency-display'>" + trainFrequency + "</td>" +
      "<td id = 'next-arrival-display'>" + moment(nextArrival).format('HH:mm') + "</td>" + 
      "<td id = 'minutes-away-display'>" + minutesAway + "</td></tr>"
    );
  }, function(errorObject){
    console.log("Errors handled: " + errorObject.code);
  });
  
});