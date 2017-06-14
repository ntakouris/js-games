var edgeAngle = 0;
var validAngle = 0;
var direction = 1;

var angleOffset = 40;
var validOffset = 25;

var angleOffsetHardLimit = 20;
var validOffsetHardLimit = 10;

var score = 0;
var speed = 40;

var speedHardLimit = 20;

var bigText = { font: "65px Arial", fill: "#ffffff", align: "center" };

var gameGraphics;
var scoreText;

function getConstrainedRandomAngle(){
    var distanceFromEdge = game.rnd.integerInRange(angleOffset, 180);
    return (getAngleIn360(edgeAngle) + distanceFromEdge) % 360;
}

function angleDistanceFromZero(angle){
    return angle > 180 ? 360 - angle : angle;
}

function getAngleIn360(angle){
    return angle < 0 ? 360 + angle : angle;
}

var playState = {
        
    preload: function() {
        edgeAngle = 0;
        score = 0;
        minAngleOffset = 40;
        validOffset = 25;
        speed = 10;
        validAngle = getConstrainedRandomAngle();
    },

    create: function() {
        gameGraphics = game.add.graphics(game.world.centerX, game.world.centerY);
        
        game.input.mouse.capture = true;
        game.input.onDown.add(this.clicked, this);
        
        scoreText = game.add.text(game.world.centerX, 40, "Score: 0", bigText);
        scoreText.anchor.set(0.5);
    },

    clicked: function(){
        if (this.game.input.onDown){//click
            var offset = this.game.math.difference(angleDistanceFromZero(getAngleIn360(edgeAngle)), angleDistanceFromZero(getAngleIn360(validAngle)));
            if(offset <= validOffset){
                validAngle = getConstrainedRandomAngle();
                direction = -direction;
                score++;
                scoreText.setText("Score: " + score);
            }else{
                totalScore = score;
                game.state.start('win');
            }
        }
    },

    update: function() {
        var ds = game.time.time - game.time.prevTime;
        edgeAngle = (edgeAngle + (speed * direction / 6)) % 360;
    },

    render: function() {
        gameGraphics.clear();
        
        gameGraphics.lineStyle(30, 0x3bff00, 0.7);
        gameGraphics.arc(0, 0, 135, game.math.degToRad(validAngle - validOffset - 90), game.math.degToRad(validAngle + validOffset - 90), false);
        
        gameGraphics.lineStyle(0);
        
        
        var lineX = Math.cos(game.math.degToRad(getAngleIn360(edgeAngle - 90)));
        var lineY = Math.sin(game.math.degToRad(getAngleIn360(edgeAngle - 90)));
        
        gameGraphics.lineStyle(10 , 0xd000ff);
        gameGraphics.moveTo(100 * lineX,120 * lineY);
        gameGraphics.lineTo(180 * lineX, 160 * lineY);
        
        gameGraphics.moveTo(0,0);
    }
}