import React        from 'react';
import createView   from 'omniscient';
import Cell         from './Cell.jsx';
const _ = require('lodash');

// import _            from 'lodash';

const FieldView = createView('FieldView', function (state) {

    const { cells } = state;

    return <g className="Connect4Game-gameView" >
            <g dangerouslySetInnerHTML={{
                __html: `<use x="50" y="135" xlink:href="#connect4-background" />`,
            }} />
            <g className="Connect4Game-grid">
                { _.map(cells, Cell) }
            </g>
        </g>;
});

export default FieldView;
