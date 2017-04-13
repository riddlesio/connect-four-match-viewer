import _                                from 'lodash';
import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { createGame, event }            from '@riddles/match-viewer';
import StateMixin                       from '../mixin/StateMixin';
import GameLoopMixin                    from '../mixin/SimpleGameLoopMixin';
import { parseStates, parsePlayerNames } from '../io/Parser';
import GameView                         from '../view/GameView.jsx';
import defaults                         from '../data/gameDefaults.json';

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
        return defaults;
    },

    /**
     * Parses the received data and starts the game loop
     * @param  {Object} data
     */
    handleData: function (data) {

        let settings;
        const currentState  = 0;
        const matchData     = data.matchData;
        const playerData    = data.playerData;

        settings = matchData.settings;
        settings = _.merge(this.getDefaults(), settings);
        settings = parsePlayerNames(playerData, settings);

        const states = parseStates(matchData, settings);

        this.settings = settings;
        this.states   = states;

        this.triggerStateChange(currentState);
        this.play();
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
            const value = field[y * 7 + column];
            if (value !== '.') {
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

        let substate = this.states[currentState];

        const { column, round, winner, player, fieldWidth, fieldHeight, illegalMove } = substate;
        const field = substate.field.split(/,|;/);
        const row = this.getPieceRow(column, field);
        let newfield = '';

        /* If a move is illegal, just render a single state without substates */
        if (illegalMove !== '') {
            this.render(state, prevState);
            return;
        }

        /* Create a new field which represents the substate */
        for (let i = 0; i < 7 * 6; i++) {
            const x = i % 7;
            const y = Math.floor(i / 7);
            let value = field[i];

            /* Blank out the piece that's actually already in place */
            if (x === column && y === row && substateindex < row + 1) {
                value = '.';
            }

            if (x === column && y === substateindex - 2 && field[i] === '.') {
                value = player;
            }

            newfield += value + ',';
        }

        const width = substate.cells[0].width;
        const height = substate.cells[0].height;
        const marginleft = substate.cells[0].marginleft;
        const margintop = substate.cells[0].margintop;

        substate = {
            round,
            column,
            winner,
            illegalMove,
            player,
            fieldWidth,
            fieldHeight,
            field: newfield,
            cells: _
                .chain(newfield)
                .thru((string) => string.split(/,|;/))
                .map((cellType, index) => {
                    const row     = Math.floor(index / 7);
                    const column  = index % 7;
                    const x       = column * width + marginleft;
                    const y       = row * height + margintop;
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
