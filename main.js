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

function clearData() {

    localStorage.clear();

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

function upload_match(match_name) {
    $.ajax({
        crossDomain: true,
	method: "POST",
        data: JSON.parse(localStorage.getItem(match_name)),
        url: "./upload.php?match=" + match_name,
        success:function(data) {

            var msg = $("<li  class='list-group-item'>" + match_name + " success</li>");
            $("#sync_messages").append(msg);
        },
        error:function(data) {
            var msg = $("<li class='list-group-item'>" + match_name + " error</li>");
            $("#sync_messages").append(msg);
        }
    });
}



function download() {

    $.ajax({
        crossDomain: true,
        url: "./matches.json",
        success:function(data) {
            var msg = $("<li  class='list-group-item'>Download matches - success</li>");
            $("#sync_messages").append(msg);
            //var matches = Object.assign(new Match, JSON.parse(data));
            var objs = data;
		var matches = Object.keys(data);
		for(var i = 0; i < matches.length; i++) {
			var match = matches[i];
			var match_obj = Object.assign(new Match, JSON.parse(data[match]));
			//for (const property in match_obj) {
  			//	console.log(`${property}: ${object[property]}`);
			// }
			const parsed = JSON.parse(data[match])
			for (const p in parsed) {
				const v = parsed[p]
				if (v == "true") {
					parsed[p] = true
				}
				if (v == "false") {
					parsed[p] = false
				}
			}

			localStorage.setItem(matches[i],JSON.stringify(parsed));
		}
        matchList();
        },
        error:function(data) {
            var msg = $("<li  class='list-group-item'>Download matches - fail</li>");
            $("#sync_messages").append(msg);
        }
    });
}
