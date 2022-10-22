// Declarations
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


// Functions
function areEqual(array1, array2) {
    if (array1.length === array2.length) {
      return array1.every((element, index) => {
        if (element === array2[index]) {
          return true;
        }
  
        return false;
      });
    }
  
    return false;
  }

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    pressButton(randomChosenColour);
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level "+ level);
}

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(chosenColor) {
    $("#"+chosenColor).addClass("pressed");
    setTimeout(function(){
        $("#"+chosenColor).removeClass("pressed");
    }, 100);
}

function pressButton(color){
    playSound(color);
    $("#"+color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function checkAns(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        gameOver();
  
      }
    

}

function gameOver(){
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("red");
    setTimeout(function(){
        $("body").removeClass("red");
    }, 100);
    playSound("wrong");
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started=false;
}

//Game logic
$(Document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});



$(".btn").click(function(event) {
    var userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAns(userClickedPattern.length-1);
});

