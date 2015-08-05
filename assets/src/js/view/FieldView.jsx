(function (undefined) {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        MoveType    = require('../enum/MoveType'),
        Cell        = require('./Cell.jsx');

    var FieldView;

    FieldView = createView('FieldView', function (state) {
        var { round, column, winner, field, fieldWidth, fieldHeight, cells } = state;
        /*
        var fieldWidth = fieldWidth * field.cell.width,
            fieldHeight = fieldHeight * field.cell.height, */
        var moveClass = "TetrisGame-playerInfo TetrisGame-playerMove";

        // if (!_.includes(MoveType, move)) {
        //     moveClass += " TetrisGame-playerMove-illegal";
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
            className="TetrisGame-playerView" >
                <rect className="TetrisGame-playerName-background" x="-2" y="-77" width={ fieldWidth + 4 } height="73" />
                <rect x= { Math.floor((Math.random() * 7)*100) } y="0" className="Connect4Game-cell--player1" width="100" height="100"/>
                <rect x="100" y="100" className="Connect4Game-cell--player2" width="100" height="100"/>
                <g className="Connect4Game-grid">
                    <g dangerouslySetInnerHTML={{
                        __html: `<use x="-8" y="-8" xlink:href="#grid-background" />`
                    }} />
                    { _.map(cells, Cell) }
                </g>
                <text
                    x={ fieldWidth / 2 }
                    y="-30"
                    className="TetrisGame-playerInfo TetrisGame-playerName">{ name }</text>
                <text
                    x={ fieldWidth + 25 }
                    y="80"
                    className="TetrisGame-playerInfo TetrisGame-playerPoints">{ 'Points ' + points }</text>

                <text
                    x={ fieldWidth / 2 }
                    y={ fieldHeight + 48 }
                    className={ moveClass }>{ move }</text>
            </g>;
    });

    function createTransform (index, fieldWidth, canvas) {

        var x = 200 + index * (canvas.width - 400 - fieldWidth),
            y = 100;

        return `translate(${x}, ${y})`;
    }

    module.exports = FieldView;
}());
