(function (undefined) {

    const
        React      = require('react'),
        createView = require('omniscient'),
        classNames = require('classnames');

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

        //return React.DOM.rect({ x, y, width, height, className });

         if (cellType === "0" || cellType === "3") {
             //return React.DOM.rect({ x, y, width, height, className });
         }
         //y = Math.floor(Math.random()*6)*height;
         var id="x" + x + "y" + y;

         return (
             <g id={ id } dangerouslySetInnerHTML={{
                 __html: `<use x="${ x }" y="${ y }" width="${ width }" height="${ height }" xlink:href="#block-${ cellType }" />`
             }} />
         );
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
