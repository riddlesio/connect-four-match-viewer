(function () {

    const
        _               = require('lodash'),
        AIGames         = require('aigames'),
        PlaybackEvent   = AIGames.event.PlaybackEvent;

    var SimpleGameLoopMixin = {

        applyTo: function (context) {

            var mixin = {

                /**
                 * Moves the game forward by one step
                 */
                moveForward: function () {

                    var self = this,
                        { currentState } = self.getState();

                    if (currentState !== self.states.length) {
                        self.setStates({ currentState: currentState + 1 });
                    }
                    else {
                        self.pause();
                    }
                },

                /**
                 * Moves the game backward by one step
                 */
                moveBackward: function () {

                    var self = this,
                        { currentState } = self.getState();

                    if (0 < currentState) {

                        self.setState({ currentState: currentState - 1 });
                    }
                },

                /**
                 * Starts the game loop
                 */
                play: function () {

                    PlaybackEvent.trigger(PlaybackEvent.PLAYING);
                },

                /**
                 * Stops the game loop
                 */
                pause: function () {

                    PlaybackEvent.trigger(PlaybackEvent.PAUSED);
                },

                setMove: function (index) {

                    return this.setState({ currentState: index });
                },
                /**
                 * To the final step.
                 */
                fastForward: function () {
                    var statenr = this.states.length - 1;
                    return this.setState({currentState: statenr });
                },

                /**
                 * To the first step.
                 */
                fastBackward: function () {
                    return this.setState({ currentState: 0});
                }
            };

            _.extend(context, mixin);
        }
    };

    module.exports = SimpleGameLoopMixin;

}());
