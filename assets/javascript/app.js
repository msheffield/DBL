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

var database = firebase.database();

// Adds a row to the table with the given variables
function addToTable(name, destination, frequency) {

    // Calculate next train time and how many minutes away that is
    let nextTrainInfo = getTrainTime(frequency, firstime);
    let minutesAway = nextTrainInfo[0];
    let nextArrival = nextTrainInfo[1];

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
    
    let newMinutesAway = $("<td>");
    newMinutesAway.text(minutesAway);
    row.append(newMinutesAway);

    $("#table-body").append(row);
}

// On click will grab user inputs, add to table, add to database and clear inputs.
$("#new-train-submit").on("click", function (event) {
    event.preventDefault();

    let name = $("#new-train-name").val().trim();
    let destination = $("#new-destination").val().trim();;
    let firstime = $("#new-first-time").val();
    let frequency = $("#new-frequency").val();

    addToTable(name, destination, frequency);

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

