// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAantJ_Ue51CL9fZIcZsJgvLeoUFu4v8ag",
    authDomain: "dbltraintracker.firebaseapp.com",
    databaseURL: "https://dbltraintracker.firebaseio.com",
    projectId: "dbltraintracker",
    storageBucket: "",
    messagingSenderId: "167347271138",
    appId: "1:167347271138:web:d9433f85d40a6f7238f5bb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 
var database = firebase.database();

function addToTable(name, destination, frequency, nextArrival, minutesAway) {
    let row = $("<tr>");

    let newName = $("<td>");
    newName.text(name);
    row.append(newName);

    let newDestination = $("<td>");
    newDestination.text(destination);
    row.append(newDestination);

    let newFrequency = $("<td>");
    newFrequency.text(frequency)
    row.append(newFrequency);

    let newNextArrival = $("<td>");
    newNextArrival.text(moment(nextArrival).format("hh:mm"));
    row.append(newNextArrival);
    
    console.log("debug: " + minutesAway);

    let newMinutesAway = $("<td>");
    newMinutesAway.text(minutesAway);
    row.append(newMinutesAway);

    $("#table-body").append(row);
}

$("#new-train-submit").on("click", function (event) {
    event.preventDefault();

    let name = $("#new-train-name").val().trim();
    let destination = $("#new-destination").val().trim();;
    let firstime = $("#new-first-time").val();
    let frequency = $("#new-frequency").val();

    let nextTrainInfo = getTrainTime(frequency, firstime);

    let minutesAway = nextTrainInfo[0];
    let nextArrival = nextTrainInfo[1];

    addToTable(name, destination, frequency, nextArrival, minutesAway);

    database.ref().push({
        name: name,
        destination: destination,
        firsttime: firstime,
        frequency: frequency,
    });

    $("#new-train-name").val("");
    $("#new-destination").val("");
    $("#new-first-time").val("");
    $("#new-frequency").val("");

});


function getTrainTime(frequency, firstTime) {
    let firstTimeMoment = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeMoment);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    let differenceInTime = moment().diff(moment(firstTimeMoment), "minutes");
    console.log("DIFFERENCE IN TIME: " + differenceInTime);

    let timeRemainder = differenceInTime % frequency;
    console.log(timeRemainder);

    let minutesTillTrain = frequency - timeRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

    let nextTrain = moment().add(minutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    return [minutesTillTrain, nextTrain];
}

