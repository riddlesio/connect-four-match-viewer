(function (undefined) {

    const
        React      = require('react'),
        createView = require('omniscient'),
        classNames = require('classnames'),
        CellType   = require('../enum/CellType');

    var Cell;

    Cell = createView(function (data) {

        /**
         * Data should have the following structure:
         * {
         *    x: Number,
         *    y: Number,
         *    width: Number,
         *    height: Number,
         *    cellType: String
         * }
         */

        var className,
            { x, y, width, height, cellType } = data;

        className = createClassName(cellType);

        return React.DOM.rect({ x, y, width, height, className });

         if (cellType === "0" || cellType === "3") {
             return React.DOM.rect({ x, y, width, height, className });
         }

        // return (
            // <g dangerouslySetInnerHTML={{
            //     __html: `<use x="${ x }" y="${ y }" width="33" height="33" xlink:href="#block-${ cellType }" />`
            // }} />
        // );
    });

    // Private functions

    /**
     * Creates a className string based on the passed cellType
     * @param  {String} cellType A value from enum/CellType
     * @return {String}
     */
    function createClassName (cellType) {
        if (cellType == 1) { return "Connect4Game-cell--player1"; }
        if (cellType == 2) { return "Connect4Game-cell--player2"; }
        return "Connect4Game-cell";
       
    }

    module.exports = Cell;
}());
