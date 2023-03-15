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