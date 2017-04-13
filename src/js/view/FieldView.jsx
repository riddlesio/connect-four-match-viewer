import React        from 'react';
import component    from 'omniscient';
import Cell         from './Cell.jsx';

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

function renderCell(cell, index) {

    return <Cell key={ index} cell={ cell } />;
}

export default FieldView;
