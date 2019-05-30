var config = {
    apiKey: "AIzaSyCN7Bw8pL0mtodqUNTNLqA1NzS0VsIvTR8",
    authDomain: "semantic-b4ee2.firebaseapp.com",
    projectId: "semantic-b4ee2",
    storageBucket: "semantic-b4ee2.appspot.com",
    messagingSenderId: "422426875104",
    appId: "1:422426875104:web:243d9278547b4e89"
  };
  firebase.initializeApp(config);

  
var db = firebase.firestore();


function create_chart_from_data(sensor_id,chart_id,chart_label,context={}){
    db.collection("semantic").doc("sensor").collection(sensor_id).doc("historical").onSnapshot((querySnapshot) => {
        var historical_data = querySnapshot.data();
        var data_labels = [];
        var data_values = []
        for(var date in historical_data){
            data_labels.push(date);
            data_values.push(historical_data[date])
         }
        create_chart(chart_id,data_labels,data_values,chart_label,context)
    })
}

function  create_chart(chart_id,data_labels,data_values,label,context){
    console.log(context)
    var keys=  Object.keys(context);

    var ctx = document.getElementById(chart_id);
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: data_labels,
            datasets: [{
                label: label,
                data: data_values,

                "borderColor":"rgb(75, 192, 192)",
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        },
        ...context
    });
}

create_chart_from_data("temp_001","temp_chart","temperature today")
create_chart_from_data("hum_001","hum_chart","humidity today")
