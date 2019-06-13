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


function data_capture() {
  var ref = db.collection("semantic labs");
  event_listener = ref.onSnapshot((snapshot) => {
    let location_data = [];
    snapshot.forEach((snap) => {
      location_dict = {}
      location_data_each = snap.data();
      console.log(location_data_each)
      subtitle = {}
      for (var edge in location_data_each["Connected Edges"]) {
        subtitle_each = location_data_each["Connected Edges"][edge].Name
        list_of_card = []
        for (var device in location_data_each["Connected Edges"][edge]["Connected Devices"]) {
          heading = location_data_each["Connected Edges"][edge]["Connected Devices"][device].Name
          body = location_data_each["Connected Edges"][edge]["Connected Devices"][device].data.current

          let each_card_dict = {
            heading: heading,
            body: body,
            "class": "card-expand",

          }
          list_of_card.push(each_card_dict)
        }
        subtitle_with_button = `<span>` + subtitle_each + `</span>
                                      <button class="btn btn-sm btn-outline-dark btn-rounded-custom" onclick="put_cli_card()">Manage</button>`
        subtitle[subtitle_with_button] = list_of_card
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

function put_cmd_to_firebase(id, device_id, cmd) {
  var ref = db.collection("semantic labs").doc(id);

  var settings_path = "Connected Edges." + device_id + ".settings"
  var current_path = settings_path + ".current"
  var change_path = settings_path + ".change"
  update_dict = {
    [change_path]: Math.random()*1000,
    [current_path]:cmd
  }
  ref.update(update_dict)
}


// var a = Connected Edges:
// 1:
// Connected Devices:
// 1:
// Model: "DHT11"
// Name: "Temperature"
// Type: "Sensor"
// Unit: "°"
// data:
// current: "26"
// historical:
// timestamp: "32"

// 2: {Model: "DHT11", Name: "Humidity", Type: "Sensor", Unit: "%", data: {…}}
// 3: {Model: "FS11", Name: "Servo", Type: "Actuator", Unit: "°", data: {…}}
// __proto__: Object
// Name: "Raspberry Pi 3"
// settings:
// change: "0004"
// commands: ["ls"]
// current: "ls"
// execution: "pgm name"
// file upload: (2) ["list 1", "list 2"]
// output: "error you suck"
// __proto__: Object
// __proto__: Object
// __proto__: Object
// Name: "Semantic Lab (Kochi)"