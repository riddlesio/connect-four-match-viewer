import _                                from 'lodash';
import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { createGame, event }            from '@riddles/match-viewer';
import StateMixin                       from '../mixin/StateMixin';
import GameLoopMixin                    from '../mixin/SimpleGameLoopMixin';
import { parseStates, parseMoveSet, parsePlayerNames } from '../io/Parser';
import GameView                         from '../view/GameView.jsx';
import _defaults                        from '../data/gameDefaults.json';

const { PlaybackEvent } = event;

/**
 * Four in a row
 * MatchViewer class
 * @constructor
 */
const MatchViewer = createGame({

    /**
     * MatchViewer construct function
     * Automatically executed when instantiating the MatchViewer class
     * @param  {Object} options
     */
    construct: function (options) {

        window.viewer = this;
        registerEventListeners(this);
    },

    /**
     * Cleans up anything which might cause memory leaks
     */
    destroy: function () {

        releaseEventListeners(this);
        delete window.viewer;
    },

    getDefaults: function () {
        return _defaults;
    },

    /**
     * Parses the received data and starts the game loop
     * @param  {Object} data
     */
    handleData: function (data) {

        const currentState  = 0;
        const settings      = _.merge(this.getDefaults(), data.settings);
        const playerNames   = parsePlayerNames(settings);
        const states        = parseStates(data, settings);
        const moves         = parseMoveSet(states);

        this.settings = settings;
        this.states   = states;
        this.playernames = playerNames;

        this.setMoves(moves)
            .triggerStateChange({ currentState })
            .play();
    },

    /**
     * Renders the game
     * @param {Object} state
     * @param {Object} prevState
     */
    render: function (state, prevState) {

        const { currentState } = state;
        const { settings, states } = this;

        const props = {
            settings,
            state: states[currentState],
        };

        ReactDOM.render(<GameView { ...props }/>, this.getDOMNode());
    },

    /**
     * Takes a field and returns the first taken row on given column
     * @param {int} column
     * @param {Array} field
     */
    getPieceRow: function (column, field) {
        for (let y = 0; y < 6; y++) {
            let value = field[y * 7 + column];
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

        const { currentState } = state;

        var substate = this.states[currentState];
        var column = substate.column;
        var round = substate.round;
        var winner = substate.winner;
        var player = substate.player;

        var illegalMove = substate.illegalMove;
        var field = substate.field.split(/,|;/);
        var newfield = '';
        var row = this.getPieceRow(column, field);

        /* If a move is illegal, just render a single state without substates */
        if (illegalMove != '') {
            this.render(state, prevState);
            return;
        }

        /* Create a new field which represents the substate */
        for (var i = 0; i < 7 * 6; i++) {
            var value = field[i];
            var x = i % 7;
            var y = Math.floor(i / 7);

            /* Blank out the piece that's actually already in place */
            if (x == column && y == row && substateindex < row + 1) {
                value = 0;
            }

            if (x == column && y == substateindex - 2 && field[i] == 0) {
                value = player;
            }

            newfield += value + ',';
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
                        x       = column * width + marginleft,
                        y       = row * height + margintop;
                    return { row, column, x, y, width, height, cellType };
                })
                .value(),
        };

        const props = {
            state: substate,
            settings: this.settings,
        };

        ReactDOM.render(<GameView { ...props }/>, this.getDOMNode());
    },
}, [StateMixin, GameLoopMixin]);

// Private functions

/**
 * Register the event listeners
 * @param {MatchViewer} context
 */
function registerEventListeners(context) {

    PlaybackEvent.on(PlaybackEvent.PLAY, context.play, context);
    PlaybackEvent.on(PlaybackEvent.PAUSE, context.pause, context);
    PlaybackEvent.on(PlaybackEvent.FORWARD, context.moveForward, context);
    PlaybackEvent.on(PlaybackEvent.GOTO, context.setMove, context);
    PlaybackEvent.on(PlaybackEvent.BACKWARD, context.moveBackward, context);
    PlaybackEvent.on(PlaybackEvent.FAST_FORWARD, context.fastForward, context);
    PlaybackEvent.on(PlaybackEvent.FAST_BACKWARD, context.fastBackward, context);
}

/**
 * Release the event listeners
 * @param {MatchViewer} context
 */
function releaseEventListeners(context) {

    PlaybackEvent.off(PlaybackEvent.PLAY, context.play, context);
    PlaybackEvent.off(PlaybackEvent.PAUSE, context.pause, context);
    PlaybackEvent.off(PlaybackEvent.FORWARD, context.moveForward, context);
    PlaybackEvent.off(PlaybackEvent.GOTO, context.setMove, context);
    PlaybackEvent.off(PlaybackEvent.BACKWARD, context.moveBackward, context);
    PlaybackEvent.off(PlaybackEvent.FAST_FORWARD, context.fastForward, context);
    PlaybackEvent.off(PlaybackEvent.FAST_BACKWARD, context.fastBackward, context);
}

export default MatchViewer;
