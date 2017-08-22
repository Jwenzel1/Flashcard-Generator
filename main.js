var BasicCard = require("./cards/BasicCard");
var ClozeCard = require("./cards/ClozeCard");
var inquirer = require("inquirer");
var questions = [];
var index = 0;
var score = 0;
questions.push(ClozeCard("The approximate value of pi is 3.14", "pi"));
questions.push(ClozeCard("The Cartesian plane is named after the mathematician Rene Descartes.", "Cartesian"));
questions.push(BasicCard("Who invented the Klein Bottle", "Felix Klein"));
questions.push(ClozeCard("In a room of just 23 people there’s a 50% chance that two people have the same birthday.", "50"));
questions.push(BasicCard("What symbol means factorial?", "!"));
questions.push(BasicCard("What is Euler's Number?", "e"));

function promptQuestions(){
  inquirer.prompt([
    {
      name: "question",
      message: questions[index] instanceof BasicCard ? questions[index].front : questions[index].partial
    }
  ]).then(function(answers){
    var userAnswer = answers.question.toLowerCase().trim();
    var output = "";
    output += "\n----------------------------\n";
    if(questions[index] instanceof BasicCard){ //If the card is a basic card
      var realAnswer = questions[index].back.toLowerCase();
      if(userAnswer === realAnswer){
        score++;
        output += "CORRECT!\n";
        output += questions[index].back + " is the correct answer to \"" + questions[index].front + "\"\n";
      }
      else{//User got it wrong
        output += "WRONG!\n";
        output += "The correct answer to \"" + questions[index].front + "\" is " + questions[index].back + "\n";
      }
    }
    else {//The card must be a Cloze card
      var realAnswer = questions[index].cloze.toLowerCase();
      if(userAnswer === realAnswer){
        score++;
        output += "CORRECT!\n";
        output += "The complete sentence is \"" + questions[index].fullText + "\"\n"
      }
      else{ //User got it wrong
        output += "WRONG!\n";
        output += "The correct answer is " + questions[index].cloze + "\n";
        output += "The complete sentence is \"" + questions[index].fullText + "\"\n"
      }
    }
    output += "Current Score: " + score + "\n"
    output += "----------------------------\n";
    console.log(output);
    index++;
    if(!(index === questions.length)){
      promptQuestions();
    }
    else{
      output = "";
      output += "GAME OVER! You are out of flashcards!\n";
      output += "You got " + score + " correct out of " + questions.length + " which is " + Math.round(score/questions.length*100) + "%.\n";
      console.log(output);
    }
  });
}

promptQuestions();
