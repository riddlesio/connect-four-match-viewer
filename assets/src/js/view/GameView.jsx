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
            { round, column, winner, field, fieldWidth, fieldHeight, cells } = state,
            { player, field } = settings,
            cell = field.cell;

            console.log(state);

        /**
         * Data should have the following structure:
         * {
         *     round: Integer,
         *     
         *     ],
         *     winner: [unset | string]
         * }
         */

        return (
            <svg className="Connect4Game" viewBox="0 0 1200 705" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <symbol id="background-playername-left" dangerouslySetInnerHTML={{
                        __html: `<image width="328" height="71" xlink:href="./img/background-playername-red.svg" />`
                    }} />
                    <symbol id="background-playername-right" dangerouslySetInnerHTML={{
                        __html: `<image width="328" height="71" xlink:href="./img/background-playername-blue.svg" />`
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
                <text x="50%" y="70" className="Connect4Game-currentRound">{ 'Round ' + round }</text>
                <Overlay winner={ winner } />
            </svg>
        );
    });

    module.exports = GameView;
}());
