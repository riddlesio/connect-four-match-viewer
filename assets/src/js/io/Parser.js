(function () {

    const _ = require('lodash');

    var Parser;

    /**
     * Singleton containing several utility functions for data parsing
     * @type {Object}
     */
    Parser = {

        parsePlayerNames: function (settings) {

            var names = window.frameElement.getAttribute("data-players").split(",");
            console.log(names);
            settings.players.names = names;
            return settings;
        },

        parseMoveSet: function (states) {

            var currentRound;

            
            return _
                .chain(states)
                .map(function (state, index) {

                    var label,
                        { round } = state;

                    if (currentRound === round) {
                        return false;
                    }

                    currentRound = round;
                    console.log( "currentRound " + currentRound); 
                    label = `Round ${round}`;

                    return { label, value: index };
                })
                .compact()
                .value();
        },

        parseStates: function (data, settings) {

            var field                       = settings.field,
                macroboard                  = settings.macroboard,
                fieldWidth                  = field.width,
                fieldHeight                 = field.height,
                { width, height }           = field.cell,
                { marginleft, margintop }   = field.margins;
            var cells = 0;
            return _.map(data.states, function (state) {


                var { round, column, winner, field, macroboard, illegalMove, player, player1fields, player2fields } = state;
                if(winner) {
                    winner = settings.players.names[parseInt(winner.replace("player", "")) - 1];
                }
                return {
                    round,
                    column,
                    winner,
                    field,
                    fieldWidth,
                    fieldHeight,
                    illegalMove,
                    player1fields,
                    player2fields,
                    player,
                    cells: _
                        .chain(field)
                        .thru((string) => string.split(/,|;/))
                        .map(function (cellType, index) {
                            var row     = Math.floor(index / fieldWidth),
                                column  = index % fieldWidth,
                                x       = column * width+marginleft,
                                y       = row * height+margintop+2;

                            return { row, column, x, y, width, height, cellType, marginleft, margintop };
                        })
                        .value(),
                    macroboard: _
                    .chain(macroboard)
                    .thru((string) => string.split(/,|;/))
                    .map(function (cellType, index) {
                        var row     = Math.floor(index / 3),
                            column  = index % 3,
                            x       = column * (width*3)+marginleft,
                            y       = row * (height*3)+margintop;
                        var mbwidth = width *3;
                        var mbheight = height * 3;
                        var mbplayer = player;

                        return { row, column, x, y, mbwidth, mbheight, cellType, marginleft, margintop, mbplayer };
                    })
                    .value()
                };
            });
        }
    };

    module.exports = Parser;
}());
