var hugeText = { font: "100px Arial", fill: "#ffffff", align: "center" };
var bigText = { font: "30px Arial", fill: "#ffffff", align: "center" };
var playNow;

var winState = {
    create: function(){
        var name = game.add.text(game.world.centerX, game.world.centerY - 100, 'Total Score: ' + totalScore, hugeText);
        name.anchor.set(0.5);
        
        playNow = game.add.text(game.world.centerX, game.world.centerY + 30, 'Click to play again!', bigText);
        playNow.anchor.set(0.5);

        game.time.events.repeat(Phaser.Timer.SECOND * 1, 9999999 , this.togglePlayNowText, this);

        game.input.mouse.capture = true;
        game.input.onDown.add(this.clicked, this);
    },
    togglePlayNowText: function(){
        playNow.visible = !playNow.visible;
    },
    clicked: function(){
        game.state.start('play')
    }
}