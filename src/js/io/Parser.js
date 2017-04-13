import _ from 'lodash';

function parsePlayerNames(playerData, settings) {

    settings.players.names = [];
    settings.players.emailHash = [];

    playerData.forEach((player) => {
        const name = player.name ? player.name : '';
        const hash = player.emailHash ? player.emailHash : '';

        settings.players.names.push(name);
        settings.players.emailHash.push(hash);
    });

    return settings;
}

function parseStates(data, settings) {

    const { field, players }        = settings;
    const fieldWidth                = field.width;
    const fieldHeight               = field.height;
    const { width, height }         = field.cell;
    const { marginleft, margintop } = field.margins;
    const { winner, states }        = data;

    const parsedStates = states.map(state => {

        const { round, column, field, illegalMove, player } = state;

        return {
            round,
            column,
            field,
            fieldWidth,
            fieldHeight,
            illegalMove,
            player,
            winner: null,
            cells: _
                .chain(field)
                .thru((string) => string.split(/,|;/))
                .map((cellType, index) => {
                    const row       = Math.floor(index / fieldWidth);
                    const column    = index % fieldWidth;
                    const x         = column * width + marginleft;
                    const y         = row * height + margintop;

                    return { row, column, x, y, width, height, cellType, marginleft, margintop };
                })
                .value(),
        };
    });

    return addFinalState(parsedStates, winner, players.names);
}

function addFinalState(states, winner, playerNames) {
    const lastState = states[states.length - 1];
    return states.concat([
        {
            ...lastState,
            winner: winner !== null ? playerNames[winner] : null,
        },
    ]);
}

export {
    parsePlayerNames,
    parseStates,
};
