import React        from 'react';
import component    from 'omniscient';
import Cell         from './Cell.jsx';

function renderCell(cell) {

    return <Cell cell={ cell } />;
}

const FieldView = component('FieldView', function (state) {

    const { cells } = state;

    return (
        <g className="Connect4Game-gameView" >
            <use x="50" y="135"  width="1100" height="500" xlinkHref="#connect4-background" />
            <g className="Connect4Game-grid">
                { cells.map(renderCell) }
            </g>
        </g>
    );
});

export default FieldView;
