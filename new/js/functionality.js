
function create_card(info) {
    let card = `<div class="col">
        <div class="card card-1">
        <div class="card-header">`+info+`</div>
        <div class="card-body"></div> 
        <div class="card-footer">Footer</div>
        </div>
    </div>`

    return card
}

function create_row(title, list_of_cards) {

    let cols = []
    for (var i = 0; i < list_of_cards.length; i++) {
        a = create_card(list_of_cards[i])
        cols.push(a)
    }

    text_value = cols.join(" ")

    row = `<div class="row mt-5">
                <div class="col">
                    <h3>`+ title + `</h3>
                </div>
                </div>
                <div class="row row-fluid">
                    `+text_value+`
                </div>
            </div>`
    return row
}

function create_container(list_of_locations){
    let cols = []
    for (var i = 0; i < list_of_locations.length; i++) {
        a = create_row(list_of_locations[i],["sahil","akul","rajath"])
        console.log(a)
        cols.push(a)
    }

    text_value = cols.join(" ")

    $("#main_container").html(text_value)

}

create_container(["Semantic Lab (Kochi)","Semantic Lab (Banglore)"])