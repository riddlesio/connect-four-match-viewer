import React from 'react';
import createView from 'omniscient';
import Overlay from './Overlay.jsx';
import FieldView from './FieldView.jsx';

const GameView = createView('GameView', function (props) {

    const { state, settings } = props;
    const { round, column, winner, illegalMove } = state;
    const { players, field } = settings;
    const cell = field.cell;

    let moveText = illegalMove;
    let moveClass = 'Connect4Game-illegalMove ';
    let moveTextPlayer1 = '';
    let moveTextPlayer2 = '';

    if (illegalMove == '') {
        moveText = 'Column ' + column;
    } else {
        moveClass = 'Connect4Game-illegalMove illegal';
    }

    if (state.player == 1) {
        moveTextPlayer1 = moveText;
    } else {
        moveTextPlayer2 = moveText;
    }

    const moveClassPlayer1 = moveClass + ' player1';
    const moveClassPlayer2 = moveClass + ' player2 ';

    return (
        <svg className="Connect4Game" viewBox="0 0 1200 705" preserveAspectRatio="xMidYMid meet">
            <defs>
                <symbol id="background-playername-red" dangerouslySetInnerHTML={{
                    __html: `<image width="328" height="71" xlink:href="./img/background-playername-red.svg" />`
                }} />
                <symbol id="background-playername-yellow" dangerouslySetInnerHTML={{
                    __html: `<image width="328" height="71" xlink:href="./img/background-playername-yellow.svg" />`
                }} />
                <symbol id="block-0" dangerouslySetInnerHTML={{
                    __html: `<image width="${cell.width}" height="${cell.height}" xlink:href="./img/block-0.svg" />`
                }} />
                <symbol id="block-1" dangerouslySetInnerHTML={{
                    __html: `<image width="${cell.width}" height="${cell.height}" xlink:href="./img/block-1.svg" />`
                }} />
                <symbol id="block-2" dangerouslySetInnerHTML={{
                    __html: `<image width="${cell.width}" height="${cell.height}" xlink:href="./img/block-2.svg" />`
                }} />
                <symbol id="connect4-background" dangerouslySetInnerHTML={{
                    __html: `<image width="${1100}" height="${500}" xlink:href="./img/gamefield.svg" />`
                }} />
            </defs>
            { FieldView(state) }
            <g className="Connect4Game-playerView-left">
                <g dangerouslySetInnerHTML={{
                    __html: `<use x="40" y="20" xlink:href="#background-playername-red" />`
                }} />
                <text x={ 110 } y="61" className="Connect4Game-playerName">
                    { players.names[0] }
                </text>
                <text
                    x={'110'}
                    y={'110'}
                    className={ moveClassPlayer1 }>{ moveTextPlayer1 }</text>
            </g>
            <g className="Connect4Game-playerView-right">
                <g dangerouslySetInnerHTML={{
                    __html: `<use x="${1200 - 328 - 40}" y="20" xlink:href="#background-playername-yellow" />`
                }} />

                <text x={ 1200 - 110 } y="61" className="Connect4Game-playerName">
                    { players.names[1] }
                </text>
                <text
                    x={'1090'}
                    y={'110'}
                    className={ moveClassPlayer2 }>{ moveTextPlayer2 }</text>
            </g>
            <text x="50%" y="70" className="Connect4Game-currentRound">{ 'Round ' + round }</text>
            <Overlay winner={ winner } />

        </svg>
    );
});

export default GameView;
