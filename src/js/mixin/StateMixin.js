import _ from 'lodash';

const StateMixin = {

    applyTo: function (context) {

        let state;
        let substateindex = 0;

        const mixin = {
            /**
             * Loops through array of diff objects, creating substates for each
             * @param {Object} diff
             * @return {AbstractUIComponent}
             */
            setStates: function (diff) {

                const self = this;
                const nextState = _.merge({}, state, diff);

                substateindex = 0;
                state = nextState;

                let intervalId = setInterval(function () {
                    self.renderSubState(state, nextState, intervalId);
                }, 40);

                return this;
            },

            /**
             * Sets the component state
             * @param {Object} diff
             * @return {AbstractUIComponent}
             */
            setState: function (diff) {

                const self = this;
                const shouldComponentUpdate = self.shouldComponentUpdate;
                const currentState = state;
                const nextState = _.merge({}, state, diff);

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

                const self = this;
                const shouldComponentUpdate = self.shouldComponentUpdate;

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
            },
        };

        _.extend(context, mixin);
    },
};

export default StateMixin;
