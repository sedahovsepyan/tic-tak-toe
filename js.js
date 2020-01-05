/**
 * Created by ADMIN on 14.07.2017.
 */

var turn = "player",
    $boxes = $('.row').children(),
    $buttons = $('.button1, .button2'),
    $endmsg = $('.message'),
    b = [0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ],
    turnNumber = 1,
    gameEnded = false,
    gameDrawn = false;

$boxes.click(function() {
    if (turn == "player" && $(this).attr('data-taken') == "false" && gameEnded == false) {
        b[Number($(this).attr('id'))] = "X";
        updateBoard();
        turn = "ai";
        window.setTimeout(aiTurn, 200);
        turnNumber++;
    }
});

$('.button1').click(function() {
    reset();
    $buttons.css("transform", "translate(-50%, 100%)");
});
$('.button2').click(function() {
    resetPlaySecond();
    $buttons.css("transform", "translate(-50%, 100%)");
});
function aiTurn() {

    if (turn == "ai") {
        console.log("trywin");
        tryWin();
    }
    if (turn == "ai") {
        console.log("checkthreats");
        checkImmediateThreats();
    }
    if (turn == "ai") {
        console.log("checking branch");
        checkBranchThreats();
    }
    if (turn == "ai") {
        console.log("playing random move");
        playRandom();
    }
    console.log("----AI turn ended----");
    updateBoard();
    testIfGameEnded();

    function tryWin() {
        for (var i = 0; i <= 6; i += 3) {
            if ((b[i] == "O" && b[i + 1] == "O") || (b[i] == "O" && b[i + 2] == "O") || (b[i + 1] == "O" && b[i + 2] == "O")) {
                for (var j = 0; j < 3; j++) {
                    if (typeof b[i + j] == "number") {
                        b[i + j] = "O";
                        turn = "player";
                    }
                }
            }
        }
        for (i = 0; i <= 2; i++) {
            if ((b[i] == "O" && b[i + 3] == "O") || (b[i] == "O" && b[i + 6] == "O") || (b[i + 3] == "O" && b[i + 6] == "O")) {
                for (j = 0; j <= 6; j += 3) {
                    if (typeof b[i + j] == "number") {
                        b[i + j] = "O";
                        turn = "player";
                    }
                }
            }
        }
        if ((b[0] == "O" && b[8] == "O") || (b[2] == "O" && b[6] == "O")) {
            if (typeof b[4] == "number") {
                b[4] = "O";
                turn = "player";
            }
        } else if ((b[4] == "O" && b[8] == "O")) {
            if (typeof b[0] == "number") {
                b[0] = "O";
                turn = "player";
            }
        } else if ((b[4] == "O" && b[6] == "O")) {
            if (typeof b[2] == "number") {
                b[2] = "O";
                turn = "player";
            }
        } else if ((b[2] == "O" && b[4] == "O")) {
            if (typeof b[6] == "number") {
                b[6] = "O";
                turn = "player";
            }
        } else if ((b[0] == "O" && b[4] == "O")) {
            if (typeof b[8] == "number") {
                b[8] = "O";
                turn = "player";
            }
        }
    }

    function checkImmediateThreats() {
        for (var i = 0; i <= 6; i += 3) {
            if ((b[i] == "X" && b[i + 1] == "X") || (b[i] == "X" && b[i + 2] == "X") || (b[i + 1] == "X" && b[i + 2] == "X")) {
                console.log("row threat impending!");
                for (var j = 0; j < 3; j++) {
                    if (typeof b[i + j] == "number") {
                        b[i + j] = "O";
                        turn = "player";
                    }
                }
            }
        }
        for (i = 0; i <= 2; i++) {
            if ((b[i] == "X" && b[i + 3] == "X") || (b[i] == "X" && b[i + 6] == "X") || (b[i + 3] == "X" && b[i + 6] == "X")) {
                console.log("col threat impending!");
                for (j = 0; j <= 6; j += 3) {
                    if (typeof b[i + j] == "number") {
                        b[i + j] = "O";
                        turn = "player";
                    }
                }
            }
        }
        if ((b[0] == "X" && b[8] == "X") || (b[2] == "X" && b[6] == "X")) {
            if (typeof b[4] == "number") {
                b[4] = "O";
                turn = "player";
            }
        } else if ((b[4] == "X" && b[8] == "X")) {
            if (typeof b[0] == "number") {
                b[0] = "O";
                turn = "player";
            }
        } else if ((b[4] == "X" && b[6] == "X")) {
            console.log("trying to win");
            if (typeof b[2] == "number") {
                b[2] = "O";
                turn = "player";
            }
        } else if ((b[2] == "X" && b[4] == "X")) {
            if (typeof b[6] == "number") {
                b[6] = "O";
                turn = "player";
            }
        } else if ((b[0] == "X" && b[4] == "X")) {
            if (typeof b[8] == "number") {
                b[8] = "O";
                turn = "player";
            }
        }
    }

    function checkBranchThreats() {
        if ((b[0] == "X" && b[8] == "X") || (b[2] == "X" && b[6] == "X")) {
            console.log("blocking cross branch");
            if (typeof b[1] == "number") {
                b[1] = "O";
            } else if (typeof b[3] == "number") {
                b[3] = "O";
            } else if (typeof b[5] == "number") {
                b[5] = "O";
            } else if (typeof b[7] == "number") {
                b[7] = "O";
            }
            turn = "player";
        } else if (turnNumber == 2) {
            if ((b[0] == "X" && b[7] == "X") || (b[6] == "X" && b[1] == "X")) {
                b[5] = "O";
                turn = "player";
            } else if ((b[2] == "X" && b[7] == "X") || (b[8] == "X" && b[1] == "X")) {
                b[3] = "O";
                turn = "player";
            } else if ((b[0] == "X" && b[5] == "X") || (b[2] == "X" && b[3] == "X")) {
                b[7] = "O";
                turn = "player";
            } else if ((b[6] == "X" && b[5] == "X") || (b[8] == "X" && b[3] == "X")) {
                b[1] = "O";
                turn = "player";
            }
        }
    }

    function playRandom() {
        var played = false,
            randomNum, cornersTaken = 0, // this includes the centre block
            looping = 0;
        for (var xp = 0; xp <= 4; xp++) {
            if (typeof b[xp * 2] == "string") {
                cornersTaken++;
            }
        }
        while (played == false && looping < 50) {
            looping++;
            randomNum = Math.floor(Math.random() * 5);
            if (typeof b[4] == "number") {
                b[4] = "O";
                played = true;
            } else if (typeof b[randomNum * 2] == "number") {
                b[randomNum * 2] = "O";
                played = true;
            } else if (typeof b[randomNum * 2 + 1] == "number" && cornersTaken == 5) {
                b[randomNum * 2 + 1] = "O";
                played = true;
            }
        }
        turn = "player";
    }
}

function testIfGameEnded() {

    for (var i = 0; i <= 6; i += 3) {
        if (b[i] == b[i + 1] && b[i + 1] == b[i + 2]) {
            $("[id=" + i + "]").addClass('red');
            $("[id=" + (i + 1) + "]").addClass('red');
            $("[id=" + (i + 2) + "]").addClass('red');
            gameEnded = true;
        }
    }

    for (var j = 0; j <= 2; j++) {
        if (b[j] == b[j + 3] && b[j + 3] == b[j + 6]) {
            $("[id=" + j + "]").addClass('red');
            $("[id=" + (j + 3) + "]").addClass('red');
            $("[id=" + (j + 6) + "]").addClass('red');
            gameEnded = true;
        }
    }

    if (b[0] == b[4] && b[4] == b[8]) {
        $("[id=" + 0 + "]").addClass('red');
        $("[id=" + 4 + "]").addClass('red');
        $("[id=" + 8 + "]").addClass('red');
        gameEnded = true;
    } else if (b[2] == b[4] && b[4] == b[6]) {
        $("[id=" + 2 + "]").addClass('red');
        $("[id=" + 4 + "]").addClass('red');
        $("[id=" + 6 + "]").addClass('red');
        gameEnded = true;
    }

    var spacesTaken = 0;
    for (var k = 0; k < 9; k++) {
        if (typeof b[k] == "string") {
            spacesTaken++;
        }
    }
    if (spacesTaken == 9) {
        gameDrawn = true;
    }
    //end game if game has ended
    if (gameEnded === true) {
        window.setTimeout(function() {
            $endmsg.css("display", "block");
            $endmsg.html("YOU LOSE!");
        }, 200)
    } else if (gameDrawn === true) {
        window.setTimeout(function() {
            $endmsg.css("display", "block");
            $endmsg.html("IT'S A DRAW!");
        }, 200)
    }
}

function updateBoard() {
    for (var i = 0; i < 9; i++) {
        if (typeof b[i] == "string") {
            $("[id=" + i + "]").html(b[i]);
        } else {
            $("[id=" + i + "]").html("");
        }
        if (typeof b[i] == "string") {
            $("[id=" + i + "]").attr('data-taken', "true");
        } else {
            $("[id=" + i + "]").removeClass('red');
            $("[id=" + i + "]").attr('data-taken', "false");
        }
    }
}

function reset() {
    turn = "player";
    b = [0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ];
    turnNumber = 1;
    gameEnded = false;
    gameDrawn = false;
    $endmsg.css("display", "none");
    updateBoard();
}

function resetPlaySecond() {
    reset();
    turn = "ai";
    window.setTimeout(aiTurn, 200);
}