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
            { x, y, mbwidth, mbheight, cellType } = data;

        //return React.DOM.rect({ x, y, width, height, className });

         if (cellType === "0" || cellType === "3") {
             //return React.DOM.rect({ x, y, width, height, className });
         }
         var id="x" + x + "y" + y;

         return (
             <g id={ id } dangerouslySetInnerHTML={{
                 __html: `<use x="${ x }" y="${ y }" width="${ mbwidth }" height="${ mbheight }" xlink:href="#macroboard-${ cellType }" />`
             }} />
         );
    });

    // Private functions
    module.exports = Macroboard;
}());
