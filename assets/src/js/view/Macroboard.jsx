(function (undefined) {

    const
        React      = require('react'),
        createView = require('omniscient'),
        classNames = require('classnames');

    var Macroboard;

    Macroboard = createView(function (data) {

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
            { x, y, mbwidth, mbheight, cellType, mbplayer } = data;

            className = 0;
            if (cellType == -1) {
                className = mbplayer;
            }
        /*
        var player1class="", player2class="";
        if ( data.player == 1) {
            player1class = " active ";
        } else {
            player2class = " active ";
        }
        */
        var id="x" + x + "y" + y;

        return (
             <g id={ id } dangerouslySetInnerHTML={{
                 __html: `<use x="${ x }" y="${ y }" width="${ mbwidth }" height="${ mbheight }" xlink:href="#macroboard--${ className }" />`
             }} />
         );
    });

    // Private functions
    module.exports = Macroboard;
}());
