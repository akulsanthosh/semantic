function fileControl() {
    let file_pointer = db.collection("semantic").doc("script");
    let file =  $("#image-file")[0]
    var storageRef = firebase.storage().ref("script/" + file.files[0].name);
    file_pointer.set({
        filename: file.files[0].name,
        change: Math.random()
    })
    console.log(file.files[0]);
    storageRef.put(file.files[0]).then(function (snapshot) {
        console.log('Uploaded a blob or file!');
    });
}

function click_file_control() {
    console.log("hello")
    $("#image-file").click()


}

var ref = db.collection("semantic").doc("display");
ctr = 0;
ref.onSnapshot((snapshot) => {
    if (ctr > 0) {
        // if(snapshot.data().type === "temp"){
        //     document.getElementById("temp").appendChild(createDiv(snapshot,ctr));
        // }else{
        //     document.getElementById("hum").appendChild(createDiv(snapshot,ctr));
        // }
        /* document.getElementById("all").appendChild(createDiv(snapshot, ctr)); */
        
        if(snapshot.data().mode === 'cli'){
            if(!smoothscroll_done){
                smoothscroll()
            }
            if(!create_cli_card_done){
                put_cli_card()
            }
        }
        if(snapshot.data().mode === 'file'){
            if(!smoothscroll_done){
                smoothscroll()
            }

            if(!create_cli_card_done){
                put_cli_card()
            }
            setTimeout(click_file_control,3000)
        }
    }
    ctr += 1;
})

