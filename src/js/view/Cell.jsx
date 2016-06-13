import React from 'react';
import createView from 'omniscient';

const Cell = createView(function (data) {

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

    const { x, y, width, height, cellType } = data;
    const id = `x${x}y${y}`;

    return (
         <g id={ id } key={ id } dangerouslySetInnerHTML={{
             __html: `<use x="${x}" y="${y}" width="${width}" height="${height}" xlink:href="#block-${cellType}" />`
         }} />
    );
});

// Private functions

// /**
//  * Creates a className string based on the passed cellType
//  * @param  {String} cellType A value from enum/CellType
//  * @return {String}
//  */
// function createClassName (cellType) {
//     if (cellType == 1) { return "Connect4Game-cell--player1"; }
//     if (cellType == 2) { return "Connect4Game-cell--player2"; }
//     return "Connect4Game-cell";
//
// }

export default Cell;
