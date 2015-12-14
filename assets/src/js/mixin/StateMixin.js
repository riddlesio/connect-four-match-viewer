(function () {

    const
        _ = require('lodash');

    var StateMixin = {

        applyTo: function (context) {

            var mixin,
                state,
                substateindex = 0;

            mixin = {
                /**
                 * Loops through array of diff objects
                 * @param {Object} diff
                 * @return {AbstractUIComponent}
                 */
                setStates: function (diff) {
                    var self = this,
                        currentState,
                        nextState,
                        shouldComponentUpdate = self.shouldComponentUpdate;

                    currentState = state;
                    nextState    = _.merge({}, state, diff);
                    self.render(state, nextState);

                    state = nextState;
                    return self;
                },

                /**
                 * Sets the component state
                 * @param {Object} diff
                 * @return {AbstractUIComponent}
                 */
                setState: function (diff) {

                    var self = this,
                        currentState,
                        nextState,
                        shouldComponentUpdate = self.shouldComponentUpdate;

                    currentState = state;
                    nextState    = _.merge({}, state, diff);

                    if (state && shouldComponentUpdate && !shouldComponentUpdate(state, nextState)) {
                        return self;
                    }

                    state = nextState;
                    console.log(state.round);

                    window.requestAnimationFrame(function () {
                        self.render(nextState, currentState);
                    });

                    return self;
                },

                /**
                 * Returns the state
                 * @return {Object}
                 */
                getState: function () {
                    return state;
                }
            };

            _.extend(context, mixin);
        }
    };

    module.exports = StateMixin;
}());
