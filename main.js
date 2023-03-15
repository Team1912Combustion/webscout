var matches;

/*
  * Driver rating system
  * Cube - Y/N
  * Cone - Y/N
  * Tipped - Y/N
  * Portal - Y/N
  * 
  * Auto Balance - Y/N
*/

class Match {

    static getMatches() {
        return Object.keys(localStorage).sort();

    }

    getMatchID() {
        return this.team_number + "_" + this.match_number;
    }

    constructor(
        team_number,
        match_number,
        robot_left_community,
        auto_top_row,
        auto_mid_row,
        auto_bottom_row,
        tele_top_row,
        tele_mid_row,
        tele_bottom_row,
        auto_balance,
        tele_driver_rating,
        cube,
        cone,
        tipped,
        portal,
        match_details
        ) {
            this.team_number = team_number;
            this.match_number = match_number;
            this.robot_left_community = robot_left_community;
            this.auto_top_row = auto_top_row;
            this.auto_mid_row = auto_mid_row;
            this.auto_bottom_row = auto_bottom_row;
            this.tele_top_row = tele_top_row;
            this.tele_mid_row = tele_mid_row;
            this.tele_bottom_row = tele_bottom_row;
            this.auto_balance = auto_balance;
            this.tele_driver_rating = tele_driver_rating;
            this.cube = cube;
            this.cone = cone;
            this.tipped = tipped;
            this.portal = portal;
            this.match_details = match_details;
        }
}


function boolToFloat(b) {
    return b == true ? 1 :  0;
}

//  Upload matches to server
function upload() {
    var matches = Match.getMatches();
    for(var i = 0; i < matches.length; i++) {
        var match = matches[i];
        upload_match(match);
    }
}

function upload_match(match) {
    console.log(localStorage.getItem(match));
    $.ajax({
        crossDomain: true,
        data: localStorage.getItem(match),
        url: $("#server").val() + "/upload/" + match,
        success:function(data) {
            var msg = $("<li  class='list-group-item'>" + match + " success</li>");
            $("#sync_messages").append(msg);
        },
        error:function(data) {
            var msg = $("<li class='list-group-item'>" + match + " error</li>");
            $("#sync_messages").append(msg);
        }
    });
}



function download_matches() {

    $.ajax({
        crossDomain: true,
        data: localStorage.getItem(match),
        url: $("#server").val(),
        success:function(data) {
            var msg = $("<li  class='list-group-item'>Download matches - success</li>");
            $("#sync_messages").append(msg);
            localStorage.clear();
            var matches = Object.assign(new Match, JSON.parse(localStorage.getItem(name)));
            var objs = data.map(JSON.parse);

            console.log(objs);

        },
        error:function(data) {
            var msg = $("<li  class='list-group-item'>Download matches - fail</li>");
            $("#sync_messages").append(msg);
        }
    });
}
