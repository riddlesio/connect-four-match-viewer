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

    const field                     = settings.field;
    const fieldWidth                = field.width;
    const fieldHeight               = field.height;
    const { width, height }         = field.cell;
    const { marginleft, margintop } = field.margins;

    return _.map(data.states, function (state) {

        const { round, column, field, illegalMove, player } = state;
        let { winner } = state;

        if (winner) {
            if (winner !== 'none') {
                /* It's not a draw */
                winner = settings.players.names[parseInt(winner.replace('player', '')) - 1];
            }
        }

        return {
            round,
            column,
            winner,
            field,
            fieldWidth,
            fieldHeight,
            illegalMove,
            player,
            cells: _
                .chain(field)
                .thru((string) => string.split(/,|;/))
                .map(function (cellType, index) {
                    const row       = Math.floor(index / fieldWidth);
                    const column    = index % fieldWidth;
                    const x         = column * width + marginleft;
                    const y         = row * height + margintop;

                    return { row, column, x, y, width, height, cellType, marginleft, margintop };
                })
                .value(),
        };
    });
}

export {
    parsePlayerNames,
    parseStates,
};
