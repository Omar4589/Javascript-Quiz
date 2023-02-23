//Gets handles on all page and button elements
const startPage = $("#start-page");
const highscoresPage = $("#highscores-page");
const quizPage = $("#quiz-page");
const startButton = $("#start-button");
const highscoresButton = $("#hs-button");
const timer = $("#timer");
const resultsPage = $("#results-page");
const homeButton = $("#home-button");
const scoresList = $("#scores-list");
const submitScoreButton = $("#submit-button");
const clearScoresButton = $("#clear-button");
const score = $("#score");
const question = $("#question");
const answerOne = $("#answer1");
const answerTwo =$("#answer2");
const answerThree =$("#answer3");
const answerFour =$("#answer4");



function resetQuiz() {
  currentQuestion = 0; // Reset the current question number
  userScore = 0; // Reset the user's score
  // Reset any other variables used during the quiz
};

highscoresButton.on("click", () => {
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  // Display the high scores
  highScores.forEach((score) => {
    var tester = $('<li>').text(score.name + " - " + score.score);
    scoresList.append(tester);
  });

  startPage.attr("hidden", true);
  highscoresPage.removeAttr("hidden");
  
});

const questions = [
  {
    question: "What is a closure in JavaScript?",
    options: [
      "A way of creating private variables and methods in an object",
      "A way of creating global variables and methods in an object",
      "A way of creating public variables and methods in an object",
      "A way of creating local variables and methods in a function"
    ],
    answer: 0
  },
  {
    question: "What is the difference between null and undefined in JavaScript?",
    options: [
      "They are interchangeable",
      "Undefined means a variable has been declared but has not yet been assigned a value, while null is an assignment value",
      "Null means a variable has been declared but has not yet been assigned a value, while undefined is an assignment value",
      "They both represent the absence of a value"
    ],
    answer: 1
  },
  {
    question: "What is the difference between == and === in JavaScript?",
    options: [
      "They are interchangeable",
      "== checks for value equality without type coercion, while === checks for value equality with type coercion",
      "== checks for value equality with type coercion, while === checks for value equality without type coercion",
      "There is no difference"
    ],
    answer: 1
  },
  {
    question: "What is the difference between let and var in JavaScript?",
    options: [
    "There is no difference",
    "let variables can be reassigned, while var variables cannot be reassigned",
    "var variables can be reassigned, while let variables cannot be reassigned",
    "let variables are block-scoped, while var variables are function-scoped"
    ],
    answer: 3
    },
    {
    question: "What is a higher-order function in JavaScript?",
    options: [
    "A function that takes another function as an argument or returns a function as its result",
    "A function that has no arguments",
    "A function that is only called once",
    "A function that modifies the global object"
    ],
    answer: 0
    },
    {
    question: "What is a callback function in JavaScript?",
    options: [
    "A function that is called after another function has finished executing",
    "A function that is called before another function starts executing",
    "A function that is called instead of another function",
    "A function that is called with a delay"
    ],
    answer: 0
    },
    {
    question: "What is the difference between a for loop and a forEach loop in JavaScript?",
    options: [
    "There is no difference",
    "A for loop can be used to iterate over arrays and objects, while a forEach loop can only be used to iterate over arrays",
    "A forEach loop can be used to iterate over arrays and objects, while a for loop can only be used to iterate over arrays",
    "A for loop is faster than a forEach loop"
    ],
    answer: 1
    },
    {
    question: "What is the difference between a function declaration and a function expression in JavaScript?",
    options: [
    "There is no difference",
    "A function declaration is hoisted, while a function expression is not hoisted",
    "A function expression is hoisted, while a function declaration is not hoisted",
    "A function declaration can only be used as a method, while a function expression can only be used as a callback"
    ],
    answer: 1
    },
    ];


//Event listener for startButton, runs function
startButton.on("click", () => {
  //Hides startPage and shows quizPage
  startPage.attr("hidden", true);
  quizPage.removeAttr("hidden");

  

  //set time to 101 because the first second is subtracted when page appears
  let timeLeft = 101;
  // Creates countdown variable that runs a function at a set interval of 100 milliseconds
  let countdown = setInterval(function () {
    timeLeft--;
    timer.text(timeLeft);

    if (timeLeft === 0) {
      //stops countain function.
      clearInterval(countdown);
      //hide quiz page
      //show results page
      let userScore = parseInt(timer.text());
      quizPage.attr("hidden", true);
      score.append(userScore);
      resultsPage.removeAttr("hidden");
      
      //every 1000 milliseconds is 1 second.
    }
  }, 1000);

  function showQuestion(index) {
    const currentQuestion = questions[index];
    question.text(currentQuestion.question);
    answerOne.text(currentQuestion.options[0]);
    answerTwo.text(currentQuestion.options[1]);
    answerThree.text(currentQuestion.options[2]);
    answerFour.text(currentQuestion.options[3]);
  };
  

  // Select a random question from the questions array
const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

let currentQuestionIndex = 0;

// Display the initial question and answer choices
showQuestion(currentQuestionIndex);

// Display the answer choices in the #answer-1, #answer-2, #answer-3, #answer-4 elements on the quiz page
answerOne.text(randomQuestion.options[0]);
answerTwo.text(randomQuestion.options[1]);
answerThree.text(randomQuestion.options[2]);
answerFour.text(randomQuestion.options[3]);


function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.answer) {
    currentQuestionIndex++; 
  } if (selectedIndex !== currentQuestion.answer) {
      timeLeft -= 10; }
    if (currentQuestionIndex === questions.length - 1) {
      clearInterval(countdown);
      quizPage.attr("hidden", true);
      resultsPage.removeAttr("hidden");
      let quizScore = timeLeft;
      score.text(quizScore);
    } else {
      // Show the next question
      showQuestion(currentQuestionIndex);
    } 
  };

// Add click event listeners to the answer buttons
answerOne.on("click", function() {
  checkAnswer(0);
});
answerTwo.on("click", function() {
  checkAnswer(1);
});
answerThree.on("click", function() {
  checkAnswer(2);
});
answerFour.on("click", function() {
  checkAnswer(3);
})
});


submitScoreButton.on('click', () => {
  //records the inputed name.
  let userName = $("#name").val();
  let userScore = parseInt(score.text());

  // Get the existing scores from local storage or initialize an empty array
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Add the user's score to the array
  highScores.push({name: userName, score: userScore});

  // Save the updated scores array to local storage
  localStorage.setItem("highScores", JSON.stringify(highScores));

  // Hide the results page and show the high scores page
  resultsPage.attr('hidden', true);
  highscoresPage.removeAttr('hidden');

  // Display the high scores
  highScores.forEach((score) => {
    var tester = $('<li>').text(score.name + " - " + score.score);
    scoresList.append(tester);
  });
});

highscoresButton.on("click", () => {
  
  startPage.attr("hidden", true);
  highscoresPage.removeAttr("hidden");
  
});

homeButton.on("click", () => {
  resetQuiz(); // Call the reset function
  highscoresPage.attr("hidden", true);
  startPage.removeAttr("hidden");

});


clearScoresButton.on("click", () => {
  // Clear the high scores from local storage
  localStorage.removeItem("highScores");

  // Clear the current list of high scores
  scoresList.empty();
});