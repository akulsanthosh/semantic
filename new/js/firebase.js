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
lst = [];

location_data = [];
function data_capture() {
  var ref = db.collection("semantic labs");
  ref.onSnapshot((snapshot) => {
    snapshot.forEach((snap) => {
      location_dict = {}
      location_data_each = snap.data();
      subtitle = {}
      for(var edge in location_data_each["Connected Edges"]){
        subtitle_each = location_data_each["Connected Edges"][edge].Name
        list_of_card = []
        for(var device in location_data_each["Connected Edges"][edge]["Connected Devices"]){
            heading =  location_data_each["Connected Edges"][edge]["Connected Devices"][device].Name
            body = location_data_each["Connected Edges"][edge]["Connected Devices"][device].data.current

            let each_card_dict = {
                heading:heading,
                body:body,
                "class":"card-expand",

            }
            list_of_card.push(each_card_dict)
          }
          subtitle[subtitle_each] = list_of_card
      }
      location_dict.title = location_data_each.Name;
      location_dict.subtitles = subtitle
      location_data.push(location_dict);
    })
    create_container(location_data)
    // console.log(location_data)
  })
}
data_capture()

var i = {
  "title": "Semantic Lab (Kochi)",
  "subtitles": {
      "Rasberry Pi 3 (1)": [
          {
              "heading": "<h1 class='title_text'>Temp Sensor</h1>",
              "body":"<h1>23°</h1>",
              "footer": "",
              "class": "card-expand",
              "more_info":"Hello There"
          },
          {
              "heading": "<h1 class='title_text'> Hum Sensor</h1>",
              "body": "<h1>77%</h1>",
              "footer": ""
          }
      ],
      "Rasberry Pi 3 (2)": [
      ]
  }
}