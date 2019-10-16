// Firebase starts here 
// --------------------------
var firebaseConfig = {
    apiKey: "AIzaSyAgc8OKZlc8luYPb-GsnbMlnDfWQyvAWM0",
    authDomain: "hr-portal-7803a.firebaseapp.com",
    databaseURL: "https://hr-portal-7803a.firebaseio.com",
    projectId: "hr-portal-7803a",
    storageBucket: "hr-portal-7803a.appspot.com",
    messagingSenderId: "296460954555",
    appId: "1:296460954555:web:78146d549858b76c83f29e",
    measurementId: "G-P2FBQ01HFM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ---------------------
var database = firebase.database();

$(document).ready(function () {
    console.log("fire");

    var name, role, date, mo, rate, bill;



    $('#submit').on("click", function () {
        event.preventDefault();
        name = $("#name").val().trim();
        role = $("#role").val().trim();
        date = $("#date").val().trim();
        rate = $("#rate").val().trim();
        //mo = // grab todays date


        var now = moment(new Date()); //todays date
        var end = moment(date); // another date
        var duration = moment.duration(now.diff(end));
        var days = duration.asDays();
        x=days/30;
        mo=x.toFixed(0);

        bill = mo * rate;

        var array = [name, role, date, mo, rate, bill];
        console.log(array); //making an array out of the input data

        var row = $("<tr>")
        for (var i = 0; i < array.length; i++) {
            var data = $("<td>");
            $(data).text(array[i]);
            $(row).append(data);
        }
        $(".table").append(row);

        database.ref().push({
            name: name,
            role: role,
            date: date,
            rate: rate
        });
    });
});


// Firebase watcher + initial loader:
database.ref().on("value", function (snapshot) {

    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().role);
    console.log(snapshot.val().date);
    console.log(snapshot.val().rate);

    //changing the html to reflect the data c hange in the DB
    $("#").text(snapshot.val().name);
    $("#").text(snapshot.val().role);
    $("#").text(snapshot.val().date);
    $("#").text(snapshot.val().rate);
});