                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            (function () {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        FieldView  = require('./FieldView.jsx'),
        Overlay     = require('./Overlay.jsx').jsx;

    var GameView;

    GameView = createView('GameView', function (props) {
        var { state, settings } = props,
            { round, column, winner, field, fieldWidth, fieldHeight, player1fields, player2fields, cells, illegalMove } = state,
            { players, field } = settings,
            cell = field.cell;
        var player1class="", player2class="";
        if ( state.player == 1) {
            player1class = " active ";
        } else {
            player2class = " active ";
        }

        return (
            <svg className="Connect4Game" viewBox="0 0 1200 705" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <symbol id="background-playername-red" dangerouslySetInnerHTML={{
                        __html: `<image width="328" height="71" xlink:href="./img/background-playername-red.svg" />`
                    }} />
                    <symbol id="background-playername-yellow" dangerouslySetInnerHTML={{
                        __html: `<image width="328" height="71" xlink:href="./img/background-playername-yellow.svg" />`
                    }} />
                    <symbol id="macroboard--1" dangerouslySetInnerHTML={{
                        __html: `<image width="165" height="165" xlink:href="./img/fieldactiveplayer1.svg" />`
                    }} />
                    <symbol id="macroboard--2" dangerouslySetInnerHTML={{
                        __html: `<image width="165" height="165" xlink:href="./img/fieldactiveplayer2.svg" />`
                    }} />
                    <symbol id="macroboard--0" dangerouslySetInnerHTML={{
                        __html: `<image width="165" height="165" xlink:href="./img/field.svg" />`
                    }} />
                    <symbol id="macroboard-1" dangerouslySetInnerHTML={{
                        __html: `<image width="165" height="165" xlink:href="./img/fieldoccupied1.svg" />`
                    }} />
                    <symbol id="macroboard-2" dangerouslySetInnerHTML={{
                        __html: `<image width="165" height="165" xlink:href="./img/fieldoccupied2.svg" />`
                    }} />
                    <symbol id="block-0" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-0.svg" />`
                    }} />
                    <symbol id="block-1" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-1.svg" />`
                    }} />
                    <symbol id="block-2" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-2.svg" />`
                    }} />
                    <symbol id="connect4-background" dangerouslySetInnerHTML={{
                        __html: `<image width="${ 1100 }" height="${ 500 }" xlink:href="./img/gamefield.svg" />`
                    }} />
                </defs>
                { FieldView(state) }
                <g dangerouslySetInnerHTML={{
                    __html: `<use x="70" y="53" xlink:href="#background-playername-red" />`
                }} />
                <g dangerouslySetInnerHTML={{
                    __html: `<use x="800" y="53" xlink:href="#background-playername-yellow" />`
                }} />

                <text
                    x={ "210" }
                    y={ "150" }
                    className={"Connect4Game-playerName Connect4Game-player1Name " + player1class }>{ players.names[0] }</text>
                <text
                    x={ "983" }
                    y={ "150" }
                    className={"Connect4Game-playerName Connect4Game-player2Name " + player2class }>{ players.names[1] }</text>

                <text x="300" y="100" className="Connect4Game-playerFields Connect4Game-player1Fields">{ player1fields }</text>
                <text x="1034" y="100" className="Connect4Game-playerFields Connect4Game-player2Fields">{ player2fields }</text>


                <text x="50%" y="70" className="Connect4Game-currentRound">{ 'Move ' + round }</text>
                <text x="50%" y="110" className="Connect4Game-illegalMove">{ illegalMove }</text>

                <Overlay winner={ winner } />

            </svg>
        );
    });

    module.exports = GameView;
}());
