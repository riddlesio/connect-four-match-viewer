(function (undefined) {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        Cell        = require('./Cell.jsx');

    var FieldView;

    FieldView = createView('FieldView', function (state) {

        var { round, column, winner, field, fieldWidth, fieldHeight, cells } = state;

        var moveClass = "Connect4Game-playerInfo Connect4Game-playerMove";

        return <g className="Connect4Game-gameView" >
                <g dangerouslySetInnerHTML={{
                    __html: `<use x="50" y="135" xlink:href="#connect4-background" />`
                }} />
                <g className="Connect4Game-grid">
                    { _.map(cells, Cell) }
                </g>
            </g>;
    });

    module.exports = FieldView;
}());
