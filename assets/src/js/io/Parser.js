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
                    label = `Round ${round}`;

                    return { label, value: index };
                })
                .compact()
                .value();
        },

        parseStates: function (data, settings) {

            var fieldSettings       = settings.field,
                fieldWidth          = fieldSettings.width,
                fieldHeight         = fieldSettings.height,
                { width, height }   = fieldSettings.cell;
            var cells = 0;
            
            return _.map(data.states, function (state) {

                var { players, round, column, winner, field } = state;

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
                    cells: _
                        .chain(field)
                        .thru((string) => string.split(/,|;/))
                        .map(function (cellType, index) {
                            var row     = Math.floor(index / fieldWidth),
                                column  = index % fieldWidth,
                                x       = column * width,
                                y       = row * height;

                            return { row, column, x, y, width, height, cellType };
                        })
                        .value()
                };
            });
        }
    };

    module.exports = Parser;
}());
