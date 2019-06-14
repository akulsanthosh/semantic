function create_card(card_information) {

    heading = card_information.heading
    body = card_information.body
    footer = card_information.footer
    card_class = card_information.class
    card_side_info = card_information.more_info
    first_col_class = card_information.column_class
    side_col = ""
    footer_html = ""
    if (footer) {
        footer_html = `<div class="card-footer">` + footer + `</div>`
    }
    if (card_side_info) {
        side_col = `<div class="col">
                                ` + card_side_info + `
                    </div>`

    }
    let card = `<div class="col">
                    <div class="card card-1 ` + card_class + `">
                        <div class = "row h-100">
                            <div class = "col ` + first_col_class + `">
                                <div class="card-header">` + heading + `</div>
                                <div class="card-body">` + body + `</div> 
                                ` + footer_html + `
                            </div>
                            ` + side_col + `
                        </div>
                     </div>
                </div>
                `

    return card
}

function create_row(location_data) { //

    title = location_data.title
    subtitles_with_card = location_data.subtitles
        // cards = location_data.cards

    total_html = `<div class="row mt-5">
                <div class="col">
                    <h3>` + title + `</h3>
                </div>
            </div>`


    for (var subtitle in subtitles_with_card) {
        let cols = []
        for (var i = 0; i < subtitles_with_card[subtitle].length; i++) {
            a = create_card(subtitles_with_card[subtitle][i])
            cols.push(a)
        }
        text_value = cols.join(" ")
        row_html = `<h5>` + subtitle + `</h5 >
            <div class="row row-fluid">
                ` + text_value + `
            </div>`
        total_html += row_html
    };


    return total_html
}

function create_container(list_of_locations) {
    let cols = []
    for (var i = 0; i < list_of_locations.length; i++) {
        a = create_row(list_of_locations[i])
        cols.push(a)
    }

    text_value = cols.join(" ")

    $("#main_container").html(text_value)

}

create_cli_card_done = false
function create_cli_card() {
    
    more_info =
        `<div class="row h-50 row_custom">
            <div class="col cli_output">
                <div class="card-header">Output</div>
                <div class="card-body card_body_custom" id="output_body"></div>
            </div>
        </div>
        <div class="row h-50 row_custom">
            <div class="col cli_file">
                <div class="card-header row">
                    <span class="mr-auto">File</span>
                    <button class="btn btn-sm btn-outline-danger btn-rounded-custom right-move" onclick="click_file_control()">File Upload</button>
                    <input id='image-file' type='file' hidden onchange = "fileControl()"/>
                </div>
                <div class="card-body card_body_custom" id="file_body"></div>
            </div>
        </div>`

    body = `<div id="terminal_text">
        <div class="cmd_text"><span class= "cmd_line">` + pwd + ` $> </span>cmd1</div>
        <div class="cmd_text " id = "last_line_full"><span class= "cmd_line">` + pwd + ` $> </span><input class = "last_line_cmd" id="last_line"></div>
    </div>`
    let cli_info = {
        "heading": "Terminal",
        "body": body,
        "footer": "",
        "class": "card-full",
        "more_info": more_info,
        "column_class": "col_terminal"
    };
    return create_card(cli_info)
}

function move_cli_pointer() {
    var command = $("#last_line").val()
    $("#last_line").val("")
    var last_line_full = $("#last_line_full").clone()[0]
    $("#last_line_full").remove()
    $("#terminal_text")[0].innerHTML += `<div class="cmd_text"><span class= "cmd_line">` + pwd + ` $> </span>` + command + `</div>`
    $("#terminal_text")[0].appendChild(last_line_full)
    let last_line = $("#last_line")
    last_line.on("keyup", send_data)
}

function put_cli_card() {
    create_cli_card_done = true
    $('#main_container').fadeOut(1000, function() {
        event_listener()
        $('#main_container').html(create_cli_card())
        let last_line = $("#last_line")
        last_line.on("keyup", send_data)
    })
    let main_title = $("#main_title")
    main_title.fadeOut(200, function() {
        main_title.text("Command Line Interface")
        main_title.fadeIn(600)

    })
    $('#main_container').fadeIn(200)

}

function list_to_html(list) {
    var total_html = ``
    for (var i = 0; i < list.length; i++) {
        var a = list[i]
        total_html += `<li>` + a + `</li>`
    }
    return `<ol>` + total_html + `</ol>`
}

function send_data(event) {
    if (event.key === "Enter") {
        let last_line = $("#last_line")
        console.log(last_line.val())
        put_cmd_to_firebase('1', '1', last_line.val())
        move_cli_pointer()
        last_line.val("")
        get_cmd_from_firebase('1', '1', "output_body", "file_body")

    }
}