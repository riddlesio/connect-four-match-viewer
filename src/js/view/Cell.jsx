import React        from 'react';
import component    from 'omniscient';

const Cell = component('Cell', function (props) {

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

    const { x, y, width, height, cellType } = props.cell;

    return (
        <use
            x={ x }
            y={ y }
            width={ width }
            height={ height }
            xlinkHref={ `#block-${cellType}` }
        />
    );
});

export default Cell;
