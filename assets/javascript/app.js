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
function addToTable(name, destination, frequency, firstTime) {

    // Calculate next train time and how many minutes away that is
    let nextTrainInfo = getTrainTime(frequency, firstTime);
    let minutesAway = nextTrainInfo[0];
    let nextArrival = nextTrainInfo[1];

    let percentage = (((parseInt(frequency) - parseInt(minutesAway)) / parseInt(frequency)) * 100);
    percentage = Math.round(percentage);
    percentageString = percentage + "%";
    console.log("Percentage: " + percentage);

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

    let progress = $("<td>");
    let progressdiv = $("<div>");
    progressdiv.addClass("progress");
    let progressbar = $("<div>");

    progressbar.attr({ "class": "progress-bar", "role": "progressbar", "style": "width: " + percentageString, "aria-valuenow": percentageString, "aria-valuemin": "0", "aria-valuemax": frequency.toString(), })
    
    if (percentage > 80) {
        progressbar.addClass("bg-success");
    }
    else if (percentage < 40) {
        progressbar.addClass("bg-warning");
    }
    else if (percentage < 15) {
        progressbar.addClass("bg-danger");
    }
    else if (percentage == 0) {
        progressbar.text("Arrived");
    }

    progressdiv.append(progressbar);
    progress.append(progressdiv);
    row.append(progress);


    /* progress.html('<div class="progress"><div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">3</div></div>');
    row.append(progress); */

    $("#table-body").append(row);
}

// On click will grab user inputs, add to database and clear inputs.
$("#new-train-submit").on("click", function (event) {
    event.preventDefault();

    let name = $("#new-train-name").val().trim();
    let destination = $("#new-destination").val().trim();;
    let firstTime = $("#new-first-time").val();
    let frequency = $("#new-frequency").val();

    database.ref().push({
        name: name,
        destination: destination,
        firsttime: firstTime,
        frequency: frequency,
    });

    $("#new-train-name").val("");
    $("#new-destination").val("");
    $("#new-first-time").val("");
    $("#new-frequency").val("");

});


function getTrainTime(frequency, firstTime) {


    let firstTimeMoment = moment(firstTime, "HH:mm").subtract(1, "years");

    let differenceInTime = moment().diff(moment(firstTimeMoment), "minutes");

    let timeRemainder = differenceInTime % frequency;

    let minutesTillTrain = frequency - timeRemainder;

    let nextTrain = moment().add(minutesTillTrain, "minutes");

    return [minutesTillTrain, nextTrain];
}

// Load previously stored trains
database.ref().on("value", function (snapshot) {
    $("#table-body").empty();

    snapshot.forEach(train => {
        let name = train.child("name").val();
        let destination = train.child("destination").val();
        let firstTime = train.child("firsttime").val();
        let frequency = train.child("frequency").val();

        addToTable(name, destination, frequency, firstTime);
    });
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

