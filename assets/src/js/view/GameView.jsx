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
            <svg className="TetrisGame" viewBox="0 0 700 600" preserveAspectRatio="xMidYMid meet">

                
                <text x="50%" y="70" className="TetrisGame-currentRound">{ 'Round ' + round }</text>
                { FieldView(state) }
                <Overlay winner={ winner } />
            </svg>
        );
    });

    module.exports = GameView;
}());
