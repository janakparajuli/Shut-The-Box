/* Name: Janak Parajuli(al393628)
Subject: Programming (2019/2020) Assignment I*/

//First, define a function to turn on all the numbers on the box
const turnOnNumbers = () => {
  let totalNumber = [];
  for (let i = 0; i < 9; i++) {
    totalNumber.push(i + 1);
  }
  return totalNumber;
}
//Define a function to sum the box numbers
const sumNumbers = arrayNumber => {
  let sum = 0;
  arrayNumber.forEach(element => {
    sum += element;
  });
  return sum;
}
//Define a function to roll the dice:
const rollDice = () => {
  let dice;
  dice = Math.floor(Math.random() * 6) + 1; //1 is added to avoid 0
  return dice;
}
//Define a function to show the possible combinations
const showCombinations = (arrayDice, sumDice) => {
  let alternative = [];
  for (let i = 0; i < arrayDice.length; i++) {
    if (arrayDice[i] == sumDice) {
      alternative.push(arrayDice[i]);
    } else {
      for (let j = i + 1; j < arrayDice.length; j++) {
        if (arrayDice[i] + arrayDice[j] == sumDice) {
          alternative.push(arrayDice[i] + " with " + arrayDice[j]);
        }
      }

    }
  }
  return alternative;
}
//Define a function to convert user input to array
const inputToArray = userInput => {
  let num = [];
  let userInput1 = userInput.split(",");
  userInput1.forEach(element => {
    num.push(parseInt(element));
  });
  return num;
}
//Check if the user inputs are valid or not. Here, the validity check is done for three conditions: 
//a. Check the sum of inputs equals that of the dice or not, b. Equality of two inputs and c. whether the inputs are open or not (is subset of).
//Define a function to check the sum of the inputs:
//Check whether the sum of inputs equal dice rolled
const checkSum = (arrayNumber, diceSum) => {
  let sum = 0;
  arrayNumber.forEach(element => {
    sum += element;
  });
  return sum == diceSum;
}
//Second, Define a function to check the equality of numbers
const checkEquality = arrayNumber => {
  let flag;
  flag = (arrayNumber.length == 1) ? true : arrayNumber[0] != arrayNumber[1];
  return flag;
}
//Third, Define a function to check if the given inputs are the subset of the options or not
const subset = (arrayNumber, boxNum) => {
  return arrayNumber.every(aN => boxNum.includes(aN));
}
//Now check the validity according to above conditions
const validateInput = (arrayNumber, boxNum, diceSum) => {
  return checkEquality(arrayNumber) && subset(arrayNumber, boxNum) && checkSum(arrayNumber, diceSum);
}
//Define a function to cut the numbers from the dice. The numbers may be either a)a single whole number or b) two numbers whose sum is equal to that obtained from the addition of dice numbers.
const turnDown = (arrayNumber, boxNum) => {
  for (let i = 0; i < arrayNumber.length; i++) {
    boxNum.splice(boxNum.indexOf(arrayNumber[i]), 1);
  }
  return boxNum;
}
//Define a random function to aid computer choose the combinations:
const randChoice = randomChoice => {
  //Define some variables
  let randArr, numChoice = [],
    splitArray = [];
  //Convert randomChoice to string
  let splitChoice = `` + randomChoice;
  //Delimit by comma
  let splitStrings = splitChoice.split(",");

  splitStrings.forEach(splitString => {
    splitArray.push(splitString);
  });
  let choice = Math.floor(Math.random() * (splitArray.length));
  let compChoice = splitArray[choice];
  let alertChoice = compChoice != 0 ? compChoice : null;
  alert("The choice of the Computer is... \n" + alertChoice);
  //Now delimit the string 'with' from the choice
  let choiceToNum = compChoice.split("with");
  choiceToNum.forEach(element => {
    numChoice.push(parseInt(element));
  });
  return numChoice;
}
//Define a function to compare the scores
const winner = (compScore, humanScore) => {
  let theWinner = compScore <= humanScore ? `The Computer is the winner.` : `The Human is the winner.`;
  return theWinner;
}

//Let's start the game
//The first player is the Computer i.e Player1
let players = [],
  player = "Computer",
  finalScore = [];
  alert(`Welcome to the game: SHUT THE BOX. The process is, the Computer will play the first round. \nIt throws the dice until there are open numbers in the box and possible combinations left. \nAfter the turn of the Computer, the Human will follow the same process. \nThe player with the lowest score at the end of the game will be the winner. \nRemember if there's a tie, the Computer wins. `);
//Continue the game until the player is either computer or human
while (player == "Computer" || player == "Human") {
  players.push(player);
  //The computer and the human play in succession
  alert(`Let the battle begin by turning all the numbers...`);
  let totalNumber = turnOnNumbers(); //Turn on all the numbers on the box.
  alert(`The numbers on the box are: \n${totalNumber}`); //Show the numbers in the box
  //Repeat the actions until either there are no numbers in the box or there are no possible combinations.
  do {
    //At first, define required variables
    let sumOfBoxNumbers, dice1, dice2, sumDices, userAnswer, userAnsArray, remainingNum;

    //Compute the sum of the numbers in the box
    sumOfBoxNumbers = sumNumbers(totalNumber);
    //If the sum of the box numbers is greater than 6, roll the dice twice else roll once
    if (sumOfBoxNumbers > 6) {
      alert(`As, the sum of the numbers in the box is ${sumOfBoxNumbers}, Please roll the dice twice`);
      dice1 = rollDice();
      dice2 = rollDice();
      alert("{Rolling the dices...}");
      sumDices = dice1 + dice2;
      //Show the numbers of each dice and their sum
      alert(`The number of dice one: ${dice1} and dice two: ${dice2}.\nThe sum of the two dices: ${sumDices}`);
    }
    //If by chance, in course of playing the sum reaches zero, the aggregated point of that player will be zero.
    else if (sumOfBoxNumbers == 0) {
      if (player == "Computer") {
        finalScore[0] = 0;
        alert(`Since the sum of the box number is 0, the score of the Computer is 0`);
      } else {
        finalScore[1] = 0;
        alert(`Since the sum of the box number is 0, the score of the Human is 0`);
      }
      break;
    }
    //If the sum of the box numbers is smaller or equal to 0, roll the dice once.
    else {
      alert(`As, the sum of the numbers in the box is ${sumOfBoxNumbers}, Please roll the dice once`);
      alert("{Rolling the dices...}");
      sumDices = rollDice();
      alert(`The number of the dice is: ${sumDices}`); //Show the number in the dice
    }
    var showComb, sumOfRemNumbers;
    showComb = showCombinations(totalNumber, sumDices); //Show the possible combinations
    alert(`Now let's check the valid combinations. They are... ${showComb}`);
    if (showComb.length !== 0) {
      //If the player is computer, it randomly chooses its combination
      if (player == "Computer") {
        let combArray = [],
          compAnsArray = [];
        combArray.push(showComb);
        userAnsArray = randChoice(combArray);
      }
      //If the player is human, prompt the combination from the user.
      else if (player == "Human") {
        userAnswer = prompt("Choose any alternatives given previously. \nIf you choose two numbers, please separate them with a comma.\nRemember that if you enter anything other than integer, it will be parsed as integer: ");
        //Convert the user inputs into array.
        userAnsArray = inputToArray(userAnswer);

        //Prompt from the user until the user enters valid combination.
        while (!validateInput(userAnsArray, totalNumber, sumDices)) {
          userAnswer = prompt(`Invalid input.please select correct option. The valid combinations are: \n${showComb}`);
          userAnsArray = inputToArray(userAnswer);
        }
      }
    }
    //If there are no combinations left, sum up the numbers and assign the score
    else {
      alert(`There are no combinations left. \nSo, the final score of the ${player} is: ${sumOfRemNumbers}`);
      player = "Human";
      break;
    }
    //Now, shut the numbers in accordance with the numbers from dices.:
    remainingNum = turnDown(userAnsArray, totalNumber);
    sumOfRemNumbers = sumNumbers(remainingNum);
    //Show the remaining numbers and their sum
    alert(`The remaining numbers in the box are: ${remainingNum} and the sum is ${sumOfRemNumbers}`);

    if (player == "Computer") {
      //Assign the score of the computer
      finalScore[0] = sumNumbers(remainingNum);
    } else {
      //Assign the score of the human
      finalScore[1] = sumNumbers(remainingNum);
    }
  }
  //Terminate the loop if there are no numbers left
  while (totalNumber.length != 0);
  player = "Human";
  //If both of the players have played, compute and compare their scores.
  if (players.length == 2) {
    alert(`As both players have completed their part, let's compare their totals.\nThe final score of the Computer is: ${finalScore[0]}.\nThe final score of the Human is: ${finalScore[1]}\n${winner(finalScore[0], finalScore[1])}`);
    break;
  }
  //If not, then start the next round
  else {
    alert(`Now let's start the game for next round. The player is: ${player}`);
  }
}
//Finally, that's the end of the game.
alert(`The End!!!`);
