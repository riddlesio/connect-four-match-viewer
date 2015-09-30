(function () {

    const
        AIGames      = require('aigames'),
        ConnectFourGame   = require('./game/ConnectFourGame');

    var game, 
        displayChrome = true;

    if(window.frameElement.getAttribute("data-indexgame")) {
        displayChrome = false;
    }

    // Wraps the game for use on TheAIGames website
    // Takes care of setting up and destroying the competition namespace
    // AIGames.util.legacyWrapper(ConnectFourGame,
    game = new ConnectFourGame({
            name: 'connectfour-battle',
            player: {
                // Determines whether they player's chrome should be displayed
                chrome: displayChrome,
                // Determines whether view selection should be possible
                viewstack: false,
                // A number between 0 and 1
                aspectRatio: 1000 / 558,
                // Time between each step when playing
                playbackTimeout: {
                    min: 300,
                    max: 1600
                },
            }
        })
    // );
}());
