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

function addToTable(name, role, startdate, monthlyrate) {
    let row = $("<tr>");

    let employeeName = $("<td>");
    employeeName.text(name);
    row.append(employeeName);

    let employeeRole = $("<td>");
    employeeRole.text(role);
    row.append(employeeRole);

    let employeeStartdate = $("<td>");
    employeeStartdate.text(startdate);
    row.append(employeeStartdate);

    let employeeMonthsworked = $("<td>");
    employeeMonthsworked.text()
    row.append(employeeMonthsworked);

    let employeeMonthlyrate = $("<td>");
    employeeMonthlyrate.text(monthlyrate);
    row.append(employeeMonthlyrate);

    let employeeInvoicetotal = $("<td>");
    employeeInvoicetotal.text();
    row.append(employeeInvoicetotal);

}

$("#new-employee-submit").on("click", function (event) {
    event.preventDefault();

    name = $("#new-employee-name").val().trim();
    role = $("#new-employee-role").val();
    startdate = $("#new-employee-start-date").val();
    monthlyrate = $("#new-employee-monthly-rate").val();

    $("#new-employee-name").val("");
    $("#new-employee-role").val("");
    $("#new-employee-start-date").val("");
    $("#new-employee-monthly-rate").val("");

    console.log(name);
    console.log(role);
    console.log(startdate);
    console.log(monthlyrate);

    // Don't forget to provide initial data to your Firebase database.
    database.ref().push({
      name: name,
      role: role,
      startdate: startdate,
      monthlyrate: monthlyrate,
    });
  });