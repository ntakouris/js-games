var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

var totalScore = 0;

game.state.add('initial', initialState);
game.state.add('play', playState);
game.state.add('win', winState);

game.state.start('initial');