
function create_card(card_information) {

    heading = card_information.heading
    body = card_information.body
    footer = card_information.footer
    card_class = card_information.class
    card_side_info = card_information.more_info
    side_col = ""
    footer_html=""
    if (footer) {
        footer_html = `<div class="card-footer">`+ footer + `</div>`
    }
    if (card_side_info) {
        side_col = `<div class="col">
                                `+ card_side_info + `
                    </div>`

    }
    let card = `<div class="col">
                    <div class="card card-1 `+ card_class + `">
                        <div class = "row">
                            <div class = "col">
                                <div class="card-header">`+ heading + `</div>
                                <div class="card-body">`+ body + `</div> 
                                `+footer_html+`
                            </div>
                            `+side_col+`
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
                    <h3>`+ title + `</h3>
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
                `+ text_value + `
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

create_container([
    {
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
    },
    {
        "title": "Semantic Lab (Banglore)",
        "subtitles": {
        }
    }])