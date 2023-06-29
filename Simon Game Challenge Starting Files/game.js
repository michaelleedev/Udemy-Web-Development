let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green" , "yellow"];
let level = 0;

$(document).keypress(function(){
    nextSequence();
});

$(".btn").click(function(){
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1)
});



function nextSequence(){
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random()*4); 
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    level++;
    $("#level-title").html("Level "+ level);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(currentLevel === gamePattern.length - 1){
            setTimeout(() => {nextSequence();}, 1000); 
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {$("body").removeClass("game-over");}, 200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
    }
    console.log(gamePattern);
    console.log(userClickedPattern);
}

function startOver(){
    level = 0;
    gamePattern = [];
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(() => {
        $("."+currentColor).removeClass("pressed");
    }, 100)
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
