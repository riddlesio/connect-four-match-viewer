import React        from 'react';
import createView   from 'omniscient';
import Cell         from './Cell.jsx';
import _            from 'lodash';

const FieldView = createView('FieldView', function (state) {

    const { cells } = state;

    return <g className="Connect4Game-gameView" >
            <use x="50" y="135"  width="1100" height="500" xlinkHref="#connect4-background" />
            <g className="Connect4Game-grid">
                { _.map(cells, Cell) }
            </g>
        </g>;
});

export default FieldView;
