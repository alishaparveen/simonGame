var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern =[];
var starter=0;
var level=0;

$(document).on('keyup touch' ,function() { if(!starter)
{  $("#level-title").text("Level 0");
	nextSequence();

starter++;

}

});

function nextSequence()
{   
	
	
	var randomNumber =Math.floor(Math.random()*4);
	var randomChosenColour=buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	$("#"+randomChosenColour).fadeOut(200).fadeIn(200);
	playSound(randomChosenColour);
	animatePress(randomChosenColour);
   
    level++;
     $("#level-title").text("Level "+level);

}

$(".btn").on('click touchstart' , function() {
 var userChosenColour = $(this).attr("id");
 userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);

});

function playSound(name)
{
	 var audio=new Audio("sounds/"+name+".mp3");
	audio.play();

}

function animatePress(currentColour)
{
	

	$("#"+currentColour).addClass("pressed").delay(200).queue(function(next){
    $(this).removeClass("pressed");
    next();
});
}

function checkAnswer(currentLevel)
{
   if (userClickedPattern[currentLevel]==gamePattern[currentLevel])
   	console.log("success");
   else
   	{
   		var audio = new Audio("sounds/wrong.mp3");
   		audio.play();
   		$("body").addClass("game-over").delay(200).queue(function(next){
    $(this).removeClass("game-over");
    next();
});
   		$("#level-title").text("Game Over , Press Any Key to Restart");
   		startOver();

   	}


   if (currentLevel==level-1)
   {
   	setTimeout(function() {
        nextSequence();
        userClickedPattern=[];}, 1200);
    }


}

function startOver()
{

	level=0;
	gamePattern=[];
	userClickedPattern=[];
	starter=0;
}
   
