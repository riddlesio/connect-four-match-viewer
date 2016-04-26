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
                 * Loops through array of diff objects, creating substates for each
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
                    
                    substateindex = 0;
                    var intervalId = setInterval(function(){self.renderSubState(state, nextState, intervalId);}, 40);

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
                },

                /**
                 * Render a substate
                 * @return {Object}
                 */
                renderSubState: function (state, nextState, intervalId) {
                    var self = this,
                    shouldComponentUpdate = self.shouldComponentUpdate;

                    if (state && shouldComponentUpdate && !shouldComponentUpdate(state, nextState)) {
                        return self;
                    }

                    window.requestAnimationFrame(function () {
                        self.rendersubstate(state, nextState, substateindex);
                    });


                    if (substateindex > 5) {
                        clearInterval(intervalId);
                    }
                    substateindex++;
                    return self;
                }
            };

            _.extend(context, mixin);
        }
    };

    module.exports = StateMixin;
}());
