
(function (undefined) {
    const
        _                   = require('lodash'),
        React               = require('react'),
        AIGames             = require('aigames'),
        PlaybackEvent       = AIGames.event.PlaybackEvent,
        Parser              = require('../io/Parser'),
        StateMixin          = require('../mixin/StateMixin'),
        GameLoopMixin       = require('../mixin/SimpleGameLoopMixin'),
        GameView            = require('../view/GameView.jsx'),

        _defaults           = require('../data/gameDefaults.json');

    var TetrisBattle;

    /**
     * TetrisBattle class
     * @constructor
     */
    TetrisBattle = AIGames.createGame({

        /**
         * TetrisBattle construct function
         * Automatically executed when instantiating the TetrisBattle class
         * @param  {Object} options
         */
        construct: function (options) {
            registerEventListeners(this);
        },

        /**
         * Cleans up anything which might cause memory leaks
         */
        destroy: function () {

            releaseEventListeners(this);
        },

        getDefaults: function () {
            return _defaults;
        },

        /**
         * Parses the received data and starts the game loop
         * @param  {Object} data
         */
        handleData: function (data) {

            var currentState,
                moves,
                settings,
                playernames,
                states,
                // Use self where this is used more than once
                // "self" can be shortened by the minifier unlike "this"
                self = this;

            //data =

            currentState  = 0;
            settings      = _.merge(this.getDefaults(), data.settings);
            playernames = Parser.parsePlayerNames(settings);
            states   = Parser.parseStates(data, settings);
            moves    = Parser.parseMoveSet(states);

            self.settings = settings;
            self.states   = states;
            self.playernames = playernames;

            self.setMoves(moves)
                .setState({ currentState })
                .play();
        },

        /**
         * Renders the game
         * @param {Object} state
         * @param {Object} prevState
         */
        render: function (state, prevState) { // prevState is used for??

            var props,
                self = this,
                { currentState } = state;

            props = {
                state: self.states[currentState],
                settings: self.settings,
            };
            React.render(GameView(props), self.getDOMNode());
        },

        /**
         * Takes a field and returns the first taken row on given column
         * @param {int} column
         * @param {Array} field
         */
        getPieceRow: function(column, field) {
            for (var y = 0; y < 6; y++) {
                var value = field[y*7+column];
                if (value > 0) {
                    return y;
                }
            }
        },

        /**
         * Renders a busbstate
         * @param {Object} state
         * @param {Object} prevState
         * @param {int} substateindex
         */
        rendersubstate: function (state, prevState, substateindex) {

            var props,
                self = this,
                { currentState } = state;

            var substate = self.states[currentState];
            var column = substate.column;
            var round = substate.round;
            var winner = substate.winner;
            var player = substate.player;

            var illegalMove = substate.illegalMove;

            var field = substate.field.split(",");
            var newfield = "";
            var row = self.getPieceRow(column, field);

            /* Create a new field which represents the substate */
            for (var i =0; i < 7*6; i++) {
                var value = field[i];
                var x = i%7;
                var y = Math.floor(i/7);

                /* Blank out the piece that's actually already in place */
                if (x == column && y == row && substateindex < row+1) {
                    value = 0;
                }

                if (x == column && y == substateindex-2 && field[i] == 0) {
                    value = player;
                }
                newfield += value + ",";
            }
            
            var width = substate.cells[0].width;
            var height = substate.cells[0].height;
            var marginleft = substate.cells[0].marginleft;
            var margintop = substate.cells[0].margintop;

            substate = {
                round,
                column,
                winner,
                illegalMove,
                player,
                field: newfield,
                fieldWidth: 7,
                fieldHeight: 6,
                cells: _
                    .chain(newfield)
                    .thru((string) => string.split(/,|;/))
                    .map(function (cellType, index) {
                        var row     = Math.floor(index / 7),
                            column  = index % 7,
                            x       = column * width+marginleft,
                            y       = row * height+margintop;
                        return { row, column, x, y, width, height, cellType };
                    })
                    .value()
            };

            props = {
                state: substate,
                settings: self.settings,
            };
            React.render(GameView(props), self.getDOMNode());
        }
    }, [StateMixin, GameLoopMixin]);


    

    // Private functions

    /**
     * Register the event listeners
     * @param {TetrisGame} context
     */
    function registerEventListeners (context) {

        PlaybackEvent.on(PlaybackEvent.PLAY, context.play, context);
        PlaybackEvent.on(PlaybackEvent.PAUSE, context.pause, context);
        PlaybackEvent.on(PlaybackEvent.FORWARD, context.moveForward, context);
        PlaybackEvent.on(PlaybackEvent.GOTO, context.setMove, context);
        PlaybackEvent.on(PlaybackEvent.BACKWARD, context.moveBackward, context);
    }

    /**
     * Release the event listeners
     * @param {TetrisGame} context
     */
    function releaseEventListeners (context) {

        PlaybackEvent.off(PlaybackEvent.PLAY, context.play, context);
        PlaybackEvent.off(PlaybackEvent.PAUSE, context.pause, context);
        PlaybackEvent.off(PlaybackEvent.FORWARD, context.moveForward, context);
        PlaybackEvent.off(PlaybackEvent.GOTO, context.setMove, context);
        PlaybackEvent.off(PlaybackEvent.BACKWARD, context.moveBackward, context);
    }

    module.exports = TetrisBattle;
}());
