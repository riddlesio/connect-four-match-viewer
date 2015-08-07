                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            (function () {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        FieldView  = require('./FieldView.jsx'),
        Overlay     = require('./Overlay.jsx').jsx;

    var GameView;

    GameView = createView('GameView', function (props) {
        var { state, settings } = props,
            { round, column, winner, field, fieldWidth, fieldHeight, cells } = state;
            

        /**
         * Data should have the following structure:
         * {
         *     round: Integer,
         *     
         *     ],
         *     winner: [unset | string]
         * }
         */

        return (
            <svg className="Connect4Game" viewBox="0 0 1200 705" preserveAspectRatio="xMidYMid meet">

                
                { FieldView(state) }
                <text x="50%" y="70" className="Connect4Game-currentRound">{ 'Round ' + round }</text>
                <Overlay winner={ winner } />
            </svg>
        );
    });

    module.exports = GameView;
}());
