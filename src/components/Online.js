import { useEffect, useState } from "react";
import "../App.css";
import { getPosition, setPosition } from "./Helper";
function Online() {

    let apf = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let chess = [];
    for (let i = 8; i > 0; i--) {
        for (let j = 0; j < 8; j++) chess.push(`${apf[j]}${i}`);
    }
    let flag = true;
    let initialPosition = [
        "B_Rook", "B_Knight", "B_Bishop", "B_King", "B_Queen", "B_Bishop", "B_Knight", "B_Rook",
        "B_Pon", "B_Pon", "B_Pon", "B_Pon", "B_Pon", "B_Pon", "B_Pon", "B_Pon",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "W_Pon", "W_Pon", "W_Pon", "W_Pon", "W_Pon", "W_Pon", "W_Pon", "W_Pon",
        "W_Rook", "W_Knight", "W_Bishop", "W_King", "W_Queen", "W_Bishop", "W_Knight", "W_Rook"
    ];
    let initialclickable = [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0
    ];
    let initial_curr_unit = { name: "", pos: -1 };
    const [b_king_pos, setb_king_pos] = useState(3);
    const [w_king_pos, setw_king_pos] = useState(59);
    const [yourTurn, seYourTurn] = useState("W")
    const [position, setposition] = useState(initialPosition);
    const [clickable, setclickable] = useState(initialclickable);
    const [curr_unit, setcurr_unit] = useState(initial_curr_unit);
    const pownMove = (i) => {
        initialclickable[i - 8] = initialclickable[i - 16] = 1;
        console.log(clickable)
        setclickable(initialclickable)
    }
    // function for identifying check
    //parameter ==  position_copy - copy of position array // i - index of king
    const checkrun = (position_copy, i) => {
        let unit_type = position_copy[i][0];
        let check_unit = [];
        //rook moves
        for (let k = i - 8; k >= 0; k = k - 8) {
            if (unit_type === position_copy[k][0]) { break; }
            if (unit_type === "W" && position_copy[k][0] === "B" && (position_copy[k][2] === "R" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
            if (unit_type === "B" && position_copy[k][0] === "W" && (position_copy[k][2] === "R" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
        }
        for (let k = i + 8; k <= 63; k = k + 8) {
            if (unit_type === position_copy[k][0]) { break; }
            if (unit_type === "W" && position_copy[k][0] === "B" && (position_copy[k][2] === "R" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
            if (unit_type === "B" && position_copy[k][0] === "W" && (position_copy[k][2] === "R" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
        }

        for (let k = i - 1; k >= i - (i % 8); k--) {
            if (unit_type === position_copy[k][0]) { break; }
            if (unit_type === "W" && position_copy[k][0] === "B" && (position_copy[k][2] === "R" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
            if (unit_type === "B" && position_copy[k][0] === "W" && (position_copy[k][2] === "R" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
        }
        for (let k = i + 1; k <= i - (i % 8) + 7; k++) {
            if (unit_type === position_copy[k][0]) { break; }
            if (unit_type === "W" && position_copy[k][0] === "B" && (position_copy[k][2] === "R" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
            if (unit_type === "B" && position_copy[k][0] === "W" && (position_copy[k][2] === "R" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
        }
        // bishop moves
        for (let k = i + 9; k < 64; k += 9) {
            if (k % 8 < i % 8 || unit_type === position_copy[k][0]) { break; }
            if (unit_type === "W" && position_copy[k][0] === "B" && (position_copy[k][2] === "B" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
            if (unit_type === "B" && position_copy[k][0] === "W" && (position_copy[k][2] === "B" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
        }
        for (let k = i - 9; k >= 0; k -= 9) {
            if (k % 8 == 7 || unit_type === position_copy[k][0]) { break; }
            if (unit_type === "W" && position_copy[k][0] === "B" && (position_copy[k][2] === "B" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
            if (unit_type === "B" && position_copy[k][0] === "W" && (position_copy[k][2] === "B" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
        }
        for (let k = i - 7; k >= 0; k -= 7) {
            if (k % 8 < i % 8 || unit_type === position_copy[k][0]) { break; }
            if (unit_type === "W" && position_copy[k][0] === "B" && (position_copy[k][2] === "B" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
            if (unit_type === "B" && position_copy[k][0] === "W" && (position_copy[k][2] === "B" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
        }
        for (let k = i + 7; k < 64; k += 7) {
            if (k % 8 > i % 8 || unit_type === position_copy[k][0]) { break; }
            if (unit_type === "W" && position_copy[k][0] === "B" && (position_copy[k][2] === "B" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
            if (unit_type === "B" && position_copy[k][0] === "W" && (position_copy[k][2] === "B" || position_copy[k][2] === "Q")) { check_unit.push(position_copy[k]); }
        }
        // knight Moves
        if (((i + 17) % 8) > i % 8 && i + 17 <= 63 && i + 17 >= 0 && ((unit_type === "W" && position_copy[i + 17][0] === "B") || (unit_type === "B" && position_copy[i + 17][0] === "W")) && position_copy[i + 17][2] === "K") check_unit.push(position_copy[i + 17]);
        if (((i - 6) % 8) > i % 8 && i - 6 <= 63 && i - 6 >= 0 && ((unit_type === "W" && position_copy[i - 6][0] === "B") || (unit_type === "B" && position_copy[i - 6][0] === "W")) && position_copy[i - 6][2] === "K") check_unit.push(position_copy[i - 6]);
        if (((i - 15) % 8) > i % 8 && i - 15 <= 63 && i - 15 >= 0 && ((unit_type === "W" && position_copy[i - 15][0] === "B") || (unit_type === "B" && position_copy[i - 15][0] === "W")) && position_copy[i - 15][2] === "K") check_unit.push(position_copy[i - 15]);
        if (((i + 10) % 8) > i % 8 && i + 10 <= 63 && i + 10 >= 0 && ((unit_type === "W" && position_copy[i + 10][0] === "B") || (unit_type === "B" && position_copy[i + 10][0] === "W")) && position_copy[i + 10][2] === "K") check_unit.push(position_copy[i + 10]);
        if (((i + 15) % 8) < i % 8 && i + 15 <= 63 && i + 15 >= 0 && ((unit_type === "W" && position_copy[i + 15][0] === "B") || (unit_type === "B" && position_copy[i + 15][0] === "W")) && position_copy[i + 15][2] === "K") check_unit.push(position_copy[i + 15]);
        if (((i - 17) % 8) < i % 8 && i - 17 <= 63 && i - 17 >= 0 && ((unit_type === "W" && position_copy[i - 17][0] === "B") || (unit_type === "B" && position_copy[i - 17][0] === "W")) && position_copy[i - 17][2] === "K") check_unit.push(position_copy[i - 17]);
        if (((i + 6) % 8) < i % 8 && i + 6 <= 63 && i + 6 >= 0 && ((unit_type === "W" && position_copy[i + 6][0] === "B") || (unit_type === "B" && position_copy[i + 6][0] === "W")) && position_copy[i + 6][2] === "K") check_unit.push(position_copy[i + 6]);
        if (((i - 10) % 8) < i % 8 && i - 10 <= 63 && i - 10 >= 0 && ((unit_type === "W" && position_copy[i - 10][0] === "B") || (unit_type === "B" && position_copy[i - 10][0] === "W")) && position_copy[i - 10][2] === "K") check_unit.push(position_copy[i - 10]);
        // pawn moves
        if (unit_type === "W") {
            if (position_copy[i - 9][0] === "B") { check_unit.push(position_copy[i - 9]); console.log(i - 9); }
            if (position_copy[i - 7][0] === "B") { check_unit.push(position_copy[i - 7]); console.log(i - 7) }
        }
        else if (unit_type === "B") {
            if (position_copy[i + 9][0] === "W") { check_unit.push(position_copy[i + 9]); console.log(i + 9); }
            if (position_copy[i + 7][0] === "W") { check_unit.push(position_copy[i + 7]); console.log(i + 7); }
        }
        console.log(check_unit);
        return check_unit;
    }
    const onclk_checkrun = (temp_clickable_copy, i) => {
        let position_tempcopy;
        for (let j = 0; j < 64; j++) {
            if (temp_clickable_copy[j] === 1) {
                position_tempcopy = position;
                position_tempcopy[j] = position_tempcopy[i];
                position_tempcopy[i] = "";
                let temp_check_unit = checkrun(position_tempcopy, position_tempcopy[j][0] === "W" ? w_king_pos : b_king_pos);
                if (temp_check_unit.length !== 0) temp_clickable_copy[j] = 2;
            }

        }
        return temp_clickable_copy;
    }
    const onclk = (unit, i) => {
        console.log(unit[0]);
        let temp_clickable = initialclickable;
        if (unit === "W_Pon") {
            console.log(position[i - 8][0]);

            if (i >= 0 && i <= 63 && position[i - 8] === "") temp_clickable[i - 8] = 1;

            if (i >= 48 && i <= 55 && position[i - 16] === "" && position[i - 8] === "") temp_clickable[i - 16] = 1;
            if (position[i - 9][0] === "B") temp_clickable[i - 9] = 1;
            if (position[i - 7][0] === "B") temp_clickable[i - 7] = 1;


        }
        else if (unit === "B_Pon") {

            if (i >= 0 && i <= 63 && position[i + 8] === "") temp_clickable[i + 8] = 1;
            if (i >= 8 && i <= 15 && position[i + 16] === "" && position[i + 8] === "") temp_clickable[i + 16] = 1;
            if (position[i + 9][0] === "W") temp_clickable[i + 9] = 1;
            if (position[i + 7][0] === "W") temp_clickable[i + 7] = 1;


        }
        else if (unit === "B_Rook" || unit === "W_Rook") {

            let temp = i % 8;
            //for(let k=temp;k<64;k+=8){
            // if(unit[0]===position[k][0]){break;}
            // if(k!=i){
            //  temp_clickable[k]=1;
            // }
            // if(unit[0]==="W"&&position[k][0]==="B"){break;}
            // if(unit[0]==="B"&&position[k][0]==="W"){break;}
            // }
            for (let k = i - 8; k >= 0; k = k - 8) {
                //console.log(k);
                if (unit[0] === position[k][0]) { break; }
                temp_clickable[k] = 1;
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }
            for (let k = i + 8; k <= 63; k = k + 8) {
                //console.log(k);
                if (unit[0] === position[k][0]) { break; }
                temp_clickable[k] = 1;
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }
            // for(let k=i-temp;k<(i-temp)+8;k++){
            //  // if(unit[0]===position[k][0]){break;}
            //   if(k!=i){
            //     temp_clickable[k]=1;
            //   }
            //  // if(unit[0]==="W"&&position[k][0]==="B"){break;}
            //  // if(unit[0]==="B"&&position[k][0]==="W"){break;}
            // }
            for (let k = i - 1; k >= i - (i % 8); k--) {
                if (unit[0] === position[k][0]) { break; }
                if (k != i) {
                    temp_clickable[k] = 1;
                }
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }
            for (let k = i + 1; k <= i - (i % 8) + 7; k++) {
                if (unit[0] === position[k][0]) { break; }
                if (k != i) {
                    temp_clickable[k] = 1;
                }
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }

        }
        else if (unit === "B_Bishop" || unit === "W_Bishop") {


            for (let k = i + 9; k < 64; k += 9) {
                if (k % 8 < i % 8 || unit[0] === position[k][0]) {
                    break;
                }
                if (k != i) {
                    temp_clickable[k] = 1;
                }
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }
            for (let k = i - 9; k >= 0; k -= 9) {
                if (k % 8 == 7 || unit[0] === position[k][0]) {
                    console.log(444);
                    break;
                }
                if (k != i) {
                    temp_clickable[k] = 1;
                }
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }
            for (let k = i - 7; k >= 0; k -= 7) {
                if (k % 8 < i % 8 || unit[0] === position[k][0]) {
                    break;
                }
                if (k != i) {

                    temp_clickable[k] = 1;
                }
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }
            for (let k = i + 7; k < 64; k += 7) {
                if (k % 8 > i % 8 || unit[0] === position[k][0]) {
                    break;
                }
                if (k != i) {
                    temp_clickable[k] = 1;
                }
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }

        }
        else if (unit === "B_Knight" || unit === "W_Knight") {


            if (((i + 17) % 8) > i % 8 && i + 17 <= 63 && i + 17 >= 0 && unit[0] !== position[i + 17][0]) temp_clickable[i + 17] = 1;
            if (((i - 6) % 8) > i % 8 && i - 6 <= 63 && i - 6 >= 0 && unit[0] !== position[i - 6][0]) temp_clickable[i - 6] = 1;
            if (((i - 15) % 8) > i % 8 && i - 15 <= 63 && i - 15 >= 0 && unit[0] !== position[i - 15][0]) temp_clickable[i - 15] = 1;
            if (((i + 10) % 8) > i % 8 && i + 10 <= 63 && i + 10 >= 0 && unit[0] !== position[i + 10][0]) temp_clickable[i + 10] = 1;
            if (((i + 15) % 8) < i % 8 && i + 15 <= 63 && i + 15 >= 0 && unit[0] !== position[i + 15][0]) temp_clickable[i + 15] = 1;
            if (((i - 17) % 8) < i % 8 && i - 17 <= 63 && i - 17 >= 0 && unit[0] !== position[i - 17][0]) temp_clickable[i - 17] = 1;
            if (((i + 6) % 8) < i % 8 && i + 6 <= 63 && i + 6 >= 0 && unit[0] !== position[i + 6][0]) temp_clickable[i + 6] = 1;
            if (((i - 10) % 8) < i % 8 && i - 10 <= 63 && i - 10 >= 0 && unit[0] !== position[i - 10][0]) temp_clickable[i - 10] = 1;


        }
        else if (unit === "B_Queen" || unit === "W_Queen") {

            let temp = i % 8;
            for (let k = i - 8; k >= 0; k = k - 8) {
                //console.log(k);
                if (unit[0] === position[k][0]) { break; }
                temp_clickable[k] = 1;
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }
            for (let k = i + 8; k <= 63; k = k + 8) {
                //console.log(k);
                if (unit[0] === position[k][0]) { break; }
                temp_clickable[k] = 1;
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }
            // for(let k=i-temp;k<(i-temp)+8;k++){
            //  // if(unit[0]===position[k][0]){break;}
            //   if(k!=i){
            //     temp_clickable[k]=1;
            //   }
            //  // if(unit[0]==="W"&&position[k][0]==="B"){break;}
            //  // if(unit[0]==="B"&&position[k][0]==="W"){break;}
            // }
            for (let k = i - 1; k >= i - (i % 8); k--) {
                if (unit[0] === position[k][0]) { break; }
                if (k != i) {
                    temp_clickable[k] = 1;
                }
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }
            for (let k = i + 1; k <= i - (i % 8) + 7; k++) {
                if (unit[0] === position[k][0]) { break; }
                if (k != i) {
                    temp_clickable[k] = 1;
                }
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }
            for (let k = i + 9; k < 64; k += 9) {
                if (k % 8 < i % 8 || unit[0] === position[k][0]) {
                    break;
                }
                if (k != i) {
                    temp_clickable[k] = 1;
                }
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }
            for (let k = i - 9; k >= 0; k -= 9) {
                if (k % 8 == 7 || unit[0] === position[k][0]) {
                    console.log(444);
                    break;
                }
                if (k != i) {
                    temp_clickable[k] = 1;
                }
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }
            for (let k = i - 7; k >= 0; k -= 7) {
                if (k % 8 < i % 8 || unit[0] === position[k][0]) {
                    break;
                }
                if (k != i) {

                    temp_clickable[k] = 1;
                }
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }
            for (let k = i + 7; k < 64; k += 7) {
                if (k % 8 > i % 8 || unit[0] === position[k][0]) {
                    break;
                }
                if (k != i) {
                    temp_clickable[k] = 1;
                }
                if (unit[0] === "W" && position[k][0] === "B") { break; }
                if (unit[0] === "B" && position[k][0] === "W") { break; }
            }

        }

        if ((unit === "W_King" || unit === "B_King")) {

            let temp = i % 8;
            if ((i - 9) % 8 < i % 8 && i - 9 >= 0 && unit[0] !== position[i - 9][0]) temp_clickable[i - 9] = 1;
            if ((i - 8) % 8 == i % 8 && i - 8 >= 0 && unit[0] !== position[i - 8][0]) temp_clickable[i - 8] = 1;
            if ((i - 7) % 8 > i % 8 && i - 7 >= 0 && unit[0] !== position[i - 7][0]) temp_clickable[i - 7] = 1;
            if ((i - 1) % 8 < i % 8 && i - 1 >= 0 && unit[0] !== position[i - 1][0]) temp_clickable[i - 1] = 1;
            if ((i + 1) % 8 > i % 8 && i + 1 <= 63 && unit[0] !== position[i + 1][0]) temp_clickable[i + 1] = 1;
            if ((i + 7) % 8 < i % 8 && i + 7 <= 63 && unit[0] !== position[i + 7][0]) temp_clickable[i + 7] = 1;
            if ((i + 8) % 8 == i % 8 && i + 8 <= 63 && unit[0] !== position[i + 8][0]) temp_clickable[i + 8] = 1;
            if ((i + 9) % 8 > i % 8 && i + 9 <= 63 && unit[0] !== position[i + 9][0]) temp_clickable[i + 9] = 1;

        }

        setclickable(temp_clickable);
        setcurr_unit({ name: unit, pos: i });
    }

    const letsMove = (unit, i) => {
        // unit - unit on the place where currently selected unit is moving
        // i - index of place where selected unit is moving.
        //setting new king position
        if (curr_unit.name === "B_King") {
            setb_king_pos(i);

        } else if (curr_unit.name === "W_King") {
            setw_king_pos(i);
        }
        console.log(w_king_pos);
        // checking winner of game
        if (unit === "B_King") {

            setposition(initialPosition);
            setclickable(initialclickable);
            setcurr_unit(initial_curr_unit);
            seYourTurn("W");
            alert("White Won");
            return;
        } else if (unit === "W_King") {

            setposition(initialPosition);
            setclickable(initialclickable);
            setcurr_unit(initial_curr_unit);
            seYourTurn("W");
            alert("Black Won");
            return;
        };
        // setting new position of units
        let temp = position;
        temp[i] = curr_unit.name;
        temp[curr_unit.pos] = "";
        setposition(temp);
        setcurr_unit(initial_curr_unit);
        setclickable(initialclickable)
        seYourTurn(yourTurn === "W" ? "B" : "W")
        // identifying check
        let checkw = checkrun(temp, w_king_pos);
        let checkb = checkrun(temp, b_king_pos);
        checkw.length !== 0 && alert(`check by black team to white by ${checkw.map((e, i) => { return e + " "; })}`);
        checkb.length !== 0 && alert(`check by white team to black by ${checkb.map((e, i) => { return e + " "; })}`);
        setPosition(position);
    }
    
    useEffect(()=>{
        getPosition(setPosition);
    },[position])

    return (
        <div className="App">
            <div className="info">
                <div className="turn">{`its ${yourTurn === "W" ? "White" : "Black"}'s Turn`}</div>
            </div>
            <div className="board">
                {
                    chess.map((e, i) => {

                        if (i % 8 == 0 && i != 0) {
                            flag = !flag;
                        }

                        return flag == true ?
                            (<div className={`${i % 2 != 0 ? "black" : "white"} ${e} board-item`} >
                                {clickable[i] === 2 && <span className="moves_red"></span>}
                                {clickable[i] === 1 && <span onClick={() => { letsMove(position[i], i) }} className="moves"></span>}
                                {position[i] !== "" && <img onClick={() => { position[i][0] == yourTurn && onclk(position[i], i) }} src={`https://notebook-covers.s3.us-west-2.amazonaws.com/${position[i]}.svg`} />}
                            </div>)
                            :
                            (<div className={`${i % 2 != 0 ? "white" : "black"} ${e} board-item`} >
                                {clickable[i] === 1 && <span onClick={() => { letsMove(position[i], i) }} className="moves"></span>}
                                {position[i] !== "" && <img onClick={() => { position[i][0] == yourTurn && onclk(position[i], i) }} src={`https://notebook-covers.s3.us-west-2.amazonaws.com/${position[i]}.svg`} />}
                            </div>)

                    })}
            </div>
        </div>
    );
}

export default Online;
