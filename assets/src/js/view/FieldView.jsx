(function (undefined) {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        Cell        = require('./Cell.jsx');

    var FieldView;

    FieldView = createView('FieldView', function (state) {
        var { round, column, winner, field, fieldWidth, fieldHeight, cells } = state;
        /*
        var fieldWidth = fieldWidth * field.cell.width,
            fieldHeight = fieldHeight * field.cell.height, */
        var moveClass = "Connect4Game-playerInfo Connect4Game-playerMove";

        // if (!_.includes(MoveType, move)) {
        //     moveClass += " Connect4Game-playerMove-illegal";
        // }
        var name = "name";
        var points = "points";
        var move = "Move";


        /**
         * Data should have the following structure:
         * {
         *     combo: Integer,
         *     points: Integer,
         *     move: String,
         *     cells: [],
         *     nextShape: String
         *     settings: Object
         * }
         */
        return <g
            key="key"
            className="Connect4Game-playerView" >
                <rect className="Connect4Game-playerName-background" x="-2" y="-77" width={ fieldWidth + 4 } height="73" />

                <g dangerouslySetInnerHTML={{
                    __html: `<use x="50" y="135" xlink:href="#connect4-background" />`
                }} />
                <g className="Connect4Game-grid">
                    { _.map(cells, Cell) }
                </g>
                <text
                    x={ fieldWidth / 2 }
                    y="-30"
                    className="Connect4Game-playerInfo Connect4Game-playerName">{ name }</text>
            </g>;
    });

    function createTransform (index, fieldWidth, canvas) {

        var x = 200 + index * (canvas.width - 400 - fieldWidth),
            y = 100;

        return `translate(${x}, ${y})`;
    }

    module.exports = FieldView;
}());
